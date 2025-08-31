"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/market', label: 'Market' },
  { href: '/weather', label: 'Weather' },
  { href: '/ai-advisor', label: 'AI Advisor' },
  { href: '/inventory', label: 'Inventory' },
]

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Smart Kisan
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    'hover:text-emerald-600 dark:hover:text-emerald-400',
                    'hover:bg-emerald-50 dark:hover:bg-emerald-900/20',
                    'group',
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-600 dark:text-slate-300'
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 dark:bg-emerald-400 transform origin-left transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    )}
                  />
                </Link>
              )
            })}
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
