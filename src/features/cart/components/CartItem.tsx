import { PlusIcon, MinusIcon } from "../../../shared/Icons";
import { formatARS } from "../../../shared/formatARS";
import { useCartStore } from "../store/cartStore";
import type { CartItem as CartItemType } from "../types";

interface CartItemProps {
   item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
   const { product, qty } = item;
   const updateQty = useCartStore((s) => s.updateQty);
   const removeItem = useCartStore((s) => s.removeItem);

   const inc = () => updateQty(product.id, Math.min(product.stock_cantidad, qty + 1));
   const dec = () => {
      if (qty <= 1) removeItem(product.id);
      else updateQty(product.id, qty - 1);
   };

   return (
      <div className="flex gap-3 py-5 border-b border-(--line) animate-fade-in-up">
         <img
            src={product.imagenes_url[0]}
            alt={product.nombre}
            className="w-16 h-16 object-cover rounded-lg shrink-0"
         />

         <div className="flex flex-col gap-2 flex-1 min-w-0">
            {/* Nombre + eliminar */}
            <div className="flex items-start justify-between gap-2">
               <h3 className="serif text-white text-sm leading-tight">{product.nombre}</h3>
               <button
                  onClick={() => removeItem(product.id)}
                  aria-label="Eliminar del carrito"
                  className="text-(--text-faint) hover:text-white transition-colors text-lg leading-none shrink-0"
               >
                  ×
               </button>
            </div>

            {/* Categoría */}
            <span className="self-start px-1.5 py-0.5 text-[0.6rem] text-(--gold) border border-(--gold-soft) font-semibold tracking-[0.06em] uppercase rounded-2xl">
               {product.categorias[0]?.nombre}
            </span>

            {/* Controles de cantidad + subtotal */}
            <div className="flex items-center justify-between gap-2 mt-1">
               <div className="flex items-center gap-2.5 px-3 py-1.5 bg-(--surface) border border-(--line) rounded-lg">
                  <button onClick={dec} aria-label="Disminuir cantidad" className="text-(--text-faint) hover:text-white transition-colors">
                     <MinusIcon size={12} />
                  </button>
                  <span className="text-white text-xs w-3 text-center">{qty}</span>
                  <button onClick={inc} aria-label="Aumentar cantidad" className="text-(--text-faint) hover:text-white transition-colors">
                     <PlusIcon size={12} />
                  </button>
               </div>
               <p className="serif font-bold text-(--gold) text-sm">
                  {formatARS(product.precio_base * qty)}
               </p>
            </div>
         </div>
      </div>
   );
}
