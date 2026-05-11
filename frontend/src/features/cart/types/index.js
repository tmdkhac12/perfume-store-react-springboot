/**
 * @typedef {Object} CartStorageItem
 * @property {number | null} volumePerfumeId - Example: 10
 * @property {number | null} perfumeId - Example: 1
 * @property {string} name - Example: "Bleu de Chanel"
 * @property {string} description - Example: "Woody aromatic fragrance"
 * @property {string} concentration - Example: "EDP"
 * @property {number | string | null} volume - Example: 100
 * @property {number} price - Example: 3000000
 * @property {number} quantity - Example: 2
 * @property {string} image - Example: "https://.../img.jpg"
 * @property {string} dataAlt - Example: "Perfume product image"
 */

/**
 * @typedef {Object} CartViewItem
 * @property {number} id - Example: 10
 * @property {number | null} volumePerfumeId - Example: 10
 * @property {number | null} perfumeId - Example: 1
 * @property {string} name - Example: "Bleu de Chanel"
 * @property {string} description - Example: "Woody aromatic fragrance"
 * @property {string} concentration - Example: "EDP"
 * @property {string} volume - Example: "100ml"
 * @property {number} quantity - Example: 2
 * @property {number} priceValue - Example: 3000000
 * @property {string} price - Example: "$3,000,000.00"
 * @property {string} image - Example: "https://.../img.jpg"
 * @property {string} dataAlt - Example: "Perfume product image"
 */

/**
 * @typedef {Object} CartStorageState
 * @property {CartStorageItem[]} items - Example: [{ volumePerfumeId: 10, quantity: 2 }]
 */

export { };
