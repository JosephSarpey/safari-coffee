import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";

export interface CartItem extends Omit<Product, 'weight'> {
  quantity: number;
  weight: string;       // selected weight variant (e.g. "250g")
  cartItemId: string;   // unique key: `${product.id}-${weight}`
}

interface StockValidation {
  success: boolean;
  message?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, maxStock?: number, weight?: string) => StockValidation;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number, maxStock?: number) => StockValidation;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, maxStock, weight = "") => {
        const cartItemId = `${product.id}-${weight}`;
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.cartItemId === cartItemId);
        const currentQuantity = existingItem ? existingItem.quantity : 0;
        const newQuantity = currentQuantity + 1;

        // Check stock limit if maxStock is provided
        // Stock is shared across all weight variants of a product
        const totalProductQty = currentItems
          .filter((item) => item.id === product.id)
          .reduce((sum, item) => sum + item.quantity, 0);

        if (maxStock !== undefined && totalProductQty + 1 > maxStock) {
          return {
            success: false,
            message: `Cannot add more. Only ${maxStock} items available in stock.`,
          };
        }

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.cartItemId === cartItemId
                ? { ...item, quantity: newQuantity }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...currentItems,
              { ...product, quantity: 1, weight, cartItemId },
            ],
          });
        }

        return { success: true };
      },
      removeItem: (cartItemId) => {
        set({
          items: get().items.filter((item) => item.cartItemId !== cartItemId),
        });
      },
      updateQuantity: (cartItemId, quantity, maxStock) => {
        if (quantity < 1) {
          return {
            success: false,
            message: "Quantity must be at least 1.",
          };
        }

        if (maxStock !== undefined && quantity > maxStock) {
          return {
            success: false,
            message: `Cannot set quantity to ${quantity}. Only ${maxStock} items available in stock.`,
          };
        }

        set({
          items: get().items.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
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
