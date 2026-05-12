import { apiClient } from '../services';

const ADDRESS_PROVINCES_CACHE_KEY = 'addressProvinces';

/**
 * @description: Reads cached province data from localStorage when available.
 * @returns {Record<string, string[]> | null} provinces - Example: { "City": ["Ward"] }
 */
export const readCachedProvinces = () => {
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
export const writeCachedProvinces = (provinces) => {
  if (typeof localStorage === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(ADDRESS_PROVINCES_CACHE_KEY, JSON.stringify(provinces));
  } catch (error) {
    return;
  }
};

/**
 * @description: Loads province data from cache or API.
 * @flow: Check localStorage -> Fetch /address/provinces -> Return data.
 * @returns {Promise<Record<string, string[]>>} provinces - Example: { "City": ["Ward"] }
 */
export const loadProvinces = async () => {
  const cached = readCachedProvinces();
  if (cached) {
    return cached;
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

    writeCachedProvinces(provinces);
    return provinces;
  } catch (error) {
    return {};
  }
};
