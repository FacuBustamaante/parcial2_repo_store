import { Link, useParams } from "react-router-dom";
import { PaymentButton } from "../components/PaymentButton";
import { useOrder } from "../../../features/orders/hooks/useOrder";

export default function PaymentPage() {
  const { orderId } = useParams<{ orderId: string }>();

  const {
    data: order,
    isLoading,
    error,
  } = useOrder(Number(orderId));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Cargando pedido...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Pedido no encontrado
        </h1>

        <p className="text-gray-500 mb-6">
          No se pudo cargar el pedido
        </p>

        <Link
          to="/"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-600"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Resumen del Pedido #{order.id}
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Estado</span>
              <span className="font-medium text-yellow-600">
                {order.estado}
              </span>
            </div>

            <hr />

            <div className="flex justify-between text-lg">
              <span className="font-bold text-gray-900">
                Total a pagar
              </span>

              <span className="font-bold text-blue-600">
                ${order.total}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <PaymentButton
              pedidoId={order.id}
              monto={order.total}
            />
          </div>
        </div>
      </main>
    </div>
  );
}