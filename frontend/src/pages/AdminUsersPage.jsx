import {
  AdminActionButtons,
  AdminPageHeader,
  AdminPagination
} from '../features/admin/components/index.js';

const userRows = [
  { id: '001', name: 'Eleanor Vance', username: 'evance', email: 'eleanor@aura.com', active: true, admin: true },
  { id: '002', name: 'Arthur Pendelton', username: 'apendelton', email: 'arthur@aura.com', active: false, admin: false },
  { id: '003', name: 'Marguerite Duras', username: 'mduras', email: 'marguerite@aura.com', active: true, admin: false },
  { id: '004', name: 'Jean-Claude Ellena', username: 'jellena', email: 'jeanclaude@aura.com', active: true, admin: true }
];

function TogglePill({ checked }) {
  return (
    <button
      aria-checked={checked}
      className={[
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200',
        checked ? 'bg-primary' : 'bg-surface-container-high'
      ].join(' ')}
      role="switch"
      type="button"
    >
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          checked ? 'translate-x-5' : 'translate-x-0'
        ].join(' ')}
      />
    </button>
  );
}

function AdminUsersPage() {
  return (
    <div>
      <AdminPageHeader
        actionLabel="Create User"
        description="Manage system access, roles, and administrative privileges."
        searchPlaceholder="Search directory..."
        title="User Directory"
      />

      <div className="rounded-xl bg-surface-container-lowest">
        <div className="grid grid-cols-[80px_2fr_1.5fr_2fr_200px_100px] gap-4 border-b border-surface-variant/50 px-6 py-4 text-xs uppercase tracking-widest text-on-surface-variant">
          <div>ID</div>
          <div>Name</div>
          <div>Username</div>
          <div>Email</div>
          <div className="text-center">Status</div>
          <div className="text-right">Actions</div>
        </div>

        <div className="flex flex-col">
          {userRows.map((row) => (
            <div key={row.id} className="group grid grid-cols-[80px_2fr_1.5fr_2fr_200px_100px] items-center gap-4 border-b border-surface-variant/30 px-6 py-5 last:border-b-0 hover:bg-surface-container-low transition-colors duration-200">
              <div className="text-sm text-on-surface-variant">{row.id}</div>
              <div className="font-headline text-lg text-on-surface">{row.name}</div>
              <div className="text-sm text-on-surface-variant">{row.username}</div>
              <div className="text-sm text-on-surface-variant">{row.email}</div>
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-on-surface-variant">Active</span>
                  <TogglePill checked={row.active} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-on-surface-variant">Admin</span>
                  <TogglePill checked={row.admin} />
                </div>
              </div>
              <div>
                <AdminActionButtons />
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdminPagination summary="Showing 1-4 of 24 Users" />
    </div>
  );
}

export default AdminUsersPage;
