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

export interface CreateAddressData {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export const addressApi = {
  getAll: async () => {
    return fetchClient<Address[]>('/address', {
      method: 'GET',
    });
  },

  create: async (data: CreateAddressData) => {
    return fetchClient<Address>('/address', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Partial<CreateAddressData>) => {
    return fetchClient<Address>(`/address/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return fetchClient(`/address/${id}`, {
      method: 'DELETE',
    });
  },
};
