import api from "../../../shared/utils/axios";
import type { Product, Category } from "../types";

/* PRODUCTOS */

export async function getProducts(): Promise<Product[]> {
   const { data } = await api.get("/productos");
   return data;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
   const { data } = await api.get(`/productos/categoria/${category}`);
   return data;
}

export const getProductById = async (id: number): Promise<Product> => {
   const { data } = await api.get(`/productos/${id}`);
   return data;
};

/* CATEGORIAS */

export async function getCategories(): Promise<Category[]> {
   const { data } = await api.get("/categorias");
   return data;
}

export async function getCategoryById(id: number): Promise<Category> {
   const { data } = await api.get(`/categorias/${id}`);
   return data;
}