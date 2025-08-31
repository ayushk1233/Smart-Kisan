"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Theme = 'light' | 'dark' | 'farmer-green' | 'farmer-amber' | 'farmer-nature'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  themes: { id: Theme; name: string; description: string; preview: string }[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const themes = [
  {
    id: 'light' as Theme,
    name: 'Light',
    description: 'Clean white background',
    preview: 'bg-white'
  },
  {
    id: 'dark' as Theme,
    name: 'Dark',
    description: 'Dark mode for night use',
    preview: 'bg-slate-900'
  },
  {
    id: 'farmer-green' as Theme,
    name: 'Farmer Green',
    description: 'Fresh green theme',
    preview: 'bg-gradient-to-br from-green-50 to-emerald-50'
  },
  {
    id: 'farmer-amber' as Theme,
    name: 'Farmer Amber',
    description: 'Warm amber theme',
    preview: 'bg-gradient-to-br from-amber-50 to-orange-50'
  },
  {
    id: 'farmer-nature' as Theme,
    name: 'Nature',
    description: 'Natural earth tones',
    preview: 'bg-gradient-to-br from-amber-50 via-green-50 to-emerald-50'
  }
]

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('farmer-nature')

  useEffect(() => {
    const savedTheme = localStorage.getItem('agrisync-theme') as Theme
    if (savedTheme && themes.find(t => t.id === savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  // Sync theme with user preferences when user changes
  useEffect(() => {
    const savedUser = localStorage.getItem('agrisync-user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        if (userData.preferences?.theme && themes.find(t => t.id === userData.preferences.theme)) {
          setTheme(userData.preferences.theme)
        }
      } catch (error) {
        console.error('Error parsing user data for theme sync:', error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('agrisync-theme', theme)
    
    console.log('Applying theme:', theme)
    
    // Apply theme to document body and html
    const body = document.body
    const html = document.documentElement
    
    // Clear existing theme classes
    body.className = body.className.replace(/bg-\w+(-\d+)?/g, '').replace(/text-\w+(-\d+)?/g, '').replace(/dark/g, '').trim()
    html.className = html.className.replace(/dark/g, '').trim()
    
    // Add Inter font class back
    body.classList.add('font-sans', 'min-h-screen')
    
    switch (theme) {
      case 'dark':
        html.classList.add('dark')
        // Apply dark theme CSS variables
        document.documentElement.style.setProperty('--background', '#0f172a')
        document.documentElement.style.setProperty('--foreground', '#f8fafc')
        document.documentElement.style.setProperty('--card', '#1e293b')
        document.documentElement.style.setProperty('--card-foreground', '#f8fafc')
        document.documentElement.style.setProperty('--muted', '#334155')
        document.documentElement.style.setProperty('--muted-foreground', '#94a3b8')
        console.log('Dark theme CSS variables applied')
        console.log('CSS Variables:', {
          '--background': document.documentElement.style.getPropertyValue('--background'),
          '--foreground': document.documentElement.style.getPropertyValue('--foreground'),
          '--card': document.documentElement.style.getPropertyValue('--card'),
          '--card-foreground': document.documentElement.style.getPropertyValue('--card-foreground'),
          '--muted': document.documentElement.style.getPropertyValue('--muted'),
          '--muted-foreground': document.documentElement.style.getPropertyValue('--muted-foreground')
        })
        break
      case 'farmer-green':
        // Apply farmer green theme CSS variables
        document.documentElement.style.setProperty('--background', '#f0fdf4')
        document.documentElement.style.setProperty('--foreground', '#1e293b')
        document.documentElement.style.setProperty('--card', '#ffffff')
        document.documentElement.style.setProperty('--card-foreground', '#1e293b')
        document.documentElement.style.setProperty('--muted', '#f1f5f9')
        document.documentElement.style.setProperty('--muted-foreground', '#64748b')
        console.log('Farmer green theme CSS variables applied')
        break
      case 'farmer-amber':
        // Apply farmer amber theme CSS variables
        document.documentElement.style.setProperty('--background', '#fffbeb')
        document.documentElement.style.setProperty('--foreground', '#1e293b')
        document.documentElement.style.setProperty('--card', '#ffffff')
        document.documentElement.style.setProperty('--card-foreground', '#1e293b')
        document.documentElement.style.setProperty('--muted', '#f1f5f9')
        document.documentElement.style.setProperty('--muted-foreground', '#64748b')
        console.log('Farmer amber theme CSS variables applied')
        break
      case 'farmer-nature':
        // Apply farmer nature theme CSS variables
        document.documentElement.style.setProperty('--background', '#fefce8')
        document.documentElement.style.setProperty('--foreground', '#1e293b')
        document.documentElement.style.setProperty('--card', '#ffffff')
        document.documentElement.style.setProperty('--card-foreground', '#1e293b')
        document.documentElement.style.setProperty('--muted', '#f1f5f9')
        document.documentElement.style.setProperty('--muted-foreground', '#64748b')
        console.log('Farmer nature theme CSS variables applied')
        break
      default: // light
        // Apply light theme CSS variables
        document.documentElement.style.setProperty('--background', '#ffffff')
        document.documentElement.style.setProperty('--foreground', '#1e293b')
        document.documentElement.style.setProperty('--card', '#ffffff')
        document.documentElement.style.setProperty('--card-foreground', '#1e293b')
        document.documentElement.style.setProperty('--muted', '#f1f5f9')
        document.documentElement.style.setProperty('--muted-foreground', '#64748b')
        console.log('Light theme CSS variables applied')
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Debug function to check CSS variables
export function debugThemeVariables() {
  const root = document.documentElement
  const computedStyle = getComputedStyle(root)
  
  console.log('Current CSS Variables:', {
    '--background': computedStyle.getPropertyValue('--background'),
    '--foreground': computedStyle.getPropertyValue('--foreground'),
    '--card': computedStyle.getPropertyValue('--card'),
    '--card-foreground': computedStyle.getPropertyValue('--card-foreground'),
    '--muted': computedStyle.getPropertyValue('--muted'),
    '--muted-foreground': computedStyle.getPropertyValue('--muted-foreground')
  })
  
  console.log('Computed Background Color:', getComputedStyle(document.body).backgroundColor)
  console.log('Computed Text Color:', getComputedStyle(document.body).color)
}
