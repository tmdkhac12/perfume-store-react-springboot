import React from 'react';

function ShippingSelection({ onAddNew }) {
  return (
    <section>
      <h2 className="font-headline text-2xl text-on-background mb-8 pb-4 border-b border-outline-variant/30">Shipping Information</h2>
      <div className="space-y-6">
        <div>
          <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3">Select Saved Address</label>
          <div className="relative group cursor-pointer">
            <div className="w-full bg-surface-container-lowest border-2 border-outline-variant/50 py-4 px-6 rounded-[40px] text-on-surface font-body hover:border-accent transition-all duration-300 flex justify-between items-center min-h-[80px]">
              <div className="flex flex-col gap-1">
                <span className="font-headline font-semibold text-base text-on-background">Home</span>
                <span className="font-body text-sm text-on-surface-variant">John Doe • +1 (555) 000-0000</span>
                <span className="font-body text-sm text-on-surface-variant">123 Perfume Lane, Apt 4B, Manhattan, New York</span>
              </div>
              <div className="text-on-surface-variant flex items-center">
                <span className="material-symbols-outlined transition-transform group-hover:rotate-180" style={{ fontVariationSettings: "'FILL' 0" }}>
                  expand_more
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 py-4">
          <div className="flex-grow border-t border-outline-variant/30"></div>
          <span className="font-label text-xs uppercase tracking-[0.1em] text-on-surface-variant">OR</span>
          <div className="flex-grow border-t border-outline-variant/30"></div>
        </div>
        <button className="w-full bg-accent text-on-primary font-label text-sm uppercase tracking-[0.1em] py-4 rounded-[40px] hover:bg-black transition-colors duration-300 flex items-center justify-center gap-2" onClick={onAddNew} type="button">
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>add</span>
          Add New Address
        </button>
      </div>
    </section>
  );
}

export default ShippingSelection;
