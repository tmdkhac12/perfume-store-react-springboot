import { useModal } from '../hooks/index.js';
import AddressFormModal from './../features/address/components/AddressFormModal';
import AddressDeleteModal from './../features/address/components/AddressDeleteModal';
import AddressCard from './../features/address/components/AddressCard';

function AccountAddressPage() {
  const addressModal = useModal();
  const deleteModal = useModal();

  const savedAddresses = [
    { id: 1, receiver: 'Julianne Moore', phone: '+1 (212) 555-0198', street: '120 East 87th St', district: 'Apt 4B', city: 'New York', isDefault: true },
    { id: 2, receiver: 'Julianne Moore', phone: '+1 (212) 555-0199', street: '1 World Trade Center', district: 'Floor 25', city: 'New York', isDefault: false }
  ];

  return (
    <>
      <div className="mb-12 flex items-end justify-between">
        <div>
          <h1 className="mb-4 font-headline text-4xl text-on-background lg:text-5xl">Saved Addresses</h1>
          <p className="max-w-lg text-on-surface-variant">
            Manage your delivery destinations for an effortless checkout experience.
          </p>
        </div>
        <button
          className="group hidden items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm uppercase tracking-widest text-on-primary transition-colors hover:bg-secondary md:flex"
          onClick={addressModal.open}
          type="button"
        >
          <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover:rotate-90">add</span>
          Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {savedAddresses.map(addr => (
          <AddressCard
            key={addr.id}
            address={addr}
            isDefault={addr.isDefault}
            onEdit={addressModal.open}
            onDelete={deleteModal.open}
            onSetDefault={() => console.log("Set default", addr.id)}
          />
        ))}
      </div>

      <AddressFormModal isOpen={addressModal.isOpen} onClose={addressModal.close} initialData={null} />

      <AddressDeleteModal isOpen={deleteModal.isOpen} onClose={deleteModal.close} />
    </>
  );
}

export default AccountAddressPage;
