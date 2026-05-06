import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard, ShopFilters } from '../features/catalog/components';
import { apiClient } from '../services';
import { formatCurrency } from '../utils';

const DEFAULT_PAGE_SIZE = 9;

const fallbackImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAcaK8MdnHVyNVj6dJE60oUjo2Hwq7-DJHIZlS0jaM5lx45bFrYrcFUADGVY2wRa6-Ock6TqX6qIhAz5FUteTEmePBIcm5rtcP_kN2fB04QgSoPeRStPwWrDCyCZsBG02MoewjcW4BqIFiXYPSmxvDd7ruwZ6n3azOh7aMq_qOeVoytME0Dl7V6hwSi64kIb7RtSodgFTXDXP7PXooKRDlARj46InqxP3nb_eXE7JG3m_ymHdulDqC56OYITFJ8Lk-GEjtcUaYdops',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCi99XcLzXvw4TiLPsWKqwbg75tPp6sYgUjr6WjDnEcjkw6Zb-YoGEKuXR_KeST4iNSvraTBsyJMoBj0Bav6aYodiTQd7iuu2n01WiaH6A9uCEWQaZCx0HFnAKGeAsNR48CFh_fuI52tJubRxlxodvrxdGjK-q8TRjjhTIFs02GcIa12fgf-Qyzw9HBcyQKK1gIms6wlxc20Pno55y9tUOaoLz231aT3W9158scRsjHNceRrc0xTFdJSkBV5uXmhF39u193nX1LLyw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAk89PF-uPDfOL9IJfHro5gw3vh4UvJLtSzorLCag-PxxxaCGskWcOLuHIebOYnNeIn6440ThCWuitTe_detl31HauLh0uUuTORWuz1uAt8i1fPoqkAc3kz5603ciMobbutx11H5rZvQfXzMCE6XKRHIbm5uoelAQUzHpGZrq-LYJJaCYWpgX6fBSwamd5GsjskSZG0PIInb1-Ly1VLflGczrj6QWhlUvv756wXK3Ux9oJHCPpM5iGbK-0QjeGe43M9LKDodpik46U',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCdtm1yS5UZew61NaRgP4YXNPd4EVV9zsh3Hji-diqsRMSBsxHCkfx23M7KphewMdrFUWWBmzYYSFHDHR4IvTcAUd0Gjdk9O9DO1qh-uFy0liTXQMKRTHqet-jd1xCYzQrNsQGZy0tLfo4Id2X9ujgOkKp1IWsfZIhaZSDjSv4BL1o5bATWqc2U41mGvHoheZq4nxIMgzTrH9Nlg0tw5B4oDzKPA6QiN7H1wCKOAJWxCR30q_bhnU620a_vfvI9WRuERWRQVSBffes',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDKKyaQBI9UosME7fhCHFdAFqlAzFm22_yv7nRjM74intYJVArpLARjWE9Yhw8ZzPWBSLzVDr3_xIM7s1OT1Q0VsjKzzKtVJWPUMYvWKGsJSzk5o50xzuOBG0x6mb3pNsG3EXE4nU91VkGplDvs5cEOfqwXO9Zp1svUjg98ZXe5CvbrJ-AIlRo2lJImexjnzdGKbzLnk_6wVJ57jF9TimSGdIPvdCrJDmsLLMMxU4o8jY-8zgzaP8VLj35z-T-cJeAKy9yNl4o3aes',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuANPe_vImT7wVOMKzGSqpt0gM1O8J-q4wzYJCX5pzWUdohdxDo0XTkeC9uu2z80R35glnJDkrcvzwbvynFVo2AAVt43uTdj-iPf_YSo_AQfwlK9UixNJ88JsNxCAF0BdPRAm7XfOfSkhD3AJpiWOPsMWUaUpL1cKlIxfPTEO902pek6cux0bJX0g07HPheL5ZGBk_y7l2YKvWhOk-iHLQDYpL2ZBFxiwYbIEX60eLRzt0QSr3s7dPcfbWT296OaDKpNz74zq5cupEQ'
];

const parsePositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
};

const normalizeNumberParam = (value) => {
  if (value === undefined || value === null) {
    return '';
  }

  const rawValue = String(value).trim();
  if (!rawValue) {
    return '';
  }

  const parsed = Number(rawValue);
  return Number.isNaN(parsed) ? '' : rawValue;
};

const formatOrderLabel = (orderBy) => {
  if (!orderBy) {
    return 'CURATED';
  }

  const [field, direction] = orderBy.split(',');
  if (!field) {
    return 'CURATED';
  }

  const fieldLabel = field.replace(/_/g, ' ').toUpperCase();
  const directionLabel = direction === 'desc' ? 'DESC' : 'ASC';

  return `${fieldLabel} ${directionLabel}`;
};

const buildProductCard = (perfume, index) => {
  const name = perfume?.name?.trim() || 'Signature Scent';
  const brandName = perfume?.brand?.trim() || 'Signature';
  const image = perfume?.sampleImage || fallbackImages[index % fallbackImages.length];

  return {
    id: perfume?.id,
    name,
    brandName,
    family: brandName.toUpperCase(),
    displayTitle: name.toUpperCase(),
    alt: name,
    dataAlt: `${name} perfume bottle`,
    notes: brandName ? `By ${brandName}` : 'Signature collection',
    price: formatCurrency(perfume?.minPrice ?? 0),
    image
  };
};

// JSX Element 
function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsKey = searchParams.toString();

  const queryState = useMemo(() => {
    return {
      page: parsePositiveInt(searchParams.get('page'), 1),
      limit: parsePositiveInt(searchParams.get('limit'), DEFAULT_PAGE_SIZE),
      name: (searchParams.get('name') || '').trim(),
      gender: searchParams.get('gender') || '',
      fromPrice: normalizeNumberParam(searchParams.get('fromPrice')),
      toPrice: normalizeNumberParam(searchParams.get('toPrice')),
      orderBy: searchParams.get('orderBy') || '',
      brand: searchParams.get('brand') || ''
    };
  }, [paramsKey]);

  const [brands, setBrands] = useState([]);
  const [brandStatus, setBrandStatus] = useState('idle');
  const [brandError, setBrandError] = useState('');

  const [perfumes, setPerfumes] = useState([]);
  const [perfumeStatus, setPerfumeStatus] = useState('idle');
  const [perfumeError, setPerfumeError] = useState('');

  const [pageInfo, setPageInfo] = useState({
    page: 1,
    size: DEFAULT_PAGE_SIZE,
    totalElements: 0,
    totalPages: 1
  });

  const [draftFilters, setDraftFilters] = useState({
    name: queryState.name,
    gender: queryState.gender,
    brand: queryState.brand,
    fromPrice: queryState.fromPrice,
    toPrice: queryState.toPrice
  });

  const updateParams = useCallback((updates, options = {}) => {
    const nextParams = new URLSearchParams(searchParams);
    const { resetPage = true } = options;

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        nextParams.delete(key);
        return;
      }

      nextParams.set(key, String(value));
    });

    if (resetPage) {
      nextParams.set('page', '1');
    }

    setSearchParams(nextParams);
  }, [searchParams, setSearchParams]);

  /**
   * This variable help packaging the needed params, then use to fetch api 
   * @input: queryState (object) - Example: { page: 1, limit: 8, brand: "", name: "" }
   * @output: apiQuery (object) - Example: { page: 1, limit: 8 }
   */
  const apiQuery = useMemo(() => {
    const query = {
      page: queryState.page,
      limit: queryState.limit
    };

    if (queryState.name) {
      query.name = queryState.name;
    }

    if (queryState.gender) {
      query.gender = queryState.gender;
    }

    if (queryState.fromPrice) {
      query.fromPrice = queryState.fromPrice;
    }

    if (queryState.toPrice) {
      query.toPrice = queryState.toPrice;
    }

    if (queryState.orderBy) {
      query.orderBy = queryState.orderBy;
    }

    if (queryState.brand) {
      query.brand = queryState.brand;
    }

    return query;
  }, [
    queryState.page,
    queryState.limit,
    queryState.name,
    queryState.gender,
    queryState.fromPrice,
    queryState.toPrice,
    queryState.orderBy,
    queryState.brand
  ]);

  /**
   * @input: apiQuery (object) - Example: { page: 1, limit: 8 }
   * @output: key (string) - Example: "{\"page\":1,\"limit\":8}"
   */
  const apiQueryKey = useMemo(() => JSON.stringify(apiQuery), [apiQuery]);
  const sortLabel = useMemo(() => formatOrderLabel(queryState.orderBy), [queryState.orderBy]);

  useEffect(() => {
    setDraftFilters({
      name: queryState.name,
      gender: queryState.gender,
      brand: queryState.brand,
      fromPrice: queryState.fromPrice,
      toPrice: queryState.toPrice
    });
  }, [queryState.name, queryState.gender, queryState.brand, queryState.fromPrice, queryState.toPrice]);

  // Use effect fetch brands 
  useEffect(() => {
    let isActive = true;

    const fetchBrands = async () => {
      setBrandStatus('loading');
      setBrandError('');

      try {
        const response = await apiClient.get('/brands');
        const isSuccess = response?.status >= 200 && response?.status < 300;

        if (!isSuccess) {
          throw new Error(response?.error || response?.message || 'Unable to load brands.');
        }

        const nextBrands = Array.isArray(response?.data) ? response.data : [];

        if (!isActive) {
          return;
        }

        setBrands(nextBrands);
        setBrandStatus('success');
      } catch (error) {
        if (!isActive) {
          return;
        }

        setBrandStatus('error');
        setBrandError(error?.message || 'Unable to load brands.');
      }
    };

    fetchBrands();

    return () => {
      isActive = false;
    };
  }, []);

  // Use effect fetch perfumes, called when apiQuery changes
  useEffect(() => {
    let isActive = true;

    const fetchPerfumes = async () => {
      setPerfumeStatus('loading');
      setPerfumeError('');

      try {
        const response = await apiClient.get('/perfumes', { query: apiQuery });
        const isSuccess = response?.status >= 200 && response?.status < 300;

        if (!isSuccess) {
          throw new Error(response?.error || response?.message || 'Unable to load perfumes.');
        }

        const payload = response?.data ?? {};
        const items = Array.isArray(payload?.content) ? payload.content : [];
        const mappedItems = items.map((item, index) => buildProductCard(item, index));

        if (!isActive) {
          return;
        }

        setPerfumes(mappedItems);
        setPageInfo({
          page: payload.page ?? apiQuery.page,
          size: payload.size ?? apiQuery.limit,
          totalElements: payload.totalElements ?? mappedItems.length,
          totalPages: payload.totalPages ?? 1
        });
        setPerfumeStatus('success');
      } catch (error) {
        if (!isActive) {
          return;
        }

        setPerfumeStatus('error');
        setPerfumeError(error?.message || 'Unable to load perfumes.');
        if (apiQuery.page === 1) {
          setPerfumes([]);
        }
      }
    };

    fetchPerfumes();

    return () => {
      isActive = false;
    };
  }, [apiQueryKey]);

  const isLoading = perfumeStatus === 'loading';
  const hasError = perfumeStatus === 'error';
  const isEmpty = !isLoading && !hasError && perfumes.length === 0;
  const totalPages = Math.max(1, pageInfo.totalPages || 1);
  const currentPage = Math.min(queryState.page, totalPages);
  const pageOptions = Array.from({ length: totalPages }, (_, index) => index + 1);
  const showPagination = !hasError && totalPages > 1;
  const artifactLabel = `Showing ${perfumes.length} ${perfumes.length === 1 ? 'Artifact' : 'Artifacts'}`;

  /**
   * @input: value (string) - Example: "Oud"
   * @output: stateUpdate (void) - Example: undefined
   */
  const handleSearchChange = (value) => {
    setDraftFilters((current) => ({ ...current, name: value }));
  };

  /**
   * @input: value (string) - Example: "Female"
   * @output: stateUpdate (void) - Example: undefined
   */
  const handleGenderChange = (value) => {
    setDraftFilters((current) => ({
      ...current,
      gender: current.gender === value ? '' : value
    }));
  };

  /**
   * @input: value (string) - Example: "Chanel"
   * @output: stateUpdate (void) - Example: undefined
   */
  const handleBrandChange = (value) => {
    setDraftFilters((current) => ({
      ...current,
      brand: current.brand === value ? '' : value
    }));
  };

  /**
   * @input: field (string), value (string) - Example: ("from", "1200000")
   * @output: stateUpdate (void) - Example: undefined
   */
  const handlePriceChange = (field, value) => {
    const sanitized = value.replace(/[^\d.]/g, '');
    setDraftFilters((current) => ({ ...current, [field]: sanitized }));
  };

  /**
   * @input: none (void) - Example: undefined
   * @output: urlUpdate (void) - Example: undefined
   */
  const handleApplyFilters = () => {
    updateParams({
      name: draftFilters.name.trim(),
      gender: draftFilters.gender,
      brand: draftFilters.brand,
      fromPrice: draftFilters.fromPrice,
      toPrice: draftFilters.toPrice
    });
  };

  /**
   * @input: none (void) - Example: undefined
   * @output: urlUpdate (void) - Example: undefined
   */
  const handleClearFilters = () => {
    setDraftFilters({ name: '', gender: '', brand: '', fromPrice: '', toPrice: '' });
    updateParams({ name: '', gender: '', brand: '', fromPrice: '', toPrice: '' });
  };

  /**
   * @input: targetPage (number) - Example: 2
   * @output: urlUpdate (void) - Example: undefined
   */
  const handlePageChange = (targetPage) => {
    const nextPage = Math.min(Math.max(1, parsePositiveInt(targetPage, 1)), totalPages);
    updateParams({ page: nextPage }, { resetPage: false });
  };

  return (
    <main className="flex-grow">
      <div className="px-6 md:px-12 py-12 md:py-20 bg-background">
        <h1 className="font-headline text-4xl md:text-5xl text-primary mb-6">THE COLLECTION</h1>
        <p className="font-body text-on-surface-variant max-w-2xl leading-relaxed">
          An olfactory exhibition of rare ingredients and meticulous craftsmanship. Explore our curated gallery of signature scents.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row px-6 md:px-12 pb-32 gap-12 lg:gap-16 items-start">
        <ShopFilters
          brands={brands}
          brandStatus={brandStatus}
          brandError={brandError}
          searchValue={draftFilters.name}
          selectedGender={draftFilters.gender}
          selectedBrand={draftFilters.brand}
          priceRange={{ from: draftFilters.fromPrice, to: draftFilters.toPrice }}
          onSearchChange={handleSearchChange}
          onGenderChange={handleGenderChange}
          onBrandChange={handleBrandChange}
          onPriceChange={handlePriceChange}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
        <div className="flex-grow w-full">
          <div className="flex justify-between items-end mb-10 pb-4 border-b border-outline-variant/30">
            <span className="font-label text-xs text-on-surface-variant uppercase tracking-[0.1em]">{artifactLabel}</span>
            <div className="flex items-center gap-2 cursor-pointer group">
              <span className="font-label text-xs text-primary uppercase tracking-[0.1em]">SORT BY: {sortLabel}</span>
              <span className="material-symbols-outlined text-[16px] text-primary group-hover:translate-y-[2px] transition-transform">keyboard_arrow_down</span>
            </div>
          </div>

          {isLoading && perfumes.length === 0 ? (
            <div className="py-16 text-center font-body text-sm text-on-surface-variant">Loading perfumes...</div>
          ) : null}
          {hasError ? (
            <div className="py-16 text-center font-body text-sm text-on-surface-variant">{perfumeError || 'Unable to load perfumes.'}</div>
          ) : null}
          {isEmpty ? (
            <div className="py-16 text-center font-body text-sm text-on-surface-variant">No perfumes match the current filters.</div>
          ) : null}
          {!isLoading && !hasError && !isEmpty ? (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
              {perfumes.map((product) => (
                <ProductCard key={product.id ?? product.name} product={product} />
              ))}
            </div>
          ) : null}

          {showPagination ? (
            <div className="mt-24 flex flex-col items-center gap-6">
              <div className="flex items-center gap-4">
                <button
                  className="font-label text-[10px] uppercase tracking-[0.2em] text-primary border border-outline-variant/30 px-4 py-2 rounded-full hover:border-primary transition-colors disabled:text-outline-variant disabled:border-outline-variant/30 disabled:cursor-not-allowed"
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={isLoading || currentPage <= 1}
                >
                  Prev
                </button>
                <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-outline-variant/30 bg-surface-container-lowest">
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Page</span>
                  <select
                    aria-label="Select page"
                    className="bg-transparent font-label text-[10px] uppercase tracking-[0.2em] text-primary focus:ring-0 focus:outline-none"
                    value={currentPage}
                    onChange={(event) => handlePageChange(event.target.value)}
                  >
                    {pageOptions.map((page) => (
                      <option key={page} value={page} className="text-on-surface">
                        {page}
                      </option>
                    ))}
                  </select>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">of {totalPages}</span>
                </div>
                <button
                  className="font-label text-[10px] uppercase tracking-[0.2em] text-primary border border-outline-variant/30 px-4 py-2 rounded-full hover:border-primary transition-colors disabled:text-outline-variant disabled:border-outline-variant/30 disabled:cursor-not-allowed"
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={isLoading || currentPage >= totalPages}
                >
                  Next
                </button>
              </div>
              <p className="font-body text-xs text-on-surface-variant">Select a page to continue browsing.</p>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}

export default ShopPage;