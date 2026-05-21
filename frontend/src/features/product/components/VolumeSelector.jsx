import React from 'react';

/**
 * @description: Formats a volume value into a consistent uppercase label for volume buttons.
 * @param {number} value - Example: 50
 * @returns {string} label - Example: "50 ML"
 */
const formatVolumeLabel = (value) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) {
    return 'N/A';
  }

  const normalized = Number(value);
  const display = Number.isInteger(normalized) ? normalized : normalized.toFixed(0);

  return `${display} ML`;
};

/** @description: Displays selectable volume options based on API data and highlights the chosen volume. */
function VolumeSelector({ volumes = [], selectedVolume, onSelectVolume }) {
  const safeVolumes = Array.isArray(volumes) ? volumes : [];

  return (
    <div className="mb-12">
      <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-4">
        Volume
      </h3>
      {safeVolumes.length === 0 ? (
        <p className="font-body text-xs text-on-surface-variant">Volume options unavailable.</p>
      ) : (
        <div className="flex gap-4">
          {safeVolumes.map((item) => {
            const isActive = selectedVolume?.volume === item.volume;
            const buttonClass = isActive
              ? 'w-24 py-3 border border-primary bg-primary text-on-primary font-label text-xs uppercase tracking-widest transition-colors rounded-full'
              : 'w-24 py-3 border border-outline-variant text-on-surface-variant font-label text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-colors rounded-full';

            return (
              <button
                key={`${item.volume}-${item.price}`}
                className={buttonClass}
                type="button"
                onClick={() => onSelectVolume?.(item)}
              >
                {formatVolumeLabel(item.volume)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default VolumeSelector;
