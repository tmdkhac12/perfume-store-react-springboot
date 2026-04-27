function SavedAddressHeader({ onAddAddress }) {
  return (
    <div className="mb-12 flex items-end justify-between">
      <div>
        <h1 className="mb-4 font-headline text-4xl text-on-background lg:text-5xl">Saved Addresses</h1>
        <p className="max-w-lg text-on-surface-variant">
          Manage your delivery destinations for an effortless checkout experience.
        </p>
      </div>
      <button
        className="group hidden items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm uppercase tracking-widest text-on-primary transition-colors hover:bg-secondary md:flex"
        onClick={onAddAddress}
        type="button"
      >
        <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover:rotate-90">add</span>
        Add New Address
      </button>
    </div>
  );
}

export default SavedAddressHeader;