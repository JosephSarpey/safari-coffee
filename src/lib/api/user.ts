import { fetchClient } from './client';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'CUSTOMER' | 'COMPANY';
  companyName?: string;
  phoneNumber?: string;
  country?: string;
  gender?: string;
  avatar?: string;
  createdAt: string;
}

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
