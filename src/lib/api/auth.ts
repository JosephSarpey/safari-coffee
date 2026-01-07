import { fetchClient } from './client';

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface SignupData {
  name?: string;
  email: string;
  password?: string;
  role?: 'CUSTOMER' | 'COMPANY';
  companyName?: string;
  taxId?: string;
  phoneNumber?: string;
  [key: string]: any;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    return fetchClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  signup: async (data: SignupData) => {
    return fetchClient('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  logout: async () => {
    return fetchClient('/auth/logout', {
      method: 'POST',
    });
  },
};
