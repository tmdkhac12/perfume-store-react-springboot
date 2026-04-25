function AccountProfilePage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="mb-4 font-headline text-4xl text-on-background">Profile Settings</h1>
        <p className="text-sm text-on-surface-variant">Manage your personal details and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="col-span-1 rounded-xl bg-surface-container-lowest p-8 md:col-span-2">
          <h2 className="mb-6 font-headline text-2xl text-on-surface">Personal Information</h2>
          <form className="max-w-2xl space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col">
                <label className="mb-2 text-xs uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="w-full border-0 border-b border-outline-variant/30 bg-transparent py-2 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0"
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
                  className="w-full border-0 border-b border-outline-variant/30 bg-transparent py-2 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0"
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
                className="w-full border-0 border-b border-outline-variant/30 bg-transparent py-2 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0"
                defaultValue="julianne.v@example.com"
                id="email"
                type="email"
              />
            </div>

            <div className="pt-4">
              <button
                className="rounded bg-primary px-8 py-3 text-xs uppercase tracking-[0.1em] text-on-primary transition-colors duration-300 hover:bg-secondary"
                type="button"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

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

        <div className="relative flex min-h-[300px] items-end overflow-hidden rounded-xl bg-surface-container-lowest p-8">
          <div className="absolute inset-0 z-0">
            <img
              alt="Scent Profile Background"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfGAvq97--dOvamEb2uNwCvvFCIeHIe63ZOTQu8GyCJ1lRCL1eHHb-rTFvwWe_BgOTQnxKLVxqYYupMmFNy8z2AtIJaJsZcXIQjwOxqWU--GVIfO3pni_USEfsv1MSPg9fYpEsPN7n6NjaxqzcDW97rqv0w0vRvZyPkugFCt9fr1_nwujlr1pIFbQdPq3-XXW7FDzJ7u2oh47WlnKsxTl7HVdTmORGhj8ylM6_dIIRzBTbmIWVtT848aXz6ipX8alJ42wOPXiLHQY"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          </div>

          <div className="relative z-10 w-full">
            <h2 className="mb-4 font-headline text-2xl text-on-primary">Your Signature Notes</h2>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-secondary-container/90 px-3 py-1.5 text-xs uppercase tracking-widest text-on-secondary-container backdrop-blur">
                Oud
              </span>
              <span className="rounded-full bg-secondary-container/90 px-3 py-1.5 text-xs uppercase tracking-widest text-on-secondary-container backdrop-blur">
                Bergamot
              </span>
              <span className="rounded-full bg-secondary-container/90 px-3 py-1.5 text-xs uppercase tracking-widest text-on-secondary-container backdrop-blur">
                Sandalwood
              </span>
            </div>
            <button
              className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-on-primary transition-opacity hover:opacity-70"
              type="button"
            >
              Refine Profile <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountProfilePage;
