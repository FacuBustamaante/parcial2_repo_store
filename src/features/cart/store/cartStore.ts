import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type CartStore } from "../types";

export const useCartStore = create<CartStore>()(
   persist(
      (set) => ({
   items: [],
   personalizacion: [],
   isOpen: false,
   openCart: () => set({ isOpen: true }),
   closeCart: () => set({ isOpen: false }),

   addItem: (product, qty = 1) =>
      set((state) => {
         const existing = state.items.find((i) => i.product.id === product.id);
         if (existing) {
            return {
               items: state.items.map((i) =>
                  i.product.id === product.id
                     ? { ...i, qty: Math.min(product.stock_cantidad, i.qty + qty) }
                     : i
               ),
            };
         }
         return {
            items: [...state.items, { product, qty: Math.min(product.stock_cantidad, qty) }],
         };
      }),

   toggleIngrediente: (ingredienteId) =>
      set((state) => {
         const current = state.personalizacion;
         const next = current.includes(ingredienteId)
            ? current.filter((id) => id !== ingredienteId)
            : [...current, ingredienteId];
         return { personalizacion: next };
      }),

   removeItem: (productId) =>
      set((state) => ({
         items: state.items.filter((i) => i.product.id !== productId),
      })),

   updateQty: (productId, qty) =>
      set((state) => ({
         items: state.items.map((i) =>
            i.product.id === productId ? { ...i, qty } : i
         ),
      })),

   clear: () => set({ items: [], personalizacion: [] }),
      }),
      {
         name: "cart-storage",
         partialize: (state) => ({ items: state.items, personalizacion: state.personalizacion }),
      }
   )
);
