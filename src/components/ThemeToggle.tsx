"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Palette, Sun, Moon, Leaf, Sprout, TreePine } from 'lucide-react'
import { useTheme, debugThemeVariables } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'

export default function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme()
  const { user, updatePreferences } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getThemeIcon = (themeId: string) => {
    switch (themeId) {
      case 'light':
        return <Sun className="w-4 h-4" />
      case 'dark':
        return <Moon className="w-4 h-4" />
      case 'farmer-green':
        return <Leaf className="w-4 h-4" />
      case 'farmer-amber':
        return <Sprout className="w-4 h-4" />
      case 'farmer-nature':
        return <TreePine className="w-4 h-4" />
      default:
        return <Palette className="w-4 h-4" />
    }
  }

  const getCurrentThemeIcon = () => {
    return getThemeIcon(theme)
  }

  return (
    <div className="relative" ref={dropdownRef}>
             <Button
         variant="ghost"
         size="sm"
         className="p-2 relative hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
         onClick={() => setIsOpen(!isOpen)}
       >
         <div className="w-5 h-5 flex items-center justify-center">
           {getCurrentThemeIcon()}
         </div>
         <span className="ml-2 text-xs font-medium" style={{ color: 'var(--foreground)' }}>
           {theme.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
         </span>
       </Button>

             {isOpen && (
         <div className="absolute right-0 top-12 w-64 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50" style={{ backgroundColor: 'var(--card)' }}>
           <div className="p-4 border-b border-slate-200 dark:border-slate-700">
             <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>Choose Theme</h3>
             <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Select your preferred appearance</p>
             <button
               onClick={() => debugThemeVariables()}
               className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
             >
               Debug Theme Variables
             </button>
           </div>
           <div className="p-2">
             {themes.map((themeOption) => (
               <button
                 key={themeOption.id}
                                  onClick={() => {
                    setTheme(themeOption.id)
                    if (user) {
                      updatePreferences({ theme: themeOption.id })
                    }
                    setIsOpen(false)
                  }}
                 className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                   theme === themeOption.id
                     ? 'border-2 border-green-200 dark:border-green-700'
                     : 'border-2 border-transparent'
                 }`}
                 style={{
                   backgroundColor: theme === themeOption.id ? 'rgba(34, 197, 94, 0.1)' : 'transparent'
                 }}
                 onMouseEnter={(e) => {
                   if (!theme === themeOption.id) {
                     e.currentTarget.style.backgroundColor = 'var(--muted)'
                   }
                 }}
                 onMouseLeave={(e) => {
                   if (!theme === themeOption.id) {
                     e.currentTarget.style.backgroundColor = 'transparent'
                   }
                 }}
               >
                 <div className="flex items-center space-x-3">
                                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      theme === themeOption.id ? 'bg-green-500 text-white' : ''
                    }`} style={{ 
                      backgroundColor: theme === themeOption.id ? undefined : 'var(--muted)',
                      color: theme === themeOption.id ? 'white' : 'var(--muted-foreground)'
                    }}>
                     {getThemeIcon(themeOption.id)}
                   </div>
                   <div className="flex-1">
                     <div className="font-medium" style={{ color: 'var(--foreground)' }}>{themeOption.name}</div>
                     <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{themeOption.description}</div>
                   </div>
                   <div className={`w-4 h-4 rounded-full ${
                     theme === themeOption.id ? 'bg-green-500' : ''
                   }`} style={{ backgroundColor: theme === themeOption.id ? undefined : 'var(--muted)' }}>
                     {theme === themeOption.id && (
                       <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                     )}
                   </div>
                 </div>
               </button>
             ))}
           </div>
         </div>
       )}
    </div>
  )
}
