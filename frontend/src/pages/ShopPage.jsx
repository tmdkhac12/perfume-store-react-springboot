import { Link } from 'react-router-dom';

const productList = [
  {
    name: 'Noir Absolu',
    family: 'WOODY AMBER',
    displayTitle: 'NOIR ABSOLU',
    alt: 'Noir Absolu',
    dataAlt:
      'Minimalist architectural glass perfume bottle with black cap casting sharp shadows against a soft off-white background, editorial studio lighting',
    notes: 'Oud Wood, Smoked Vanilla, Patchouli',
    price: '$320',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcaK8MdnHVyNVj6dJE60oUjo2Hwq7-DJHIZlS0jaM5lx45bFrYrcFUADGVY2wRa6-Ock6TqX6qIhAz5FUteTEmePBIcm5rtcP_kN2fB04QgSoPeRStPwWrDCyCZsBG02MoewjcW4BqIFiXYPSmxvDd7ruwZ6n3azOh7aMq_qOeVoytME0Dl7V6hwSi64kIb7RtSodgFTXDXP7PXooKRDlARj46InqxP3nb_eXE7JG3m_ymHdulDqC56OYITFJ8Lk-GEjtcUaYdops'
  },
  {
    name: "L'Aura",
    family: 'ORIENTAL SPICE',
    displayTitle: "L'AURA",
    alt: "L'Aura",
    dataAlt:
      'Clear heavy glass perfume bottle filled with golden amber liquid resting on rough concrete block, harsh cinematic light creating deep contrast',
    notes: 'Saffron, Black Pepper, Tonka Bean',
    price: '$280',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCi99XcLzXvw4TiLPsWKqwbg75tPp6sYgUjr6WjDnEcjkw6Zb-YoGEKuXR_KeST4iNSvraTBsyJMoBj0Bav6aYodiTQd7iuu2n01WiaH6A9uCEWQaZCx0HFnAKGeAsNR48CFh_fuI52tJubRxlxodvrxdGjK-q8TRjjhTIFs02GcIa12fgf-Qyzw9HBcyQKK1gIms6wlxc20Pno55y9tUOaoLz231aT3W9158scRsjHNceRrc0xTFdJSkBV5uXmhF39u193nX1LLyw'
  },
  {
    name: 'Blanc Eternel',
    family: 'WHITE FLORAL',
    displayTitle: 'BLANC ÉTERNEL',
    alt: 'Blanc Éternel',
    dataAlt:
      'Tall minimalist rectangular perfume bottle with frosted glass standing alone on a pure white marble slab, soft diffuse natural window light',
    notes: 'Tuberose, Jasmine Sambac, White Musk',
    price: '$240',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAk89PF-uPDfOL9IJfHro5gw3vh4UvJLtSzorLCag-PxxxaCGskWcOLuHIebOYnNeIn6440ThCWuitTe_detl31HauLh0uUuTORWuz1uAt8i1fPoqkAc3kz5603ciMobbutx11H5rZvQfXzMCE6XKRHIbm5uoelAQUzHpGZrq-LYJJaCYWpgX6fBSwamd5GsjskSZG0PIInb1-Ly1VLflGczrj6QWhlUvv756wXK3Ux9oJHCPpM5iGbK-0QjeGe43M9LKDodpik46U'
  },
  {
    name: 'Cuir Sauvage',
    family: 'LEATHER',
    displayTitle: 'CUIR SAUVAGE',
    alt: 'Cuir Sauvage',
    dataAlt:
      'Cylindrical modern perfume bottle wrapped in dark textured leather standing on wet slate stone, moody dark cinematic lighting',
    notes: 'Russian Leather, Cardamom, Vetiver',
    price: '$350',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCdtm1yS5UZew61NaRgP4YXNPd4EVV9zsh3Hji-diqsRMSBsxHCkfx23M7KphewMdrFUWWBmzYYSFHDHR4IvTcAUd0Gjdk9O9DO1qh-uFy0liTXQMKRTHqet-jd1xCYzQrNsQGZy0tLfo4Id2X9ujgOkKp1IWsfZIhaZSDjSv4BL1o5bATWqc2U41mGvHoheZq4nxIMgzTrH9Nlg0tw5B4oDzKPA6QiN7H1wCKOAJWxCR30q_bhnU620a_vfvI9WRuERWRQVSBffes'
  },
  {
    name: 'Rose Cendree',
    family: 'DARK FLORAL',
    displayTitle: 'ROSE CENDRÉE',
    alt: 'Rose Cendrée',
    dataAlt:
      'Elegant geometric perfume flacon containing pale pink liquid resting elegantly on a stack of rough aged paper, soft morning light',
    notes: 'Bulgarian Rose, Incense, Cedarwood',
    price: '$290',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKKyaQBI9UosME7fhCHFdAFqlAzFm22_yv7nRjM74intYJVArpLARjWE9Yhw8ZzPWBSLzVDr3_xIM7s1OT1Q0VsjKzzKtVJWPUMYvWKGsJSzk5o50xzuOBG0x6mb3pNsG3EXE4nU91VkGplDvs5cEOfqwXO9Zp1svUjg98ZXe5CvbrJ-AIlRo2lJImexjnzdGKbzLnk_6wVJ57jF9TimSGdIPvdCrJDmsLLMMxU4o8jY-8zgzaP8VLj35z-T-cJeAKy9yNl4o3aes'
  },
  {
    name: 'Aqua Vitae',
    family: 'CITRUS MARINE',
    displayTitle: 'AQUA VITAE',
    alt: 'Aqua Vitae',
    dataAlt:
      'Heavy squat clear glass perfume bottle with thick base, minimalist typography on label, standing in shallow pool of water creating ripples, bright crisp lighting',
    notes: 'Bergamot, Sea Salt, Driftwood',
    price: '$210',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuANPe_vImT7wVOMKzGSqpt0gM1O8J-q4wzYJCX5pzWUdohdxDo0XTkeC9uu2z80R35glnJDkrcvzwbvynFVo2AAVt43uTdj-iPf_YSo_AQfwlK9UixNJ88JsNxCAF0BdPRAm7XfOfSkhD3AJpiWOPsMWUaUpL1cKlIxfPTEO902pek6cux0bJX0g07HPheL5ZGBk_y7l2YKvWhOk-iHLQDYpL2ZBFxiwYbIEX60eLRzt0QSr3s7dPcfbWT296OaDKpNz74zq5cupEQ'
  }
];

function ShopPage() {
  return (
    <main className="flex-grow">
      <div className="px-6 md:px-12 py-12 md:py-20 bg-background">
        <h1 className="font-headline text-4xl md:text-5xl text-primary mb-6">THE COLLECTION</h1>
        <p className="font-body text-on-surface-variant max-w-2xl leading-relaxed">
          An olfactory exhibition of rare ingredients and meticulous craftsmanship. Explore our curated gallery of signature scents.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row px-6 md:px-12 pb-32 gap-12 lg:gap-16 items-start">
        <aside className="w-full hidden lg:block lg:w-72 flex-shrink-0 bg-surface-container-low p-8 lg:top-[160px] rounded-[2rem]">
          <div className="mb-12">
            <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6 border-b border-outline-variant/30 pb-3">GENDER</h3>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="w-4 h-4 border border-outline-variant/30 flex items-center justify-center group-hover:border-primary transition-colors rounded-full"></div>
                <span className="font-body text-sm text-on-surface-variant group-hover:text-primary transition-colors">Men</span>
              </label>
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="w-4 h-4 border border-outline-variant/30 flex items-center justify-center group-hover:border-primary transition-colors rounded-full"></div>
                <span className="font-body text-sm text-on-surface-variant group-hover:text-primary transition-colors">Women</span>
              </label>
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="w-4 h-4 border border-outline-variant/30 flex items-center justify-center group-hover:border-primary transition-colors rounded-full"></div>
                <span className="font-body text-sm text-on-surface-variant group-hover:text-primary transition-colors">Unisex</span>
              </label>
            </div>
          </div>
          <div className="mb-12">
            <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6 border-b border-outline-variant/30 pb-3">BRAND</h3>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="w-4 h-4 border border-outline-variant/30 flex items-center justify-center group-hover:border-primary transition-colors rounded-full"></div>
                <span className="font-body text-sm text-on-surface-variant group-hover:text-primary transition-colors">Chanel</span>
              </label>
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="w-4 h-4 border border-outline-variant/30 flex items-center justify-center group-hover:border-primary transition-colors rounded-full"></div>
                <span className="font-body text-sm text-on-surface-variant group-hover:text-primary transition-colors">Dior</span>
              </label>
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="w-4 h-4 border border-outline-variant/30 flex items-center justify-center group-hover:border-primary transition-colors rounded-full"></div>
                <span className="font-body text-sm text-on-surface-variant group-hover:text-primary transition-colors">Tom Ford</span>
              </label>
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="w-4 h-4 border border-outline-variant/30 flex items-center justify-center group-hover:border-primary transition-colors rounded-full"></div>
                <span className="font-body text-sm text-on-surface-variant group-hover:text-primary transition-colors">Creed</span>
              </label>
            </div>
          </div>
          <div className="mb-12">
            <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6 border-b border-outline-variant/30 pb-3">PRICE RANGE</h3>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <input className="w-full bg-transparent border border-outline-variant/30 px-3 py-2 text-[10px] font-label uppercase tracking-widest focus:ring-0 focus:border-primary transition-colors rounded-[2rem]" placeholder="FROM" type="text" />
                <span className="text-outline-variant">-</span>
                <input className="w-full bg-transparent border border-outline-variant/30 px-3 py-2 text-[10px] font-label uppercase tracking-widest focus:ring-0 focus:border-primary transition-colors rounded-[2rem]" placeholder="TO" type="text" />
              </div>
              <button className="w-full py-3 text-center bg-primary text-white font-label text-[10px] uppercase tracking-[0.2em] hover:bg-opacity-80 transition-all rounded-[2rem]" type="button">
                APPLY
              </button>
            </div>
          </div>
          <button className="w-full py-4 text-center border border-outline-variant/30 text-on-surface font-label text-xs uppercase tracking-[0.2em] hover:bg-surface-container-high transition-colors mt-4 rounded-[2rem]" type="button">
            CLEAR FILTERS
          </button>
        </aside>
        <div className="flex-grow w-full">
          <div className="flex justify-between items-end mb-10 pb-4 border-b border-outline-variant/30">
            <span className="font-label text-xs text-on-surface-variant uppercase tracking-[0.1em]">Showing 12 Artifacts</span>
            <div className="flex items-center gap-2 cursor-pointer group">
              <span className="font-label text-xs text-primary uppercase tracking-[0.1em]">SORT BY: CURATED</span>
              <span className="material-symbols-outlined text-[16px] text-primary group-hover:translate-y-[2px] transition-transform">keyboard_arrow_down</span>
            </div>
          </div>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
            {productList.map((product) => (
              <Link to="/product-details/sample-id" key={product.name} className="group flex flex-col bg-surface-container-lowest pb-6 rounded-[2rem] overflow-hidden">
                <div className="relative w-full aspect-square bg-surface-container-low overflow-hidden rounded-[2rem]">
                  <img alt={product.alt} className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out rounded-[2rem]" data-alt={product.dataAlt} src={product.image} />
                </div>
                <div className="pt-6 px-2 flex flex-col">
                  <span className="inline-block bg-secondary-container text-on-secondary-container font-label text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 mb-4 self-start rounded-full">{product.family}</span>
                  <h2 className="font-headline text-2xl text-primary mb-2">
                    <span>{product.displayTitle}</span>
                  </h2>
                  <p className="font-body text-sm text-on-surface-variant mb-4 flex-grow">{product.notes}</p>
                  <p className="font-body text-base text-primary">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-24 text-center">
            <button className="font-label text-xs uppercase tracking-[0.2em] text-primary hover:text-surface-tint transition-colors border-b border-primary pb-1" type="button">
              VIEW MORE ARTIFACTS
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ShopPage;