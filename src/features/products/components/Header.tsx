import { useNavigate, useLocation } from 'react-router-dom'
import '../../../index.css'

export default function Header() {
   const navigate = useNavigate()
   const { pathname } = useLocation()

   const navItems = [
      { label: 'Productos', path: '/store' },
      { label: 'Pedidos', path: '/orders' },
   ]

   return (
      <header className='className="fixed bg-(--bg) top-0 w-full h-22 flex justify-between items-center gap-4 px-8"'>
         <div className='flex items-center gap-2'>
            <p className='text-5xl italic text-(--gold) serif'>F</p>
            <p className='text-4xl text-white serif'>FoodStore</p>
            <p className='text-gray-500 sans'>TIENDA VIRTUAL</p>
         </div>
         <div className='sans rounded-3xl p-1 border border-gray-800 absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out'>
            {navItems.map(({ label, path }) => (
               <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`text-gray-500 px-7 py-2 ${pathname === path ? 'text-zinc-950 bg-amber-50 rounded-3xl ' : ''}`}
               >
                  {label}
               </button>
            ))}
         </div>
         <button className='text-gray-500 sans py-2 px-6 border rounded-3xl hover:border-amber-200 hover:text-white transition-colors duration-300'>Carrito</button>
      </header>
   )
}