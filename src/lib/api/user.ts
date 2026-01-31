import { fetchClient } from './client';

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  userId: string;
}

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
  addresses?: Address[];
}

export const userApi = {
  getProfile: async () => {
    return fetchClient('/user/profile', {
      method: 'GET',
    });
  },
  
  /**
   * Get all addresses for the current authenticated user
   */
  getAddresses: async (): Promise<Address[]> => {
    return fetchClient('/address', {
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
