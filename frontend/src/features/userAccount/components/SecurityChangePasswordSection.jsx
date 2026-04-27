function SecurityChangePasswordSection() {
  return (
    <section className="mb-8 rounded-xl bg-surface-container-lowest p-8 shadow-[0_4px_60px_-15px_rgba(25,28,29,0.04)]">
      <h2 className="mb-6 font-headline text-2xl text-on-surface">Change Password</h2>
      <form className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="current-password">
            Current Password
          </label>
          <input
            className="w-full border-0 border-b border-[#6b7280]/40 bg-transparent py-2 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0 px-2"
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
            className="w-full border-0 border-b border-[#6b7280]/40 bg-transparent py-2 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0 px-2"
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
            className="w-full border-0 border-b border-[#6b7280]/40 bg-transparent py-2 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0 px-2"
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
  );
}

export default SecurityChangePasswordSection;