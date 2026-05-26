import { useState, useMemo } from "react";
import type { Product, ProductsSectionProps } from "../types";
import { SearchIcon } from "../../../shared/Icons";
import { ProductDetailModal } from "./ProductDetailModal";
import { ProductCard } from "./ProductCard";
import { useProducts } from "../hooks/useProducts";
import { HashLoader } from "react-spinners";

export function ProductsSection({ onAdd, flashIds }: ProductsSectionProps) {
   const [activeCat, setActiveCat] = useState("Todos");
   const [query, setQuery] = useState("");
   const [detail, setDetail] = useState<Product | null>(null);
   const { products, categories, loading, error } = useProducts();

   const filtered = useMemo(() => {
      return products.filter((p) => {
         const matchesCat = activeCat === "Todos" || p.categorias.some(c => c.nombre === activeCat);
         const matchesQ = !query || p.nombre.toLowerCase().includes(query.toLowerCase());
         return matchesCat && matchesQ;
      });
   }, [activeCat, query, products]);

   if (loading) {
      return (
         <div className="flex gap-4 justify-center items-center">
            <HashLoader
               color="#C9A84C"
               size={30}
            />
            <div className="text-center py-16 text-white">Cargando productos...</div>
         </div>
      );
   }
   if (error) return <div className="text-center py-16 text-red-400">{error?.message}</div>;


   return (
      <>
         <section className='max-w-7xl mx-auto p-6 bg-(--bg) dark:bg-zinc-100'>
            <div className='flex items-center gap-3 text-white mb-6 bg-(--bg) dark:bg-zinc-100 dark:border-(--grey) dark:text-(--surface) border border-(--line) rounded-2xl px-4 py-2 w-full max-w-sm'>
               <SearchIcon size={16} />
               <input
                  type="text"
                  placeholder="Buscar por nombre"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className='bg-transparent dark:text-(--surface) focus:outline-none w-full text-sm'
               />
            </div>
            {/* Filter pills */}
            <div className='flex items-center gap-4 mb-6'>
               {["Todos", ...categories.map((c) => c.nombre)].map((cat) => (
                  <button
                     key={cat}
                     className={`px-4 py-2 border border-(--line) rounded-full text-sm font-medium ${activeCat === cat ? 'bg-(--gold) text-white' : 'bg-(--bg) dark:bg-zinc-100 dark:border-(--grey) dark:hover:border-(--gold) dark:text-(--surface) dark:text(--surface) text-(--text) dark:hover:bg-(--gold) dark:hover:text-(--text) hover:bg-white hover:text-(--bg) transition-colors duration-300  '}`}
                     onClick={() => setActiveCat(cat)}
                  >
                     {cat}
                  </button>
               ))}
               <span className='ml-auto text-xs text-[#8a7a60] font-medium'>{filtered.length} platos</span>
            </div>
            {filtered.length === 0 ? (
               <div className='text-center py-16 px-6 text-[#8a7a60] text-sm'>
                  <p className='mb-5'>No hay platos que coincidan con tu búsqueda.</p>
                  <button
                     className='inline-flex items-center gap-1.5 px-5 py-2 text-[0.82rem] font-semibold tracking-[0.04em] text-(--gold) bg-transparent border border-(--gold) rounded-lg cursor-pointer transition-[background,color] duration-200 ease-in-out hover:bg-[#c4a050] hover:text-[#1a1410]'
                     onClick={() => {
                        setQuery("");
                        setActiveCat("Todos");
                     }}
                  >
                     Limpiar filtros
                  </button>
               </div>
            ) : (
               <div className='grid'>
                  {filtered.map((p, i) => (
                     <div
                        key={p.id}
                        className='animate-fade-in-up'
                        style={{ animationDelay: `${i * 40}ms` }}
                     >
                        <ProductCard
                           product={p}
                           onAdd={onAdd}
                           onOpen={setDetail}
                           addedFlash={flashIds.has(p.id)}
                        />
                     </div>
                  ))}
               </div>
            )}

            {/* Detail modal */}
            {detail && (
               <ProductDetailModal
                  product={detail}
                  onClose={() => setDetail(null)}
                  onAdd={onAdd}
               />
            )}
         </section>
      </>
   );
}
