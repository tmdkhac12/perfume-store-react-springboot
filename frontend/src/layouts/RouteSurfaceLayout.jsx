import { NavLink, Outlet } from 'react-router-dom';
import { getRoutesByGroup, resolveRoutePath } from '../config/route-map.js';

function RouteSurfaceLayout({ title, description, group }) {
  const navigationItems = getRoutesByGroup(group);

  return (
    <div className="min-h-screen bg-luxury-background text-luxury-text">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-luxury-muted">React Foundation</p>
          <h1 className="font-display text-3xl leading-tight md:text-4xl">{title}</h1>
          <p className="max-w-2xl text-sm text-luxury-subtle md:text-base">{description}</p>
        </header>

        <nav className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {navigationItems.map((route) => (
            <NavLink
              key={route.path}
              to={resolveRoutePath(route.path)}
              className={({ isActive }) =>
                [
                  'rounded-xl border bg-white px-4 py-3 text-sm font-semibold transition',
                  isActive
                    ? 'border-luxury-text text-luxury-text shadow-sm'
                    : 'border-luxury-border text-luxury-text hover:-translate-y-0.5 hover:border-luxury-text'
                ].join(' ')
              }
            >
              {route.label}
            </NavLink>
          ))}
        </nav>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RouteSurfaceLayout;
