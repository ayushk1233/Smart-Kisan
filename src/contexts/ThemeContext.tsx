"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// CSS variables for themes
const themeVariables = {
  light: {
    background: '#ffffff',
    foreground: '#0f172a', // Darker text for better contrast
    card: '#ffffff',
    cardForeground: '#0f172a', // Darker text for cards
    muted: '#f1f5f9',
    mutedForeground: '#475569' // Darker muted text
  },
  dark: {
    background: '#0f172a',
    foreground: '#ffffff', // Brighter text for better readability
    card: '#1e293b',
    cardForeground: '#ffffff', // Brighter text for cards
    muted: '#334155',
    mutedForeground: '#cbd5e1' // Lighter muted text
  }
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme)
    }
  }, [])

  // Update theme and save to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme)
    
    const variables = themeVariables[theme]
    document.documentElement.classList.toggle('dark', theme === 'dark')
    
    Object.entries(variables).forEach(([key, value]) => {
      const cssKey = `--${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}`
      document.documentElement.style.setProperty(cssKey, value)
    })
  }, [theme])

  const value = { theme, setTheme }
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
