function AdminPageHeader({
  title,
  description,
  searchPlaceholder,
  actionLabel,
  actionIcon = 'add',
  actionVariant = 'primary'
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        <h1 className="font-headline text-4xl text-on-background tracking-tight">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm text-on-surface-variant">{description}</p> : null}
      </div>

      <div className="flex items-center gap-4">
        {searchPlaceholder ? (
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
            <input
              className="w-full border-0 border-b border-outline-variant/30 bg-transparent py-2 pl-10 pr-4 text-sm text-on-background placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-0 md:w-64"
              placeholder={searchPlaceholder}
              type="text"
            />
          </div>
        ) : null}

        {actionLabel ? (
          <button
            className={[
              'flex items-center rounded-lg px-6 py-2 text-sm uppercase tracking-widest transition-colors duration-300',
              actionVariant === 'secondary'
                ? 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                : 'bg-primary text-on-primary hover:bg-secondary'
            ].join(' ')}
            type="button"
          >
            <span className="material-symbols-outlined mr-2 text-[18px]">{actionIcon}</span>
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default AdminPageHeader;
