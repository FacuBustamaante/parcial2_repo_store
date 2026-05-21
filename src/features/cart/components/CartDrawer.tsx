import { useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import { CartItem } from "./CartItem";
import { formatARS } from "../../../shared/formatARS";
import "../../../index.css";
import { ArrowIcon } from "../../../shared/Icons";

export function CartDrawer() {
   const isOpen = useCartStore((s) => s.isOpen);
   const closeCart = useCartStore((s) => s.closeCart);
   const items = useCartStore((s) => s.items);
   const clear = useCartStore((s) => s.clear);

   const totalUnits = items.reduce((acc, i) => acc + i.qty, 0);
   const totalPrice = items.reduce((acc, i) => acc + i.product.precio_base * i.qty, 0);

   useEffect(() => {
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
      if (isOpen) {
         document.addEventListener("keydown", onKey);
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "";
      }
      return () => {
         document.removeEventListener("keydown", onKey);
         document.body.style.overflow = "";
      };
   }, [isOpen, closeCart]);

   return (
      <>
         {/* Backdrop */}
         <div
            className={`fixed inset-0 z-40 bg-[rgba(10,8,6,0.70)] backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            onClick={closeCart}
            aria-hidden="true"
         />

         {/* Panel */}
         <div
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
            className={`fixed right-0 top-0 h-full w-[420px] bg-(--bg) border-l border-(--line) z-50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
         >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-(--line) shrink-0">
               <div>
                  <p className="uppercase text-(--text-faint) text-[9px] tracking-[0.32em] mb-1">Tu pedido</p>
                  <h2 className="serif text-white text-2xl">Carrito</h2>
               </div>
               <button
                  onClick={closeCart}
                  aria-label="Cerrar carrito"
                  className="text-(--text-faint) hover:text-white transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-(--surface)"
               >
                  ×
               </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-6">
               {items.length === 0 ? (
                  <div className="flex flex-col items-center gap-4 py-24 text-center">
                     <p className="serif text-white text-xl">Tu carrito está vacío</p>
                     <p className="text-sm text-(--text-faint) sans">Explorá nuestra selección y agregá platos a tu pedido.</p>
                  </div>
               ) : (
                  items.map((item) => (
                     <CartItem key={item.product.id} item={item} />
                  ))
               )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
               <div className="shrink-0 px-6 py-5 border-t border-(--line) flex flex-col gap-4 bg-(--surface)">
                  <div className="flex justify-between items-center text-sm sans text-(--text-faint)">
                     <span>{totalUnits} {totalUnits === 1 ? "plato" : "platos"}</span>
                     <button
                        onClick={clear}
                        className="text-xs uppercase tracking-widest hover:text-white transition-colors"
                     >
                        Vaciar carrito
                     </button>
                  </div>
                  <div className="flex justify-between items-center border-t border-(--line) pt-4">
                     <span className="text-(--text-faint) sans text-xs uppercase tracking-widest">Total</span>
                     <span className="serif text-(--gold) text-2xl font-bold">{formatARS(totalPrice)}</span>
                  </div>
                  <button className="w-full py-3.5 text-[0.82rem]  tracking-[0.04em] border border-(--gold) uppercase sans text-(--text) bg-(--surface) rounded-lg cursor-pointer transition-[background,transform] duration-200 hover:bg-(--gold-deep) hover:text-(--surface) active:scale-[0.98]">
                     Confirmar pedido <ArrowIcon dir="right" size={14} />
                  </button>
               </div>
            )}
         </div>
      </>
   );
}
