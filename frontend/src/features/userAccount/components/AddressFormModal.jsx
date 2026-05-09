import { useEffect, useMemo, useState } from 'react';
import { apiClient } from '../../../services';

/** @typedef {import('../types').AddressFormValues} AddressFormValues */

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

/** @description: Modal form for creating or editing a delivery address. */
function AddressFormModal({ isOpen, onClose, initialData = null, onSubmit, isSaving = false }) {
  if (!isOpen) return null;

  const [provinceMap, setProvinceMap] = useState({});
  const [selectedCity, setSelectedCity] = useState(initialData?.city || '');
  const [selectedDistrict, setSelectedDistrict] = useState(initialData?.district || '');

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

  // Use effect to load province
  useEffect(() => {
    void loadProvinces();
  }, []);

  // Use effect to update selected city and district, used for sync modal 
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setSelectedCity(initialData?.city || '');
    setSelectedDistrict(initialData?.district || '');
  }, [initialData, isOpen]);

  const cityOptions = useMemo(() => Object.keys(provinceMap), [provinceMap]);
  const districtOptions = useMemo(() => {
    if (!selectedCity) {
      return [];
    }

    const wards = provinceMap[selectedCity];
    return Array.isArray(wards) ? wards : [];
  }, [provinceMap, selectedCity]);

  useEffect(() => {
    if (!selectedCity) {
      setSelectedDistrict('');
      return;
    }

    if (!districtOptions.length) {
      setSelectedDistrict('');
      return;
    }

    if (!districtOptions.includes(selectedDistrict)) {
      setSelectedDistrict(districtOptions[0]);
    }
  }, [districtOptions, selectedCity, selectedDistrict]);

  /**
   * @description: Extracts address values from the submitted form fields.
   * @param {FormData} formData - Example: new FormData(formElement)
   * @returns {AddressFormValues} values - Example: { receiver: "Jane", phone: "123" }
   */
  const buildFormValues = (formData) => ({
    receiver: String(formData.get('receiver') || ''),
    phone: String(formData.get('phone') || ''),
    city: String(formData.get('city') || ''),
    district: String(formData.get('district') || ''),
    street: String(formData.get('address') || '')
  });

  /**
   * @description: Handles address form submission and forwards values to the parent handler.
   * @param {Event} event - Example: submit event
   * @returns {void} - triggers the onSubmit callback with normalized values
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-[40px] bg-surface-container-lowest shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-outline-variant/30 bg-surface-container-lowest px-8 py-6">
          <h3 className="font-headline text-2xl text-on-background">
            {initialData ? 'Edit Address' : 'Add New Address'}
          </h3>
          <button
            className="text-on-surface-variant transition-colors hover:text-on-background"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="overflow-y-auto p-8">
          <form className="space-y-6" id="address-form" onSubmit={handleSubmit}>
            <div>
              <label className="mb-3 block text-sm uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="receiver">
                Receiver Name
              </label>
              <input
                className="w-full rounded-[40px] border border-outline-variant/30 bg-surface-container px-6 py-4 text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
                id="receiver"
                name="receiver"
                placeholder="John Doe"
                defaultValue={initialData?.receiver || ''}
                type="text"
                disabled={isFormDisabled}
              />
            </div>

            <div>
              <label className="mb-3 block text-sm uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="phone">
                Phone Number
              </label>
              <input
                className="w-full rounded-[40px] border border-outline-variant/30 bg-surface-container px-6 py-4 text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
                id="phone"
                name="phone"
                placeholder="+1 (555) 000-0000"
                defaultValue={initialData?.phone || ''}
                type="tel"
                disabled={isFormDisabled}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="city">
                  City
                </label>
                <select
                  className="w-full rounded-[40px] border border-outline-variant/30 bg-surface-container px-6 py-4 text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
                  id="city"
                  name="city"
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
                <label className="mb-3 block text-sm uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="district">
                  Ward/District
                </label>
                <select
                  className="w-full rounded-[40px] border border-outline-variant/30 bg-surface-container px-6 py-4 text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
                  id="district"
                  name="district"
                  value={selectedDistrict}
                  disabled={isFormDisabled || !selectedCity}
                  onChange={(event) => setSelectedDistrict(event.target.value)}
                >
                  <option value="">Select ward</option>
                  {districtOptions.map((ward) => (
                    <option key={ward} value={ward}>
                      {ward}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="address">
                Delivery Address
              </label>
              <input
                className="w-full rounded-[40px] border border-outline-variant/30 bg-surface-container px-6 py-4 text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
                id="address"
                name="address"
                placeholder="123 Perfume Lane, Apt 4B"
                defaultValue={initialData?.street || ''}
                type="text"
                disabled={isFormDisabled}
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-10 flex justify-end gap-4 border-t border-outline-variant/30 bg-surface-container-lowest px-8 py-6">
          <button
            className="rounded-[40px] px-8 py-4 text-sm uppercase tracking-[0.1em] text-on-surface-variant transition-colors hover:bg-surface-container"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="rounded-[40px] bg-primary px-8 py-4 text-sm uppercase tracking-[0.1em] text-on-primary transition-colors hover:bg-secondary"
            form="address-form"
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