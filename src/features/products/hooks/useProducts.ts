import { useState, useEffect } from "react";
import { getProducts, getCategories } from "../services/products";
import type { Product, Category } from "../types";

export function useProducts() {
   const [products, setProducts] = useState<Product[]>([]);
   const [categories, setCategories] = useState<Category[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      Promise.all([getProducts(), getCategories()])
         .then(([prods, cats]) => {
            setProducts(prods);
            setCategories(cats);
         })
         .catch(() => setError("Error al cargar los productos"))
         .finally(() => setLoading(false));
   }, []);
   
   return { products, categories, loading, error };
}