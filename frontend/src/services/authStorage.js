const TOKEN_KEY = 'perfume_store_token';
let memoryToken = null;

const hasDocument = () => {
  try {
    return typeof document !== 'undefined' && typeof document.cookie !== 'undefined';
  } catch (error) {
    return false;
  }
};

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

const getAuthToken = () => {
  if (!hasDocument()) {
    return memoryToken;
  }

  const value = parseCookieValue(document.cookie, TOKEN_KEY);
  return value || null;
};

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

const clearAuthToken = () => {
  setAuthToken(null);
};

export { clearAuthToken, getAuthToken, setAuthToken };
