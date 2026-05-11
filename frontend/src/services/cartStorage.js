const CART_STORAGE_KEY = 'perfume_store_cart';

/**
 * @description: Reads cart items from localStorage and returns a safe array.
 * @returns {import('../features/cart/types').CartStorageItem[]} items - Example: [{ volumePerfumeId: 10, quantity: 2 }]
 */
const readCartItems = () => {
  if (typeof localStorage === 'undefined') {
    return [];
  }

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }

    if (parsed && Array.isArray(parsed.items)) {
      return parsed.items;
    }

    return [];
  } catch (error) {
    return [];
  }
};

/**
 * @description: Persists cart items to localStorage.
 * @param {import('../features/cart/types').CartStorageItem[]} items - Example: [{ volumePerfumeId: 10, quantity: 2 }]
 * @returns {void} - cart stored in localStorage
 */
const writeCartItems = (items) => {
  if (typeof localStorage === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items }));
  } catch (error) {
    return;
  }
};

export { readCartItems, writeCartItems };
