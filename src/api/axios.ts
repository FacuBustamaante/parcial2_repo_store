import axios, { AxiosError } from "axios";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
   withCredentials: true,
   timeout: 10000,
   headers: {
      "Content-Type": "application/json",
   },
});

api.interceptors.request.use(
   (config) => {
      return config;
   },
   (error: AxiosError) => {
      console.error("Error en request:", error);
      return Promise.reject(error);
   },
);

api.interceptors.response.use((response) => {
   if (response.data?.data !== undefined) {
      response.data = response.data.data;
   }
   return response;
});

export default api;