import { useEffect, useState } from 'react';
import { AddressFormModal, ToastNotification } from '../components/base';
import { apiClient } from '../services/index.js';
import { useModal } from '../hooks/index.js';
import {
  AddressDeleteModal,
  SavedAddressGrid,
  SavedAddressHeader
} from '../features/userAccount/components/index.js';

/** @typedef {import('../features/userAccount/types').AddressFormValues} AddressFormValues */
/** @typedef {import('../features/userAccount/types').AddressItem} AddressItem */

/** @description: Account address page that loads, creates, updates, and deletes saved addresses. */
function AccountAddressPage() {
  const addressModal = useModal();
  const deleteModal = useModal();
  const [addresses, setAddresses] = useState([]);
  const [saveStatus, setSaveStatus] = useState('idle');
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('info');

  /**
   * @description: Normalizes backend address data into the UI shape.
   * @param {Object} address - Example: { id: 1, receiver: "Jane", phoneNumber: "123" }
   * @param {number} index - Example: 0
   * @returns {AddressItem} item - Example: { id: 1, receiver: "Jane", ... }
   */
  const mapAddressResponse = (address, index) => ({
    id: address?.id ?? index + 1,
    receiver: address?.receiver || '',
    phoneNumber: address?.phoneNumber || '',
    cityName: address?.cityName || '',
    wardName: address?.wardName || '',
    deliveryAddress: address?.deliveryAddress || ''
  });

  /**
   * @description: Loads the saved address list from the backend.
   * @flow: GET /users/me/addresses -> Normalize data -> Update list state.
   */
  const loadAddresses = async () => {
    try {
      const response = await apiClient.get('/users/me/addresses');
      const isErrorResponse = !response || response.error || response.status >= 400;

      if (isErrorResponse) {
        throw new Error(response?.message || 'Unable to load addresses.');
      }

      const addressList = Array.isArray(response?.data) ? response.data : [];
      setAddresses(addressList.map(mapAddressResponse));
    } catch (error) {
      setAddresses([]);
    }
  };

  useEffect(() => {
    void loadAddresses();
  }, []);

  /**
   * @description: Updates the toast notification content and style.
   * @param {string} message - Example: "Address saved successfully."
   * @param {'success' | 'error' | 'info'} variant - Example: "success"
   * @returns {void} - toast message and variant updated
   */
  const showToast = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
  };

  /**
   * @description: Creates a new address on the backend and refreshes the list.
   * @param {AddressFormValues} values - Example: { receiver: "Jane", phoneNumber: "123" }
   * @returns {Promise<void>}
   */
  const handleCreateAddress = async (values) => {
    setSaveStatus('saving');

    try {
      const response = await apiClient.post('/users/me/addresses', values);
      const isErrorResponse = !response || response.error || response.status >= 400;

      if (isErrorResponse) {
        throw new Error(response?.message || 'Unable to save address.');
      }

      await loadAddresses();
      addressModal.close();
      setSaveStatus('idle');
      showToast(response?.message || 'Address created successfully.', 'success');
    } catch (error) {
      setSaveStatus('error');
      showToast(error?.message || 'Unable to save address.', 'error');
      console.error(error);
    }
  };

  /**
   * @description: Updates an existing address on the backend and refreshes the list.
   * @param {number} addressId - Example: 3
   * @param {AddressFormValues} values - Example: { receiver: "Jane", phoneNumber: "123" }
   * @returns {Promise<void>}
   */
  const handleUpdateAddress = async (addressId, values) => {
    if (!addressId) {
      return;
    }

    setSaveStatus('saving');

    try {
      const response = await apiClient.put(`/users/me/addresses/${addressId}`, values);
      const isErrorResponse = !response || response.error || response.status >= 400;

      if (isErrorResponse) {
        throw new Error(response?.message || 'Unable to update address.');
      }

      await loadAddresses();
      addressModal.close();
      setSaveStatus('idle');
      showToast(response?.message || 'Address updated successfully.', 'success');
    } catch (error) {
      setSaveStatus('error');
      showToast(error?.message || 'Unable to update address.', 'error');
      console.error(error);
    }
  };

  /**
   * @description: Deletes an address on the backend and refreshes the list.
   * @param {number} addressId - Example: 3
   * @returns {Promise<void>}
   */
  const handleDeleteAddress = async (addressId) => {
    if (!addressId) {
      return;
    }

    try {
      const response = await apiClient.patch(`/users/me/addresses/${addressId}`);
      const isErrorResponse = !response || response.error || response.status >= 400;

      if (isErrorResponse) {
        throw new Error(response?.message || 'Unable to delete address.');
      }

      await loadAddresses();
      showToast(response?.message || 'Address deleted successfully.', 'success');
    } catch (error) {
      showToast(error?.message || 'Unable to delete address.', 'error');
      console.error(error);
    }
  };

  /**
   * @description: Resets the toast notification after dismissal.
   * @returns {void} - toast message cleared
   */
  const handleToastClose = () => {
    setToastMessage('');
    setToastVariant('info');
  };

  const editingAddress = addressModal.payload?.mode === 'edit' ? addressModal.payload.address : null;
  const isEditing = Boolean(editingAddress);
  const isSaving = saveStatus === 'saving';
  const deleteAddressId = deleteModal.payload?.address?.id;

  return (
    <>
      <SavedAddressHeader onAddAddress={() => addressModal.open({ mode: 'create' })} />

      <SavedAddressGrid
        addresses={addresses}
        onDeleteAddress={(address) => deleteModal.open({ address })}
        onEditAddress={(address) => addressModal.open({ mode: 'edit', address })}
      />

      <AddressFormModal
        initialData={editingAddress}
        isOpen={addressModal.isOpen}
        isSaving={isSaving}
        onClose={addressModal.close}
        onSubmit={isEditing ? (values) => handleUpdateAddress(editingAddress.id, values) : handleCreateAddress}
      />

      <AddressDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={() => handleDeleteAddress(deleteAddressId)}
      />

      <ToastNotification
        autoHideDuration={4000}
        isOpen={Boolean(toastMessage)}
        message={toastMessage}
        onClose={handleToastClose}
        variant={toastVariant}
      />
    </>
  );
}

export default AccountAddressPage;
