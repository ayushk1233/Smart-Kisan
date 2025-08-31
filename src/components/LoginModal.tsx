"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Mail, Lock, Eye, EyeOff, Loader2, UserCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    const success = await login(email, password, false)
    if (success) {
      onClose()
      setEmail('')
      setPassword('')
    } else {
      setError('Invalid email or password. Try: farmer@example.com / password123')
    }
  }

  const handleGuestLogin = async () => {
    const success = await login('', '', true)
    if (success) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-md border-0 shadow-2xl bg-white dark:bg-slate-800">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-between items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute right-4 top-4"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">Welcome to Smart Kisan</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Sign in with your account or continue as guest
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10 h-12"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-12"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-slate-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-slate-400" />
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Sign In'
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-300 dark:border-slate-700"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-slate-800 px-2 text-slate-500">Or</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGuestLogin}
                className="w-full h-12 border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <UserCircle className="w-5 h-5 mr-2" />
                    Continue as Guest
                  </>
                )}
              </Button>

              <div className="text-center mt-2">
                <p className="text-sm text-slate-500">
                  No account required. Click &quot;Continue as Guest&quot; to explore all features.
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Demo Credentials:
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  Email: farmer@example.com<br />
                  Password: password123
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
