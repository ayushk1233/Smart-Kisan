"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  location: {
    city: string
    state: string
    country: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  preferences: {
    theme: string
    language: string
    notifications: boolean
  }
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateLocation: (location: User['location']) => void
  updatePreferences: (preferences: Partial<User['preferences']>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data - in real app this would come from API
const mockUsers = [
  {
    id: '1',
    email: 'farmer@example.com',
    password: 'password123',
    name: 'Rajesh Kumar',
    location: {
      city: 'Punjab',
      state: 'Punjab',
      country: 'India',
      coordinates: { lat: 31.1471, lng: 75.3412 }
    },
    preferences: {
      theme: 'farmer-nature',
      language: 'en',
      notifications: true
    }
  }
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('agrisync-user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('agrisync-user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        location: foundUser.location,
        preferences: foundUser.preferences
      }
      
      setUser(userData)
      localStorage.setItem('agrisync-user', JSON.stringify(userData))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('agrisync-user')
  }

  const updateLocation = (location: User['location']) => {
    if (user) {
      const updatedUser = { ...user, location }
      setUser(updatedUser)
      localStorage.setItem('agrisync-user', JSON.stringify(updatedUser))
    }
  }

  const updatePreferences = (preferences: Partial<User['preferences']>) => {
    if (user) {
      const updatedUser = { 
        ...user, 
        preferences: { ...user.preferences, ...preferences }
      }
      setUser(updatedUser)
      localStorage.setItem('agrisync-user', JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      updateLocation,
      updatePreferences
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
