import { useEffect, useMemo, useState } from 'react';
import { loadProvinces } from '../../utils';

/** @description: Unified address form modal for adding or editing shipping addresses. */
function AddressFormModal({ isOpen, onClose, initialData = null, onSubmit, isSaving = false }) {
  if (!isOpen) return null;

  const [provinceMap, setProvinceMap] = useState({});
  const [selectedCity, setSelectedCity] = useState(initialData?.cityName || '');
  const [selectedWard, setSelectedWard] = useState(initialData?.wardName || '');

  /**
   * @description: Loads province data from utility and updates state.
   * @flow: Call loadProvinces -> Update provinceMap state.
   */
  const handleLoadProvinces = async () => {
    const provinces = await loadProvinces();
    setProvinceMap(provinces);
  };

  useEffect(() => {
    void handleLoadProvinces();
  }, []);

  // Sync state with initialData when modal opens or initialData changes
  useEffect(() => {
    if (!isOpen) return;
    setSelectedCity(initialData?.cityName || '');
    setSelectedWard(initialData?.wardName || '');
  }, [initialData, isOpen]);

  const cityOptions = useMemo(() => Object.keys(provinceMap), [provinceMap]);
  const wardOptions = useMemo(() => {
    if (!selectedCity) return [];
    const wards = provinceMap[selectedCity];
    return Array.isArray(wards) ? wards : [];
  }, [provinceMap, selectedCity]);

  // Update selected ward when city changes or options change
  useEffect(() => {
    if (!selectedCity || !wardOptions.length) {
      setSelectedWard('');
      return;
    }

    if (!wardOptions.includes(selectedWard)) {
      setSelectedWard(wardOptions[0]);
    }
  }, [wardOptions, selectedCity, selectedWard]);

  /**
   * @description: Builds standardized form values from form data.
   * @param {FormData} formData - Example: new FormData(formElement)
   * @returns {import('../../features/userAccount/types').AddressFormValues} values - Example: { receiver: "Jane" }
   */
  const buildFormValues = (formData) => ({
    receiver: String(formData.get('receiver') || ''),
    phoneNumber: String(formData.get('phoneNumber') || ''),
    cityName: String(formData.get('cityName') || ''),
    wardName: String(formData.get('wardName') || ''),
    deliveryAddress: String(formData.get('deliveryAddress') || '')
  });

  /**
   * @description: Handles form submission and triggers onSubmit callback.
   * @param {React.FormEvent<HTMLFormElement>} event - Example: submit event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!onSubmit) return;

    const formData = new FormData(event.currentTarget);
    const values = buildFormValues(formData);
    onSubmit(values);
  };

  const isFormDisabled = !onSubmit || isSaving;
  const modalTitle = initialData ? 'Edit Address' : 'Add New Address';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-surface-container-lowest rounded-[40px] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-8 py-6 border-b border-outline-variant/30 flex justify-between items-center sticky top-0 bg-surface-container-lowest z-10">
          <h3 className="font-headline text-2xl text-on-background">{modalTitle}</h3>
          <button className="text-on-surface-variant hover:text-on-background transition-colors" onClick={onClose} type="button">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto">
          <form className="space-y-6" id="shared_address_form" onSubmit={handleSubmit}>
            <div>
              <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="receiver">Receiver Name</label>
              <input
                className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300"
                id="receiver"
                name="receiver"
                placeholder="John Doe"
                defaultValue={initialData?.receiver || ''}
                type="text"
                disabled={isFormDisabled}
              />
            </div>
            <div>
              <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="phone">Phone Number</label>
              <input
                className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300"
                id="phone"
                name="phoneNumber"
                placeholder="+1 (555) 000-0000"
                defaultValue={initialData?.phoneNumber || ''}
                type="tel"
                disabled={isFormDisabled}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="city">City</label>
                <select
                  className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300"
                  id="city"
                  name="cityName"
                  value={selectedCity}
                  disabled={isFormDisabled}
                  onChange={(event) => setSelectedCity(event.target.value)}
                >
                  <option value="">Select city</option>
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="ward">Ward/District</label>
                <select
                  className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300"
                  id="ward"
                  name="wardName"
                  value={selectedWard}
                  disabled={isFormDisabled || !selectedCity}
                  onChange={(event) => setSelectedWard(event.target.value)}
                >
                  <option value="">Select ward</option>
                  {wardOptions.map((ward) => (
                    <option key={ward} value={ward}>
                      {ward}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="address">Delivery Address</label>
              <input
                className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300"
                id="address"
                name="deliveryAddress"
                placeholder="123 Perfume Lane, Apt 4B"
                defaultValue={initialData?.deliveryAddress || ''}
                type="text"
                disabled={isFormDisabled}
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-outline-variant/30 bg-surface-container-lowest sticky bottom-0 z-10 flex justify-end gap-4">
          <button className="px-8 py-4 rounded-[40px] font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant hover:bg-surface-container transition-colors" onClick={onClose} type="button">Cancel</button>
          <button
            className="bg-accent text-on-primary px-8 py-4 rounded-[40px] font-label text-sm uppercase tracking-[0.1em] hover:bg-black transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            form="shared_address_form"
            type="submit"
            disabled={isFormDisabled}
          >
            {isSaving ? 'Saving...' : 'Save Address'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressFormModal;
