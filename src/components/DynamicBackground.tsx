"use client"

import { useEffect, useRef, useState } from 'react'

interface BackgroundProps {
  children: React.ReactNode
}

interface Dimensions {
  width: number
  height: number
}

interface Position {
  x: number
  y: number
}

class Particle {
  private x: number
  private y: number
  private size: number
  private speedX: number
  private speedY: number
  private opacity: number
  private dimensions: Dimensions

  constructor(dimensions: Dimensions) {
    this.dimensions = dimensions
    this.x = Math.random() * dimensions.width
    this.y = Math.random() * dimensions.height
    this.size = Math.random() * 2 + 0.5
    this.speedX = Math.random() * 2 - 1
    this.speedY = Math.random() * 2 - 1
    this.opacity = Math.random() * 0.5 + 0.2
  }

  update(mousePosition: Position) {
    this.x += this.speedX
    this.y += this.speedY

    // Wrap around screen edges
    if (this.x > this.dimensions.width) this.x = 0
    if (this.x < 0) this.x = this.dimensions.width
    if (this.y > this.dimensions.height) this.y = 0
    if (this.y < 0) this.y = this.dimensions.height

    // React to mouse position
    const dx = this.x - mousePosition.x
    const dy = this.y - mousePosition.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance < 100) {
      this.x += dx / distance
      this.y += dy / distance
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }
}

export function DynamicBackground({ children }: BackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [time, setTime] = useState<Date>(new Date())
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })
  const requestRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  // Initialize particles when dimensions change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      particlesRef.current = Array(50)
        .fill(null)
        .map(() => new Particle(dimensions))
    }
  }, [dimensions])

  // Handle mouse movement for particle effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current
      if (container) {
        const rect = container.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        requestAnimationFrame(() => {
          setMousePosition({ x, y })
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Canvas animation and resize handling
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const container = containerRef.current

    if (!canvas || !ctx || !container) return

    const resizeCanvas = () => {
      const { width, height } = container.getBoundingClientRect()
      requestAnimationFrame(() => {
        canvas.width = width
        canvas.height = height
        setDimensions({ width, height })
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update(mousePosition)
        particle.draw(ctx)
      })

      // Draw aurora effect based on time of day
      const hour = time.getHours()
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

      if (hour >= 5 && hour < 10) {
        // Sunrise
        gradient.addColorStop(0, 'rgba(255, 166, 0, 0.2)')
        gradient.addColorStop(1, 'rgba(255, 69, 0, 0.2)')
      } else if (hour >= 10 && hour < 17) {
        // Day
        gradient.addColorStop(0, 'rgba(135, 206, 235, 0.2)')
        gradient.addColorStop(1, 'rgba(0, 191, 255, 0.2)')
      } else if (hour >= 17 && hour < 20) {
        // Sunset
        gradient.addColorStop(0, 'rgba(255, 69, 0, 0.2)')
        gradient.addColorStop(1, 'rgba(138, 43, 226, 0.2)')
      } else {
        // Night
        gradient.addColorStop(0, 'rgba(25, 25, 112, 0.2)')
        gradient.addColorStop(1, 'rgba(72, 61, 139, 0.2)')
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      requestRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [mousePosition, time, dimensions])

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
