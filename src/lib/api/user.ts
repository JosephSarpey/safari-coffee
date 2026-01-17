import { fetchClient } from './client';
import { UserProfile } from '@/types/user';

export type { UserProfile };

export const userApi = {
  getProfile: async () => {
    return fetchClient('/user/profile', {
      method: 'GET',
    });
  },
  
  updateProfile: async (data: Partial<UserProfile>) => {
      return fetchClient('/user/profile', {
          method: 'PATCH',
          body: JSON.stringify(data)
      });
  }
};
