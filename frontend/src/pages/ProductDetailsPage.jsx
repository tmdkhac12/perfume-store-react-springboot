import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastNotification } from '../components/base';
import { apiClient, readCartItems, writeCartItems } from '../services';
import { formatCurrency } from '../utils';
import { buildNoteRows, buildThumbnails, normalizeImages, resolveMinPrice } from '../features/product/utils.js';
import { ProductGallery, PurchaseControls, ScentNotes, VolumeSelector } from '../features/product/components/index.js';


/** @description: Product details page wrapper that delegates rendering to the product feature. */
function ProductDetailsPage() {
  const { productId } = useParams();
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('info');

  /** @type {[import('../features/product/types').PerfumeDetails | null, Function]} */
  const [product, setProduct] = useState(null);
  /** @type {[import('../features/product/types').PerfumeVolume | null, Function]} */
  const [selectedVolume, setSelectedVolume] = useState(null);

  useEffect(() => {
    let isActive = true;

    /**
     * @description: Fetches perfume details so the page can display images, notes, and volumes.
     * @flow: Receive id -> Request /perfumes/:id -> Update state based on response.
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
   * @param {import('../features/product/types').PerfumeVolume} volumeItem - Example: { volume: 50, price: 2000000 }
   * @returns {void} - selected volume updated
   */
  const handleVolumeSelect = (volumeItem) => {
    setSelectedVolume(volumeItem);
  };

  /**
   * @description: Adds the selected perfume volume to the local cart storage.
   * @param {number} quantity - Example: 2
   * @returns {void} - cart updated with the selected item
   */
  const handleAddToCart = (quantity) => {
    if (!product || !selectedVolume) {
      return;
    }

    const safeQuantity = Number(quantity) > 0 ? Number(quantity) : 1;
    /** @type {import('../features/cart/types').CartStorageItem[]} */
    const items = readCartItems();
    const volumePerfumeId = selectedVolume?.id ?? selectedVolume?.volumePerfumeId ?? null;
    const primaryImage = images[0] || '';
    const unitPrice = selectedVolume?.price ?? minPrice ?? 0;

    /** @type {import('../features/cart/types').CartStorageItem} */
    const nextItem = {
      volumePerfumeId,
      perfumeId: product?.id ?? null,
      name: product?.name || 'Perfume Item',
      description: product?.description || '',
      concentration: product?.concentration || '',
      volume: selectedVolume?.volume ?? null,
      price: unitPrice,
      quantity: safeQuantity,
      image: primaryImage,
      dataAlt: primaryImage ? `${product?.name || 'Perfume'} image` : 'Perfume product image'
    };

    const matchIndex = items.findIndex((item) => {
      if (volumePerfumeId) {
        return item?.volumePerfumeId === volumePerfumeId;
      }

      return item?.perfumeId === nextItem.perfumeId && item?.volume === nextItem.volume;
    });

    const nextItems = [...items];
    if (matchIndex >= 0) {
      const existingItem = nextItems[matchIndex];
      const existingQuantity = Number(existingItem?.quantity) || 0;
      nextItems[matchIndex] = {
        ...existingItem,
        quantity: existingQuantity + safeQuantity
      };
    } else {
      nextItems.push(nextItem);
    }

    writeCartItems(nextItems);
    setToastMessage('Added to cart.');
    setToastVariant('success');
  };

  /**
   * @description: Clears the toast notification after dismissal.
   * @returns {void} - toast message cleared
   */
  const handleToastClose = () => {
    setToastMessage('');
    setToastVariant('info');
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
    <>
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

            <PurchaseControls onAddToCart={handleAddToCart} />
          </div>
        </div>
      </div>
      <ToastNotification
        autoHideDuration={3000}
        isOpen={Boolean(toastMessage)}
        message={toastMessage}
        onClose={handleToastClose}
        variant={toastVariant}
      />
    </>
  );
}

export default ProductDetailsPage;
