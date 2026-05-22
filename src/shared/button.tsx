const button = () => {
   return (
      <button
         onClick={openCart}
         className='relative text-(--text-faint) sans py-2 px-4 border rounded-3xl border-(--line) hover:border-(--gold) hover:text-white hover:bg-(--gold-soft) transition-colors duration-300'
      >
         Texto
         {itemCount > 0 && (
            <span className='absolute -top-1.5 -right-1.5 min-w-4.5 h-4.5 flex items-center justify-center px-1 text-[10px] font-bold text-(--bg) bg-(--gold) rounded-full leading-none'>
               {itemCount}
            </span>
         )}
      </button>
   )
}

export default button