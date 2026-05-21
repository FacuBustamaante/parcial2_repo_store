import { getProducts, getCategories } from "../services/products";
import { useQuery } from "@tanstack/react-query";

export function useProducts() {
   const productsQuery = useQuery({
      queryKey: ["products"],
      queryFn: getProducts,
   });

   const categoriesQuery = useQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
   });

   return {
      products: productsQuery.data ?? [],
      categories: categoriesQuery.data ?? [],
      loading: productsQuery.isLoading || categoriesQuery.isLoading,
      error: productsQuery.error || categoriesQuery.error,
   };
}