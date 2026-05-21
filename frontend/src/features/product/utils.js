export const fallbackImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAtZNeA1PJ18HC-yQ4OH10YZtcdy07e3Fl8RYV_Q9z4U1a62m2Y8lgBEyJhg_3WkDiVmRRQ5RtMDoFVst_KCHdEGu47ZpQ35rDpSW39QLbq_LRRT2iAY2gTW_KoI4JhIZ1JVYL4xuz4LLZ1tBVadZBdHcIqe_mxWRzu2LifZDhqR27tJrc07cLKfgZ35a_f5BzB3IXGRPQ8GuTLrfvfYksk22l7hb5QOYbJ57OXHTpWSc9SG4bTl125mf5kRjlQ5vrjO0oCCyK8ij8',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAcaK8MdnHVyNVj6dJE60oUjo2Hwq7-DJHIZlS0jaM5lx45bFrYrcFUADGVY2wRa6-Ock6TqX6qIhAz5FUteTEmePBIcm5rtcP_kN2fB04QgSoPeRStPwWrDCyCZsBG02MoewjcW4BqIFiXYPSmxvDd7ruwZ6n3azOh7aMq_qOeVoytME0Dl7V6hwSi64kIb7RtSodgFTXDXP7PXooKRDlARj46InqxP3nb_eXE7JG3m_ymHdulDqC56OYITFJ8Lk-GEjtcUaYdops',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDKKyaQBI9UosME7fhCHFdAFqlAzFm22_yv7nRjM74intYJVArpLARjWE9Yhw8ZzPWBSLzVDr3_xIM7s1OT1Q0VsjKzzKtVJWPUMYvWKGsJSzk5o50xzuOBG0x6mb3pNsG3EXE4nU91VkGplDvs5cEOfqwXO9Zp1svUjg98ZXe5CvbrJ-AIlRo2lJImexjnzdGKbzLnk_6wVJ57jF9TimSGdIPvdCrJDmsLLMMxU4o8jY-8zgzaP8VLj35z-T-cJeAKy9yNl4o3aes'
];

/**
 * @description: Ensures the gallery always has images by falling back when the API response is empty.
 * @param {string[]} images - Example: ["https://.../img1.jpg", "https://.../img2.jpg"]
 * @returns {string[]} normalized - Example: ["https://.../img1.jpg", "https://.../img2.jpg"]
 */
export const normalizeImages = (images = []) => {
  const safeImages = Array.isArray(images) ? images.filter(Boolean) : [];
  return safeImages.length > 0 ? safeImages : fallbackImages;
};

/**
 * @description: Builds thumbnail metadata so the gallery can render consistent preview buttons.
 * @param {string[]} images - Example: ["https://.../img1.jpg", "https://.../img2.jpg"]
 * @returns {import('../types').ProductThumbnail[]} thumbnails - Example: [{ src: "https://.../img1.jpg", alt: "Perfume image 1", isActive: true }]
 */
export const buildThumbnails = (images = []) => {
  return images.map((src, index) => ({
    src,
    alt: `Perfume image ${index + 1}`,
    isActive: index === 0
  }));
};

/**
 * @description: Maps API note groups into display rows that match the product detail layout.
 * @param {import('../types').PerfumeNotes | undefined} notes - Example: { top: ["Grapefruit"], heart: ["Jasmine"], base: ["Patchouli"] }
 * @returns {import('../types').NoteRow[]} rows - Example: [{ layer: "Top", values: ["Grapefruit"] }]
 */
export const buildNoteRows = (notes) => {
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
 * @param {import('../types').PerfumeVolume[]} volumes - Example: [{ volume: 50, price: 2000000 }]
 * @returns {number | null} minPrice - Example: 2000000
 */
export const resolveMinPrice = (volumes = []) => {
  const prices = Array.isArray(volumes)
    ? volumes.map((item) => item?.price).filter((price) => typeof price === 'number')
    : [];

  if (prices.length === 0) {
    return null;
  }

  return Math.min(...prices);
};
