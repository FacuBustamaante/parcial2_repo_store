import { type OrderCardProps } from "../types/order";
import { formatARS } from "../../../shared/formatARS";

const OrderCard = ({ orders, user }: OrderCardProps) => {
   return (
      <>
         {orders.length === 0 ? (
            <p>No tenés ninguna orden aún, {user?.nombre}.</p>
         ) : (
            <div className="flex flex-col justify-center border-2 px-10 py-10 border-(--line) rounded-(--r-md) text-(--text) sans">
               {orders.map(order => (
                  <p key={order.id}>
                     <p>Orden ID: {order.id}</p>
                     <p>Cliente: {user?.apellido}, {user?.nombre}</p>
                     <p>Estado: {order.estado_codigo}</p>
                     <p>Subtotal: {formatARS(Number(order.subtotal))}</p>
                     <p>Costo de envío: {formatARS(Number(order.costo_envio))}</p>
                     <p>Total: {formatARS(Number(order.total))}</p>
                  </p>
               ))}
            </div>
         )}
      </>
   )
}

export default OrderCard