import React from 'react';

function VolumeSelector() {
  return (
    <div className="mb-12">
      <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-4">Volume</h3>
      <div className="flex gap-4">
        <button className="flex-1 py-3 border border-primary bg-primary text-on-primary font-label text-xs uppercase tracking-widest transition-colors rounded-full" type="button">50 ML</button>
        <button className="flex-1 py-3 border border-outline-variant text-on-surface-variant font-label text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-colors rounded-full" type="button">100 ML</button>
        <button className="flex-1 py-3 border border-outline-variant text-on-surface-variant font-label text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-colors rounded-full" type="button">250 ML</button>
      </div>
    </div>
  );
}

export default VolumeSelector;
