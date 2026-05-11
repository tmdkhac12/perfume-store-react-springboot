import { useState, useEffect } from 'react';
import { apiClient } from '../../../services/apiClient.js';

function OrderDetailsModal({ isOpen, onClose, orderId }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && orderId) {
      const fetchOrderDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await apiClient.get(`/invoices/${orderId}`);
          if (response.status === 200) {
            setOrder(response.data);
          } else {
            setError(response.message || 'Failed to fetch order details');
          }
        } catch (err) {
          setError('An unexpected error occurred');
        } finally {
          setLoading(false);
        }
      };
      fetchOrderDetails();
    }
  }, [isOpen, orderId]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-on-background/40 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-surface-container-lowest shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-surface-variant bg-surface-container-lowest px-8 py-6">
          {loading ? (
            <div className="h-12 w-48 animate-pulse rounded bg-surface-container-high" />
          ) : (
            order && (
              <div>
                <h3 className="mb-1 font-headline text-2xl text-on-surface">Order #{order.id}</h3>
                <p className="text-sm text-on-surface-variant">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            )
          )}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        {loading ? (
          <div className="flex h-64 items-center justify-center">Loading...</div>
        ) : error ? (
          <div className="flex h-64 items-center justify-center text-red-500">{error}</div>
        ) : order ? (
          <div className="grid flex-1 gap-8 overflow-y-auto bg-background p-8 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-surface-variant/50 bg-surface-container-lowest p-6 shadow-sm">
                <h5 className="mb-4 border-b border-surface-variant pb-2 text-sm uppercase tracking-wider text-on-surface">
                  Delivery Details
                </h5>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="mb-1 block text-xs text-on-surface-variant">Receiver Name</span>
                    <span className="font-medium text-on-surface">{order.receiverName}</span>
                  </div>
                  <div>
                    <span className="mb-1 block text-xs text-on-surface-variant">Phone Number</span>
                    <span className="text-on-surface">{order.phoneNumber}</span>
                  </div>
                  <div>
                    <span className="mb-1 block text-xs text-on-surface-variant">Shipping Address</span>
                    <span className="text-on-surface">{order.shippingAddress}</span>
                  </div>
                  <div>
                    <span className="mb-1 block text-xs text-on-surface-variant">Delivery Status</span>
                    <span className="mt-1 inline-block rounded-full bg-surface-container-high px-2 py-0.5 text-[10px] uppercase tracking-wider text-on-surface">
                      {order.deliveryStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-surface-variant/50 bg-surface-container-lowest p-6 shadow-sm">
                <h5 className="mb-4 border-b border-surface-variant pb-2 text-sm uppercase tracking-wider text-on-surface">
                  Payment Details
                </h5>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="mb-1 block text-xs text-on-surface-variant">Payment Method</span>
                    <span className="text-on-surface">{order.paymentMethod}</span>
                  </div>
                  <div>
                    <span className="mb-1 block text-xs text-on-surface-variant">Total Amount</span>
                    <span className="font-headline text-lg text-on-surface">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h5 className="mb-2 text-sm uppercase tracking-wider text-on-surface">Order Items</h5>

              {order.invoiceDetails.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-3xl border border-surface-variant/50 bg-surface-container-lowest p-4 shadow-sm"
                >
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-surface-container-low">
                    <img alt={item.perfumeName} className="h-full w-full object-cover" src={item.image} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-headline text-base text-on-surface">{item.perfumeName}</h4>
                    <p className="mt-1 text-xs text-on-surface-variant">{item.volumeName}ml {item.concentration}</p>
                  </div>
                  <div className="text-right">
                    <p className="mb-1 text-xs text-on-surface-variant">Qty: {item.quantity}</p>
                    <p className="font-headline text-base text-on-surface">${item.buyPrice.toFixed(2)}</p>
                  </div>
                </div>
              ))}

              <div className="mt-2 rounded-3xl border border-surface-variant/50 bg-surface-container-lowest p-6 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-on-surface-variant">Subtotal</span>
                  <span className="text-sm text-on-surface">
                    ${order.invoiceDetails.reduce((sum, item) => sum + item.buyPrice * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-on-surface-variant">Shipping</span>
                  <span className="text-sm text-on-surface">$0.00</span>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-on-surface-variant">Tax</span>
                  <span className="text-on-surface">$0.00</span>
                </div>
                <div className="flex items-center justify-between border-t border-surface-variant pt-4">
                  <span className="font-headline text-lg text-on-surface">Total</span>
                  <span className="font-headline text-xl text-on-surface">
                    ${(order.invoiceDetails.reduce((sum, item) => sum + item.buyPrice * item.quantity, 0)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex justify-end border-t border-surface-variant bg-surface-container-lowest px-8 py-6">
          <button
            className="rounded-full border border-transparent bg-black px-8 py-3 text-sm uppercase tracking-wider text-white transition-all duration-300 hover:border-black hover:bg-white hover:text-black"
            onClick={onClose}
            type="button"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsModal;