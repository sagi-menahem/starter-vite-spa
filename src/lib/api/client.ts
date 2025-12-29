/**
 * API Client
 *
 * Axios instance with interceptors for authentication and error handling.
 */

import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth.store';
import { useUIStore } from '@/stores/ui.store';
import { ENV } from '@/config/env';

/**
 * Axios instance configured with base URL and default headers
 */
export const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor - Adds JWT token to requests
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor - Handles errors globally
 */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string }>) => {
    // Handle 401 - Unauthorized
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();

      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }

      return Promise.reject(error);
    }

    // Show error toast for other errors
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';

    useUIStore.getState().addToast({
      type: 'error',
      message: errorMessage,
    });

    return Promise.reject(error);
  }
);

export default api;
