import React from 'react';

function AddressModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-surface-container-lowest rounded-[40px] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-8 py-6 border-b border-outline-variant/30 flex justify-between items-center sticky top-0 bg-surface-container-lowest z-10">
          <h3 className="font-headline text-2xl text-on-background">Add New Address</h3>
          <button className="text-on-surface-variant hover:text-on-background transition-colors" onClick={onClose} type="button">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-8 overflow-y-auto">
          <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
            <div>
              <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="new_receiver">Receiver Name</label>
              <input className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300" id="new_receiver" placeholder="John Doe" type="text" />
            </div>
            <div>
              <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="new_phone">Phone Number</label>
              <input className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300" id="new_phone" placeholder="+1 (555) 000-0000" type="tel" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="new_city">City</label>
                <input className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300" id="new_city" placeholder="New York" type="text" />
              </div>
              <div>
                <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="new_ward">Ward/District</label>
                <input className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300" id="new_ward" placeholder="Manhattan" type="text" />
              </div>
            </div>
            <div>
              <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="new_address">Delivery Address</label>
              <input className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300" id="new_address" placeholder="123 Perfume Lane, Apt 4B" type="text" />
            </div>
          </form>
        </div>
        <div className="px-8 py-6 border-t border-outline-variant/30 bg-surface-container-lowest sticky bottom-0 z-10 flex justify-end gap-4">
          <button className="px-8 py-4 rounded-[40px] font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant hover:bg-surface-container transition-colors" onClick={onClose} type="button">Cancel</button>
          <button className="bg-accent text-on-primary px-8 py-4 rounded-[40px] font-label text-sm uppercase tracking-[0.1em] hover:bg-black transition-colors" onClick={onClose} type="button">Save Address</button>
        </div>
      </div>
    </div>
  );
}

export default AddressModal;
