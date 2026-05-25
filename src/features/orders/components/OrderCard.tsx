import { useState } from "react";
import { type OrderCardProps } from "../types/order";
import { formatARS } from "../../../shared/formatARS";
import "../../../index.css";
import { useAuthStore } from "../../../store/useAuthStore";
import { HashLoader } from "react-spinners";

const OrderCard = ({ orders, user, loading, error }: OrderCardProps) => {
   const [expandedId, setExpandedId] = useState<number | null>(null);
   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

   if (loading) return (
      <div className="flex justify-center items-center gap-4 py-24">
         <HashLoader
            color="#C9A84C"
            size={30}
         />
         <p className="text-(--text-faint) sans text-sm uppercase tracking-widest">Cargando pedidos…</p>
      </div>
   );

   if (!isAuthenticated) return (
      <div className="flex flex-col items-center gap-4 py-24 text-center bg-(--surface) border-2 rounded-xl border-dashed border-(--line)">
         <p className="serif text-white text-2xl">Inicia sesión para ver tus pedidos</p>
         <p className="text-sm text-(--text-faint) sans">Una vez que realices un pedido, aparecerá acá.</p>
      </div>
   );

   if (error) return (
      <div className="flex justify-center py-24">
         <p className="text-red-400 sans text-sm">{error}</p>
      </div>
   );

   if (orders.length === 0) return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
         <p className="serif text-white text-2xl">Sin pedidos aún</p>
         <p className="text-sm text-(--text-faint) sans">Cuando realices tu primer pedido aparecerá aquí.</p>
      </div>
   );

   return (
      <div className="flex flex-col gap-4">
         {orders.map(order => {
            const isOpen = expandedId === order.id;

            return (
               <div key={order.id} className="bg-(--surface) border border-(--line) rounded-xl overflow-hidden">
                  <button
                     onClick={() => setExpandedId(isOpen ? null : order.id)}
                     className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer hover:bg-white/2 transition-colors duration-150"
                  >
                     <div className="flex items-center gap-4">
                        <span className="serif text-white text-lg">#{order.id}</span>
                        <span className={`status-badge status-${order.estado_codigo}`}>
                           {order.estado_codigo}
                        </span>
                     </div>
                     <div className="flex items-center gap-6">
                        <span className="serif text-(--gold) text-lg">{formatARS(Number(order.total))}</span>
                        <svg
                           className={`w-4 h-4 text-(--text-faint) transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                           fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                           <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                     </div>
                  </button>

                  {isOpen && (
                     <div className="border-t border-(--line) px-6 py-5 flex flex-col gap-4">
                        {user && (
                           <p className="text-sm sans text-(--text-faint)">
                              Cliente: <span className="text-(--text)">{user.apellido}, {user.nombre}</span>
                           </p>
                        )}
                        {order.notas && (
                           <p className="text-sm sans text-(--text-faint)">
                              Notas: <span className="text-(--text)">{order.notas}</span>
                           </p>
                        )}
                        <div className="border-t border-(--line) pt-4">
                           {order.detalles.map(item => (
                              <div key={item.producto_id} className="flex justify-between text-sm sans text-(--text) mt-3">
                                 <span>{item.nombre_snapshot} x{item.cantidad}</span>
                                 <span>{formatARS(Number(item.precio_snapshot) * item.cantidad)}</span>
                              </div>
                           ))}
                        </div>
                        <div className="flex flex-col gap-2 border-t border-(--line) pt-4">
                           <div className="flex justify-between text-sm sans text-(--text-faint)">
                              <span>Subtotal</span>
                              <span className="text-(--text)">{formatARS(Number(order.subtotal))}</span>
                           </div>
                           {Number(order.descuento) > 0 && (
                              <div className="flex justify-between text-sm sans text-(--text-faint)">
                                 <span>Descuento</span>
                                 <span className="text-emerald-400">−{formatARS(Number(order.descuento))}</span>
                              </div>
                           )}
                           <div className="flex justify-between text-sm sans text-(--text-faint)">
                              <span>Envío</span>
                              <span className="text-(--text)">{formatARS(Number(order.costo_envio))}</span>
                           </div>
                           <div className="flex justify-between items-center border-t border-(--line) pt-3 mt-1">
                              <span className="text-(--text-faint) sans text-xs uppercase tracking-widest">Total</span>
                              <div className="flex items-center justify-items-center gap-5">
                                 <span className={`pago-badge pago-${order.forma_pago_codigo}`}>
                                    {order.forma_pago_codigo}
                                 </span>
                                 <span className="serif text-(--gold) text-2xl font-bold">{formatARS(Number(order.total))}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            );
         })}
      </div>
   );
};

export default OrderCard;
