/**
 * @template T
 * @typedef {Object} ApiResponse
 * @property {string} timestamp
 * @property {number} status
 * @property {string} path
 * @property {T} data
 * @property {string} message
 * @property {string | null} error
 */

/**
 * @template T
 * @typedef {Object} PageResponse
 * @property {T[]} content
 * @property {number} page
 * @property {number} size
 * @property {number} totalElements
 * @property {number} totalPages
 */

export {};
