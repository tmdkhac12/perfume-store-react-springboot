import { useEffect, useMemo, useState } from 'react';
import { apiClient } from '../../../services';

const ADDRESS_PROVINCES_CACHE_KEY = 'addressProvinces';

/**
 * @description: Reads cached province data from localStorage when available.
 * @returns {Record<string, string[]> | null} provinces - Example: { "City": ["Ward"] }
 */
const readCachedProvinces = () => {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  try {
    const raw = localStorage.getItem(ADDRESS_PROVINCES_CACHE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return null;
    }

    return parsed;
  } catch (error) {
    return null;
  }
};

/**
 * @description: Stores province data in localStorage for reuse.
 * @param {Record<string, string[]>} provinces - Example: { "City": ["Ward"] }
 * @returns {void}
 */
const writeCachedProvinces = (provinces) => {
  if (typeof localStorage === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(ADDRESS_PROVINCES_CACHE_KEY, JSON.stringify(provinces));
  } catch (error) {
    return;
  }
};

/** @description: Address modal for adding a new checkout shipping address. */
function AddressModal({ isOpen, onClose, onSubmit, isSaving = false }) {
  if (!isOpen) return null;

  const [provinceMap, setProvinceMap] = useState({});
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  /**
   * @description: Loads province data from cache or API and stores it for reuse.
   * @flow: Check localStorage -> Fetch /address/provinces -> Cache response.
   */
  const loadProvinces = async () => {
    const cached = readCachedProvinces();
    if (cached) {
      setProvinceMap(cached);
      return;
    }

    try {
      const response = await apiClient.get('/address/provinces');
      const isErrorResponse = !response || response.error || response.status >= 400;

      if (isErrorResponse) {
        throw new Error(response?.message || 'Unable to load provinces.');
      }

      const provinces = response?.data;
      if (!provinces || typeof provinces !== 'object') {
        throw new Error('Invalid provinces response.');
      }

      setProvinceMap(provinces);
      writeCachedProvinces(provinces);
    } catch (error) {
      setProvinceMap({});
    }
  };

  useEffect(() => {
    void loadProvinces();
  }, []);

  const cityOptions = useMemo(() => Object.keys(provinceMap), [provinceMap]);
  const wardOptions = useMemo(() => {
    if (!selectedCity) {
      return [];
    }

    const wards = provinceMap[selectedCity];
    return Array.isArray(wards) ? wards : [];
  }, [provinceMap, selectedCity]);

  useEffect(() => {
    if (!selectedCity) {
      setSelectedWard('');
      return;
    }

    if (!wardOptions.length) {
      setSelectedWard('');
      return;
    }

    if (!wardOptions.includes(selectedWard)) {
      setSelectedWard(wardOptions[0]);
    }
  }, [wardOptions, selectedCity, selectedWard]);

  /**
   * @description: Builds form values from the modal fields.
   * @param {FormData} formData - Example: new FormData(formElement)
   * @returns {import('../types').CheckoutAddressFormValues} values - Example: { receiver: "Jane" }
   */
  const buildFormValues = (formData) => ({
    receiver: String(formData.get('receiver') || ''),
    phoneNumber: String(formData.get('phoneNumber') || ''),
    cityName: String(formData.get('cityName') || ''),
    wardName: String(formData.get('wardName') || ''),
    deliveryAddress: String(formData.get('deliveryAddress') || '')
  });

  /**
   * @description: Submits the new address form values to the parent handler.
   * @flow: Submit form -> Build values -> Trigger onSubmit.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!onSubmit) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const values = buildFormValues(formData);
    onSubmit(values);
  };

  const isFormDisabled = !onSubmit || isSaving;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-surface-container-lowest rounded-[40px] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-8 py-6 border-b border-outline-variant/30 flex justify-between items-center sticky top-0 bg-surface-container-lowest z-10">
          <h3 className="font-headline text-2xl text-on-background">Add New Address</h3>
          <button className="text-on-surface-variant hover:text-on-background transition-colors" onClick={onClose} type="button">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-8 overflow-y-auto">
          <form className="space-y-6" id="checkout_address_form" onSubmit={handleSubmit}>
            <div>
              <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="new_receiver">Receiver Name</label>
              <input
                className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300"
                id="new_receiver"
                name="receiver"
                placeholder="John Doe"
                type="text"
                disabled={isFormDisabled}
              />
            </div>
            <div>
              <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="new_phone">Phone Number</label>
              <input
                className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300"
                id="new_phone"
                name="phoneNumber"
                placeholder="+1 (555) 000-0000"
                type="tel"
                disabled={isFormDisabled}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="new_city">City</label>
                <select
                  className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300"
                  id="new_city"
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
                <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="new_ward">Ward/District</label>
                <select
                  className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300"
                  id="new_ward"
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
              <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="new_address">Delivery Address</label>
              <input
                className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300"
                id="new_address"
                name="deliveryAddress"
                placeholder="123 Perfume Lane, Apt 4B"
                type="text"
                disabled={isFormDisabled}
              />
            </div>
          </form>
        </div>
        <div className="px-8 py-6 border-t border-outline-variant/30 bg-surface-container-lowest sticky bottom-0 z-10 flex justify-end gap-4">
          <button className="px-8 py-4 rounded-[40px] font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant hover:bg-surface-container transition-colors" onClick={onClose} type="button">Cancel</button>
          <button
            className="bg-accent text-on-primary px-8 py-4 rounded-[40px] font-label text-sm uppercase tracking-[0.1em] hover:bg-black transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            form="checkout_address_form"
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

export default AddressModal;
