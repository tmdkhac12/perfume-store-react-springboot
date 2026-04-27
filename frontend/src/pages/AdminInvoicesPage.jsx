import { useModal } from '../hooks/index.js';
import {
  AdminActionButtons,
  AdminPageHeader,
  AdminPagination
} from '../features/admin/components/index.js';

const invoiceRows = [
  { id: '#INV-2023-001', customer: 'Eleanor Vance', date: 'Oct 24, 2023', amount: '$285.00', status: 'Paid' },
  { id: '#INV-2023-002', customer: 'Julian Blackwood', date: 'Oct 22, 2023', amount: '$420.50', status: 'Pending' },
  { id: '#INV-2023-003', customer: 'Clara Harrington', date: 'Oct 20, 2023', amount: '$150.00', status: 'Paid' },
  { id: '#INV-2023-004', customer: 'Arthur Pendelton', date: 'Oct 18, 2023', amount: '$890.00', status: 'Pending' },
  { id: '#INV-2023-005', customer: 'Beatrice Thorne', date: 'Oct 15, 2023', amount: '$315.25', status: 'Paid' }
];

function AdminInvoicesPage() {
  const invoiceModal = useModal();

  return (
    <div>
      <AdminPageHeader
        actionIcon="download"
        actionLabel="Export Invoices"
        description="Review invoice records, statuses, and customer details."
        searchPlaceholder="Search Invoices..."
        title="Invoices"
      />

      <div className="overflow-hidden rounded-3xl bg-surface-container-lowest shadow-[0_4px_60px_-15px_rgba(0,0,0,0.04)]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-outline-variant/15 bg-surface-container-low/50 text-[11px] uppercase tracking-[0.1em] text-on-surface-variant">
              <th className="px-6 py-4 font-medium">ID</th>
              <th className="px-6 py-4 font-medium">Customer Name</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Total Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/15 text-sm">
            {invoiceRows.map((row) => (
              <tr key={row.id} className="transition-colors hover:bg-surface-container-low/30">
                <td className="px-6 py-4 font-medium text-on-background">{row.id}</td>
                <td className="px-6 py-4 text-on-surface">{row.customer}</td>
                <td className="px-6 py-4 text-on-surface-variant">{row.date}</td>
                <td className="px-6 py-4 font-medium text-on-background">{row.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={[
                      'inline-flex items-center rounded-full px-2 py-1 text-[10px] uppercase tracking-wider font-semibold',
                      row.status === 'Paid'
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-surface-container-high text-on-surface'
                    ].join(' ')}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div onClick={invoiceModal.open}>
                    <AdminActionButtons showPrint showView />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminPagination summary="Showing 1-5 of 24 Invoices" />

      {invoiceModal.isOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-on-background/40 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-surface-container-lowest shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-surface-variant bg-surface-container-lowest px-8 py-6">
              <div>
                <h3 className="mb-1 font-headline text-2xl text-on-surface">Edit Invoice #INV-2023-001</h3>
                <p className="text-sm text-on-surface-variant">Placed on October 24, 2023</p>
              </div>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
                onClick={invoiceModal.close}
                type="button"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>

            <div className="grid flex-1 gap-8 overflow-y-auto bg-background p-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="rounded-3xl border border-surface-variant/50 bg-surface-container-lowest p-6 shadow-sm">
                  <h4 className="mb-4 border-b border-surface-variant pb-2 text-sm uppercase tracking-wider text-on-surface">Delivery Details</h4>
                  <div className="space-y-4 text-sm">
                    <label className="block">
                      <span className="mb-1 block text-xs text-on-surface-variant">Receiver Name</span>
                      <input className="w-full rounded-xl border border-surface-variant/50 bg-surface-container-low px-3 py-2" defaultValue="Eleanor Vance" />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs text-on-surface-variant">Phone Number</span>
                      <input className="w-full rounded-xl border border-surface-variant/50 bg-surface-container-low px-3 py-2" defaultValue="+1 555-0198" />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs text-on-surface-variant">Shipping Address</span>
                      <textarea className="w-full rounded-xl border border-surface-variant/50 bg-surface-container-low px-3 py-2" defaultValue="123 Luxury Lane, Beverly Hills, CA 90210" rows={3} />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-surface-variant/50 bg-surface-container-lowest p-6 shadow-sm">
                  <h4 className="mb-4 border-b border-surface-variant pb-2 text-sm uppercase tracking-wider text-on-surface">Payment Details</h4>
                  <div className="space-y-3 text-sm">
                    <p className="flex justify-between"><span>Payment Method</span><span>Credit Card</span></p>
                    <p className="flex justify-between"><span>Subtotal</span><span>$255.00</span></p>
                    <p className="flex justify-between"><span>Shipping</span><span>$15.00</span></p>
                    <p className="flex justify-between border-t border-surface-variant pt-3 font-headline text-lg"><span>Total</span><span>$285.00</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-surface-variant bg-surface-container-lowest px-8 py-6">
              <button className="rounded-full border border-outline-variant/30 px-8 py-3 text-sm uppercase tracking-wider" onClick={invoiceModal.close} type="button">
                Cancel
              </button>
              <button className="rounded-full bg-primary px-8 py-3 text-sm uppercase tracking-wider text-on-primary" onClick={invoiceModal.close} type="button">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AdminInvoicesPage;
