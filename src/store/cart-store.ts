import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";

interface CartItem extends Product {
  quantity: number;
}

interface StockValidation {
  success: boolean;
  message?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, maxStock?: number) => StockValidation;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number, maxStock?: number) => StockValidation;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, maxStock) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);
        const currentQuantity = existingItem ? existingItem.quantity : 0;
        const newQuantity = currentQuantity + 1;

        // Check stock limit if maxStock is provided
        if (maxStock !== undefined && newQuantity > maxStock) {
          return {
            success: false,
            message: `Cannot add more. Only ${maxStock} items available in stock.`,
          };
        }

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: newQuantity }
                : item
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity: 1 }] });
        }

        return { success: true };
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },
      updateQuantity: (productId, quantity, maxStock) => {
        // Validate quantity
        if (quantity < 1) {
          return {
            success: false,
            message: 'Quantity must be at least 1.',
          };
        }

        // Check stock limit if maxStock is provided
        if (maxStock !== undefined && quantity > maxStock) {
          return {
            success: false,
            message: `Cannot set quantity to ${quantity}. Only ${maxStock} items available in stock.`,
          };
        }

        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });

        return { success: true };
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      totalPrice: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: "safari-cart-store",
    }
  )
);
