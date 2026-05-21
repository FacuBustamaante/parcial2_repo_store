import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import { useState } from "react";

// ───────────────────────────────────────────────────────────────────────
// Página de Login - Módulo Auth
// ───────────────────────────────────────────────────────────────────────

export function LoginPage() {

   const navigate = useNavigate();
   const login = useAuthStore((s) => s.login);
   const error = useAuthStore((s) => s.error);
   const setError = useAuthStore((s) => s.setError);

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      try {
         await login(username, password);
         navigate("/store");
      } catch {
         // El error ya está en el store
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="min-h-screen bg-(--bg) flex items-center justify-center px-4 pt-(--header-h)">
         <div className="w-full max-w-sm">

            <div className="mb-8">
               <p className="uppercase text-(--text-faint) text-[9px] tracking-[0.32em] sans mb-3">Tienda · Acceso</p>
               <h1 className="serif text-white text-4xl">Bienvenido de vuelta.</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
               {error && (
                  <div className="px-4 py-3 rounded-lg border border-red-900/40 bg-red-950/30 text-red-400 text-sm sans">
                     {error}
                  </div>
               )}

               <div className="flex flex-col gap-2">
                  <label className="uppercase text-(--text-faint) text-[9px] tracking-[0.32em] sans">
                     Usuario
                  </label>
                  <input
                     type="text"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     required
                     disabled={isLoading}
                     placeholder="Tu usuario"
                     className="w-full bg-transparent border border-(--line) rounded-lg px-4 py-3 text-white text-sm sans placeholder:text-(--text-faint) focus:outline-none focus:border-(--gold) transition-colors duration-200 disabled:opacity-50"
                  />
               </div>

               <div className="flex flex-col gap-2">
                  <label className="uppercase text-(--text-faint) text-[9px] tracking-[0.32em] sans">
                     Contraseña
                  </label>
                  <input
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                     disabled={isLoading}
                     placeholder="Tu contraseña"
                     className="w-full bg-transparent border border-(--line) rounded-lg px-4 py-3 text-white text-sm sans placeholder:text-(--text-faint) focus:outline-none focus:border-(--gold) transition-colors duration-200 disabled:opacity-50"
                  />
               </div>

               <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3.5 text-[0.82rem] font-semibold tracking-[0.04em] uppercase sans text-(--bg) bg-(--gold) rounded-lg cursor-pointer transition-[background,transform] duration-200 hover:bg-(--gold-deep) active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
               >
                  {isLoading ? "Iniciando sesión…" : "Iniciar Sesión"}
               </button>
            </form>

            <p className="mt-8 text-center text-sm text-(--text-faint) sans border-t border-(--line) pt-6">
               ¿No tenés cuenta?{" "}
               <button
                  onClick={() => navigate("/register")}
                  className="text-(--gold) hover:text-white transition-colors duration-200"
               >
                  Registrarse
               </button>
            </p>

         </div>
      </div>
   );
}