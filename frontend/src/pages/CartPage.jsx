import { Link } from 'react-router-dom';
import { CartItem, CartSummary } from '../features/cart/components';

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
            <CartItem key={item.name} item={item} />
          ))}
        </div>
      </section>
      <aside className="w-full md:w-1/3 pt-4 md:pt-0">
        <CartSummary />
      </aside>
    </div>
  );
}

export default CartPage;