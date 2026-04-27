function ProfilePersonalInformationSection() {
  return (
    <div className="col-span-1 rounded-xl bg-surface-container-lowest p-8 md:col-span-2">
      <h2 className="mb-6 font-headline text-2xl text-on-surface">Personal Information</h2>
      <form className="max-w-2xl space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col">
            <label className="mb-2 text-xs uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="firstName">
              First Name
            </label>
            <input
              className="w-full border-0 border-b border-outline-variant/50 bg-transparent py-2 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0"
              defaultValue="Julianne"
              id="firstName"
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-xs uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="w-full border-0 border-b border-outline-variant/50 bg-transparent py-2 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0"
              defaultValue="V."
              id="lastName"
              type="text"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-xs uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="email">
            Email Address
          </label>
          <input
            className="w-full border-0 border-b border-outline-variant/50 bg-transparent py-2 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0"
            defaultValue="julianne.v@example.com"
            id="email"
            type="email"
          />
        </div>

        <div className="pt-4">
          <button
            className="rounded bg-primary px-8 py-3 text-xs uppercase tracking-[0.1em] text-on-primary transition-colors duration-500 hover:bg-secondary"
            type="button"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfilePersonalInformationSection;