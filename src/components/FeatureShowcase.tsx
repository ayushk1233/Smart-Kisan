"use client"

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Bot, Cloud, BarChart, PackageSearch } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeatureCard {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  color: string
}

const features: FeatureCard[] = [
  {
    icon: <Bot className="w-8 h-8" />,
    title: 'AI Crop Advisor',
    description: 'Get personalized crop recommendations and disease detection using advanced AI.',
    href: '/ai-advisor',
    color: 'from-emerald-500 to-green-600'
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: 'Weather Forecast',
    description: 'Access accurate weather predictions and agricultural alerts for your region.',
    href: '/weather',
    color: 'from-sky-500 to-blue-600'
  },
  {
    icon: <BarChart className="w-8 h-8" />,
    title: 'Market Analytics',
    description: 'Track market prices and trends to make informed selling decisions.',
    href: '/market',
    color: 'from-violet-500 to-purple-600'
  },
  {
    icon: <PackageSearch className="w-8 h-8" />,
    title: 'Inventory Management',
    description: 'Manage your agricultural supplies and produce efficiently.',
    href: '/inventory',
    color: 'from-amber-500 to-orange-600'
  }
]

const FeatureCard = ({ icon, title, description, href, color }: FeatureCard) => {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  const springConfig = { damping: 20, stiffness: 200 }
  const springX = useSpring(rotateX, springConfig)
  const springY = useSpring(rotateY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="relative perspective-1000 w-full h-[300px] cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        transform: isFlipped
          ? "rotateY(180deg)"
          : `perspective(1000px) rotateX(${springX}deg) rotateY(${springY}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)"
      }}
    >
      <div className={cn(
        "absolute inset-0 rounded-2xl shadow-lg bg-white dark:bg-slate-800",
        "hover:shadow-xl transition-shadow duration-300",
        "p-6 flex flex-col items-center justify-center gap-4 text-center",
        "backface-hidden"
      )}>
        <div className={cn(
          "w-16 h-16 rounded-xl flex items-center justify-center",
          "bg-gradient-to-br",
          color,
          "text-white mb-2"
        )}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>

      <div className={cn(
        "absolute inset-0 rounded-2xl shadow-lg",
        "bg-gradient-to-br",
        color,
        "p-6 flex flex-col items-center justify-center gap-4",
        "text-white transform rotateY-180 backface-hidden"
      )}>
        <div className="text-2xl font-bold mb-4">Learn More</div>
        <p className="text-white/90 mb-6">Click to explore {title} features</p>
        <motion.a
          href={href}
          className="px-6 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.a>
      </div>
    </motion.div>
  )
}

export function FeatureShowcase() {
  return (
    <div className="w-full py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Intelligent Farming Solutions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover our comprehensive suite of tools designed to make farming smarter,
            more efficient, and more profitable.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  )
}
