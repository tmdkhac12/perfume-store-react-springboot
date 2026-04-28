import { useParams, Link } from 'react-router-dom';
import { ProductGallery, ScentNotes, VolumeSelector, PurchaseControls } from '../features/product/components';

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
          <ProductGallery image={productImage} thumbnails={thumbnailItems} />
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
            <ScentNotes rows={noteRows} />
          </div>

          <VolumeSelector />

          <PurchaseControls />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;