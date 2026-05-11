import React from 'react';

/** @description: Shipping selection section for choosing a saved address. */
function ShippingSelection({ addresses = [], selectedAddressId, status = 'idle', onAddNew, onSelectAddress }) {
  const safeAddresses = Array.isArray(addresses) ? addresses : [];
  const selectedAddress = safeAddresses.find((address) => address.id === selectedAddressId) || null;
  const isLoading = status === 'loading';
  const isEmpty = !isLoading && safeAddresses.length === 0;

  /**
   * @description: Handles selecting a saved address from the dropdown.
   * @flow: Change select -> Parse id -> Update selection.
   */
  const handleSelectChange = (event) => {
    const nextId = Number(event.target.value);
    if (Number.isNaN(nextId)) {
      return;
    }

    onSelectAddress?.(nextId);
  };

  return (
    <section>
      <h2 className="font-headline text-2xl text-on-background mb-8 pb-4 border-b border-outline-variant/30">Shipping Information</h2>
      <div className="space-y-6">
        <div>
          <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3">Select Saved Address</label>
          {isLoading ? (
            <div className="w-full bg-surface-container-lowest border-2 border-outline-variant/50 py-6 px-6 rounded-[40px] text-on-surface font-body min-h-[80px] flex items-center">
              Loading addresses...
            </div>
          ) : isEmpty ? (
            <div className="w-full bg-surface-container-lowest border-2 border-outline-variant/50 py-6 px-6 rounded-[40px] text-on-surface font-body min-h-[80px] flex items-center">
              No saved addresses available.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <select
                  className="w-full bg-surface-container-lowest border-2 border-outline-variant/50 py-4 px-6 rounded-[40px] text-on-surface font-body hover:border-accent transition-all duration-300 min-h-[80px]"
                  value={selectedAddress?.id ?? ''}
                  onChange={handleSelectChange}
                >
                  {safeAddresses.map((address) => (
                    <option key={address.id} value={address.id}>
                      {address.receiver} • {address.phoneNumber}
                    </option>
                  ))}
                </select>
              </div>
              {selectedAddress ? (
                <div className="px-6">
                  <span className="block font-body text-sm text-on-surface-variant">
                    {selectedAddress.receiver} • {selectedAddress.phoneNumber}
                  </span>
                  <span className="block font-body text-sm text-on-surface-variant">
                    {selectedAddress.deliveryAddress}, {selectedAddress.wardName}, {selectedAddress.cityName}
                  </span>
                </div>
              ) : null}
            </div>
          )}
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
