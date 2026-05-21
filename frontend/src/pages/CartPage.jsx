import { useEffect, useMemo, useState } from 'react';
import { CartItem, CartSummary } from '../features/cart/components';
import { readCartItems, writeCartItems } from '../services';

/**
 * @description: Formats a numeric value into a USD currency string.
 * @param {number} value - Example: 120
 * @returns {string} formatted - Example: "$120.00"
 */
const formatCurrency = (value) => {
  if (Number.isNaN(value)) {
    return '$0.00';
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

/**
 * @description: Normalizes raw cart data for UI rendering in the cart page.
 * @param {import('../features/cart/types').CartStorageItem} raw - Example: { name: "Perfume", quantity: 1 }
 * @param {number} index - Example: 0
 * @returns {import('../features/cart/types').CartViewItem} item - Example: { name: "Perfume", price: "$120.00" }
 */
const normalizeCartItem = (raw, index) => {
  const quantity = Number(raw?.quantity) > 0 ? Number(raw.quantity) : 1;
  const priceValue = Number(raw?.price ?? raw?.unitPrice ?? raw?.minPrice ?? 0);
  const volumeValue = raw?.volume;
  const volumeLabel =
    typeof volumeValue === 'number' ? `${volumeValue}ml` : volumeValue || 'Selected volume';

  console.log(raw);

  return {
    id: raw?.volumePerfumeId ?? raw?.id ?? index + 1,
    volumePerfumeId: raw?.volumePerfumeId ?? null,
    perfumeId: raw?.perfumeId ?? null,
    name: raw?.name || 'Perfume Item',
    description: raw?.description || 'Signature fragrance selection.',
    concentration: raw?.concentration || 'Eau de Parfum',
    image: raw?.image || '',
    dataAlt: raw?.dataAlt || raw?.imageAlt || 'Perfume product image',
    volume: volumeLabel,
    quantity,
    priceValue,
    price: formatCurrency(priceValue)
  };
};

/** @description: Cart page that renders items stored in localStorage. */
function CartPage() {
  /** @type {[import('../features/cart/types').CartViewItem[], Function]} */
  const [items, setItems] = useState([]);

  /**
   * @description: Loads the cart contents from localStorage into component state.
   * @flow: Read localStorage -> Normalize data -> Update cart UI.
   */
  const loadCartItems = () => {
    const storedItems = readCartItems();
    const normalizedItems = storedItems.map(normalizeCartItem);
    setItems(normalizedItems);
  };

  /**
   * @description: Persists cart items after quantity changes.
   * @param {import('../features/cart/types').CartViewItem[]} nextItems - Example: [{ volumePerfumeId: 10, quantity: 2 }]
   * @returns {void} - cart state updated and stored
   */
  const syncCartStorage = (nextItems) => {
    /** @type {import('../features/cart/types').CartStorageItem[]} */
    const payloadItems = nextItems.map((item) => ({
      volumePerfumeId: item.volumePerfumeId ?? item.id ?? null,
      perfumeId: item.perfumeId ?? null,
      name: item.name,
      description: item.description,
      concentration: item.concentration,
      volume: item.volume,
      price: item.priceValue,
      quantity: item.quantity,
      image: item.image,
      dataAlt: item.dataAlt
    }));

    writeCartItems(payloadItems);
  };

  /**
   * @description: Updates the quantity of a cart item and refreshes totals.
   * @param {number} itemId - Example: 10
   * @param {number} delta - Example: 1
   * @returns {void} - cart quantity updated and stored
   */
  const handleQuantityChange = (itemId, delta) => {
    setItems((current) => {
      const nextItems = current.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        const nextQuantity = Math.max(1, (Number(item.quantity) || 1) + delta);
        return { ...item, quantity: nextQuantity };
      });

      syncCartStorage(nextItems);
      return nextItems;
    });
  };

  /**
   * @description: Removes a cart item and syncs the updated list to storage.
   * @param {number} itemId - Example: 10
   * @returns {void} - cart item removed and stored
   */
  const handleRemoveItem = (itemId) => {
    setItems((current) => {
      const nextItems = current.filter((item) => item.id !== itemId);
      syncCartStorage(nextItems);
      return nextItems;
    });
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  const cartItemCount = useMemo(
    () => items.reduce((total, item) => total + (item.quantity || 0), 0),
    [items]
  );
  const subtotalValue = useMemo(
    () => items.reduce((total, item) => total + (item.priceValue || 0) * (item.quantity || 0), 0),
    [items]
  );
  const formattedSubtotal = formatCurrency(subtotalValue);
  const hasItems = items.length > 0;

  return (
    <div className="container mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row gap-24">
      <section className="w-full md:w-2/3">
        <header className="mb-12">
          <h1 className="font-headline text-4xl italic text-on-background">Your Cart</h1>
          <p className="font-label uppercase tracking-[0.1em] text-[10px] text-on-surface-variant mt-4">
            {cartItemCount} Items
          </p>
        </header>
        <div className="flex flex-col gap-12">
          {hasItems ? (
            items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onDecrease={() => handleQuantityChange(item.id, -1)}
                onIncrease={() => handleQuantityChange(item.id, 1)}
                onRemove={() => handleRemoveItem(item.id)}
              />
            ))
          ) : (
            <p className="text-sm text-on-surface-variant">Your cart is currently empty.</p>
          )}
        </div>
      </section>
      <aside className="w-full md:w-1/3 pt-4 md:pt-0">
        <CartSummary
          itemCount={cartItemCount}
          subtotal={formattedSubtotal}
          total={formattedSubtotal}
        />
      </aside>
    </div>
  );
}

export default CartPage;
