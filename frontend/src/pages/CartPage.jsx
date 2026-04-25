import { Link } from 'react-router-dom';

const cartItems = [
  {
    name: 'Bergamot & Oud',
    volume: 'Eau de Parfum - 50ml',
    dataAlt:
      'High contrast studio shot of a minimalist geometric glass perfume bottle containing dark amber liquid, casting sharp shadows on a pure white surface.',
    description: 'A profound exploration of sharp citrus cutting through dense, ancient resin.',
    quantity: 1,
    price: '$185.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDEGjucPTtS1J5f7-_4KmNwreErBuPE3fYP01LRidkJQSIuOC9Zaq0CK-AlKX5mecg2xN45HfrHzwaI-DU_hXGnf9mjCBIU77dEh7BE5sUBu0I9Ujv7GSwPQX5K_YwhzmIuq0ev_H8TCj7vFtWu0ZUNSY3c2NSoSts7h2LTxLAnTFVmeVgrt3rcV4cPv8flQ9dmraApN0zLyNPXoMzqCFN_30dlJd_o74li3x9xtJKtftF20_4S5xLz3rfDvm9SGJDOECIHrrOmNQk'
  },
  {
    name: 'White Vetiver',
    volume: 'Extrait de Parfum - 30ml',
    dataAlt:
      'Minimalist top-down view of a frosted white cylindrical perfume bottle lying on a textured grey concrete surface with a single dried leaf.',
    description: 'Crisp, cold earth notes distilled into a translucent essence.',
    quantity: 2,
    price: '$420.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCyh5EO_UceAw-BP3doChL4Dh6rAUwNrMfFB6DFN3nqr94yvO36LwffBvK0zh1vfmFKgv4ocMVFVeese-uvKhDBAzLSAHYUWPdEEXYaStZYjxdMCNgQnp-zpf6EKBzdd2vSbof5yZF0_XQmAKyRvIH7z1Iv76eeLpmBJCI30KIRvt81izLeNjjTzpegDP3pQjr1e43DK0BMDxe60v6pdwf4JcrWm7Au4EAZRULeH08vFQ1ThtjhCr-tWEOVok0dAdG6c2AOw0kq8v8'
  }
];

function CartPage() {
  return (
    <div className="container mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row gap-24">
      <section className="w-full md:w-2/3">
        <header className="mb-12">
          <h1 className="font-headline text-4xl italic text-on-background">Your Cart</h1>
          <p className="font-label uppercase tracking-[0.1em] text-[10px] text-on-surface-variant mt-4">2 Items</p>
        </header>
        <div className="flex flex-col gap-12">
          {cartItems.map((item) => (
            <div key={item.name} className="flex flex-col sm:flex-row gap-8 items-start relative group">
              <div className="w-full sm:w-48 aspect-square bg-surface-container-lowest p-4 relative overflow-hidden flex-shrink-0 rounded-[2rem]">
                <img
                  alt={item.name}
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-700 rounded-[1.5rem]"
                  data-alt={item.dataAlt}
                  src={item.image}
                />
              </div>
              <div className="flex flex-col flex-grow w-full">
                <div className="flex justify-between items-start w-full">
                  <div>
                    <h3 className="font-headline text-2xl text-on-background mb-2">{item.name}</h3>
                    <p className="font-body text-sm text-on-surface-variant max-w-sm mb-4">{item.description}</p>
                    <span className="inline-block bg-secondary-container text-on-secondary-container font-label uppercase text-[9px] tracking-[0.1em] px-3 py-1 mb-6 rounded-full">
                      {item.volume}
                    </span>
                  </div>
                  <button className="text-on-surface-variant hover:text-error transition-colors rounded-full" type="button">
                    <span className="material-symbols-outlined text-sm" data-icon="close">
                      close
                    </span>
                  </button>
                </div>
                <div className="flex justify-between items-end mt-auto pt-4">
                  <div className="flex items-center border-b border-outline-variant/30 pb-1">
                    <button className="text-on-surface-variant hover:text-on-background px-2 text-lg leading-none rounded-full" type="button">
                      -
                    </button>
                    <input
                      aria-label={`${item.name} quantity`}
                      className="w-12 text-center bg-transparent border-none p-0 text-sm font-label focus:ring-0 focus:outline-none"
                      min="1"
                      readOnly
                      type="number"
                      value={item.quantity}
                    />
                    <button className="text-on-surface-variant hover:text-on-background px-2 text-lg leading-none rounded-full" type="button">
                      +
                    </button>
                  </div>
                  <span className="font-body text-lg text-on-background">{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <aside className="w-full md:w-1/3 pt-4 md:pt-0">
        <div className="bg-surface-container-low p-8 sticky top-32 rounded-[2rem]">
          <h2 className="font-headline text-xl mb-8 text-on-background border-b border-outline-variant/30 pb-4">Summary</h2>
          <div className="flex flex-col gap-4 font-body text-sm text-on-surface-variant mb-8">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-on-background">$605.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-on-background">Calculated at next step</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="text-on-background">Calculated at next step</span>
            </div>
          </div>
          <div className="flex justify-between items-end mb-10 border-t border-outline-variant/30 pt-6">
            <span className="font-headline text-lg text-on-background">Total</span>
            <span className="font-headline text-2xl text-on-background">$605.00</span>
          </div>
          <Link className="w-full bg-primary text-on-primary py-5 font-label uppercase tracking-[0.2em] text-[10px] hover:bg-secondary transition-colors duration-300 rounded-[2rem] inline-flex items-center justify-center" to="/checkout">
            Proceed to Checkout
          </Link>
          <p className="font-body text-xs text-on-surface-variant text-center mt-6">Complimentary shipping on orders over $250.</p>
        </div>
      </aside>
    </div>
  );
}

export default CartPage;