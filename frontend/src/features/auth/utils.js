/**
 * @description: Decodes a base64url segment to JSON text so JWT payloads can be inspected safely.
 * @input: value (string) - Example: "eyJyb2xlIjpbXX0"
 * @output: decoded (string) - Example: "{\"role\":[]}"
 */
export const decodeBase64Url = (value) => {
  try {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    return atob(padded);
  } catch (error) {
    return '';
  }
};

/**
 * @description: Extracts the JWT payload to read role metadata for post-login routing.
 * @param {string} token - Example: "header.payload.signature"
 * @returns {import('./types').JwtPayload | null} payload - Example: { role: [{ authority: "ROLE_ADMIN" }] }
 */
export const decodeTokenPayload = (token) => {
  if (!token || typeof token !== 'string') {
    return null;
  }

  const parts = token.split('.');
  if (parts.length < 2) {
    return null;
  }

  try {
    const decoded = decodeBase64Url(parts[1]);
    return decoded ? JSON.parse(decoded) : null;
  } catch (error) {
    return null;
  }
};

/**
 * @description: Normalizes role claims from the token into a string array for routing decisions.
 * @param {import('./types').JwtPayload | null} payload - Example: { role: [{ authority: "ROLE_ADMIN" }] }
 * @returns {string[]} roles - Example: ["ROLE_ADMIN"]
 */
export const resolveRoles = (payload) => {
  const rawRoles = payload?.role;

  if (Array.isArray(rawRoles)) {
    return rawRoles
      .map((item) => (typeof item === 'string' ? item : item?.authority))
      .filter(Boolean);
  }

  if (typeof rawRoles === 'string') {
    return [rawRoles];
  }

  return [];
};

/**
 * @description: Chooses the destination route after login based on user roles.
 * @param {string[]} roles - Example: ["ROLE_ADMIN"]
 * @returns {string} path - Example: "/admin/overview"
 */
export const resolvePostLoginPath = (roles) => {
  const upperRoles = roles.map((role) => role.toUpperCase());
  const isAdmin = upperRoles.some((role) => role.includes('ADMIN'));

  return isAdmin ? '/admin/overview' : '/account/profile';
};

/**
 * @description: Checks if the authentication token is present and not expired.
 * @param {string | null} token - The JWT token to validate.
 * @returns {boolean} isValid - True if token is valid and not expired.
 */
export const isTokenValid = (token) => {
  if (!token) {
    return false;
  }

  const payload = decodeTokenPayload(token);
  if (!payload || !payload.exp) {
    return true; // If no exp field, assume valid if exists (or handle differently based on API)
  }

  // JWT exp is in seconds, Date.now() is in milliseconds
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp > currentTime;
};
