import React from 'react';

/**
 * AddressFormModal component for adding or editing delivery addresses.
 * * @param {boolean} isOpen - Controls the visibility of the modal.
 * @param {function} onClose - Function to handle closing the modal.
 * @param {object} initialData - Optional data for editing an existing address.
 */
function AddressFormModal({ isOpen, onClose, initialData = null }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-[40px] bg-surface-container-lowest shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-outline-variant/30 bg-surface-container-lowest px-8 py-6">
          <h3 className="font-headline text-2xl text-on-background">
            {initialData ? 'Edit Address' : 'Add New Address'}
          </h3>
          <button
            className="text-on-surface-variant transition-colors hover:text-on-background"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="overflow-y-auto p-8">
          <form className="space-y-6" id="address-form">
            <div>
              <label className="mb-3 block text-sm uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="receiver">
                Receiver Name
              </label>
              <input
                className="w-full rounded-[40px] border border-outline-variant/30 bg-surface-container px-6 py-4 text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
                id="receiver"
                placeholder="John Doe"
                defaultValue={initialData?.receiver || ''}
                type="text"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="phone">
                Phone Number
              </label>
              <input
                className="w-full rounded-[40px] border border-outline-variant/30 bg-surface-container px-6 py-4 text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
                id="phone"
                placeholder="+1 (555) 000-0000"
                defaultValue={initialData?.phone || ''}
                type="tel"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="city">
                  City
                </label>
                <input
                  className="w-full rounded-[40px] border border-outline-variant/30 bg-surface-container px-6 py-4 text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
                  id="city"
                  placeholder="New York"
                  defaultValue={initialData?.city || ''}
                  type="text"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="district">
                  Ward/District
                </label>
                <input
                  className="w-full rounded-[40px] border border-outline-variant/30 bg-surface-container px-6 py-4 text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
                  id="district"
                  placeholder="Manhattan"
                  defaultValue={initialData?.district || ''}
                  type="text"
                />
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="address">
                Delivery Address
              </label>
              <input
                className="w-full rounded-[40px] border border-outline-variant/30 bg-surface-container px-6 py-4 text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
                id="address"
                placeholder="123 Perfume Lane, Apt 4B"
                defaultValue={initialData?.address || ''}
                type="text"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-10 flex justify-end gap-4 border-t border-outline-variant/30 bg-surface-container-lowest px-8 py-6">
          <button
            className="rounded-[40px] px-8 py-4 text-sm uppercase tracking-[0.1em] text-on-surface-variant transition-colors hover:bg-surface-container"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="rounded-[40px] bg-primary px-8 py-4 text-sm uppercase tracking-[0.1em] text-on-primary transition-colors hover:bg-secondary"
            form="address-form"
            type="submit"
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressFormModal;