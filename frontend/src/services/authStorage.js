const TOKEN_KEY = 'perfume_store_token';
let memoryToken = null;

/**
 * @description: Checks if the document and cookie objects are available (browser environment).
 * @returns {boolean} exists - Example: true
 */
const hasDocument = () => {
  try {
    return typeof document !== 'undefined' && typeof document.cookie !== 'undefined';
  } catch (error) {
    return false;
  }
};

/**
 * @description: Extracts a specific cookie value by key from a cookie string.
 * @param {string} cookieString - Example: "key1=val1; key2=val2"
 * @param {string} key - Example: "key1"
 * @returns {string | null} value - Example: "val1"
 */
const parseCookieValue = (cookieString, key) => {
  if (!cookieString) {
    return null;
  }

  const parts = cookieString.split(';');
  for (const part of parts) {
    const [rawName, ...rawValue] = part.trim().split('=');
    if (rawName === key) {
      return decodeURIComponent(rawValue.join('='));
    }
  }

  return null;
};

/**
 * @description: Retrieves the authentication token from cookies or fallback memory storage.
 * @returns {string | null} token - Example: "eyJhbG..."
 */
const getAuthToken = () => {
  if (!hasDocument()) {
    return memoryToken;
  }

  const value = parseCookieValue(document.cookie, TOKEN_KEY);
  return value || null;
};

/**
 * @description: Constructs a cookie string with specified options like Path, SameSite, Max-Age, and Secure.
 * @param {string} value - Example: "token_value"
 * @param {object} options - Example: { path: "/", maxAge: 3600 }
 * @returns {string} cookieString - Example: "perfume_store_token=token_value; Path=/; ..."
 */
const buildCookie = (value, options = {}) => {
  const attributes = [];
  const encodedValue = encodeURIComponent(value);

  attributes.push(`${TOKEN_KEY}=${encodedValue}`);
  attributes.push(`Path=${options.path || '/'}`);
  attributes.push(`SameSite=${options.sameSite || 'Lax'}`);

  if (options.maxAge) {
    attributes.push(`Max-Age=${options.maxAge}`);
  }

  if (options.secure) {
    attributes.push('Secure');
  }

  return attributes.join('; ');
};

/**
 * @description: Sets the authentication token in memory and persists it to cookies if available.
 * @param {string | null} token - Example: "token_value"
 * @param {object} options - Example: { maxAge: 3600 }
 * @returns {void} - updates memoryToken and document.cookie
 */
const setAuthToken = (token, options = {}) => {
  memoryToken = token || null;

  if (!hasDocument()) {
    return;
  }

  if (token) {
    const secure = options.secure ?? window.location.protocol === 'https:';
    document.cookie = buildCookie(token, { ...options, secure });
    return;
  }

  document.cookie = buildCookie('', { ...options, maxAge: 0 });
};

/**
 * @description: Clears the authentication token from both memory and cookies.
 * @returns {void} - resets memoryToken and expires cookie
 */
const clearAuthToken = () => {
  setAuthToken(null);
};

export { clearAuthToken, getAuthToken, setAuthToken };
