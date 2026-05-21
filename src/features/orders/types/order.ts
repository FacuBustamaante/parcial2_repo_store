import { type Usuario } from "../types/user";

export interface OrderResponse {
   id: number;
   usuario_id: number;
   direccion_id: number;
   estado_codigo: string;
   forma_pago_codigo: string;
   subtotal: string;
   descuento: string;
   costo_envio: string;
   total: string;
   notas: string;
}

export interface Personalizacion {
   personalizacion_id: number;
}

export interface Detalle {
   producto_id: number;
   cantidad: number;
   personalizacion: number[];
}

export interface OrderCreate {
   direccion_id: number;
   forma_pago_codigo: string;
   notas: string;
   detalles: Detalle[];
}

export interface OrderCardProps {
   orders: OrderResponse[];
   user: Usuario | undefined;
   loading: boolean;
   error: string | undefined;
}