/**
 * Authentication Service
 *
 * API methods for authentication operations.
 */

import { api } from '../client';
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  ResetPasswordData,
} from '@/types';

export const authService = {
  /**
   * Login with email and password
   */
  login: (credentials: LoginCredentials) =>
    api.post<AuthResponse>('/auth/login', credentials),

  /**
   * Register a new user
   */
  register: (data: RegisterData) =>
    api.post<AuthResponse>('/auth/register', data),

  /**
   * Logout the current user
   */
  logout: () => api.post('/auth/logout'),

  /**
   * Refresh the access token
   */
  refreshToken: () => api.post<{ token: string }>('/auth/refresh'),

  /**
   * Request a password reset email
   */
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),

  /**
   * Reset password with token
   */
  resetPassword: (data: ResetPasswordData) =>
    api.post('/auth/reset-password', data),

  /**
   * Verify email with token
   */
  verifyEmail: (token: string) =>
    api.post('/auth/verify-email', { token }),
};
