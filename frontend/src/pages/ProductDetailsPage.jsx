import { useParams, Link } from 'react-router-dom';

const noteRows = [
  { layer: 'Top', values: ['Sea Salt', 'Pink Pepper'] },
  { layer: 'Heart', values: ['Oud Wood', 'Balsam Fir'] },
  { layer: 'Base', values: ['Ambergris', 'Vetiver'] }
];

const thumbnailItems = [
  { alt: 'Perfume Bottle Angle 1', isActive: true },
  { alt: 'Perfume Bottle Angle 2', isActive: false },
  { alt: 'Perfume Bottle Detail', isActive: false }
];

const productImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAtZNeA1PJ18HC-yQ4OH10YZtcdy07e3Fl8RYV_Q9z4U1a62m2Y8lgBEyJhg_3WkDiVmRRQ5RtMDoFVst_KCHdEGu47ZpQ35rDpSW39QLbq_LRRT2iAY2gTW_KoI4JhIZ1JVYL4xuz4LLZ1tBVadZBdHcIqe_mxWRzu2LifZDhqR27tJrc07cLKfgZ35a_f5BzB3IXGRPQ8GuTLrfvfYksk22l7hb5QOYbJ57OXHTpWSc9SG4bTl125mf5kRjlQ5vrjO0oCCyK8ij8';

function ProductDetailsPage() {
  const { productId } = useParams();

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative bg-surface-container-low h-[716px] md:h-[800px] w-full flex items-center justify-center p-8 md:p-16 rounded-[2.5rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-surface-variant/20 to-transparent pointer-events-none"></div>
            <img
              alt="Luxury Perfume Bottle"
              className="max-w-full max-h-full object-contain mix-blend-multiply relative z-10 drop-shadow-[0_20px_40px_rgba(25,28,29,0.1)]"
              data-alt="Minimalist crystal perfume bottle with a heavy black architectural cap resting on a stark white plinth against a soft grey background, dramatic lighting casting a sharp shadow."
              src={productImage}
            />
          </div>
          <div className="flex gap-4 justify-center px-2">
            {thumbnailItems.map((thumb) => (
              <button
                key={thumb.alt}
                className={
                  thumb.isActive
                    ? 'w-24 h-24 bg-surface-container-low border-2 border-primary rounded-2xl flex items-center justify-center p-2 transition-all'
                    : 'w-24 h-24 bg-surface-container-low border-2 border-transparent hover:border-outline-variant rounded-2xl flex items-center justify-center p-2 transition-all opacity-70 hover:opacity-100'
                }
                type="button"
              >
                <img
                  alt={thumb.alt}
                  className="w-full h-full object-contain mix-blend-multiply"
                  src={productImage}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col pt-8 md:pt-16">
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-4">Eau de Parfum</p>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-on-surface mb-2">L'ESSENCE</p>
          <h1 className="font-headline text-5xl md:text-6xl text-on-background mb-4 tracking-tight">Oud Minerale</h1>
          <p className="font-body text-xl text-on-surface mb-12">
            $380.00 <span className="text-sm text-on-surface-variant ml-2">USD</span>
          </p>
          <p className="font-body text-xs text-on-surface-variant mb-8">Product ID: {productId}</p>

          <div className="mb-12">
            <p className="font-body text-on-surface-variant leading-relaxed text-sm md:text-base">
              A collision of rare woods and ocean spray. Oud Minerale merges smoky agarwood depth with a crisp saline edge.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-4">Scent Architecture</h3>
            <div className="space-y-4">
              {noteRows.map((row) => (
                <div key={row.layer}>
                  <span className="text-xs font-body text-on-surface w-12 inline-block">{row.layer}</span>
                  {row.values.map((value) => (
                    <span
                      key={value}
                      className="bg-secondary-container text-on-secondary-container text-[11px] font-label uppercase tracking-widest px-3 py-1.5 ml-2 inline-block rounded-full"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-4">Volume</h3>
            <div className="flex gap-4">
              <button className="flex-1 py-3 border border-primary bg-primary text-on-primary font-label text-xs uppercase tracking-widest transition-colors rounded-full" type="button">
                50 ML
              </button>
              <button className="flex-1 py-3 border border-outline-variant text-on-surface-variant font-label text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-colors rounded-full" type="button">
                100 ML
              </button>
              <button className="flex-1 py-3 border border-outline-variant text-on-surface-variant font-label text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-colors rounded-full" type="button">
                250 ML
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-auto">
            <div className="flex gap-4">
              <div className="flex items-center justify-between border border-outline-variant rounded-full px-6 w-36">
                <button className="text-on-surface hover:text-primary transition-colors flex items-center justify-center" type="button">
                  <span className="material-symbols-outlined text-base">remove</span>
                </button>
                <span className="font-label text-sm">1</span>
                <button className="text-on-surface hover:text-primary transition-colors flex items-center justify-center" type="button">
                  <span className="material-symbols-outlined text-base">add</span>
                </button>
              </div>
              <button className="flex-1 bg-gradient-to-b from-primary to-primary-container text-on-primary py-5 font-label text-xs uppercase tracking-[0.2em] hover:bg-secondary transition-colors duration-300 rounded-full" type="button">
                Add to Cart
              </button>
            </div>
            <Link
              to="/shop"
              className="w-full border border-outline-variant/30 text-on-surface py-5 font-label text-xs uppercase tracking-[0.2em] hover:border-primary transition-colors duration-300 rounded-full inline-flex items-center justify-center"
            >
              Find in Boutique
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;