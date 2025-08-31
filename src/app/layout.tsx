import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { DynamicBackground } from '@/components/DynamicBackground'
import { Navbar } from '@/components/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart Kisan - Agriculture Management',
  description: 'An AI-powered agriculture management platform for modern farmers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        <AuthProvider>
          <ThemeProvider>
            <div className="min-h-screen" suppressHydrationWarning>
              <DynamicBackground>
                <Navbar />
                <main className="pt-16 h-full">
                  {children}
                </main>
              </DynamicBackground>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
