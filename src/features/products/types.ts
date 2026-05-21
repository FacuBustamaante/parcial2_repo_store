export interface Product {
   id: number;
   nombre: string;
   descripcion: string;
   precio_base: number;
   imagenes_url: string[];
   stock_cantidad: number;
   disponible: boolean;
   categorias: { id: number; nombre: string }[];
   ingredientes: { id: number; nombre: string }[];
}

export type Category = {
   id: number;
   nombre: string;
   descripcion: string;
   imagen_url: string;
   parent_id: number[] | null;
}

export interface ProductDetailModalProps {
   product: Product | null;
   onClose: () => void;
   onAdd: (product: Product, qty: number) => void;
}

export interface ProductsSectionProps {
   onAdd: (product: Product, qty?: number) => void;
   flashIds: Set<number>;
}

export interface ProductCardProps {
   product: Product;
   onAdd: (product: Product) => void;
   onOpen: (product: Product) => void;
   addedFlash?: boolean;
}