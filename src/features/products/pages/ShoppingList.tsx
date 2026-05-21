import { useState } from 'react'
import '../../../index.css'
import { ProductsSection } from '../components/ProductsSection'
import { useCartStore } from '../../cart/store/cartStore'
import type { Product } from '../types'

const ShoppingList = () => {
   const [flashIds, setFlashIds] = useState<Set<number>>(new Set())
   const addItem = useCartStore((s) => s.addItem)

   const handleAdd = (product: Product, qty = 1) => {
      addItem(product, qty)
      setFlashIds((prev) => new Set(prev).add(product.id))
      setTimeout(() => {
         setFlashIds((prev) => {
            const next = new Set(prev)
            next.delete(product.id)
            return next
         })
      }, 600)
   }

   return (
      <>
         <div className="bg-(--bg) flex flex-col gap-6 w-full h-[60vh] justify-center px-20">
            <div className='width-full flex items-end justify-between gap-10 border-b border-(--line) pb-10'>
               <div className='flex flex-col gap-4 w-125 '>
                  <p className='uppercase text-(--text-faint) text-[9px] tracking-[0.32em]'>Cocina · Menú de la semana</p>
                  <h1 className='serif text-white text-6xl'>Comidas listas para una mesa deliberada.</h1>
                  <p className='text-white sans text-sm'>Una selección curada de doce platos preparados en el día. Cocción honesta, ingredientes de productores locales, envío sin cargo a partir de $ 10.000.</p>
               </div>
            </div>
         </div>
         <ProductsSection flashIds={flashIds} onAdd={handleAdd} />
      </>
   )
}

export default ShoppingList