import { NavLink } from 'react-router-dom';

const adminNavigation = [
  { to: '/admin/overview', icon: 'dashboard', label: 'Overview' },
  { to: '/admin/products', icon: 'inventory_2', label: 'Products' },
  { to: '/admin/notes', icon: 'fluid_med', label: 'Notes' },
  { to: '/admin/brands', icon: 'verified', label: 'Brands' },
  { to: '/admin/volumes', icon: 'straighten', label: 'Volumes' },
  { to: '/admin/users', icon: 'group', label: 'Users' },
  { to: '/admin/invoices', icon: 'receipt_long', label: 'Invoices' }
];

function AdminSidebar() {
  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-surface-container-high bg-surface-container-low p-6 md:flex">
      <div className="mb-4 flex items-center space-x-3">
        <div className="h-10 w-10 overflow-hidden rounded-full bg-surface-variant">
          <img
            alt="Aura Admin"
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa_f7bahXqWZsSyX8Yqv7288yVQDOal-EOJRL1FOpVvyA8OVPEkowO9KKTx9idepozaZ3O45JCs82fXlg2A6nGSSDS5SQj3ObUuFJwKUEJfvLXEOSz74AJLkAvuK-0wTY0KP4_qc5SIZhkBQ_lVSQ3Ep_tWjoTixG1Co0RyZh4Ze_dDYrJpTECugbpC9frjBASvsagy4Kv0kfa4g6YjcOwkuRNZGcw3mOfPb2yL9aUBeZAg5UgQlibf2erCgXp3hiNZTs6OuDH6rY"
          />
        </div>
        <div>
          <h2 className="font-headline text-lg font-bold tracking-widest text-zinc-900">Aura Gallery</h2>
          <p className="text-xs text-on-surface-variant">Management Suite</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {adminNavigation.map((item) => (
          <NavLink
            key={item.to}
            className={({ isActive }) =>
              [
                'group flex items-center rounded-lg px-4 py-3 transition-all duration-200',
                isActive
                  ? 'bg-stone-200/50 text-zinc-900'
                  : 'text-zinc-500 hover:bg-stone-100 hover:text-zinc-900'
              ].join(' ')
            }
            to={item.to}
          >
            <span className="material-symbols-outlined mr-3 transition-colors group-hover:text-on-surface">{item.icon}</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.1em]">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-2 border-t border-surface-container-high pt-6">
        <button className="group flex w-full items-center rounded-lg px-4 py-2 text-zinc-500 transition-all duration-200 hover:bg-stone-100 hover:text-zinc-900" type="button">
          <span className="material-symbols-outlined mr-3 text-[20px] transition-colors group-hover:text-on-surface">logout</span>
          <a href='/' className="text-[11px] font-medium uppercase tracking-[0.1em]">Sign Out</a>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
