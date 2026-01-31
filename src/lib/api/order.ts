const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'}/api`;

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

export const orderApi = {
  /**
   * Get all orders for the authenticated user
   */
  async getUserOrders(): Promise<Order[]> {
    const response = await fetch(`${API_URL}/user/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for sending cookies
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    return response.json();
  },

  /**
   * Get a single order by ID
   */
  async getOrderById(id: string): Promise<Order> {
    const response = await fetch(`${API_URL}/user/orders/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 404) throw new Error('Order not found');
      if (response.status === 403) throw new Error('Access denied');
      throw new Error('Failed to fetch order details');
    }

    return response.json();
  },
};
