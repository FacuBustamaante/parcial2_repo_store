import type { Product } from "../products/types";

export interface CartItem {
   product: Product;
   qty: number;
}

export interface CartStore {
   items: CartItem[];
   personalizacion: number[];
   isOpen: boolean;
   addItem: (product: Product, qty?: number) => void;
   removeItem: (productId: number) => void;
   updateQty: (productId: number, qty: number) => void;
   toggleIngrediente: (ingredienteId: number) => void;
   clear: () => void;
   openCart: () => void;
   closeCart: () => void;
}
