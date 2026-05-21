import AddressCard from './AddressCard.jsx';

/** @typedef {import('../types').AddressItem} AddressItem */

/**
 * @description: Renders a grid of saved address cards for the account page.
 * @param {Object} props
 * @param {AddressItem[]} props.addresses
 * @param {Function} props.onEditAddress
 * @param {Function} props.onDeleteAddress
 */
function SavedAddressGrid({ addresses, onEditAddress, onDeleteAddress }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          onDelete={() => onDeleteAddress(address)}
          onEdit={() => onEditAddress(address)}
        />
      ))}
    </div>
  );
}

export default SavedAddressGrid;
