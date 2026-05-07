/**
 * @typedef {Object} PerfumeVolume
 * @property {number} volume - Example: 50
 * @property {number} price - Example: 2000000
 */

/**
 * @typedef {Object} PerfumeNotes
 * @property {string[]} top - Example: ["Grapefruit"]
 * @property {string[]} heart - Example: ["Jasmine"]
 * @property {string[]} base - Example: ["Patchouli"]
 */

/**
 * @typedef {Object} PerfumeDetails
 * @property {number} id - Example: 1
 * @property {string} name - Example: "Bleu de Chanel"
 * @property {string} description - Example: "A woody aromatic fragrance..."
 * @property {string} gender - Example: "Male"
 * @property {string} concentration - Example: "EDP"
 * @property {string} brand - Example: "Chanel"
 * @property {string[]} sampleImages - Example: ["https://.../img1.jpg"]
 * @property {PerfumeVolume[]} volumes - Example: [{ volume: 50, price: 2000000 }]
 * @property {PerfumeNotes} notes - Example: { top: ["Grapefruit"], heart: ["Jasmine"], base: ["Patchouli"] }
 */

/**
 * @typedef {Object} ProductThumbnail
 * @property {string} src - Example: "https://.../img1.jpg"
 * @property {string} alt - Example: "Perfume image 1"
 * @property {boolean} [isActive] - Example: true
 */

/**
 * @typedef {Object} NoteRow
 * @property {string} layer - Example: "Top"
 * @property {string[]} values - Example: ["Bergamot"]
 */

export {};
