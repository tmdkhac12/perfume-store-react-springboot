import React from 'react';

/** @description: Summary panel for cart totals and checkout action. */
function CartSummary({ subtotal = '$0.00', total = '$0.00', itemCount = 0 }) {
  return (
    <div className="bg-surface-container-low p-8 sticky top-32 rounded-[2rem]">
      <h2 className="font-headline text-xl mb-8 text-on-background border-b border-outline-variant/30 pb-4">
        Summary
      </h2>
      <div className="flex flex-col gap-4 font-body text-sm text-on-surface-variant mb-8">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-on-background">{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-on-background">$0</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span className="text-on-background">$0</span>
        </div>
      </div>
      <div className="flex justify-between items-end mb-10 border-t border-outline-variant/30 pt-6">
        <span className="font-headline text-lg text-on-background">Total</span>
        <span className="font-headline text-2xl text-on-background">{total}</span>
      </div>
      <a
        className="w-full bg-primary text-on-primary py-5 font-label uppercase tracking-[0.2em] text-[10px] hover:bg-secondary transition-colors duration-300 rounded-[2rem] inline-flex items-center justify-center"
        href="/checkout"
      >
        Proceed to Checkout
      </a>
      <p className="font-body text-xs text-on-surface-variant text-center mt-6">
        {itemCount > 0
          ? 'Complimentary shipping on orders over $250.'
          : 'Add items to unlock checkout.'}
      </p>
    </div>
  );
}

export default CartSummary;
