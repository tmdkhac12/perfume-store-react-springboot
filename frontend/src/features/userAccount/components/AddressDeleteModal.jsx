import React from 'react';

/** @description: Delete confirmation modal for saved addresses. */
function AddressDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Address',
  description = 'Are you sure you want to delete this address? This action cannot be undone.'
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div className="flex w-full max-w-md flex-col overflow-hidden rounded-[40px] bg-surface-container-lowest p-8 text-center shadow-2xl">
        <span className="material-symbols-outlined mb-4 text-4xl text-error">warning</span>

        <h3 className="mb-4 font-headline text-2xl text-on-background">{title}</h3>

        <p className="mb-8 text-on-surface-variant">{description}</p>

        <div className="flex justify-center gap-4">
          <button
            className="rounded-[40px] px-8 py-4 text-sm uppercase tracking-[0.1em] text-on-surface-variant transition-colors hover:bg-surface-container"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>

          <button
            className="rounded-[40px] bg-error px-8 py-4 text-sm uppercase tracking-[0.1em] text-on-error transition-colors hover:bg-error/80"
            onClick={() => {
              if (onConfirm) {
                onConfirm();
              }
              onClose();
            }}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressDeleteModal;
