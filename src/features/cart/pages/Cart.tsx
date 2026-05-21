import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { CartItem } from "../components/CartItem";
import { formatARS } from "../../../shared/formatARS";
import { ArrowIcon } from "../../../shared/Icons";
import "../../../index.css";

export default function Cart() {
   const navigate = useNavigate();
   const items = useCartStore((s) => s.items);
   const clear = useCartStore((s) => s.clear);

   const totalUnits = items.reduce((acc, i) => acc + i.qty, 0);
   const totalPrice = items.reduce((acc, i) => acc + i.product.precio_base * i.qty, 0);

   return (
      <div className="bg-(--bg) min-h-screen">
         <div className="max-w-3xl mx-auto px-6 py-10">
            <button
               onClick={() => navigate("/store")}
               className="inline-flex items-center sans gap-2 mb-8 text-[0.82rem] font-semibold tracking-[0.04em] text-(--text-faint) uppercase cursor-pointer transition-colors duration-200 hover:text-(--gold)"
            >
               <ArrowIcon dir="left" size={14} /> Seguir comprando
            </button>

            <div className="flex items-end justify-between mb-8 pb-6 border-b border-(--line)">
               <div>
                  <p className="uppercase text-(--text-faint) text-[9px] tracking-[0.32em] mb-2">Tu pedido</p>
                  <h1 className="serif text-white text-4xl">Carrito</h1>
               </div>
               {items.length > 0 && (
                  <button
                     onClick={clear}
                     className="text-xs text-(--text-faint) uppercase tracking-widest hover:text-white transition-colors sans"
                  >
                     Vaciar carrito
                  </button>
               )}
            </div>

            {items.length === 0 ? (
               <div className="flex flex-col items-center gap-6 py-24 text-center">
                  <p className="serif text-white text-2xl">Tu carrito está vacío</p>
                  <p className="text-sm text-(--text-faint) sans">Explorá nuestra selección y agregá platos a tu pedido.</p>
                  <button
                     onClick={() => navigate("/store")}
                     className="mt-2 px-6 py-3 text-[0.82rem] font-semibold tracking-[0.04em] uppercase sans text-(--bg) bg-(--gold) rounded-lg cursor-pointer transition-[background,transform] duration-200 hover:bg-(--gold-deep) active:scale-[0.98]"
                  >
                     Ver productos
                  </button>
               </div>
            ) : (
               <>
                  <div className="mb-8">
                     {items.map((item) => (
                        <CartItem key={item.product.id} item={item} />
                     ))}
                  </div>

                  <div className="flex flex-col gap-4 p-6 bg-(--surface) border border-(--line) rounded-xl">
                     <div className="flex justify-between text-sm text-(--text-faint) sans">
                        <span>{totalUnits} {totalUnits === 1 ? "plato" : "platos"}</span>
                        <span>Subtotal</span>
                     </div>
                     <div className="flex justify-between items-center border-t border-(--line) pt-4">
                        <span className="text-(--text-faint) sans text-xs uppercase tracking-widest">Total</span>
                        <span className="serif text-(--gold) text-2xl font-bold">{formatARS(totalPrice)}</span>
                     </div>
                     <button className="w-full mt-2 py-3.5 text-[0.82rem] font-semibold tracking-[0.04em] uppercase sans text-(--bg) bg-(--gold) rounded-lg cursor-pointer transition-[background,transform] duration-200 hover:bg-(--gold-deep) active:scale-[0.98]">
                        Confirmar pedido
                     </button>
                  </div>
               </>
            )}
         </div>
      </div>
   );
}
