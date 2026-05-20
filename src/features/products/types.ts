export interface Product {
   id: string;
   nombre: string;
   descripcionCorta: string;
   descripcionLarga: string;
   precio: number;
   categoria: string;
   stock: number;
}

export type Category = string;

export interface ProductDetailModalProps {
   product: Product | null;
   onClose: () => void;
   onAdd: (product: Product, qty: number) => void;
}

export interface ProductsSectionProps {
   onAdd: (product: Product, qty?: number) => void;
   flashIds: Set<string>;
}

export interface ProductCardProps {
   product: Product;
   onAdd: (product: Product) => void;
   onOpen: (product: Product) => void;
   addedFlash?: boolean;
}