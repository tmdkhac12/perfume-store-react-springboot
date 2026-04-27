import {
  AdminActionButtons,
  AdminPageHeader,
  AdminPagination
} from '../features/admin/components/index.js';

const brandRows = [
  {
    id: '001',
    name: 'Tom Ford',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCef0tDOdX9Cwly-Gt3O-Fx2BXXN-RAYQcLgGpOH8IVtgtT6w_5d5qXhViQcribVFwSfuJMISSn_fDqigBUEznx5QhXPebZoiDK1WYelRAh4LGXMdVYNTup9kpG5bevqmXVo1H31TfqGewQMkvZ8TOe6arsOkzSsptyoyTBa_vEdbZ724pcN4wBa331wOYqxkabvRxXWQDRfql7UoPgIpirbr25DM-REuIMxi6xWa7tPsOQSPNHNN6J_MbBQjqamaX05GiXIhgBmw0',
    enabled: true
  },
  {
    id: '002',
    name: 'Byredo',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV52FVbIyVxqykDrpyWmWukxDOtXwQVo-jUW9VAVCV3Ff7yxooaibRmcra1RY4x0Z-3e60yWUYxoY03eEGN10ongBXXt0EpTWWyVa-QpSsv4AqudVT0gUOmBwFWWK4ACEB2Dh5KUId7WLscJ3LJa8fU1qBZqbZLTmK-rJRLHREOBCxvo-VKW1XpO8AOXUNz5RTdoCaWrH1qKlmPq-uvgM17Wg2r1C5EhuapOeVdUmVjdbarsqAVUqwmOKrIQ_-u5FHtOM68kGj4dA',
    enabled: true
  },
  {
    id: '003',
    name: 'Diptyque',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB71_4YLaqiYOhLugdE2b-ZLWZWgvisL49CuVkkkl_KTuEdTkNA8hJvjOAYeQaYevKWeIvWGLKJuPVPV9sXSAbqnug-A7eei_5c3vxxxhh-L0UrWDBy_8_ooLx2HrrdjlEEXrjyhe3rlgz_Y1JqazhJX1-p8fCgQbYTJBHw1tVfZrTvs9vlBmd0IkFy_QEy5sZDWo47yoCjQqsLXBnX3xhdkXUFxQJ42brUeyn1umxruBEyv39sUjH64AeMStYHZgurF0taQvm-3gk',
    enabled: false
  }
];

function AdminBrandsPage() {
  return (
    <div>
      <AdminPageHeader
        actionLabel="Create Brand"
        description="Curate and manage luxury fragrance houses."
        searchPlaceholder="Search brands..."
        title="Brands Management"
      />

      <div className="rounded-xl bg-surface-container-lowest">
        <div className="grid grid-cols-12 gap-4 border-b border-surface-variant/50 px-6 py-4 text-xs uppercase tracking-widest text-on-surface-variant">
          <div className="col-span-1">ID</div>
          <div className="col-span-7">Brand Name</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="flex flex-col">
          {brandRows.map((row) => (
            <div key={row.id} className="group grid grid-cols-12 gap-4 items-center px-6 py-5 transition-colors duration-200 hover:bg-surface-container-low">
              <div className="col-span-1 text-sm text-on-surface-variant">{row.id}</div>
              <div className="col-span-7 flex items-center gap-4">
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-surface-container">
                  <img alt={row.name} className="h-full w-full object-cover grayscale" src={row.image} />
                </div>
                <span className="font-headline text-lg text-primary">{row.name}</span>
              </div>
              <div className="col-span-2 flex justify-center">
                <button
                  aria-checked={row.enabled}
                  className={[
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200',
                    row.enabled ? 'bg-primary' : 'bg-surface-container-high'
                  ].join(' ')}
                  role="switch"
                  type="button"
                >
                  <span
                    aria-hidden="true"
                    className={[
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                      row.enabled ? 'translate-x-5' : 'translate-x-0'
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

      <AdminPagination summary="Showing 3 of 42 Brands" />
    </div>
  );
}

export default AdminBrandsPage;
