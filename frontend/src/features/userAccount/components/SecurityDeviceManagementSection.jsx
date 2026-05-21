function SecurityDeviceManagementSection() {
  return (
    <section className="rounded-xl bg-surface-container-lowest p-8 shadow-[0_4px_60px_-15px_rgba(25,28,29,0.04)]">
      <h2 className="mb-6 font-headline text-2xl text-on-surface">Device Management</h2>
      <p className="mb-6 text-sm text-on-surface-variant">
        Log out of all other devices except this one.
      </p>
      <button
        className="rounded-lg border border-outline-variant/30 px-8 py-3 text-sm uppercase tracking-wider text-on-surface transition-colors duration-300 hover:bg-surface-variant"
        type="button"
      >
        Log Out All Devices
      </button>
    </section>
  );
}

export default SecurityDeviceManagementSection;
