import { useEffect, useRef } from 'react'

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let animationId: number

    interface Star {
      x: number
      y: number
      radius: number
      alpha: number
      vx: number   // constant horizontal speed
      vy: number   // constant vertical speed
      color: string
    }

    const stars: Star[] = []
    const STAR_COUNT = 90       // few stars, each one noticeable

    // Warm summer colors (white, pale yellow, soft orange)
    const colors = ['#fff8e7', '#ffe4b5', '#ffd28f', '#ffffff']

    // Very slow, steady speeds – stars take many seconds to cross the screen
    const MIN_SPEED = 0.05
    const MAX_SPEED = 0.15

    const initStars = () => {
      stars.length = 0
      for (let i = 0; i < STAR_COUNT; i++) {
        const radius = 1.8 + Math.random() * 3.2   // slightly larger, more visible
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          alpha: 0.5 + Math.random() * 0.5,
          vx: (Math.random() - 0.5) * (MAX_SPEED - MIN_SPEED) + MIN_SPEED,
          vy: (Math.random() - 0.5) * (MAX_SPEED - MIN_SPEED) + MIN_SPEED,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
    }

    // Deep, dark night sky (almost black, subtle blue/purple)
    const drawBackground = () => {
      const grad = ctx.createLinearGradient(0, 0, 0, height)
      grad.addColorStop(0, '#03030f')
      grad.addColorStop(0.5, '#050515')
      grad.addColorStop(1, '#010108')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)
    }

    const animate = () => {
      if (!ctx) return
      drawBackground()

      stars.forEach(star => {
        // Move stars at constant speed (no oscillation)
        star.x += star.vx
        star.y += star.vy

        // Wrap around edges (long distance motion)
        if (star.x < -50) star.x = width + 50
        if (star.x > width + 50) star.x = -50
        if (star.y < -50) star.y = height + 50
        if (star.y > height + 50) star.y = -50

        // Draw star (no twinkling, just constant brightness)
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.globalAlpha = star.alpha
        ctx.fill()

        // Add a soft glow for larger stars (static glow, no pulsation)
        if (star.radius > 2.5) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.radius * 1.3, 0, Math.PI * 2)
          ctx.fillStyle = star.color
          ctx.globalAlpha = star.alpha * 0.25
          ctx.fill()
        }
      })

      ctx.globalAlpha = 1.0
      animationId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      initStars()
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 w-full h-full" />
}

export default AnimatedBackground