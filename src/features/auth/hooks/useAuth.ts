import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/useAuthStore";
import type { RegisterPayload } from "../types/api";

export function useLoginMutation() {
   const login = useAuthStore((s) => s.login);

   return useMutation({
      mutationFn: ({ email, password }: { email: string; password: string }) =>
         login(email, password),
   });
}

export function useRegisterMutation() {
   const register = useAuthStore((s) => s.register);

   return useMutation({
      mutationFn: (payload: RegisterPayload) => register(payload),
   });
}