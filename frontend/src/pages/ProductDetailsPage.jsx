import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductGallery, ScentNotes, VolumeSelector, PurchaseControls } from '../features/product/components';
import { apiClient } from '../services';
import { formatCurrency } from '../utils';

const fallbackImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAtZNeA1PJ18HC-yQ4OH10YZtcdy07e3Fl8RYV_Q9z4U1a62m2Y8lgBEyJhg_3WkDiVmRRQ5RtMDoFVst_KCHdEGu47ZpQ35rDpSW39QLbq_LRRT2iAY2gTW_KoI4JhIZ1JVYL4xuz4LLZ1tBVadZBdHcIqe_mxWRzu2LifZDhqR27tJrc07cLKfgZ35a_f5BzB3IXGRPQ8GuTLrfvfYksk22l7hb5QOYbJ57OXHTpWSc9SG4bTl125mf5kRjlQ5vrjO0oCCyK8ij8',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAcaK8MdnHVyNVj6dJE60oUjo2Hwq7-DJHIZlS0jaM5lx45bFrYrcFUADGVY2wRa6-Ock6TqX6qIhAz5FUteTEmePBIcm5rtcP_kN2fB04QgSoPeRStPwWrDCyCZsBG02MoewjcW4BqIFiXYPSmxvDd7ruwZ6n3azOh7aMq_qOeVoytME0Dl7V6hwSi64kIb7RtSodgFTXDXP7PXooKRDlARj46InqxP3nb_eXE7JG3m_ymHdulDqC56OYITFJ8Lk-GEjtcUaYdops',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDKKyaQBI9UosME7fhCHFdAFqlAzFm22_yv7nRjM74intYJVArpLARjWE9Yhw8ZzPWBSLzVDr3_xIM7s1OT1Q0VsjKzzKtVJWPUMYvWKGsJSzk5o50xzuOBG0x6mb3pNsG3EXE4nU91VkGplDvs5cEOfqwXO9Zp1svUjg98ZXe5CvbrJ-AIlRo2lJImexjnzdGKbzLnk_6wVJ57jF9TimSGdIPvdCrJDmsLLMMxU4o8jY-8zgzaP8VLj35z-T-cJeAKy9yNl4o3aes'
];

/**
 * @description: Ensures the gallery always has images by falling back when the API response is empty.
 * @input: images (array) - Example: ["https://.../img1.jpg", "https://.../img2.jpg"]
 * @output: normalized (array) - Example: ["https://.../img1.jpg", "https://.../img2.jpg"]
 */
const normalizeImages = (images = []) => {
  const safeImages = Array.isArray(images) ? images.filter(Boolean) : [];
  return safeImages.length > 0 ? safeImages : fallbackImages;
};

/**
 * @description: Builds thumbnail metadata so the gallery can render consistent preview buttons.
 * @input: images (array) - Example: ["https://.../img1.jpg", "https://.../img2.jpg"]
 * @output: thumbnails (array) - Example: [{ src: "https://.../img1.jpg", alt: "Perfume image 1", isActive: true }]
 */
const buildThumbnails = (images = []) => {
  return images.map((src, index) => ({
    src,
    alt: `Perfume image ${index + 1}`,
    isActive: index === 0
  }));
};

/**
 * @description: Maps API note groups into display rows that match the product detail layout.
 * @input: notes (object) - Example: { top: ["Grapefruit"], heart: ["Jasmine"], base: ["Patchouli"] }
 * @output: rows (array) - Example: [{ layer: "Top", values: ["Grapefruit"] }]
 */
const buildNoteRows = (notes) => {
  const rows = [];

  if (Array.isArray(notes?.top) && notes.top.length > 0) {
    rows.push({ layer: 'Top', values: notes.top });
  }

  if (Array.isArray(notes?.heart) && notes.heart.length > 0) {
    rows.push({ layer: 'Heart', values: notes.heart });
  }

  if (Array.isArray(notes?.base) && notes.base.length > 0) {
    rows.push({ layer: 'Base', values: notes.base });
  }

  return rows;
};

/**
 * @description: Finds the lowest price across volume options to display a fallback price.
 * @input: volumes (array) - Example: [{ volume: 50, price: 2000000 }]
 * @output: minPrice (number | null) - Example: 2000000
 */
const resolveMinPrice = (volumes = []) => {
  const prices = Array.isArray(volumes) ? volumes.map((item) => item?.price).filter((price) => typeof price === 'number') : [];

  if (prices.length === 0) {
    return null;
  }

  return Math.min(...prices);
};

function ProductDetailsPage() {
  const { productId } = useParams();
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [product, setProduct] = useState(null);
  const [selectedVolume, setSelectedVolume] = useState(null);

  // Use effect to fetch perfume details 
  useEffect(() => {
    let isActive = true;

    /**
     * @description: Fetches perfume details so the page can display images, notes, and volumes.
     * @input: id (string) - Example: "1"
     * @output: stateUpdate (void) - Example: undefined
     */
    const fetchPerfumeDetails = async (id) => {
      setStatus('loading');
      setErrorMessage('');

      try {
        const response = await apiClient.get(`/perfumes/${id}`);
        const isSuccess = response?.status >= 200 && response?.status < 300;

        if (!isSuccess) {
          if (response?.status === 404) {
            if (isActive) {
              setStatus('not-found');
              setProduct(null);
            }
            return;
          }

          throw new Error(response?.error || response?.message || 'Unable to load perfume.');
        }

        const payload = response?.data ?? null;

        if (!isActive) {
          return;
        }

        setProduct(payload);
        setStatus('success');

        const nextVolumes = Array.isArray(payload?.volumes) ? payload.volumes : [];
        setSelectedVolume(nextVolumes[0] ?? null);
      } catch (error) {
        if (!isActive) {
          return;
        }

        setStatus('error');
        setErrorMessage(error?.message || 'Unable to load perfume.');
        setProduct(null);
      }
    };

    if (!productId) {
      setStatus('not-found');
      setProduct(null);
      return () => {
        isActive = false;
      };
    }

    fetchPerfumeDetails(productId);

    return () => {
      isActive = false;
    };
  }, [productId]);

  const images = normalizeImages(product?.sampleImages ?? []);
  const thumbnails = buildThumbnails(images);
  const noteRows = buildNoteRows(product?.notes);
  const minPrice = resolveMinPrice(product?.volumes ?? []);
  const displayPrice = selectedVolume?.price ?? minPrice;
  const priceLabel = displayPrice !== null ? formatCurrency(displayPrice) : 'Price unavailable';

  /**
   * @description: Updates the selected volume to refresh the displayed price.
   * @input: volumeItem (object) - Example: { volume: 50, price: 2000000 }
   * @output: stateUpdate (void) - Example: undefined
   */
  const handleVolumeSelect = (volumeItem) => {
    setSelectedVolume(volumeItem);
  };

  if (status === 'loading' && !product) {
    return (
      <div className="pt-32 pb-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <p className="font-body text-sm text-on-surface-variant">Loading perfume details...</p>
        </div>
      </div>
    );
  }

  if (status === 'not-found') {
    return (
      <div className="pt-32 pb-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <h1 className="font-headline text-4xl md:text-5xl text-on-background mb-4">Perfume not found</h1>
          <p className="font-body text-on-surface-variant mb-8">The perfume you are looking for is no longer available.</p>
          <Link className="inline-flex items-center justify-center border border-outline-variant/30 text-on-surface py-4 px-6 font-label text-xs uppercase tracking-[0.2em] hover:border-primary transition-colors rounded-full" to="/shop">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="pt-32 pb-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <h1 className="font-headline text-4xl md:text-5xl text-on-background mb-4">Unable to load perfume</h1>
          <p className="font-body text-on-surface-variant mb-8">{errorMessage || 'Please try again later.'}</p>
          <Link className="inline-flex items-center justify-center border border-outline-variant/30 text-on-surface py-4 px-6 font-label text-xs uppercase tracking-[0.2em] hover:border-primary transition-colors rounded-full" to="/shop">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <ProductGallery image={images[0]} thumbnails={thumbnails} />
        </div>

        <div className="lg:col-span-5 flex flex-col pt-8 md:pt-16">
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-4">{product?.concentration || 'Eau de Parfum'}</p>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-on-surface mb-2">{product?.brand?.toUpperCase() || 'L\'ESSENCE'}</p>
          <h1 className="font-headline text-5xl md:text-6xl text-on-background mb-4 tracking-tight">{product?.name || 'Signature Scent'}</h1>
          <p className="font-body text-xl text-on-surface mb-12">
            {priceLabel} <span className="text-sm text-on-surface-variant ml-2">USD</span>
          </p>

          <div className="mb-12">
            <p className="font-body text-on-surface-variant leading-relaxed text-sm md:text-base">
              {product?.description || 'No description available for this perfume.'}
            </p>
          </div>

          <div className="mb-12">
            <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-4">Scent Architecture</h3>
            <ScentNotes rows={noteRows} />
          </div>

          <VolumeSelector volumes={product?.volumes} selectedVolume={selectedVolume} onSelectVolume={handleVolumeSelect} />

          <PurchaseControls />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;