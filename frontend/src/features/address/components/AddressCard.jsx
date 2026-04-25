import React from 'react';

/**
 * AddressCard component to display individual address information.
 * * @param {object} address - The address data object.
 * @param {boolean} isDefault - Whether this is the primary/default address.
 * @param {function} onEdit - Callback when the Edit button is clicked.
 * @param {function} onDelete - Callback when the Remove button is clicked.
 * @param {function} onSetDefault - Callback to set this address as default.
 */
function AddressCard({
  address,
  isDefault = false,
  onEdit,
  onDelete,
  onSetDefault
}) {
  const { receiver, phone, city, district, street, country = 'United States' } = address;

  return (
    <div className={`group relative overflow-hidden rounded-3xl p-8 transition-colors ${isDefault
        ? 'bg-surface-container-lowest'
        : 'bg-surface-container-low hover:bg-surface-container-lowest'
      }`}>
      {/* Decorative top bar for default address */}
      {isDefault && (
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary to-secondary" />
      )}

      {/* Header section with icon and status */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-on-surface-variant">
            {isDefault ? 'home' : 'apartment'}
          </span>
          <h3 className="text-xs uppercase tracking-widest text-on-surface-variant">
            {isDefault ? 'Home Address' : 'Office / Other'}
          </h3>
        </div>

        {isDefault && (
          <span className="rounded-full bg-secondary-container px-3 py-1 text-[10px] uppercase tracking-widest text-on-secondary-container">
            Default
          </span>
        )}
      </div>

      {/* Address Details */}
      <div className="mb-8 space-y-2">
        <p className="font-headline text-xl text-on-background">{receiver}</p>
        <p className="text-on-surface-variant">{phone}</p>
        <p className="leading-relaxed text-on-surface">
          {street}
          <br />
          {district}, {city}
          <br />
          {country}
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

        {isDefault ? (
          <button
            className="flex items-center gap-1 text-xs uppercase tracking-widest text-error transition-colors hover:text-error/80"
            onClick={onDelete}
            type="button"
          >
            <span className="material-symbols-outlined text-sm">delete</span> Remove
          </button>
        ) : (
          <button
            className="text-xs uppercase tracking-widest text-on-background transition-colors hover:text-primary"
            onClick={onSetDefault}
            type="button"
          >
            Set as Default
          </button>
        )}
      </div>
    </div>
  );
}

export default AddressCard;