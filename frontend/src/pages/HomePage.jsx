import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'Men',
    alt: 'Men Collection',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuANnx7T7DuNHsFMswLEnBo9pDBVunOE-64FDPC0vbGecrfBLgwPkSk-r4eY-lfWCAsuh8Q4Mp6jIJmsDa9JfPCgnIkYiFr4757D1RfEKfd88mnxMLXDGyWvCkCVlyx1gKdbk5j5Tk8H56EyigAY9CZ2TdryuuGXknA7vE4GKq93JgvBN_uUzuCWq060FVS_2ckVH6pdFGseP3If9m5tphJVys3FRetGbSsVuORbqCufUVyUrMFtQkgWypWphzceLsm9YZnOGsO3gaw'
  },
  {
    title: 'Women',
    alt: 'Women Collection',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBXToSHGV8-wZbdnQdFIkXy9jv2shijoaLf9UxsvAbbSnytRXfYeRziNXiiu-mpuPToeMIi5GytfuHXp5-MALXzH_2yo6AJhB6tNONt9jDPkbbcoDjMIfr8uYYhFw778_2yPoY-q2E1kmtRE4IjF-KZsMZDkO-F5XLS_svnQ326BNBHP8rOdU_bKT-Yd8AhZ8W7UdoZFLIazoccAjAIoGMtJOSQoTXKXqFgCPRjMeF9sq8oztcWpmDfIQZn4fZ3HICXnRDaY7BtsoI'
  },
  {
    title: 'Unisex',
    alt: 'Unisex Collection',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJQ4Wd84JT2JgUlBvKE-XFX3-253U301s72mzhrlBe2yApdsZB4MxcRxg9BiNv6rnUkvt4X8WrWScS_O010T9FnHdGR-K9VkkN6JWACovX_YcVLP4LDy6INYAi5AjpoMrDtXLlXZz-Z80tpCGJGdcUBIO-gefYsbaKRGvc8XN6RmWGpANFzOP5jUQ4pvppd-XDgs9ViugUxt45KfQLw-zYnHn_opw7mtsl1De_OclY671KZX6b3oMpRTISY79TBHgZbAjIcX8GX5Q'
  }
];

const bestSellers = [
  {
    name: 'Rose Noire',
    alt: 'Rose Noire',
    dataAlt: 'Dark rose perfume bottle',
    price: '$240',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCe5fBY5aeruXXx8ynpRc-gr07BMZcSzKiTsm9hlLwT6cDe7yUxZkdF8ata9480BV62JrnrRU1Krn6TBjSpr0k-LPK6YV9-Jpc4YQi-Oh-AM9K7CcHY36v-YhZ01fwTpnwVCrefIPg67afyNVpYqilLnCWGC9RTt0eA3aE2AQKuzvZ773THRMSPEvYR1ZGE6h-xFPd1b1NCq565-oAy-TrvcrWXgLgPZKU40qvxtdvQ1J3LPN1EJBMwJcars6UO5DSb1y9pbT4s1qc'
  },
  {
    name: 'Vetiver Infini',
    alt: 'Vetiver Infini',
    dataAlt: 'Green tinted perfume bottle',
    price: '$195',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDG_Mv3xw6tvXY3Au6h5Q4Tl1OQXFosOp76zTUgrI6MVnEhtn8xV10zBsKnZQJnvJ72UFuwXCa_U-qTzZkirNKS1oDwCrqCnl-ItrOVOX34eEOfFqJAMyjM5d7wjkfrbxuyxXvvPVmx3Z6ZzAo0oU5RIzHl0iHtJ8XXl25zn2F1lYwTdXcp33NVAjfrNVMLjZBtQBPYA6rLVyrfXNb3z2YB2eVsWcFsm1LBbokxU1ms8YQGRVSaw4BwkDKUK9V8pqvExvLG07P4Gcg'
  },
  {
    name: "Ambre d'Or",
    alt: "Ambre d'Or",
    dataAlt: 'Golden amber perfume bottle',
    price: '$225',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAC3FaRDFlxGC7qQk9kQIfXhxNh20sex2aF3GSSVMa1bc1LlBm5i6jRw2CjmAikhmcx2-1bCIvNHXJGzPebwU9FR-6HLvxKEshACu6UafD23gXiWotQ8hPMDZo96-8mPFkzxQgiwEFtWqlYwTl51wPAzkO3SV9o_3ajYjJ_fOjDUJtIKpsnXLAgou6UWKNliWbwGfGlg_jycFFTFfgtPn3eEVgJ1k3RUvW7ATejmjpNeNxm1XePVjYwL73OLh6FGBpQv3lXVw9lRI8'
  }
];

function HomePage() {
  return (
    <div className="pt-16">
      <section className="min-h-[80vh] flex items-center px-8 lg:px-24 py-24 bg-background relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-center z-10">
          <div className="max-w-xl">
            <h1 className="font-headline text-[60px] leading-[1.1] text-on-surface mb-6 tracking-tight">Find Your Signature Scent</h1>
            <p className="font-body text-on-surface-variant text-lg mb-12 font-light max-w-md">Luxury perfumes curated for every personality.</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link className="inline-block bg-primary text-on-primary font-label text-sm uppercase tracking-[0.1em] py-5 px-10 text-center transition-colors duration-300 hover:bg-secondary rounded-full" to="/shop">
                Shop Now
              </Link>
              <Link className="inline-block border-b border-outline-variant/50 text-on-surface font-label text-sm uppercase tracking-[0.1em] py-5 px-10 text-center transition-colors duration-300 hover:border-primary rounded-full" to="/shop">
                Explore Collection
              </Link>
            </div>
          </div>
          <div className="relative h-[500px] lg:h-[700px] w-full bg-surface rounded-[3rem] overflow-hidden flex items-center justify-center p-12">
            <img
              alt="Elegant perfume bottle on minimalist background"
              className="w-full h-full object-contain mix-blend-multiply opacity-90"
              data-alt="High-end elegant glass perfume bottle standing vertically on a stark white architectural background with dramatic harsh side lighting casting a sharp shadow"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCigcUoIr8zTw4BYqoOrUuih0zcnuIO0MYQyaOXssZ5zacrBx6iOL31CILD2_fzPrjGxQYeIWOW9AXeCJby9w5dWBtjpT1_WBx4FCzlTf7M6AK2c9C2iVg_qTR-KCfhv2aQASRvq4UBnc7x_q36CSOIjX0N12QaGNg2GL6jfI59ZbDhJ3I-LcjN9zn2uDMbLqSqnG2GqU8DESuSxUbRfPTuN80hBA7oPW-ps6ZbkJ4O1tMjDTIz1VP28eVuaRyxOwX3p5L9v3xxWkM"
            />
          </div>
        </div>
      </section>

      <section className="px-8 lg:px-24 py-24 bg-surface">
        <h2 className="font-headline text-4xl text-on-surface italic mb-12">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
          {categories.map((category) => (
            <div key={category.title} className="h-[400px] w-full relative group overflow-hidden bg-surface-container-low rounded-[2.5rem]">
              <img alt={category.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src={category.image} />
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                <h3 className="font-headline text-2xl text-white mb-2">{category.title}</h3>
                <Link className="font-label text-xs uppercase tracking-[0.2em] text-white border-b border-white/50 pb-1 self-start hover:border-white transition-colors inline-flex items-center gap-2" to="/shop">
                  Explore <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 lg:px-24 py-24 bg-background">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-headline text-4xl text-on-surface italic">Best Sellers</h2>
          <Link className="font-label text-xs uppercase tracking-[0.2em] text-on-surface border-b border-outline-variant/50 pb-1 hover:border-primary transition-colors" to="/shop">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.map((product) => (
            <div key={product.name} className="group cursor-pointer flex flex-col h-full">
              <div className="bg-surface-container-lowest aspect-[4/5] mb-6 relative overflow-hidden rounded-[2.5rem] shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <div className="absolute top-4 right-4 z-20 bg-primary text-on-primary text-[10px] uppercase tracking-widest py-1.5 px-3 rounded-full font-label">Top Rated</div>
                <img alt={product.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt={product.dataAlt} src={product.image} />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex justify-center z-20">
                  <Link className="bg-surface/90 backdrop-blur-md rounded-full px-6 py-3 font-label text-xs uppercase tracking-[0.2em] text-on-surface shadow-sm hover:bg-primary hover:text-on-primary transition-colors inline-flex items-center justify-center" to="/product-details/sample-id">
                    View Details
                  </Link>
                </div>
              </div>
              <div className="flex-grow flex flex-col justify-between text-center px-4">
                <div>
                  <h3 className="font-headline text-xl text-on-surface mb-1 line-clamp-2">{product.name}</h3>
                </div>
                <p className="font-label text-sm text-on-surface tracking-wider mt-2">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;