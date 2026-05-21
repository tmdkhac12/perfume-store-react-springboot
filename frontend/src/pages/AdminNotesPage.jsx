import {
  AdminActionButtons,
  AdminPageHeader,
  AdminPagination
} from '../features/admin/components/index.js';

const noteRows = [
  { id: 'NT-001', name: 'Oud', category: 'Woody', icon: 'spa', visible: true },
  { id: 'NT-002', name: 'Bergamot', category: 'Citrus', icon: 'local_florist', visible: true },
  { id: 'NT-003', name: 'Damask Rose', category: 'Floral', icon: 'filter_vintage', visible: false },
  { id: 'NT-004', name: 'Vetiver', category: 'Earthy', icon: 'grass', visible: true }
];

function AdminNotesPage() {
  return (
    <div>
      <AdminPageHeader
        actionLabel="Create Note"
        description="Manage and categorize the fundamental scent profiles used across the fragrance catalog."
        searchPlaceholder="Search Notes..."
        title="Notes Directory"
      />

      <div className="rounded-xl bg-surface-container-lowest">
        <div className="grid grid-cols-12 gap-4 border-b border-surface-variant/50 px-6 py-4 text-xs uppercase tracking-widest text-on-surface-variant">
          <div className="col-span-1">ID</div>
          <div className="col-span-4">Name & Profile</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-3 text-center">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="flex flex-col">
          {noteRows.map((row) => (
            <div
              key={row.id}
              className="group grid grid-cols-12 gap-4 items-center border-b border-surface-variant/30 px-6 py-5 last:border-b-0 hover:bg-surface-container-low transition-colors duration-200"
            >
              <div className="col-span-1 text-sm text-on-surface-variant">#{row.id}</div>
              <div className="col-span-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-surface-container-high">
                  <span className="material-symbols-outlined text-[20px] text-secondary">
                    {row.icon}
                  </span>
                </div>
                <span className="font-headline text-lg text-on-surface">{row.name}</span>
              </div>
              <div className="col-span-2">
                <span className="rounded-full bg-secondary-container px-3 py-1 text-xs text-on-secondary-container">
                  {row.category}
                </span>
              </div>
              <div className="col-span-3 flex items-center justify-center gap-4">
                <span className="hidden text-sm md:inline">
                  {row.visible ? 'Visible' : 'Hidden'}
                </span>
                <button
                  aria-checked={row.visible}
                  className={[
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200',
                    row.visible ? 'bg-primary' : 'bg-surface-container-high'
                  ].join(' ')}
                  role="switch"
                  type="button"
                >
                  <span
                    aria-hidden="true"
                    className={[
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                      row.visible ? 'translate-x-5' : 'translate-x-0'
                    ].join(' ')}
                  />
                </button>
              </div>
              <div className="col-span-2">
                <AdminActionButtons />
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdminPagination summary="Showing 1-4 of 124 Notes" />
    </div>
  );
}

export default AdminNotesPage;
