const orderDetailItems = [
  {
    name: 'Oud Nuit',
    details: '50ml Eau de Parfum',
    qty: '1',
    price: '$220.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBM91OUusxpEi7OZfc5_kg8RR1Z7i8UZbVAZLaskzE1quxKthHNRacpWw065TN-kcsDLHNCjdvvXweQHrG4gdzJZP_65pT2fc-NavlFHB0YKYQGJtm1SG_e5cbB4Uo02hsyj0Ph069jsOwXyMyUT9CsTakcZ7-dnt2RIefh_SkE0FOD5ISq7V2u_N4KisVeOQybk4lzlh2zwcba7wsFyDjFSdeoDqluHHjiQTCiEKGwYnqgWmxkMppFwNrUy46Z2nLl8doVDqxUOvY'
  },
  {
    name: 'Bergamot Blanche',
    details: '30ml Eau de Toilette',
    qty: '1',
    price: '$95.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAn-PoT_zh-tnXPrGeWX8UcwXQxUlzVLbJmTpSu4I-KvEhr_pM-mRnvuWbwsl6ZyZYkcrHjrUdL9fhNW-nGXI-VZGANs8FX7M8olh0JoxEXM0x2R8HnrTafyN9k1SioLWvU3tmzPoBM6Jv3DV1VwkIuKRv1VcnyLKEeHZDqSjYtiOJR3FpCHPN0q6HltjCVYm47CmCRfbX4cgC5dP523rwHX8VXf2MiQmjuSeVDH6u0_eUSWLvYMYvmncjuMCNuX6jqvwIezyx6rtY'
  }
];

function OrderDetailsModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-on-background/40 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-surface-container-lowest shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-surface-variant bg-surface-container-lowest px-8 py-6">
          <div>
            <h3 className="mb-1 font-headline text-2xl text-on-surface">Order #LE-8492</h3>
            <p className="text-sm text-on-surface-variant">Placed on October 12, 2023</p>
          </div>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        <div className="grid flex-1 gap-8 overflow-y-auto bg-background p-8 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-surface-variant/50 bg-surface-container-lowest p-6 shadow-sm">
              <h5 className="mb-4 border-b border-surface-variant pb-2 text-sm uppercase tracking-wider text-on-surface">
                Delivery Details
              </h5>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="mb-1 block text-xs text-on-surface-variant">Receiver Name</span>
                  <span className="font-medium text-on-surface">Julianne V.</span>
                </div>
                <div>
                  <span className="mb-1 block text-xs text-on-surface-variant">Phone Number</span>
                  <span className="text-on-surface">+1 555-0198</span>
                </div>
                <div>
                  <span className="mb-1 block text-xs text-on-surface-variant">Shipping Address</span>
                  <span className="text-on-surface">
                    123 Luxury Lane
                    <br />
                    Beverly Hills, CA 90210
                  </span>
                </div>
                <div>
                  <span className="mb-1 block text-xs text-on-surface-variant">Delivery Status</span>
                  <span className="mt-1 inline-block rounded-full bg-surface-container-high px-2 py-0.5 text-[10px] uppercase tracking-wider text-on-surface">
                    Delivered
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-surface-variant/50 bg-surface-container-lowest p-6 shadow-sm">
              <h5 className="mb-4 border-b border-surface-variant pb-2 text-sm uppercase tracking-wider text-on-surface">
                Payment Details
              </h5>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="mb-1 block text-xs text-on-surface-variant">Payment Method</span>
                  <span className="text-on-surface">Credit Card ending in 4242</span>
                </div>
                <div>
                  <span className="mb-1 block text-xs text-on-surface-variant">Total Amount</span>
                  <span className="font-headline text-lg text-on-surface">$345.00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h5 className="mb-2 text-sm uppercase tracking-wider text-on-surface">Order Items</h5>

            {orderDetailItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-4 rounded-3xl border border-surface-variant/50 bg-surface-container-lowest p-4 shadow-sm"
              >
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-surface-container-low">
                  <img alt={item.name} className="h-full w-full object-cover" src={item.image} />
                </div>
                <div className="flex-1">
                  <h4 className="font-headline text-base text-on-surface">{item.name}</h4>
                  <p className="mt-1 text-xs text-on-surface-variant">{item.details}</p>
                </div>
                <div className="text-right">
                  <p className="mb-1 text-xs text-on-surface-variant">Qty: {item.qty}</p>
                  <p className="font-headline text-base text-on-surface">{item.price}</p>
                </div>
              </div>
            ))}

            <div className="mt-2 rounded-3xl border border-surface-variant/50 bg-surface-container-lowest p-6 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-on-surface-variant">Subtotal</span>
                <span className="text-sm text-on-surface">$315.00</span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-on-surface-variant">Shipping</span>
                <span className="text-sm text-on-surface">$15.00</span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-on-surface-variant">Tax</span>
                <span className="text-sm text-on-surface">$15.00</span>
              </div>
              <div className="flex items-center justify-between border-t border-surface-variant pt-4">
                <span className="font-headline text-lg text-on-surface">Total</span>
                <span className="font-headline text-xl text-on-surface">$345.00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-surface-variant bg-surface-container-lowest px-8 py-6">
          <button
            className="rounded-full border border-transparent bg-black px-8 py-3 text-sm uppercase tracking-wider text-white transition-all duration-300 hover:border-black hover:bg-white hover:text-black"
            onClick={onClose}
            type="button"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsModal;