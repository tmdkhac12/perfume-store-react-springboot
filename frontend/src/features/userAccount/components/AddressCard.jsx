import React from 'react';

/** @typedef {import('../types').AddressItem} AddressItem */

/** @description: Address card for a single saved location. */
function AddressCard({
  address,
  onEdit,
  onDelete
}) {
  const { receiver, phone, city, district, street } = address;

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-surface-container-low p-8 transition-colors hover:bg-surface-container-lowest">
      {/* Header section with icon and status */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-on-surface-variant">
            location_on
          </span>
          <h3 className="text-xs uppercase tracking-widest text-on-surface-variant">
            Saved Address
          </h3>
        </div>
      </div>

      {/* Address Details */}
      <div className="mb-8 space-y-2">
        <p className="font-headline text-xl text-on-background">{receiver}</p>
        <p className="text-on-surface-variant">{phone}</p>
        <p className="leading-relaxed text-on-surface">
          {street}, {district}, {city}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 border-t border-outline-variant/15 pt-4">
        <button
          className="flex items-center gap-1 text-xs uppercase tracking-widest text-on-background transition-colors hover:text-primary"
          onClick={onEdit}
          type="button"
        >
          <span className="material-symbols-outlined text-sm">edit</span> Edit
        </button>
        <button
          className="flex items-center gap-1 text-xs uppercase tracking-widest text-error transition-colors hover:text-error/80"
          onClick={onDelete}
          type="button"
        >
          <span className="material-symbols-outlined text-sm">delete</span> Remove
        </button>
      </div>
    </div>
  );
}

export default AddressCard;