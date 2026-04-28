import React from 'react';

function ShopFilters() {
  return (
    <aside className="w-full hidden lg:block lg:w-72 flex-shrink-0 bg-surface-container-low p-8 lg:top-[160px] rounded-[2rem]">
      <div className="mb-12">
        <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6 border-b border-outline-variant/30 pb-3">GENDER</h3>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-4 cursor-pointer group"><div className="w-4 h-4 border border-outline-variant/30 flex items-center justify-center group-hover:border-primary transition-colors rounded-full"></div><span className="font-body text-sm text-on-surface-variant group-hover:text-primary transition-colors">Men</span></label>
          <label className="flex items-center gap-4 cursor-pointer group"><div className="w-4 h-4 border border-outline-variant/30 flex items-center justify-center group-hover:border-primary transition-colors rounded-full"></div><span className="font-body text-sm text-on-surface-variant group-hover:text-primary transition-colors">Women</span></label>
          <label className="flex items-center gap-4 cursor-pointer group"><div className="w-4 h-4 border border-outline-variant/30 flex items-center justify-center group-hover:border-primary transition-colors rounded-full"></div><span className="font-body text-sm text-on-surface-variant group-hover:text-primary transition-colors">Unisex</span></label>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6 border-b border-outline-variant/30 pb-3">BRAND</h3>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-4 cursor-pointer group"><div className="w-4 h-4 border border-outline-variant/30 flex items-center justify-center group-hover:border-primary transition-colors rounded-full"></div><span className="font-body text-sm text-on-surface-variant group-hover:text-primary transition-colors">Chanel</span></label>
          <label className="flex items-center gap-4 cursor-pointer group"><div className="w-4 h-4 border border-outline-variant/30 flex items-center justify-center group-hover:border-primary transition-colors rounded-full"></div><span className="font-body text-sm text-on-surface-variant group-hover:text-primary transition-colors">Dior</span></label>
          <label className="flex items-center gap-4 cursor-pointer group"><div className="w-4 h-4 border border-outline-variant/30 flex items-center justify-center group-hover:border-primary transition-colors rounded-full"></div><span className="font-body text-sm text-on-surface-variant group-hover:text-primary transition-colors">Tom Ford</span></label>
          <label className="flex items-center gap-4 cursor-pointer group"><div className="w-4 h-4 border border-outline-variant/30 flex items-center justify-center group-hover:border-primary transition-colors rounded-full"></div><span className="font-body text-sm text-on-surface-variant group-hover:text-primary transition-colors">Creed</span></label>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6 border-b border-outline-variant/30 pb-3">PRICE RANGE</h3>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <input className="w-full bg-transparent border border-outline-variant/30 px-3 py-2 text-[10px] font-label uppercase tracking-widest focus:ring-0 focus:border-primary transition-colors rounded-[2rem]" placeholder="FROM" type="text" />
            <span className="text-outline-variant">-</span>
            <input className="w-full bg-transparent border border-outline-variant/30 px-3 py-2 text-[10px] font-label uppercase tracking-widest focus:ring-0 focus:border-primary transition-colors rounded-[2rem]" placeholder="TO" type="text" />
          </div>
          <button className="w-full py-3 text-center bg-primary text-white font-label text-[10px] uppercase tracking-[0.2em] hover:bg-opacity-80 transition-all rounded-[2rem]" type="button">APPLY</button>
        </div>
      </div>
      <button className="w-full py-4 text-center border border-outline-variant/30 text-on-surface font-label text-xs uppercase tracking-[0.2em] hover:bg-surface-container-high transition-colors mt-4 rounded-[2rem]" type="button">CLEAR FILTERS</button>
    </aside>
  );
}

export default ShopFilters;
