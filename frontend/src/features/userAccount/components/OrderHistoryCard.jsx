function OrderHistoryCard({ order, onViewDetails }) {
  return (
    <article className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-surface-variant/30 bg-surface-container-lowest p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] md:flex-row md:items-center">
      <div className="flex-1">
        <div className="mb-2 flex items-center gap-4">
          <span className="text-sm uppercase tracking-wider text-on-surface-variant">ORDER #{order.id}</span>
          <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-wider bg-surface-container-high text-on-surface">
            {order.deliveryStatus}
          </span>
        </div>
        <p className="mb-1 text-base text-on-surface">{new Date(order.createdAt).toLocaleDateString()}</p>
        <p className="font-headline text-xl text-on-surface">${order.total.toFixed(2)}</p>
      </div>

      <div className="mr-8 hidden items-center -space-x-3 sm:flex">
        {order.itemPreviews.map((imageSrc, index) => (
          <div key={`${order.id}-${index}`} className="h-12 w-12 overflow-hidden rounded-xl border-2 border-white bg-surface-container-low">
            <img alt="Product thumbnail" className="h-full w-full object-cover" src={imageSrc} />
          </div>
        ))}
        {order.totalItems > order.itemPreviews.length ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white bg-zinc-200">
            <span className="text-[10px] font-bold text-zinc-600">+{order.totalItems - order.itemPreviews.length}</span>
          </div>
        ) : null}
      </div>

      <div className="relative w-full md:w-auto">
        <button
          className="w-full rounded-full border border-transparent bg-black px-8 py-3 text-sm uppercase tracking-wider text-white transition-all duration-300 hover:border-black hover:bg-white hover:text-black md:w-auto"
          onClick={onViewDetails}
          type="button"
        >
          View Details
        </button>
      </div>
    </article>
  );
}

export default OrderHistoryCard;