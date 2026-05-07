import AddressCard from './AddressCard.jsx';

function SavedAddressGrid({
  addresses,
  onEditAddress,
  onDeleteAddress,
  onSetDefaultAddress
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          isDefault={address.isDefault}
          onDelete={onDeleteAddress}
          onEdit={onEditAddress}
          onSetDefault={() => onSetDefaultAddress(address.id)}
        />
      ))}
    </div>
  );
}

export default SavedAddressGrid;