function AccountSecurityPage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="mb-4 font-headline text-4xl text-on-background">Security Settings</h1>
      </div>

      <section className="mb-8 rounded-xl bg-surface-container-lowest p-8 shadow-[0_4px_60px_-15px_rgba(25,28,29,0.04)]">
        <h2 className="mb-6 font-headline text-2xl text-on-surface">Change Password</h2>
        <form className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="current-password">
              Current Password
            </label>
            <input
              className="w-full border-0 border-b border-outline-variant/30 bg-transparent py-2 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0"
              id="current-password"
              placeholder="Enter current password"
              type="password"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="new-password">
              New Password
            </label>
            <input
              className="w-full border-0 border-b border-outline-variant/30 bg-transparent py-2 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0"
              id="new-password"
              placeholder="Enter new password"
              type="password"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="confirm-password">
              Confirm New Password
            </label>
            <input
              className="w-full border-0 border-b border-outline-variant/30 bg-transparent py-2 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0"
              id="confirm-password"
              placeholder="Confirm new password"
              type="password"
            />
          </div>

          <div className="pt-4">
            <button
              className="inline-block w-auto rounded-lg bg-primary px-8 py-3 text-sm uppercase tracking-wider text-on-primary transition-colors duration-300 hover:bg-secondary"
              type="button"
            >
              Update Password
            </button>
          </div>
        </form>
      </section>

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

      <section className="rounded-xl bg-surface-container-lowest p-8 shadow-[0_4px_60px_-15px_rgba(25,28,29,0.04)]">
        <h2 className="mb-6 font-headline text-2xl text-on-surface">Device Management</h2>
        <p className="mb-6 text-sm text-on-surface-variant">Log out of all other devices except this one.</p>
        <button
          className="rounded-lg border border-outline-variant/30 px-8 py-3 text-sm uppercase tracking-wider text-on-surface transition-colors duration-300 hover:bg-surface-variant"
          type="button"
        >
          Log Out All Devices
        </button>
      </section>
    </div>
  );
}

export default AccountSecurityPage;
