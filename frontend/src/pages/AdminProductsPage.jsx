import {
  AdminActionButtons,
  AdminPageHeader,
  AdminPagination
} from '../features/admin/components/index.js';

const productRows = [
  {
    name: 'Oud Wood',
    detail: 'Eau de Parfum • 50ml',
    brand: 'Tom Ford',
    notes: ['Oud', 'Woody'],
    price: '$295.00',
    stock: 'In Stock (42)',
    stockClassName: 'bg-primary',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuARJA5rcznxGf_H0Vjq4S4XYCz18Aop62m_bkKO-_Y11b5wqqb2Jd0j5NMLmGN_8mvj_03rXyF3Vg7Q8lyr0v6xcyZOM0TAcTo0KId0TozPS5u9dKyCuYNZo7dG1zpbuL_TVym2xc02tA04lGljoDGumeqIMWWm8gS0h1C0U7U8I2ehlvVHy_JCSf7YZ5j8W7Bg7zs12UnlHYkeB_bhlzCh5JDakVjZ1UH82l0a7SYmp6nakjkSV-wqIxqMwgljAag227lYTxLIxBc'
  },
  {
    name: 'Baccarat Rouge 540',
    detail: 'Extrait de Parfum • 70ml',
    brand: 'Maison Francis Kurkdjian',
    notes: ['Amber', 'Floral'],
    price: '$425.00',
    stock: 'Low Stock (3)',
    stockClassName: 'bg-outline',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA4zRS7VKyFwPVYFCVkFGJ8685NaCL_aOkI0YxqzP1FyXWmDSESmLUohRsqX5yvRN2H_sV4Th-rrwy_xPGfHUChGdFjMGXcC1a3id3TeEY_ODUwsmbivj0Y1qeDXXZwUlJffl6vF9c24t_rh3HL_Ckg-HWrxoxhXLldxQV4eETdfYyRyXjAXa7TLn_Y_QhAvLYfTH215pZlc0WE6-PRHiZd4GSlKSizbZ0d2Lht0vmbgY6mfGef9fhlsY-YbnOT_ha-9cceShJpN7A'
  },
  {
    name: 'Gypsy Water',
    detail: 'Eau de Parfum • 100ml',
    brand: 'Byredo',
    notes: ['Citrus', 'Pine'],
    price: '$290.00',
    stock: 'Out of Stock',
    stockClassName: 'bg-error',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAtGUGbKibB9EnDNMdC5j55fn8okzbQcMvW7Uk4fJirXeOZVG7o2zeCyOWzHcfJnN7au2tcmz9Fqu8MoERAl82l_Pvh3rM9NhiukMHkAyYVmk9OY2CX-BwAoJzGHkUFQR0wfnaM0eOraBcrNjr-LK9tFwVOiZggZ3NJ_Kvz0nm2kQv8oqxkA9BPlM4NPZsxik5i9St3Fj_WAIXeGSOnJj98zfIBEgEw5Bnn2nmkM9JlJos4EkWW1JLTSBDMll31eX8grTW9gxfv_KY'
  }
];

function AdminProductsPage() {
  return (
    <div>
      <AdminPageHeader
        actionIcon="filter_list"
        actionLabel="Filter"
        actionVariant="secondary"
        description="Manage your fragrance catalog and inventory."
        searchPlaceholder="Search gallery..."
        title="Products"
      />

      <div className="rounded-xl bg-surface-container-lowest p-6 shadow-[0_4px_60px_-15px_rgba(0,0,0,0.04)] lg:p-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/15 text-xs uppercase tracking-wider text-on-surface-variant">
                <th className="pb-4 pl-4 font-medium">Product</th>
                <th className="pb-4 font-medium">Brand</th>
                <th className="pb-4 font-medium">Scent Profile</th>
                <th className="pb-4 font-medium">Price</th>
                <th className="pb-4 font-medium">Stock</th>
                <th className="pb-4 pr-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {productRows.map((row) => (
                <tr
                  key={row.name}
                  className="group transition-colors hover:bg-surface-container-low/50"
                >
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-surface-container-low">
                        <img
                          alt={row.name}
                          className="h-full w-full object-cover"
                          src={row.image}
                        />
                      </div>
                      <div>
                        <div className="font-headline font-semibold text-on-surface">
                          {row.name}
                        </div>
                        <div className="text-sm text-on-surface-variant">{row.detail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-on-surface">{row.brand}</td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      {row.notes.map((note) => (
                        <span
                          key={`${row.name}-${note}`}
                          className="rounded-md bg-secondary-container px-2 py-1 text-[10px] uppercase tracking-wider text-on-secondary-container"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 font-medium">{row.price}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${row.stockClassName}`} />
                      <span className="text-sm text-on-surface-variant">{row.stock}</span>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <div className="opacity-0 transition-opacity group-hover:opacity-100">
                      <AdminActionButtons />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdminPagination summary="Showing 3 of 42 Products" />
    </div>
  );
}

export default AdminProductsPage;
