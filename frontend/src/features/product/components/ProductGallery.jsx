import React from 'react';

function ProductGallery({ image, thumbnails = [] }) {
  return (
    <div>
      <div className="relative bg-surface-container-low h-[716px] md:h-[800px] w-full flex items-center justify-center p-8 md:p-16 rounded-[2.5rem] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-surface-variant/20 to-transparent pointer-events-none"></div>
        <img alt="Luxury Perfume Bottle" className="max-w-full max-h-full object-contain mix-blend-multiply relative z-10 drop-shadow-[0_20px_40px_rgba(25,28,29,0.1)]" data-alt="Primary product image" src={image} />
      </div>
      <div className="flex gap-4 justify-center px-2">
        {thumbnails.map((thumb, i) => (
          <button key={i} className={thumb.isActive ? 'w-24 h-24 bg-surface-container-low border-2 border-primary rounded-2xl flex items-center justify-center p-2 transition-all' : 'w-24 h-24 bg-surface-container-low border-2 border-transparent hover:border-outline-variant rounded-2xl flex items-center justify-center p-2 transition-all opacity-70 hover:opacity-100'} type="button">
            <img alt={thumb.alt} className="w-full h-full object-contain mix-blend-multiply" src={image} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
