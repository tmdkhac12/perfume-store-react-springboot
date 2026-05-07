import React, { useEffect, useState } from 'react';

/**
 * @description: Resolves the initial active thumbnail index so the gallery can highlight the best default image.
 * @param {import('../types').ProductThumbnail[]} thumbnails - Example: [{ src: "https://.../img1.jpg", isActive: true }]
 * @returns {number} index - Example: 0
 */
const resolveInitialIndex = (thumbnails = []) => {
  if (!Array.isArray(thumbnails) || thumbnails.length === 0) {
    return 0;
  }

  const activeIndex = thumbnails.findIndex((thumb) => thumb?.isActive);
  return activeIndex >= 0 ? activeIndex : 0;
};

/** @description: Product gallery component that swaps the main image based on thumbnail selection. */
function ProductGallery({ image, thumbnails = [] }) {
  const basePrimary = image || thumbnails[0]?.src || '';
  const fallbackThumbnails = basePrimary ? [{ src: basePrimary, alt: 'Primary view', isActive: true }] : [];
  const safeThumbnails = thumbnails.length > 0 ? thumbnails : fallbackThumbnails;
  const thumbnailsKey = safeThumbnails.map((thumb) => thumb.src).join('|');

  const [activeIndex, setActiveIndex] = useState(() => resolveInitialIndex(safeThumbnails));

  useEffect(() => {
    setActiveIndex(resolveInitialIndex(safeThumbnails));
  }, [thumbnailsKey]);

  /**
   * @description: Updates the active thumbnail so the primary image matches user selection.
   * @flow: Click thumbnail -> Update active index -> Render selected image.
   */
  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  const primaryImage = safeThumbnails[activeIndex]?.src || basePrimary;

  return (
    <div>
      <div className="relative bg-surface-container-low h-[716px] md:h-[800px] w-full flex items-center justify-center p-8 md:p-16 rounded-[2.5rem] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-surface-variant/20 to-transparent pointer-events-none"></div>
        <img alt="Luxury Perfume Bottle" className="max-w-full max-h-full object-contain mix-blend-multiply relative z-10 drop-shadow-[0_20px_40px_rgba(25,28,29,0.1)]" data-alt="Primary product image" src={primaryImage} />
      </div>
      <div className="flex gap-4 justify-center px-2">
        {safeThumbnails.map((thumb, i) => (
          <button
            key={i}
            className={i === activeIndex ? 'w-24 h-24 bg-surface-container-low border-2 border-primary rounded-2xl flex items-center justify-center p-2 transition-all' : 'w-24 h-24 bg-surface-container-low border-2 border-transparent hover:border-outline-variant rounded-2xl flex items-center justify-center p-2 transition-all opacity-70 hover:opacity-100'}
            type="button"
            onClick={() => handleThumbnailClick(i)}
          >
            <img alt={thumb.alt} className="w-full h-full object-contain mix-blend-multiply" src={thumb.src || primaryImage} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
