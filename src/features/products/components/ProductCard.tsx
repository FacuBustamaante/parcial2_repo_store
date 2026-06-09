import { useState } from "react";
import { ArrowIcon } from "../../../shared/Icons";
import '../../../index.css'
import { formatARS } from "../../../shared/formatARS";
import type { ProductCardProps } from "../types";

export function ProductCard({ product, onAdd, onOpen, addedFlash }: ProductCardProps) {
   const [imgIndex, setImgIndex] = useState(0);
   const images = product.imagenes_url;
   const hasMultiple = images.length > 1;

   const prev = (e: React.MouseEvent) => {
      e.stopPropagation();
      setImgIndex(i => (i - 1 + images.length) % images.length);
   };

   const next = (e: React.MouseEvent) => {
      e.stopPropagation();
      setImgIndex(i => (i + 1) % images.length);
   };

   return (
      <article className={`card dark:rounded-lg border-2 dark:border-zinc-100 border-(--surface) ${addedFlash ? 'flash' : ""}`}>
         <div className='relative h-80 overflow-hidden'>
            <img
               src={images[imgIndex]}
               alt={`${product.nombre} ${imgIndex + 1}`}
               className='w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
            />
            <div className='veil' aria-hidden="true" />
            <div className='overlay'>
               <p className='text-[0.8rem] sans text-(--text) mb-2.5 leading-[1.4]'>{product.descripcion}</p>
               <button
                  className='inline-flex items-center sans gap-1.5 px-3.5 py-1.5 text-xs font-semibold tracking-[0.04em] text-white bg-transparent border border-white rounded-sm cursor-pointer transition-[background,color] duration-200 hover:bg-white hover:text-(--bg)'
                  onClick={() => onOpen(product)}
               >
                  Ver detalle <ArrowIcon size={12} />
               </button>
            </div>
            <span className='absolute top-3 left-3 px-1.5 py-0.5 text-[0.6rem] text-(--text) border border-(--line) font-semibold tracking-[0.06em] uppercase bg-(--bg) rounded-2xl dark:text-(--surface) dark:bg-zinc-100 dark:border-(--grey) z-20'>{product.categorias[0]?.nombre}</span>

            {hasMultiple && (
               <>
                  <button
                     onClick={prev}
                     className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/65 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg leading-none transition-colors cursor-pointer"
                     aria-label="Imagen anterior"
                  >
                     ‹
                  </button>
                  <button
                     onClick={next}
                     className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/65 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg leading-none transition-colors cursor-pointer"
                     aria-label="Siguiente imagen"
                  >
                     ›
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                     {images.map((_, i) => (
                        <button
                           key={i}
                           onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                           className={`rounded-full transition-all duration-200 cursor-pointer ${i === imgIndex ? 'w-2.5 h-2.5 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/75'}`}
                           aria-label={`Ir a imagen ${i + 1}`}
                        />
                     ))}
                  </div>
               </>
            )}
         </div>

         <div className='p-4 flex flex-col gap-3 flex-1 bg-(--bg) dark:bg-zinc-100 dark:border-(--grey) text-white  border-(--line)'>
            <div className='min-h-12 flex items-start justify-between gap-2'>
               <h3 className='serif dark:text-(--surface) '>{product.nombre}</h3>
               <p className='serif font-bold text-(--gold)'>{formatARS(product.precio_base)}</p>
            </div>
            <button
               className='w-full uppercase p-2.5 text-[0.82rem] font-semibold tracking-[0.04em] text-(--text) bg-(--bg) border-2 border-(--line) rounded-sm cursor-pointer transition-[background,transform] duration-200 ease-in-out mt-auto hover:bg-(--gold) hover:text-(--bg) active:scale-[0.98] dark:bg-(--gold) dark:border-(--gold-deep) dark:text-zinc-100 dark:hover:bg-(--gold) dark:hover:text-(--bg) dark:active:bg-(--gold-deep)'
               onClick={() => onAdd(product)}
            >
               Agregar al carrito
            </button>
         </div>
      </article>
   );
}
