/**
 * User Service
 *
 * API methods for user operations.
 */

import { api } from '../client';
import type { User } from '@/types';

export interface UpdateProfileData {
  name?: string;
  email?: string;
}

export const userService = {
  /**
   * Get the current user's profile
   */
  getProfile: () => api.get<User>('/user/profile'),

  /**
   * Update the current user's profile
   */
  updateProfile: (data: UpdateProfileData) =>
    api.patch<User>('/user/profile', data),

  /**
   * Upload a new avatar
   */
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);

    return api.post<{ avatarUrl: string }>('/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Delete the current user's avatar
   */
  deleteAvatar: () => api.delete('/user/avatar'),

  /**
   * Change password
   */
  changePassword: (currentPassword: string, newPassword: string) =>
    api.post('/user/change-password', {
      currentPassword,
      newPassword,
    }),

  /**
   * Delete account
   */
  deleteAccount: (password: string) =>
    api.delete('/user/account', {
      data: { password },
    }),
};
