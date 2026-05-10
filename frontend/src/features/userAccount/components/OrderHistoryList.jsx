import OrderHistoryCard from './OrderHistoryCard.jsx';

function OrderHistoryList({ orders, onViewDetails }) {
  return (
    <div className="flex flex-col gap-6">
      {orders.map((order) => (
        <OrderHistoryCard 
          key={order.id} 
          onViewDetails={() => onViewDetails(order.id)} 
          order={order} 
        />
      ))}
    </div>
  );
}

export default OrderHistoryList;