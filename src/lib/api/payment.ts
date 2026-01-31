import { fetchClient } from './client';

export interface CreatePaymentIntentDto {
  amount: number;
  currency: string;
  metadata?: {
    customerEmail: string;
    customerName?: string;
    items?: any[];
    userId?: string;
  };
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export const paymentApi = {
  async createPaymentIntent(data: CreatePaymentIntentDto): Promise<PaymentIntentResponse> {
    return fetchClient<PaymentIntentResponse>('/payment/create-intent', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getPaymentStatus(paymentIntentId: string): Promise<any> {
    return fetchClient(`/payment/${paymentIntentId}`, {
      method: 'GET',
    });
  },

  async createOrder(data: {
    paymentIntentId: string;
    total: number;
    items: Array<{ productId: string; quantity: number; price: number }>;
    userId?: string;
  }): Promise<any> {
    return fetchClient('/payment/create-order', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
