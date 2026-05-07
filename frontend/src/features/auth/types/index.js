/**
 * @typedef {Object} LoginRequest
 * @property {string} username - The user's login identifier
 * @property {string} password - The user's password
 */

/**
 * @typedef {Object} RegisterRequest
 * @property {string} name - Full name of the user
 * @property {string} username - Desired login identifier
 * @property {string} email - Email address
 * @property {string} password - User password
 * @property {string} confirmPassword - Password confirmation
 */

/**
 * @typedef {Object} AuthRole
 * @property {string} authority - The role name (e.g., "ROLE_ADMIN", "ROLE_USER")
 */

/**
 * @typedef {Object} JwtPayload
 * @property {string} sub - Subject (usually username)
 * @property {(string|AuthRole)[]} role - User roles/authorities
 * @property {number} iat - Issued at timestamp
 * @property {number} exp - Expiration timestamp
 */

/**
 * @typedef {Object} UserProfile
 * @property {number} id - Unique identifier
 * @property {string} name - Full name
 * @property {string} username - Login identifier
 * @property {string} email - Email address
 */

/**
 * @template T
 * @typedef {Object} ApiResponse
 * @property {string} timestamp - ISO timestamp of the response
 * @property {number} status - HTTP status code
 * @property {string} path - API endpoint path
 * @property {T} data - The actual response data
 * @property {string} message - Status message
 * @property {string|null} error - Error message if any
 */

export {};
