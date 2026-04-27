import { useModal } from '../hooks/index.js';
import {
  AddressDeleteModal,
  AddressFormModal,
  SavedAddressGrid,
  SavedAddressHeader
} from '../features/address/components/index.js';

function AccountAddressPage() {
  const addressModal = useModal();
  const deleteModal = useModal();

  const savedAddresses = [
    { id: 1, receiver: 'Julianne Moore', phone: '+1 (212) 555-0198', street: '120 East 87th St', district: 'Apt 4B', city: 'New York', isDefault: true },
    { id: 2, receiver: 'Julianne Moore', phone: '+1 (212) 555-0199', street: '1 World Trade Center', district: 'Floor 25', city: 'New York', isDefault: false }
  ];

  return (
    <>
      <SavedAddressHeader onAddAddress={addressModal.open} />

      <SavedAddressGrid
        addresses={savedAddresses}
        onDeleteAddress={deleteModal.open}
        onEditAddress={addressModal.open}
        onSetDefaultAddress={(addressId) => console.log('Set default', addressId)}
      />

      <AddressFormModal isOpen={addressModal.isOpen} onClose={addressModal.close} initialData={null} />

      <AddressDeleteModal isOpen={deleteModal.isOpen} onClose={deleteModal.close} />
    </>
  );
}

export default AccountAddressPage;
