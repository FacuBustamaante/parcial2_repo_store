import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCartStore } from '../features/cart/store/cartStore'
import { useAuthStore } from '../store/useAuthStore'
import '../index.css'
import { ThemeToggle } from './ThemeToggle'
import LogoutModal from './LogoutModal'

export default function Header() {
   const navigate = useNavigate()
   const { pathname } = useLocation()
   const itemCount = useCartStore((s) => s.items.reduce((acc, i) => acc + i.qty, 0))
   const openCart = useCartStore((s) => s.openCart)
   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
   const logout = useAuthStore((s) => s.logout);
   const [showLogoutModal, setShowLogoutModal] = useState(false);
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

   const handleLogoutConfirm = () => {
      setShowLogoutModal(false);
      logout();
      navigate("/store");
   }

   const navItems = [
      { label: 'Productos', path: '/store' },
      { label: 'Mis Pedidos', path: '/orders' },
   ]

   return (
      <>
      <header className='fixed bg-(--bg) top-0 w-full h-(--header-h) flex justify-between items-center px-4 md:px-6 gap-4 border-b border-(--line) dark:bg-gray-200 dark:border-(--grey) dark:border-none z-30'>
         {/* Logo */}
         <div className='flex items-center gap-2'>
            <p className='text-3xl italic text-(--gold) serif'>F</p>
            <p className='text-3xl text-white serif dark:text-(--surface-3)'>FoodStore</p>
            <p className='hidden sm:block uppercase text-(--text-faint) text-[9px] tracking-[0.32em] dark:text-(--surface-3)'>Tienda Virtual</p>
         </div>

         {/* Nav centrada — solo desktop */}
         <div className='hidden md:block sans rounded-3xl p-1 border border-(--line) absolute left-1/2 -translate-x-1/2 dark:bg-zinc-100 dark:border-(--grey)'>
            {navItems.map(({ label, path }) => (
               <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`text-zinc-600 rounded-3xl text-[14px] duration-100 font-bold px-5 py-2 hover:text-white ${pathname === path ? 'text-zinc-950 dark:text-white dark:bg-(--gold) dark:border-2 dark:border-(--gold-deep) bg-amber-50 rounded-3xl' : ''}`}
               >
                  {label}
               </button>
            ))}
         </div>

         {/* Acciones derecha */}
         <div className='flex gap-2 md:gap-4'>
            <ThemeToggle />
            <button
               onClick={isAuthenticated ? () => setShowLogoutModal(true) : () => navigate("/login", { viewTransition: true })}
               className='hidden sm:block text-(--text-faint) sans py-2 px-4 border rounded-3xl border-(--line) hover:border-(--gold) hover:text-white hover:bg-(--gold-soft) transition-colors duration-300 dark:bg-zinc-100 dark:border-(--grey) dark:text-zinc-600 dark:hover:border-(--gold-deep) dark:hover:bg-(--gold) dark:border-2'
            >
               {isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
            </button>
            <button
               onClick={openCart}
               className='relative text-(--text-faint) sans py-2 px-4 border rounded-3xl border-(--line) hover:border-(--gold) hover:text-white hover:bg-(--gold-soft) transition-colors duration-300 dark:bg-zinc-100 dark:border-2 dark:border-(--gold) dark:text-(--surface) dark:hover:bg-(--gold)'
            >
               Carrito
               {itemCount > 0 && (
                  <span className='absolute -top-1.5 -right-1.5 min-w-4.5 h-4.5 flex items-center justify-center px-1 text-[10px] font-bold text-(--bg) bg-(--gold) rounded-full leading-none dark:bg-(--amber)'>
                     {itemCount}
                  </span>
               )}
            </button>
            {/* Hamburguesa — solo mobile */}
            <button
               onClick={() => setMobileMenuOpen((o) => !o)}
               className='md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 text-(--text-faint) hover:text-white transition-colors'
               aria-label="Menú"
            >
               <span className={`block w-5 h-0.5 bg-current transition-transform duration-200 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
               <span className={`block w-5 h-0.5 bg-current transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
               <span className={`block w-5 h-0.5 bg-current transition-transform duration-200 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
         </div>
      </header>

      {/* Menú mobile desplegable */}
      <div className={`md:hidden fixed top-(--header-h) left-0 right-0 z-20 bg-(--bg) border-b border-(--line) dark:bg-gray-200 transition-all duration-200 overflow-hidden ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
         <div className='flex flex-col p-4 gap-1'>
            {navItems.map(({ label, path }) => (
               <button
                  key={path}
                  onClick={() => { navigate(path); setMobileMenuOpen(false); }}
                  className={`text-left sans text-[14px] font-bold px-5 py-3 rounded-xl transition-colors duration-100 ${pathname === path ? 'bg-(--gold) text-white' : 'text-zinc-500 hover:text-white hover:bg-(--surface)'}`}
               >
                  {label}
               </button>
            ))}
            <button
               onClick={() => {
                  setMobileMenuOpen(false);
                  isAuthenticated ? setShowLogoutModal(true) : navigate("/login", { viewTransition: true });
               }}
               className='text-left sans text-[14px] font-bold px-5 py-3 rounded-xl text-zinc-500 hover:text-white hover:bg-(--surface) transition-colors duration-100'
            >
               {isAuthenticated ? 'Cerrar sesión' : 'Iniciar sesión'}
            </button>
         </div>
      </div>

      {showLogoutModal && (
         <LogoutModal
            onConfirm={handleLogoutConfirm}
            onCancel={() => setShowLogoutModal(false)}
         />
      )}
      </>
   )
}