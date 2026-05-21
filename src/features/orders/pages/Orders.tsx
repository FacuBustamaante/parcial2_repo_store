import OrderCard from "../components/OrderCard";
import { useOrders } from "../hooks/useOrders";

const Orders = () => {

   const { orders, user, loading, error } = useOrders();

   return (
      <>
         <div className="flex flex-col my-15 gap-4 w-lg">
            <p className="sans uppercase tracking-[0.32em] text-(--text-faint) text-sm">historial</p>
            <h1 className="text-5xl serif text-(--text)">Tus Pedidos</h1>
            <p className="text-(--text) sans">Seguimiento detallado de cada orden. Hacé clic para expandir.</p>
         </div>
         <OrderCard
            orders={orders}
            user={user}
            loading={loading}
            error={error}
         />
      </>
   )
}

export default Orders