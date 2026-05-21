import { ArrowIcon } from "../../../shared/Icons";
import '../../../index.css'
import { formatARS } from "../../../shared/formatARS";
import type { ProductCardProps } from "../types";

export function ProductCard({ product, onAdd, onOpen, addedFlash }: ProductCardProps) {
   return (
      <article className={`card ${addedFlash ? 'flash' : ""}`}>
         <div className='relative h-80 overflow-hidden rounded-t-lg'>
            <img
               src={product.imagenes_url[0]}
               alt={product.nombre}
               className='w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
            />
            <div className='veil' aria-hidden="true" />
            <div className='overlay'>
               <p className='text-[0.8rem] text-(--text) mb-2.5 leading-[1.4]'>{product.descripcion}</p>
               <button
                  className='inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold tracking-[0.04em] text-white bg-transparent border border-white rounded-sm cursor-pointer transition-[background,color] duration-200 hover:bg-white hover:text-(--bg)'
                  onClick={() => onOpen(product)}
               >
                  Ver detalle <ArrowIcon size={12} />
               </button>
            </div>
            <span className='absolute top-3 left-3 px-1.5 py-0.5 text-[0.6rem] text-(--text) border border-(--line) font-semibold tracking-[0.06em] uppercase bg-(--bg) rounded-2xl'>{product.categorias[0]?.nombre}</span>
         </div>

         <div className='p-4 flex flex-col gap-3 flex-1 bg-(--bg) text-white border border-(--line)'>
            <div className='flex justify-between items-start gap-2'>
               <h3 className='serif'>{product.nombre}</h3>
               <p className='serif font-bold text-(--gold)'>{formatARS(product.precio_base)}</p>
            </div>
            <button
               className='w-full uppercase p-2.5 text-[0.82rem] font-semibold tracking-[0.04em] text-(--text) bg-(--bg) border rounded-sm cursor-pointer transition-[background,transform] duration-200 ease-in-out mt-auto hover:bg-(--gold) hover:text-(--bg) active:scale-[0.98]'
               onClick={() => onAdd(product)}
            >
               Agregar al carrito
            </button>
         </div>
      </article>
   );
}
