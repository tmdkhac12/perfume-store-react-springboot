import React from 'react';

/** @description: Payment method selection grid for checkout. */
function PaymentMethods({ selectedMethod = 'Cash', onSelectMethod }) {
  /**
   * @description: Updates the selected payment method.
   * @param {import('../types').CheckoutPaymentMethod} method - Example: "Cash"
   * @returns {void} - payment method updated
   */
  const handleSelect = (method) => {
    onSelectMethod?.(method);
  };

  return (
    <section>
      <h2 className="font-headline text-2xl text-on-background mb-8 pb-4 border-b border-outline-variant/30">Payment Method</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label className="relative cursor-pointer">
          <input
            checked={selectedMethod === 'Cash'}
            className="peer sr-only"
            name="payment_method"
            type="radio"
            onChange={() => handleSelect('Cash')}
          />
          <div className="bg-surface-container-lowest rounded-[40px] p-6 ghost-border border-2 peer-checked:border-accent transition-colors duration-300 flex flex-col items-center justify-center text-center gap-4 h-full">
            <span className="material-symbols-outlined text-4xl text-on-surface" style={{ fontVariationSettings: "'FILL' 0" }}>payments</span>
            <span className="font-label text-sm uppercase tracking-[0.1em] text-on-background">Cash</span>
          </div>
          <div className="absolute top-4 right-4 text-accent opacity-0 peer-checked:opacity-100 transition-opacity">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
        </label>
        <label className="relative cursor-pointer">
          <input
            checked={selectedMethod === 'Transfer'}
            className="peer sr-only"
            name="payment_method"
            type="radio"
            onChange={() => handleSelect('Transfer')}
          />
          <div className="bg-surface-container-lowest rounded-[40px] p-6 ghost-border border-2 peer-checked:border-accent transition-colors duration-300 flex flex-col items-center justify-center text-center gap-4 h-full">
            <span className="material-symbols-outlined text-4xl text-on-surface" style={{ fontVariationSettings: "'FILL' 0" }}>account_balance</span>
            <span className="font-label text-sm uppercase tracking-[0.1em] text-on-background">Transfer</span>
          </div>
          <div className="absolute top-4 right-4 text-accent opacity-0 peer-checked:opacity-100 transition-opacity">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
        </label>
      </div>
    </section>
  );
}

export default PaymentMethods;
