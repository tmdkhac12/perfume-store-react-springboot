function SecurityTwoFactorSection() {
  return (
    <section className="mb-8 rounded-xl bg-surface-container-low p-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="mb-2 font-headline text-2xl text-on-surface">Two-Factor Authentication</h2>
          <p className="max-w-md text-sm text-on-surface-variant">
            Add an extra layer of security to your account by requiring a code when logging in.
          </p>
        </div>
        <label className="relative inline-flex cursor-pointer items-center">
          <input className="peer sr-only" type="checkbox" />
          <div className="h-6 w-11 rounded-full bg-outline-variant/30 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white" />
        </label>
      </div>
    </section>
  );
}

export default SecurityTwoFactorSection;
