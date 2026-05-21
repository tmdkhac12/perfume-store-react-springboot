import { useState, useEffect } from 'react';
import { apiClient } from '../services/apiClient.js';
import { useModal } from '../hooks/index.js';
import {
  AccountPageHeader,
  OrderDetailsModal,
  OrderHistoryList
} from '../features/userAccount/components/index.js';

function AccountOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const orderDetailsModal = useModal();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get('/users/me/invoices');
        if (response.status === 200) {
          setOrders(response.data.content);
        } else {
          setError(response.message || 'Failed to fetch orders');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleViewDetails = (orderId) => {
    setSelectedOrderId(orderId);
    orderDetailsModal.open();
  };

  return (
    <>
      <AccountPageHeader description="View and manage your past purchases." title="Order History" />

      {loading ? (
        <div className="text-center">Loading orders...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <OrderHistoryList onViewDetails={handleViewDetails} orders={orders} />
      )}

      <OrderDetailsModal
        isOpen={orderDetailsModal.isOpen}
        onClose={orderDetailsModal.close}
        orderId={selectedOrderId}
      />
    </>
  );
}

export default AccountOrdersPage;
