import { useState, useEffect } from "react";
import type { ProductDetailModalProps } from "../types";
import { ArrowIcon, PlusIcon, MinusIcon } from "../../../shared/Icons";
import { formatARS } from "../../../shared/formatARS";

export function ProductDetailModal({ product, onClose, onAdd }: ProductDetailModalProps) {
   const [qty, setQty] = useState(1);

   useEffect(() => {
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
         document.removeEventListener("keydown", onKey);
         document.body.style.overflow = "";
      };
   }, [onClose]);

   if (!product) return null;

   const inc = () => setQty((q) => Math.min(product.stock_cantidad, q + 1));
   const dec = () => setQty((q) => Math.max(1, q - 1));

   return (
      <div className='fixed backdrop-blur-sm inset-0 z-100 flex items-center justify-center p-6 animate-fade-in-up'>
         <div className='absolute inset-0 bg-[rgba(20,15,10,0.65)] backdrop-blur-sm' onClick={onClose} />
         <div className='relative z-1 w-full max-w-215 max-h-[90vh] overflow-y-auto bg-(--bg) dark:bg-zinc-100  rounded-2xl p-8' role="dialog" aria-modal="true" aria-label={product.nombre}>
            <button className='inline-flex items-center sans gap-2 mb-6 p-0 text-[0.82rem] font-semibold tracking-[0.04em] text-[#8a7a60] bg-none border-none uppercase cursor-pointer transition-colors duration-200 hover:text-(--gold)' onClick={onClose}>
               <ArrowIcon dir="left" size={14} /> Volver a la lista
            </button>

            <div className='grid-detail'>
               <div className='media-detail'>
                  <img src={product.imagenes_url[0]} alt={product.nombre} className='w-full h-full object-cover rounded-2xl' />
               </div>

               <div>
                  <span className='block mb-2 text-[0.72rem] font-bold tracking-widest uppercase text-(--gold)'>{product.categorias[0].nombre}</span>
                  <h2 className='text-[1.6rem] serif font-bold text-(--text) leading-[1.2] mb-2.5 dark:text-(--surface)'>{product.nombre}</h2>
                  <p className='text-[1.4rem] sans text-(--gold) mb-4'>{formatARS(product.precio_base)}</p>
                  <p className='text-[0.88rem] sans text-(--text) leading-[1.65] mb-6 dark:text-(--surface-3)'>{product.descripcion}</p>

                  <dl className='flex flex-col gap-2 mb-7 p-4 bg-(--bg) text-(--text-faint) border-2 border-(--line) rounded-[10px] dark:bg-zinc-100 dark:text-(--surface-3) dark:border-(--grey)'>
                     <div className='flex justify-between items-center gap-2'>
                        <dt>Stock disponible</dt>
                        <dd>{product.stock_cantidad} unidades</dd>
                     </div>
                     <div className='flex justify-between border-t-2 pt-1 border-(--line) items-center gap-2 dark:border-(--grey)'>
                        <dt>Categoría</dt>
                        <dd>{product.categorias[0].nombre}</dd>
                     </div>
                     <div className='flex justify-between border-t-2 pt-1 border-(--line) items-center gap-2 dark:border-(--grey)'>
                        <dt>Ingredientes</dt>
                        <dd>{product.ingredientes.map((ing) => ing.nombre).join(", ")}</dd>
                     </div>
                  </dl>

                  <div className='flex items-center gap-4'>
                     <div className='flex text-(--text) items-center gap-3 px-3.5 py-2.5 bg-(--bg) border-2 border-(--line) rounded-lg shrink-0'>
                        <button onClick={dec} aria-label="Disminuir cantidad">
                           <MinusIcon size={14} />
                        </button>
                        <span>{qty}</span>
                        <button onClick={inc} aria-label="Aumentar cantidad">
                           <PlusIcon size={14} />
                        </button>
                     </div>

                     <button
                        className='flex-1 px-4 py-3 text-[0.75rem] border-2 border-(--line) uppercase sans tracking-[0.03em] text-(--text) bg-(--bg) rounded-lg cursor-pointer transition-[background,transform] duration-200 whitespace-nowrap hover:bg-(--gold) hover:text-(--bg) active:scale-[0.98]'
                        onClick={() => {
                           onAdd(product, qty);
                           onClose();
                        }}
                     >
                        Agregar al carrito · {formatARS(product.precio_base * qty)}
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
