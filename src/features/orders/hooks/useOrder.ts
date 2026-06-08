import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../services/orders";

export function useOrder(orderId: number) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });
}