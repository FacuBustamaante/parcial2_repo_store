import {getOrders, getUser} from "../services/orders";
import { useQuery } from "@tanstack/react-query";

export function useOrders() {
   const ordersQuery = useQuery({
      queryKey: ["orders"],
      queryFn: getOrders,
   });

   const userQuery = useQuery({
      queryKey: ["user"],
      queryFn: getUser,
   });

   return {
      orders: ordersQuery.data ?? [],
      user: userQuery.data,
      loading: ordersQuery.isLoading,
      error: ordersQuery.error?.message || ordersQuery.error?.message,
   };
}