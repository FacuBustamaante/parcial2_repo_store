import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { RegisterPayload } from "../types/api";
import { useRegisterMutation } from "../hooks/useAuth";

/**
 * Página de Registro - Módulo Auth
 */
export function RegisterPage() {
   const navigate = useNavigate();

   const { mutateAsync: register, isPending, error } = useRegisterMutation();

   const [formData, setFormData] = useState<RegisterPayload>({
      nombre: "",
      apellido: "",
      email: "",
      celular: "",
      password: "",
   });

   const [passwordConfirm, setPasswordConfirm] = useState("");
   const [localError, setLocalError] = useState<string | null>(null);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   if (formData.password !== passwordConfirm) {
      // para este caso local podés seguir usando un useState de error local
      setLocalError("Las contraseñas no coinciden");
      return;
   }
   try {
      await register(formData);
      navigate("/store");
   } catch {
      // error ya está en `error` de useMutation
   }
};

   const inputClass = "w-full bg-transparent border border-(--line) rounded-lg px-4 py-3 text-white text-sm sans placeholder:text-(--text-faint) focus:outline-none focus:border-(--gold) transition-colors duration-200 disabled:opacity-50";
   const labelClass = "uppercase text-(--text-faint) text-[9px] tracking-[0.32em] sans";

   return (
      <div className="min-h-screen bg-(--bg) flex items-center justify-center px-4 py-10 pt-(--header-h)">
         <div className="w-full max-w-md">

            <div className="mb-8">
               <p className="uppercase text-(--text-faint) text-[9px] tracking-[0.32em] sans mb-3">Tienda · Registro</p>
               <h1 className="serif text-white text-4xl">Crear cuenta.</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
               {localError && (
                  <div className="px-4 py-3 rounded-lg border border-red-900/40 bg-red-950/30 text-red-400 text-sm sans">
                     {error?.message}
                  </div>
               )}

               {/* NOMBRE + APELLIDO */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                     <label htmlFor="nombre" className={labelClass}>Nombre</label>
                     <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        disabled={isPending}
                        placeholder="Tu nombre"
                        className={inputClass}
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label htmlFor="apellido" className={labelClass}>Apellido</label>
                     <input
                        id="apellido"
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                        disabled={isPending}
                        placeholder="Tu apellido"
                        className={inputClass}
                     />
                  </div>
               </div>

               {/* EMAIL */}
               <div className="flex flex-col gap-2">
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input
                     id="email"
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     required
                     disabled={isPending}
                     placeholder="tu@email.com"
                     className={inputClass}
                  />
               </div>

               {/* CELULAR */}
               <div className="flex flex-col gap-2">
                  <label htmlFor="celular" className={labelClass}>Celular</label>
                  <input
                     id="celular"
                     type="text"
                     name="celular"
                     value={formData.celular}
                     onChange={handleChange}
                     disabled={isPending}
                     placeholder="Tu celular"
                     className={inputClass}
                  />
               </div>

               {/* CONTRASEÑA + CONFIRMAR */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                     <label htmlFor="password" className={labelClass}>Contraseña</label>
                     <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={isPending}
                        placeholder="••••••••"
                        className={inputClass}
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label htmlFor="passwordConfirm" className={labelClass}>Confirmar</label>
                     <input
                        id="passwordConfirm"
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                        disabled={isPending}
                        placeholder="••••••••"
                        className={inputClass}
                     />
                  </div>
               </div>

               <button
                  type="submit"
                  disabled={isPending}
                  className="w-full mt-2 py-3.5 text-[0.82rem] font-semibold tracking-[0.04em] uppercase sans text-(--bg) bg-(--gold) rounded-lg cursor-pointer transition-[background,transform] duration-200 hover:bg-(--gold-deep) active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
               >
                  {isPending ? "Registrando…" : "Crear cuenta"}
               </button>
            </form>

            <p className="mt-8 text-center text-sm text-(--text-faint) sans border-t border-(--line) pt-6">
               ¿Ya tenés cuenta?{" "}
               <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-(--gold) hover:text-white transition-colors duration-200"
               >
                  Iniciar Sesión
               </button>
            </p>

         </div>
      </div>
   );
}
