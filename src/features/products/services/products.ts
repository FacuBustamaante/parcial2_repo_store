import api from "../../../api/axios";
import type { Product, Category } from "../types";

/* PRODUCTOS */

export async function getProducts(): Promise<Product[]> {
   const { data } = await api.get("/api/v1/productos");
   return data;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
   const { data } = await api.get(`/api/v1/productos/categoria/${category}`);
   return data;
}

export const getProductById = async (id: number): Promise<Product> => {
   const { data } = await api.get(`/api/v1/productos/${id}`);
   return data;
};

/* CATEGORÍAS */

export async function getCategories(): Promise<Category[]> {
   const { data } = await api.get("/api/v1/categorias");
   return data;
}

export async function getCategoryById(id: number): Promise<Category> {
   const { data } = await api.get(`/api/v1/categorias/${id}`);
   return data;
}