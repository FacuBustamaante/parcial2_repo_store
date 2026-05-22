import OrderCard from "../components/OrderCard";
import { useOrders } from "../hooks/useOrders";

const Orders = () => {
   const { orders, user, loading, error } = useOrders();

   return (
      <div className="bg-(--bg) min-h-screen">
         <div className="max-w-3xl mx-auto px-6 py-10">
            <div className="flex items-end justify-between mb-6 pb-6 border-b border-(--line)">
               <div>
                  <p className="uppercase text-(--text-faint) text-[9px] tracking-[0.32em] mb-2">historial</p>
                  <h1 className="serif text-white text-4xl">Tus Pedidos</h1>
               </div>
            </div>
            <p className="text-(--text-faint) sans text-sm mb-8">
               Seguimiento detallado de cada orden. Hacé clic para expandir.
            </p>
            <OrderCard orders={orders} user={user} loading={loading} error={error} />
         </div>
      </div>
   );
};

export default Orders;