import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
   timeout: 10000,
   headers: {
      "Content-Type": "application/json",
   },
});

api.interceptors.response.use((response) => {
   if (response.data?.data !== undefined) {
      response.data = response.data.data;
   }
   return response;
});

export default api;