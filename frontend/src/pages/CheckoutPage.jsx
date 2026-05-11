import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastNotification } from '../components/base';
import { ShippingSelection, PaymentMethods, OrderSummary, AddressModal } from '../features/checkout/components';
import { useModal } from '../hooks';
import { apiClient, readCartItems, writeCartItems } from '../services';
import { formatCurrency } from '../utils';

/** @description: Checkout page that submits invoices from the local cart. */
function CheckoutPage() {
  const addressModal = useModal();
  const navigate = useNavigate();

  /** @type {[import('../features/checkout/types').CheckoutAddress[], Function]} */
  const [addresses, setAddresses] = useState([]);
  const [addressStatus, setAddressStatus] = useState('loading');
  const [addressSaveStatus, setAddressSaveStatus] = useState('idle');
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  /** @type {[import('../features/cart/types').CartStorageItem[], Function]} */
  const [cartItems, setCartItems] = useState([]);

  /** @type {[import('../features/checkout/types').CheckoutPaymentMethod, Function]} */
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [checkoutStatus, setCheckoutStatus] = useState('idle');
  const [invoiceTotal, setInvoiceTotal] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('info');

  /**
   * @description: Loads addresses for checkout selection.
   * @param {number | null} preferredId - Example: 12
   * @returns {Promise<void>} - address list updated
   */
  const loadAddresses = async (preferredId = null) => {
    setAddressStatus('loading');

    try {
      const response = await apiClient.get('/users/me/addresses');
      const isErrorResponse = !response || response.error || response.status >= 400;

      if (isErrorResponse) {
        throw new Error(response?.message || 'Unable to load addresses.');
      }

      const addressList = Array.isArray(response?.data) ? response.data : [];
      setAddresses(addressList);
      setAddressStatus('ready');

      if (addressList.length === 0) {
        setSelectedAddressId(null);
        return;
      }

      const preferredMatch = preferredId && addressList.find((address) => address.id === preferredId);
      const currentMatch = selectedAddressId && addressList.find((address) => address.id === selectedAddressId);
      const nextSelected = preferredMatch?.id ?? currentMatch?.id ?? addressList[0].id;
      setSelectedAddressId(nextSelected);
    } catch (error) {
      setAddressStatus('error');
      setAddresses([]);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  useEffect(() => {
    const storedItems = readCartItems();
    setCartItems(Array.isArray(storedItems) ? storedItems : []);
  }, []);

  /**
   * @description: Updates the current payment method selection.
   * @param {import('../features/checkout/types').CheckoutPaymentMethod} method - Example: "Cash"
   * @returns {void} - payment method updated
   */
  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  /**
   * @description: Opens the address modal for creating a new address.
   * @flow: Click add -> Open modal.
   */
  const handleOpenAddressModal = () => {
    addressModal.open();
  };

  /**
   * @description: Creates a new address and refreshes the address list.
   * @param {import('../features/checkout/types').CheckoutAddressFormValues} values - Example: { receiver: "Jane" }
   * @returns {Promise<void>} - address created and list refreshed
   */
  const handleCreateAddress = async (values) => {
    setAddressSaveStatus('saving');

    try {
      const response = await apiClient.post('/users/me/addresses', values);
      const isErrorResponse = !response || response.error || response.status >= 400;

      if (isErrorResponse) {
        throw new Error(response?.message || 'Unable to save address.');
      }

      const createdId = response?.data?.id ?? null;
      await loadAddresses(createdId);
      addressModal.close();
      setAddressSaveStatus('idle');
      setToastMessage(response?.message || 'Address added successfully.');
      setToastVariant('success');
    } catch (error) {
      setAddressSaveStatus('error');
      setToastMessage(error?.message || 'Unable to save address.');
      setToastVariant('error');
    }
  };

  /**
   * @description: Submits the invoice request based on cart items and selected address.
   * @flow: Validate -> Post /invoices -> Update totals -> Notify user.
   */
  const handleConfirmOrder = async () => {
    if (!selectedAddressId) {
      setToastMessage('Please select a shipping address.');
      setToastVariant('error');
      return;
    }

    const invoiceItems = cartItems
      .filter((item) => Number(item?.quantity) > 0 && item?.volumePerfumeId)
      .map((item) => ({
        volumePerfumeId: item.volumePerfumeId,
        quantity: Number(item.quantity)
      }));

    if (invoiceItems.length === 0) {
      setToastMessage('Your cart is empty.');
      setToastVariant('error');
      return;
    }

    /** @type {import('../features/checkout/types').CheckoutInvoiceRequest} */
    const payload = {
      addressId: selectedAddressId,
      paymentMethod,
      items: invoiceItems
    };

    setCheckoutStatus('loading');

    try {
      const response = await apiClient.post('/invoices', payload);
      const isErrorResponse = !response || response.error || response.status >= 400;

      if (isErrorResponse) {
        throw new Error(response?.message || 'Unable to confirm order.');
      }

      setCheckoutStatus('success');
      setInvoiceTotal(response?.data?.total ?? null);
      setToastMessage(response?.message || 'Order confirmed successfully.');
      setToastVariant('success');

      // Clear cart storage and navigate to order history
      writeCartItems([]);
      setTimeout(() => {
        navigate('/account/orders');
      }, 1500);
    } catch (error) {
      setCheckoutStatus('error');
      setToastMessage(error?.message || 'Unable to confirm order.');
      setToastVariant('error');
    }
  };

  /**
   * @description: Clears the toast message after dismissal.
   * @returns {void} - toast state reset
   */
  const handleToastClose = () => {
    setToastMessage('');
    setToastVariant('info');
  };

  const summaryItems = useMemo(() => {
    return cartItems.map((item) => {
      const volumeValue = item?.volume;
      const volumeLabel = typeof volumeValue === 'number' ? `${volumeValue}ml` : volumeValue || 'Selected volume';
      const detailLabel = `${item?.concentration || 'Eau de Parfum'} • ${volumeLabel}`;
      const priceValue = Number(item?.price ?? 0) * (Number(item?.quantity) || 0);

      return {
        name: item?.name || 'Perfume Item',
        detail: detailLabel,
        dataAlt: item?.dataAlt || 'Perfume product image',
        image: item?.image || '',
        price: formatCurrency(priceValue)
      };
    });
  }, [cartItems]);

  const subtotalValue = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const priceValue = Number(item?.price ?? 0);
      const quantity = Number(item?.quantity ?? 0);
      return total + priceValue * quantity;
    }, 0);
  }, [cartItems]);

  const totalValue = invoiceTotal ?? subtotalValue;
  const formattedSubtotal = formatCurrency(subtotalValue);
  const formattedTotal = formatCurrency(totalValue);
  const isCheckoutDisabled = checkoutStatus === 'loading' || cartItems.length === 0 || !selectedAddressId;
  const isSavingAddress = addressSaveStatus === 'saving';

  return (
    <div className="pt-20 pb-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-12">
        <h1 className="font-headline text-4xl text-on-background">Checkout</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-7 space-y-16">
          <ShippingSelection
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            status={addressStatus}
            onAddNew={handleOpenAddressModal}
            onSelectAddress={setSelectedAddressId}
          />
          <PaymentMethods selectedMethod={paymentMethod} onSelectMethod={handlePaymentChange} />
        </div>
        <div className="lg:col-span-5">
          <OrderSummary
            items={summaryItems}
            subtotal={formattedSubtotal}
            total={formattedTotal}
            isProcessing={checkoutStatus === 'loading'}
            isDisabled={isCheckoutDisabled}
            onConfirm={handleConfirmOrder}
          />
        </div>
      </div>

      <AddressModal
        isOpen={addressModal.isOpen}
        isSaving={isSavingAddress}
        onClose={addressModal.close}
        onSubmit={handleCreateAddress}
      />
      <ToastNotification
        autoHideDuration={4000}
        isOpen={Boolean(toastMessage)}
        message={toastMessage}
        onClose={handleToastClose}
        variant={toastVariant}
      />
    </div>
  );
}

export default CheckoutPage;