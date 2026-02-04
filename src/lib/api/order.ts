import { fetchClient } from './client';


export interface Order {
  id: string;
  total: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  paymentIntentId: string;
  createdAt: string;
  updatedAt: string;
  userId: string | null;
  items: OrderItem[];
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
  };
}

export interface PaginatedOrders {
  data: Order[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const orderApi = {
  /**
   * Get all orders for the authenticated user, paginated
   */
  async getUserOrders(page: number = 1, limit: number = 10): Promise<PaginatedOrders> {
    return fetchClient<PaginatedOrders>(`/user/orders?page=${page}&limit=${limit}`);
  },

  /**
   * Get a single order by ID
   */
  async getOrderById(id: string): Promise<Order> {
    return fetchClient<Order>(`/user/orders/${id}`);
  },
};
