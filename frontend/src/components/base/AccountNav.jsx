import { NavLink } from 'react-router-dom';

const accountNavigation = [
  {
    to: '/account/profile',
    icon: 'person_outline',
    label: 'Profile Settings'
  },
  {
    to: '/account/security',
    icon: 'shield',
    label: 'Security'
  },
  {
    to: '/account/address',
    icon: 'location_on',
    label: 'Addresses'
  },
  {
    to: '/account/orders',
    icon: 'history',
    label: 'Order History'
  }
];

function AccountNav() {
  return (
    <aside className="top-28 mr-12 hidden h-[calc(100vh-8rem)] w-72 flex-col gap-2 rounded-r-2xl bg-zinc-100 p-6 md:flex">
      <div className="mb-8 flex items-center gap-4 border-b border-outline-variant/15 pb-8">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-surface-container-high">
          <img
            alt="User profile photo"
            className="h-full w-full object-cover grayscale"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt1y3yPWAv_dKx6-eE0w3Z_HwgbzH04HDFCeV59Gu_lPjanu2Qjjwpzs17sjqlbAPlKFcujq4sIP_0ycCMifEgcHjRZaGXOm7Xm710Y9xypHS5vurm-tztCljb8LHniahexMqUjBeD3ZclBR2kCqV5k85-bvZpdtCsRiiSaX_Q8c1HRfvBWoiKj3edye6v-vVAZPmTpyNL5F7NRjnJvzCXcBxrKSn1yPjloTX1AFlUn_XYF6MyjNZaS4WXMUipTDHXDBU52OgRcco"
          />
        </div>
        <div>
          <h2 className="font-headline text-lg font-medium tracking-widest text-zinc-900">Julianne V.</h2>
          <p className="mt-1 text-xs uppercase tracking-widest text-zinc-600">Gold Member</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {accountNavigation.map((item) => (
          <NavLink
            key={item.to}
            className={({ isActive }) =>
              [
                'flex items-center gap-4 rounded-lg px-4 py-3 text-sm uppercase tracking-widest transition-all',
                isActive
                  ? 'bg-zinc-200 font-semibold text-zinc-900'
                  : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
              ].join(' ')
            }
            to={item.to}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default AccountNav;