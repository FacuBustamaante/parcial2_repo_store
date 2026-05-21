export function getApiBase(): string {
   const raw = import.meta.env.VITE_API_URL;
   if (!raw || typeof raw !== "string") {
      throw new Error("Falta VITE_API_URL en .env");
   }
   return raw.replace(/\/$/, "");
}
