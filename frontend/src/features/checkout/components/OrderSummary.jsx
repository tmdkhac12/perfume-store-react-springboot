import React from 'react';

/** @description: Checkout summary panel with order totals and confirmation. */
function OrderSummary({
  items = [],
  subtotal = '$0.00',
  shipping = '$0.00',
  tax = '$0.00',
  total = '$0.00',
  isProcessing = false,
  isDisabled = false,
  onConfirm
}) {
  const safeItems = Array.isArray(items) ? items : [];
  const hasItems = safeItems.length > 0;

  return (
    <div className="bg-surface-container-low rounded-[40px] p-8 sticky top-32">
      <h2 className="font-headline text-2xl text-on-background mb-8">Order Summary</h2>
      <div className="space-y-6 mb-8">
        {hasItems ? (
          safeItems.map((item) => (
            <div key={`${item.name}-${item.detail}`} className="flex gap-4">
              <div className="w-20 h-24 bg-surface-container-lowest rounded-xl overflow-hidden flex-shrink-0">
                <img alt={item.name} className="w-full h-full object-cover" data-alt={item.dataAlt} src={item.image} />
              </div>
              <div className="flex-grow flex flex-col justify-center">
                <h3 className="font-headline text-lg text-on-background">{item.name}</h3>
                <p className="font-body text-sm text-on-surface-variant mt-1">{item.detail}</p>
                <p className="font-body font-medium text-on-background mt-2">{item.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="font-body text-sm text-on-surface-variant">Your cart is empty.</p>
        )}
      </div>
      <div className="space-y-4 font-body text-sm border-t border-outline-variant/30 pt-6 mb-8">
        <div className="flex justify-between text-on-surface-variant">
          <span>Subtotal</span>
          <span>{subtotal}</span>
        </div>
        <div className="flex justify-between text-on-surface-variant">
          <span>Shipping</span>
          <span>{shipping}</span>
        </div>
        <div className="flex justify-between text-on-surface-variant">
          <span>Estimated Tax</span>
          <span>{tax}</span>
        </div>
      </div>
      <div className="flex justify-between items-center font-headline text-xl text-on-background mb-8 pt-6 border-t border-outline-variant/30">
        <span>Total</span>
        <span>{total}</span>
      </div>
      <button
        className="w-full bg-accent text-on-primary font-label text-sm uppercase tracking-[0.1em] py-5 rounded-[40px] hover:bg-black transition-colors duration-300 inline-flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-60"
        type="button"
        onClick={onConfirm}
        disabled={isDisabled || isProcessing || !hasItems}
      >
        {isProcessing ? 'Processing...' : 'Confirm Order'}
      </button>
      <p className="text-center font-body text-xs text-on-surface-variant mt-4">By confirming, you agree to our Terms of Service.</p>
    </div>
  );
}

export default OrderSummary;
