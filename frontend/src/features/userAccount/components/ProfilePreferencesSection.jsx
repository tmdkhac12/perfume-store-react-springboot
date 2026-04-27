function ProfilePreferencesSection() {
  return (
    <div className="rounded-xl bg-surface-container-lowest p-8">
      <h2 className="mb-6 font-headline text-2xl text-on-surface">Preferences</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-on-surface">Newsletter</h3>
            <p className="mt-1 text-xs text-on-surface-variant">Receive updates on new collections.</p>
          </div>
          <button className="relative flex h-6 w-11 items-center rounded-full bg-primary px-1" type="button">
            <div className="absolute right-1 h-4 w-4 rounded-full bg-white" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-on-surface">SMS Alerts</h3>
            <p className="mt-1 text-xs text-on-surface-variant">Delivery notifications via text.</p>
          </div>
          <button className="relative flex h-6 w-11 items-center rounded-full bg-surface-container-high px-1" type="button">
            <div className="absolute left-1 h-4 w-4 rounded-full bg-outline" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePreferencesSection;