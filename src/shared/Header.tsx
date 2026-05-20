import { useNavigate, useLocation } from 'react-router-dom'
import '../index.css'

export default function Header() {
   const navigate = useNavigate()
   const { pathname } = useLocation()

   const navItems = [
      { label: 'Productos', path: '/store' },
      { label: 'Pedidos', path: '/orders' },
   ]

   return (
      <header className='className="fixed bg-(--bg) top-0 w-full h-(--header-h) flex justify-between items-center px-6 gap-4 border-b border-(--line)'>
         <div className='flex items-center gap-2'>
            <p className='text-3xl italic text-(--gold) serif'>F</p>
            <p className='text-3xl text-white serif'>FoodStore</p>
            <p className='uppercase text-(--text-faint) text-[9px] tracking-[0.32em]'>Tienda Virtual</p>
         </div>
         <div className='sans rounded-3xl p-1 border border-(--line) absolute left-1/2 -translate-x-1/2'>
            {navItems.map(({ label, path }) => (
               <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`text-(--text-faint) text-[14px] duration-100 font-bold px-5 py-2 hover:text-white ${pathname === path ? 'text-zinc-950 bg-amber-50 rounded-3xl ' : ''}`}
               >
                  {label}
               </button>
            ))}
         </div>
         <button className='text-(--text-faint) sans py-2 px-4 border rounded-3xl border-(--line) hover:border-(--gold) hover:text-white hover:bg-(--gold-soft) transition-colors duration-300'>Carrito</button>
      </header>
   )
}