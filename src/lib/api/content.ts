import { fetchClient } from './client';
import { BlogPost } from '@/data/blog-posts';
import { Product } from '@/data/products';

function mapProduct(item: any): Product {
    return {
        ...item,
        profile: typeof item.profile === 'string' ? item.profile.split(',').map((p: string) => p.trim()) : item.profile || [],
        weight: item.weight || [], 
        type: item.type || 'Beans', 
        category: item.category || 'Gourmet', 
        roast: item.roast || 'Medium',
        additionalInfo: item.additionalInfo || undefined,
        stock: item.stock || 0,
        status: item.status || 'In Stock',
    };
}

function mapBlogPost(item: any): BlogPost {
    return {
        ...item,
        id: item.id, 
        comments: 0, 
        tags: item.tags || [],
        date: item.date, 
    };
}

export const contentApi = {
  getBlogs: async (): Promise<BlogPost[]> => {
    const data = await fetchClient<any[]>('/blog');
    return data.map(mapBlogPost);
  },

  getBlog: async (id: string): Promise<BlogPost> => {
    const data = await fetchClient<any>(`/blog/${id}`);
    return mapBlogPost(data);
  },

  getProducts: async (): Promise<Product[]> => {
    const data = await fetchClient<any[]>('/products');
    return data.map(mapProduct);
  },

  getProduct: async (id: string): Promise<Product> => {
    const data = await fetchClient<any>(`/products/${id}`);
    return mapProduct(data);
  },

  checkStock: async (productId: string, quantity: number): Promise<{ available: boolean; stock: number; message: string }> => {
    return fetchClient('/admin/products/check-stock', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  }
};
