import OrderHistoryCard from './OrderHistoryCard.jsx';

/** 
 * @description: Renders a list of order cards or a message if no orders exist.
 * @param {import('../types').Order[]} orders - List of user orders to display.
 * @param {(id: number) => void} onViewDetails - Callback when user wants to see order details.
 */
function OrderHistoryList({ orders, onViewDetails }) {
  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-surface-container-lowest rounded-3xl border border-dashed border-outline-variant">
        <span className="material-symbols-outlined text-4xl text-outline mb-4">history</span>
        <p className="text-on-surface-variant font-body">No order history found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {orders.map((order) => (
        <OrderHistoryCard
          key={order.id}
          onViewDetails={() => onViewDetails?.(order.id)}
          order={order}
        />
      ))}
    </div>
  );
}

export default OrderHistoryList;