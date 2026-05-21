import React from 'react';

const genderOptions = [
  { label: 'Men', value: 'Male' },
  { label: 'Women', value: 'Female' },
  { label: 'Unisex', value: 'Unisex' }
];

/**
 * @input: props (object) - Example: { brands: [], searchValue: "", selectedGender: "", onApplyFilters: () => {} }
 * @output: element (JSX.Element) - Example: <aside />
 */
function ShopFilters({
  brands = [],
  brandStatus = 'idle',
  brandError = '',
  searchValue = '',
  selectedGender = '',
  selectedBrand = '',
  priceRange = { from: '', to: '' },
  onSearchChange,
  onGenderChange,
  onBrandChange,
  onPriceChange,
  onApplyFilters,
  onClearFilters
}) {
  const visibleBrands = Array.isArray(brands) ? brands.filter((brand) => !brand.hide) : [];

  return (
    <aside className="w-full hidden lg:block lg:w-72 flex-shrink-0 bg-surface-container-low p-8 lg:top-[160px] rounded-[2rem]">
      <div className="mb-12">
        <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6 border-b border-outline-variant/30 pb-3">
          SEARCH
        </h3>
        <input
          className="w-full bg-transparent border border-outline-variant px-4 py-3 text-xs font-body text-on-surface-variant focus:ring-0 focus:border-primary transition-colors rounded-[2rem]"
          placeholder="Search by name"
          type="search"
          value={searchValue}
          onChange={(event) => onSearchChange?.(event.target.value)}
        />
      </div>
      <div className="mb-12">
        <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6 border-b border-outline-variant/30 pb-3">
          GENDER
        </h3>
        <div className="flex flex-col gap-4">
          {genderOptions.map((option) => {
            const isActive = selectedGender === option.value;

            return (
              <button
                key={option.value}
                className="flex items-center gap-4 cursor-pointer group text-left"
                type="button"
                aria-pressed={isActive}
                onClick={() => onGenderChange?.(option.value)}
              >
                <span
                  className={`w-4 h-4 border flex items-center justify-center transition-colors rounded-full ${isActive ? 'border-primary' : 'border-outline-variant group-hover:border-primary'}`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-primary' : ''}`}></span>
                </span>
                <span
                  className={`font-body text-sm transition-colors ${isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mb-12">
        <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6 border-b border-outline-variant/30 pb-3">
          BRAND
        </h3>
        <div className="flex flex-col gap-4">
          {brandStatus === 'loading' && (
            <span className="font-body text-sm text-on-surface-variant">Loading brands...</span>
          )}
          {brandStatus === 'error' && (
            <span className="font-body text-sm text-on-surface-variant">
              {brandError || 'Unable to load brands.'}
            </span>
          )}
          {brandStatus === 'success' && visibleBrands.length === 0 && (
            <span className="font-body text-sm text-on-surface-variant">No brands available.</span>
          )}
          {brandStatus === 'success' &&
            visibleBrands.length > 0 &&
            visibleBrands.map((brand) => {
              const isActive = selectedBrand === brand.name;

              return (
                <button
                  key={brand.id ?? brand.name}
                  className="flex items-center gap-4 cursor-pointer group text-left"
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onBrandChange?.(brand.name)}
                >
                  <span
                    className={`w-4 h-4 border flex items-center justify-center transition-colors rounded-full ${isActive ? 'border-primary' : 'border-outline-variant group-hover:border-primary'}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-primary' : ''}`}></span>
                  </span>
                  <span
                    className={`font-body text-sm transition-colors ${isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}
                  >
                    {brand.name}
                  </span>
                </button>
              );
            })}
        </div>
      </div>
      <div className="mb-12">
        <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6 border-b border-outline-variant/30 pb-3">
          PRICE RANGE
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <input
              className="w-full bg-transparent border border-outline-variant px-3 py-2 text-[10px] font-label uppercase tracking-widest focus:ring-0 focus:border-primary transition-colors rounded-[2rem]"
              placeholder="FROM"
              type="text"
              inputMode="decimal"
              value={priceRange.from}
              onChange={(event) => onPriceChange?.('fromPrice', event.target.value)}
            />
            <span className="text-outline-variant">-</span>
            <input
              className="w-full bg-transparent border border-outline-variant px-3 py-2 text-[10px] font-label uppercase tracking-widest focus:ring-0 focus:border-primary transition-colors rounded-[2rem]"
              placeholder="TO"
              type="text"
              inputMode="decimal"
              value={priceRange.to}
              onChange={(event) => onPriceChange?.('toPrice', event.target.value)}
            />
          </div>
          <button
            className="w-full py-3 text-center bg-primary text-white font-label text-[10px] uppercase tracking-[0.2em] hover:bg-opacity-80 transition-all rounded-[2rem]"
            type="button"
            onClick={onApplyFilters}
          >
            APPLY
          </button>
        </div>
      </div>
      <button
        className="w-full py-4 text-center border border-outline-variant/30 text-on-surface font-label text-xs uppercase tracking-[0.2em] hover:bg-surface-container-high transition-colors mt-4 rounded-[2rem]"
        type="button"
        onClick={onClearFilters}
      >
        CLEAR FILTERS
      </button>
    </aside>
  );
}

export default ShopFilters;
