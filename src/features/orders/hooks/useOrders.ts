import { getOrders, getUser, createOrder } from "../services/orders";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/useAuthStore";
import type { OrderCreate } from "../types/order";

export function useOrders() {
   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
   const queryClient = useQueryClient();

   const ordersQuery = useQuery({
      queryKey: ["orders"],
      queryFn: getOrders,
      enabled: isAuthenticated,
   });

   const userQuery = useQuery({
      queryKey: ["user"],
      queryFn: getUser,
      enabled: isAuthenticated,
   });

   const createOrderMutation = useMutation({
      mutationFn: (order: OrderCreate) => createOrder(order),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["orders"] });
      },
   });

   return {
      orders: ordersQuery.data ?? [],
      user: userQuery.data,
      loading: ordersQuery.isLoading,
      error: ordersQuery.error?.message,
      createOrder: createOrderMutation.mutate,
      isCreating: createOrderMutation.isPending,
   };
}