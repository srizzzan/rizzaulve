import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  gender: 'Men' | 'Women' | 'Unisex';
  splineUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

interface AppState {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: Product, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  toggleCart: () => void;
  cartTotal: () => number;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,

      addToCart: (product, size) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === product.id && item.selectedSize === size
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id && item.selectedSize === size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isCartOpen: true,
            };
          }
          return {
            cart: [...state.cart, { ...product, quantity: 1, selectedSize: size }],
            isCartOpen: true,
          };
        });
      },

      removeFromCart: (id, size) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) => !(item.id === id && item.selectedSize === size)
          ),
        }));
      },

      updateQuantity: (id, size, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id && item.selectedSize === size
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      cartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'ecommerce-cart-storage',
      partialize: (state) => ({ cart: state.cart }), // Only persist cart
    }
  )
);
