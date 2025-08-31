"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface TextEffectProps {
  text: string
  className?: string
  glowColor?: string
  delay?: number
  type?: 'slide' | 'warp' | 'glitch' | 'type'
}

export function TextEffect({
  text,
  className = '',
  glowColor = 'emerald',
  delay = 0,
  type = 'type'
}: TextEffectProps) {
  const [isHovered, setIsHovered] = useState(false)
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (type === 'warp') {
      letterRefs.current = letterRefs.current.slice(0, text.length)
    }
  }, [text, type])

  const getGlitchAnimation = (index: number) => {
    if (!isHovered) return {}
    
    return {
      transform: [
        'translate(0, 0)',
        `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`,
        'translate(0, 0)',
      ],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 0.1,
        repeat: Infinity,
        delay: index * 0.05,
      },
    }
  }

  const renderContent = () => {
    switch (type) {
      case 'slide':
        return text.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              transition: {
                delay: delay + i * 0.1,
                duration: 0.5,
                ease: [0.2, 0.65, 0.3, 0.9]
              }
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))

      case 'warp':
        return text.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block transform-gpu"
            whileHover={{
              y: [-2, 2, -2],
              transition: { duration: 0.3, repeat: Infinity }
            }}
            style={{
              transformOrigin: 'center center',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))

      case 'glitch':
        return text.split('').map((char, i) => (
          <motion.span
            key={i}
            animate={getGlitchAnimation(i)}
            className="inline-block relative"
            style={{
              textShadow: isHovered
                ? `0 0 2px #fff, 0 0 4px #fff, 0 0 8px #${glowColor}`
                : 'none'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))

      case 'type':
      default:
        return (
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{
              delay,
              duration: text.length * 0.05,
              ease: 'linear',
            }}
            className="inline-block whitespace-nowrap overflow-hidden"
          >
            {text}
          </motion.span>
        )
    }
  }

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {renderContent()}
    </span>
  )
}
