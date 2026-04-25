import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { label: 'HOME', to: '/' },
  { label: 'SHOP', to: '/shop' },
  { label: 'BEST SELLERS', to: '/best-sellers' },
  { label: 'ABOUT', to: '/about' },
];

const baseClasses = 'font-label uppercase tracking-[0.2em] text-[11px]';
const activeClasses = 'text-primary border-b border-primary pb-1';
const inactiveClasses = 'text-on-surface-variant hover:text-primary transition-all';

function MainHeader() {
  return (
    <nav className="sticky top-0 w-full z-50 rounded-none bg-[#f8f9fa]/90 backdrop-blur-xl no-border transition-colors duration-500 flex justify-between items-center px-8 lg:px-12 py-6 max-w-full">
      <div className="flex items-center gap-8">
        <NavLink className="font-headline text-2xl font-light tracking-tighter text-primary" to="/">
          PerfumeStore
        </NavLink>
      </div>
      <div className="hidden lg:flex gap-8">
        {navItems.map(item => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
          >{item.label}</NavLink>
        ))}
      </div>
      <div className="flex items-center gap-4 text-primary">
        <button className="hover:bg-primary/5 p-2 rounded-full transition-colors duration-300" type="button">
          <span className="material-symbols-outlined text-[20px]" data-icon="search">
            search
          </span>
        </button>
        <Link className="hover:bg-primary/5 p-2 rounded-full transition-colors duration-300" to="/cart">
          <span className="material-symbols-outlined text-[20px]" data-icon="shopping_bag">
            shopping_bag
          </span>
        </Link>
        <Link className="hover:bg-primary/5 p-2 rounded-full transition-colors duration-300 hidden sm:block" to="/login">
          <span className="material-symbols-outlined text-[20px]" data-icon="person">
            person
          </span>
        </Link>
        <Link className="hidden sm:inline-block bg-primary text-on-primary font-label text-[11px] uppercase tracking-[0.1em] py-3 px-6 text-center transition-colors duration-300 hover:bg-secondary rounded-full ml-2" to="/shop">
          Shop Now
        </Link>
      </div>
    </nav>
  );
}

export default MainHeader;