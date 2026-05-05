import { getAuthToken } from './authStorage.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_VERSION = import.meta.env.VITE_API_VERSION || 'v1';

const ensureLeadingSlash = (value) => (value.startsWith('/') ? value : `/${value}`);

const buildApiUrl = (path) => {
  if (!path) {
    return `${API_BASE_URL}/api/${API_VERSION}`;
  }

  const normalized = ensureLeadingSlash(path);
  if (normalized.startsWith('/api/')) {
    return `${API_BASE_URL}${normalized}`;
  }

  return `${API_BASE_URL}/api/${API_VERSION}${normalized}`;
};

const appendQuery = (url, query) => {
  if (!query) {
    return url;
  }

  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, String(item)));
      return;
    }

    params.set(key, String(value));
  });

  const queryString = params.toString();
  if (!queryString) {
    return url;
  }

  return url.includes('?') ? `${url}&${queryString}` : `${url}?${queryString}`;
};

const normalizeOptions = (options = {}) => {
  const normalized = { ...options };
  const headers = { ...(options.headers || {}) };
  let body = options.body;
  const token = getAuthToken();

  if (token && !('Authorization' in headers) && !('authorization' in headers)) {
    headers.Authorization = `Bearer ${token}`;
  }

  headers.Accept = headers.Accept || 'application/json';

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  if (body && typeof body === 'object' && !isFormData) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    body = JSON.stringify(body);
  }

  if (body !== undefined) {
    normalized.body = body;
  }

  normalized.headers = headers;
  return normalized;
};

const parseJsonResponse = async (response) => {
  try {
    return await response.json();
  } catch (error) {
    return null;
  }
};

const request = async (path, options = {}) => {
  const { query, ...rest } = options;
  const url = appendQuery(buildApiUrl(path), query);
  const finalOptions = normalizeOptions(rest);

  const response = await fetch(url, finalOptions);
  const data = await parseJsonResponse(response);

  if (data !== null) {
    return data;
  }

  return {
    timestamp: new Date().toISOString(),
    status: response.status,
    path: new URL(url).pathname,
    data: null,
    message: response.ok ? 'OK' : 'Request failed',
    error: response.ok ? null : 'Invalid JSON response',
  };
};

const apiClient = {
  request,
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
};

export { apiClient };
