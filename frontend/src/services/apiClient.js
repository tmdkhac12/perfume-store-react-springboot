import axios from 'axios';
import { getAuthToken } from './authStorage.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_VERSION = import.meta.env.VITE_API_VERSION || 'v1';

/** @description: Axios instance with base configuration. */
const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

/** @description: Request interceptor to inject the authentication token. */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * @description: Ensures a string starts with a forward slash.
 * @param {string} value - Example: "perfumes"
 * @returns {string} formattedValue - Example: "/perfumes"
 */
const ensureLeadingSlash = (value) => (value.startsWith('/') ? value : `/${value}`);

/**
 * @description: Formats error response to a standardized structure.
 * @param {any} error - Axios error object
 * @param {string} path - Request path
 * @returns {object} standardizedError
 */
const formatErrorResponse = (error, path) => {
  const response = error.response;
  return {
    timestamp: new Date().toISOString(),
    status: response?.status || 500,
    path: path,
    data: response?.data || null,
    message: response?.data?.message || error.message || 'Request failed',
    error: error.code || 'UNKNOWN_ERROR'
  };
};

/**
 * @description: Makes an asynchronous HTTP request using Axios.
 * @param {string} path - Example: "/login"
 * @param {object} options - Example: { method: "POST" }
 * @returns {Promise<any>} result - Returns data on success or standardized error object
 */
const request = async (path, options = {}) => {
  const normalizedPath = ensureLeadingSlash(path);
  try {
    const response = await axiosInstance({
      url: normalizedPath,
      method: options.method || 'GET',
      data: options.body,
      params: options.query,
      ...options
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return formatErrorResponse(error, normalizedPath);
    }
    return {
      timestamp: new Date().toISOString(),
      status: 500,
      path: normalizedPath,
      data: null,
      message: error.message || 'An unexpected error occurred',
      error: 'RUNTIME_ERROR'
    };
  }
};

/** @description: API client utility providing methods for standard HTTP requests. */
const apiClient = {
  /**
   * @description: Makes an asynchronous HTTP request.
   * @param {string} path - Example: "/login"
   * @param {object} options - Example: { method: "POST" }
   * @returns {Promise<object>} result
   */
  request,

  /**
   * @description: Performs a GET request.
   * @param {string} path - Example: "/perfumes"
   * @param {object} options - Example: { query: { page: 1 } }
   * @returns {Promise<object>} result
   */
  get: (path, options) => request(path, { ...options, method: 'GET' }),

  /**
   * @description: Performs a POST request.
   * @param {string} path - Example: "/perfumes"
   * @param {any} body - Example: { name: "New Perfume" }
   * @param {object} options - Example: { headers: {...} }
   * @returns {Promise<object>} result
   */
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),

  /**
   * @description: Performs a PUT request.
   * @param {string} path - Example: "/perfumes/1"
   * @param {any} body - Example: { name: "Updated Name" }
   * @param {object} options - Example: { headers: {...} }
   * @returns {Promise<object>} result
   */
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),

  /**
   * @description: Performs a PATCH request.
   * @param {string} path - Example: "/perfumes/1"
   * @param {any} body - Example: { name: "Updated Name" }
   * @param {object} options - Example: { headers: {...} }
   * @returns {Promise<object>} result
   */
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),

  /**
   * @description: Performs a DELETE request.
   * @param {string} path - Example: "/perfumes/1"
   * @param {object} options - Example: { headers: {...} }
   * @returns {Promise<object>} result
   */
  delete: (path, options) => request(path, { ...options, method: 'DELETE' })
};

export { apiClient };
