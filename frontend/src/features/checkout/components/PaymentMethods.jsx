import React from 'react';

function PaymentMethods() {
  return (
    <section>
      <h2 className="font-headline text-2xl text-on-background mb-8 pb-4 border-b border-outline-variant/30">Payment Method</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label className="relative cursor-pointer">
          <input defaultChecked className="peer sr-only" name="payment_method" readOnly type="radio" />
          <div className="bg-surface-container-lowest rounded-[40px] p-6 ghost-border border-2 peer-checked:border-accent transition-colors duration-300 flex flex-col items-center justify-center text-center gap-4 h-full">
            <span className="material-symbols-outlined text-4xl text-on-surface" style={{ fontVariationSettings: "'FILL' 0" }}>payments</span>
            <span className="font-label text-sm uppercase tracking-[0.1em] text-on-background">Cash on Delivery</span>
          </div>
          <div className="absolute top-4 right-4 text-accent opacity-0 peer-checked:opacity-100 transition-opacity">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
        </label>
        <label className="relative cursor-pointer">
          <input className="peer sr-only" name="payment_method" type="radio" />
          <div className="bg-surface-container-lowest rounded-[40px] p-6 ghost-border border-2 peer-checked:border-accent transition-colors duration-300 flex flex-col items-center justify-center text-center gap-4 h-full">
            <span className="material-symbols-outlined text-4xl text-on-surface" style={{ fontVariationSettings: "'FILL' 0" }}>account_balance</span>
            <span className="font-label text-sm uppercase tracking-[0.1em] text-on-background">Bank Transfer</span>
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
