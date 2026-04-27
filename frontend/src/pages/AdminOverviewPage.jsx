import { AdminStatCard } from '../features/admin/components/index.js';

const statCards = [
  { title: 'Total Sales', value: '$124,500', trend: '+12.5% from last month', icon: 'trending_up', borderClassName: 'border-l-primary' },
  { title: 'Active Users', value: '8,240', trend: '+4.2% from last month', icon: 'group', borderClassName: 'border-l-secondary' },
  { title: 'New Orders', value: '1,432', trend: '-1.5% from last month', icon: 'shopping_bag', borderClassName: 'border-l-surface-tint' },
  { title: 'Low Stock Alerts', value: '14', trend: 'Requires attention', icon: 'inventory_2', borderClassName: 'border-l-outline-variant' }
];

const topExhibitions = [
  { name: 'Midnight Oud', category: 'Woody', price: '$345', sold: '120 sold', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQXVK-tMClCRWDNzSQjfIx-y1BdRQTm0WE7mQiTIDB7y57VLyhu7miPU5l1q89-nAASTQXhl8kM3gj9VpfagPVXQ6F2KTG6Jxajg3iqoLXs2iJ61A896PlxSK55KppvKodMkEXFVqS6fqEFKfHQYHEkrukbF7_8Ty-bd26_qm4_xUWsDr93sBpOZoaKT8JXWoBiTFT6lZelVVW2HwUiU0aPOKBIxoYuOy7V0UAYQ1F7oji9I-lpASXf26YtwdYlAoPWJkL9Ds4T6I' },
  { name: 'Bergamot Blanc', category: 'Citrus', price: '$280', sold: '95 sold', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoXNabhVzTYHpIvpNn6zj4yxBaFkR1SxkRzo4Uwas6vzzWBUnAI5f-5ZKaaiAt1FnXwUOhFio_9FfPvcBXwWTwp8HE6e8xq8Z67gtfJ_Zis0Y_YIxee3t-ranwII10pBZwonoSX2boV2zxj69J21QJNzg0h2pxkgiPH0ZZEOgvF308stAKtUUEAAvtSxW7ULnFrBQ4Kx4GHFlU6VZWI7F4ob8dzO7CTRzdARwq1nf9y6lL7Q5XOu0QG6oLOC8EgwseOkgom928WdQ' },
  { name: 'Velvet Rose', category: 'Floral', price: '$310', sold: '84 sold', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMzqT3VOboPE_6GyFU3VZyQ2GWJFuae0vLGG7UC2LT-6NRVDblC93ZNF0u79-0dUgNT0B3AClzASyyS1LPwGdZY2gRbg_FF90xtxhvs7dqfd3DR7usmr6Z14kPy--AQmLpz6dCV81Bcvkt118XkPpfh3t8aopTVnaUiE8wiA5qWjrB8gJt5SAxcX88EMoE1T-q65ygBY5Fhg1KFgRhbwMjDVgXS6UrHMteyp9mbPWEYPyEwIWqX-v4Fzg6DIwtnoSrJ8QTMTXS1mM' }
];

function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <div className="mb-10">
        <h1 className="mb-2 font-headline text-3xl font-semibold">Welcome back, Admin</h1>
        <p className="max-w-2xl text-sm text-on-surface-variant">
          Here is the high-level overview of AURA's performance today. The gallery is performing steadily.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <AdminStatCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-xl bg-surface-container-lowest p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-headline text-xl font-medium">Revenue Overview</h2>
            <div className="flex space-x-2 text-xs">
              <span className="cursor-pointer rounded-full bg-surface-container px-3 py-1">1W</span>
              <span className="cursor-pointer rounded-full bg-primary px-3 py-1 text-on-primary">1M</span>
              <span className="cursor-pointer rounded-full bg-surface-container px-3 py-1">1Y</span>
            </div>
          </div>

          <div className="h-64 w-full items-end space-x-2 pb-4 md:flex hidden">
            {[30, 45, 35, 60, 50, 75, 90].map((height, index) => (
              <div
                key={`${height}-${index}`}
                className={[
                  'group relative flex-1 rounded-t-sm',
                  index === 6 ? 'bg-primary' : 'bg-surface-container-high hover:bg-surface-variant'
                ].join(' ')}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>

          <div className="flex justify-between border-t border-surface-container-high pt-2 text-xs text-on-surface-variant">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="flex h-full flex-col rounded-xl bg-surface-container-lowest p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-headline text-xl font-medium">Top Exhibitions</h2>
            <span className="material-symbols-outlined cursor-pointer text-sm text-on-surface-variant hover:text-primary">more_horiz</span>
          </div>

          <div className="flex-1 space-y-6">
            {topExhibitions.map((item) => (
              <div key={item.name} className="flex items-center space-x-4">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface-container">
                  <img alt={item.name} className="h-full w-full object-cover grayscale opacity-80" src={item.image} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-on-surface">{item.name}</p>
                  <span className="mt-1 inline-block rounded-sm bg-secondary-container px-2 py-0.5 text-[10px] uppercase tracking-wider text-on-secondary-container">
                    {item.category}
                  </span>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold">{item.price}</p>
                  <p className="text-[10px] text-on-surface-variant">{item.sold}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOverviewPage;
