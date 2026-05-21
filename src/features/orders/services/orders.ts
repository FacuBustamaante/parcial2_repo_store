import api from "../../../api/axios";
import type { OrderCreate, OrderResponse } from "../types/order";
import type { Usuario } from "../types/user";

/* Ordenes */

export async function getOrders(): Promise<OrderResponse[]> {
   const { data } = await api.get("/api/v1/pedidos/mis-pedidos");
   return data;
}

export const getOrdersById = async (id: number): Promise<OrderResponse> => {
   const { data } = await api.get(`/api/v1/pedidos/mis-pedidos${id}`);
   return data;
};

export const getOrdersByUserId = async (userId: number): Promise<OrderResponse[]> => {
   const { data } = await api.get(`/api/v1/pedidos/usuario/${userId}`);
   return data;
};

export const createOrder = async (order: OrderCreate): Promise<OrderResponse> => {
   const { data } = await api.post("/api/v1/pedidos", order);
   return data;
}

export const getUser = async () : Promise<Usuario> => {
   const { data } = await api.get(`/api/v1/auth/me`);
   return data;
}