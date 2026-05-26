// src/components/ThemeToggle.jsx
import { useTheme } from './hooks/useTheme'

export function ThemeToggle() {
   const { theme, toggleTheme } = useTheme()

   return (
      <button
         onClick={toggleTheme}
         aria-label="Toggle theme"
         className="p-2 rounded-lg bg-zinc-800 dark:bg-zinc-200 text-zinc-800 dark:text-zinc-200 transition-colors"
      >
         {theme === 'dark' ? '☀️' : '🌙'}
      </button>
   )
}