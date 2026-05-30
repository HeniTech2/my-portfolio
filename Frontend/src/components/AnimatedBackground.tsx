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
    let mouseX = width / 2
    let mouseY = height / 2
    let time = 0

    interface Star {
      x: number; y: number; radius: number
      alpha: number; baseAlpha: number
      vx: number; vy: number; color: string
      twinkleSpeed: number; twinklePhase: number; layer: number
    }
    interface ShootingStar {
      x: number; y: number; vx: number; vy: number
      length: number; alpha: number; active: boolean; trail: number
    }
    interface StreamStar {
      x: number; y: number; speed: number; radius: number
      alpha: number; color: string
      direction: 'down' | 'up' | 'right'; trailLength: number
    }

    const STAR_COUNT          = 30
    const SHOOTING_STAR_COUNT = 4
    const STREAM_COUNT        = 20

    const LAYERS = [
      { speedMult: 0.04, minR: 0.4, maxR: 1.0, parallax: 0.008 },
      { speedMult: 0.09, minR: 1.0, maxR: 2.2, parallax: 0.018 },
      { speedMult: 0.18, minR: 1.8, maxR: 3.2, parallax: 0.030 },
    ]

    // All star colors are tones of the 🔵 blue-cyan family
    const STAR_COLORS = [
      '#7ec8e3',  // sky cyan
      '#5ab4d6',  // medium blue-cyan
      '#a8d8f0',  // pale ice blue
      '#3a9fd6',  // vivid cerulean
      '#90caf9',  // soft cornflower
      '#b3e5fc',  // lightest icy blue
      '#4fc3f7',  // bright cyan-blue
      '#64b5f6',  // muted cobalt
    ]

    const stars: Star[]                = []
    const shootingStars: ShootingStar[] = []
    const streamStars: StreamStar[]    = []

    // ── Init Stars ────────────────────────────────────────────────────────────
    const initStars = () => {
      stars.length = 0
      for (let i = 0; i < STAR_COUNT; i++) {
        const layer = Math.floor(Math.random() * 3)
        const cfg = LAYERS[layer]
        const radius = cfg.minR + Math.random() * (cfg.maxR - cfg.minR)
        const baseAlpha = layer === 0 ? 0.40 + Math.random() * 0.30
                        : layer === 1 ? 0.55 + Math.random() * 0.28
                        :               0.72 + Math.random() * 0.25
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius, alpha: baseAlpha, baseAlpha,
          vx: (Math.random() - 0.5) * cfg.speedMult * 2,
          vy: (Math.random() - 0.5) * cfg.speedMult * 2,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          twinkleSpeed: 0.004 + Math.random() * 0.008,
          twinklePhase: Math.random() * Math.PI * 2,
          layer,
        })
      }
    }

    // ── Shooting Stars ────────────────────────────────────────────────────────
    const resetShootingStar = (s: ShootingStar) => {
      s.x = Math.random() * width * 0.7 + width * 0.1
      s.y = Math.random() * height * 0.35
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.5
      const speed = 7 + Math.random() * 7
      s.vx = Math.cos(angle) * speed
      s.vy = Math.sin(angle) * speed
      s.length = 90 + Math.random() * 130
      s.alpha = 0; s.active = false; s.trail = s.length
    }
    const initShootingStars = () => {
      shootingStars.length = 0
      for (let i = 0; i < SHOOTING_STAR_COUNT; i++) {
        const s: ShootingStar = { x:0,y:0,vx:0,vy:0,length:0,alpha:0,active:false,trail:0 }
        resetShootingStar(s)
        shootingStars.push(s)
      }
    }

    // ── Stream Stars ──────────────────────────────────────────────────────────
    const resetStreamStar = (s: StreamStar) => {
      s.speed       = 0.6 + Math.random() * 1.8
      s.radius      = 0.5 + Math.random() * 1.2
      s.alpha       = 0.35 + Math.random() * 0.40
      s.color       = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
      s.trailLength = 14 + Math.random() * 26
      if      (s.direction === 'down')  { s.x = Math.random() * width;  s.y = -s.trailLength }
      else if (s.direction === 'up')    { s.x = Math.random() * width;  s.y = height + s.trailLength }
      else                              { s.x = -s.trailLength;          s.y = Math.random() * height }
    }
    const initStreamStars = () => {
      streamStars.length = 0
      const perDir = Math.floor(STREAM_COUNT / 3)
      const dirs: Array<StreamStar['direction']> = ['down','up','right']
      dirs.forEach(dir => {
        for (let i = 0; i < perDir; i++) {
          const s: StreamStar = { x:0,y:0,speed:0,radius:0,alpha:0,color:'',direction:dir,trailLength:0 }
          resetStreamStar(s)
          if (dir === 'down')  s.y = Math.random() * (height + s.trailLength) - s.trailLength
          if (dir === 'up')    s.y = Math.random() * (height + s.trailLength)
          if (dir === 'right') s.x = Math.random() * (width  + s.trailLength) - s.trailLength
          streamStars.push(s)
        }
      })
    }

    const drawStreamStars = () => {
      streamStars.forEach(s => {
        if (s.direction === 'down')  s.y += s.speed
        if (s.direction === 'up')    s.y -= s.speed
        if (s.direction === 'right') s.x += s.speed
        if (s.direction === 'down'  && s.y >  height + s.trailLength) resetStreamStar(s)
        if (s.direction === 'up'    && s.y < -s.trailLength)          resetStreamStar(s)
        if (s.direction === 'right' && s.x >  width  + s.trailLength) resetStreamStar(s)

        let tx = 0, ty = 0
        if (s.direction === 'down')  ty = -s.trailLength
        if (s.direction === 'up')    ty =  s.trailLength
        if (s.direction === 'right') tx = -s.trailLength

        const grad = ctx.createLinearGradient(s.x+tx, s.y+ty, s.x, s.y)
        grad.addColorStop(0,   'rgba(0,0,0,0)')
        grad.addColorStop(0.5, `${s.color}44`)
        grad.addColorStop(1,    s.color)
        ctx.globalAlpha = s.alpha
        ctx.strokeStyle = grad
        ctx.lineWidth   = s.radius
        ctx.lineCap     = 'round'
        ctx.beginPath()
        ctx.moveTo(s.x+tx, s.y+ty)
        ctx.lineTo(s.x, s.y)
        ctx.stroke()
        ctx.globalAlpha = s.alpha * 0.85
        ctx.fillStyle   = s.color
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.radius * 1.2, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
    }

    // ── Background ────────────────────────────────────────────────────────────
    const drawBackground = () => {
      // Base — deep ocean blue-black, richest at center
      const grad = ctx.createLinearGradient(0, 0, 0, height)
      grad.addColorStop(0,    '#000508')   // pure deep black-blue
      grad.addColorStop(0.20, '#010e1c')   // midnight ocean
      grad.addColorStop(0.42, '#021830')   // rich saturated navy
      grad.addColorStop(0.65, '#011424')   // deep teal-black
      grad.addColorStop(0.85, '#010a18')   // near void with blue
      grad.addColorStop(1,    '#000610')   // absolute dark anchor
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // Bold diagonal sweep — strong cyan wash
      const diag = ctx.createLinearGradient(0, 0, width, height)
      diag.addColorStop(0,    'rgba(0,150,220,0.32)')
      diag.addColorStop(0.30, 'rgba(0,100,180,0.18)')
      diag.addColorStop(0.60, 'rgba(0,60,130,0.10)')
      diag.addColorStop(1,    'rgba(0,40,90,0.20)')
      ctx.fillStyle = diag
      ctx.fillRect(0, 0, width, height)

      // Nebula 1 — blazing cyan-teal top-left
      const n1 = ctx.createRadialGradient(width*0.10, height*0.14, 0, width*0.10, height*0.14, width*0.52)
      n1.addColorStop(0,   'rgba(0,210,240,0.38)')
      n1.addColorStop(0.3, 'rgba(0,160,210,0.22)')
      n1.addColorStop(0.7, 'rgba(0,100,160,0.08)')
      n1.addColorStop(1,   'rgba(0,0,0,0)')
      ctx.fillStyle = n1
      ctx.fillRect(0, 0, width, height)

      // Nebula 2 — electric cobalt-blue right
      const n2 = ctx.createRadialGradient(width*0.90, height*0.28, 0, width*0.90, height*0.28, width*0.44)
      n2.addColorStop(0,   'rgba(40,120,255,0.30)')
      n2.addColorStop(0.4, 'rgba(20,80,220,0.15)')
      n2.addColorStop(1,   'rgba(0,0,0,0)')
      ctx.fillStyle = n2
      ctx.fillRect(0, 0, width, height)

      // Nebula 3 — deep royal blue center bloom
      const n3 = ctx.createRadialGradient(width*0.48, height*0.50, 0, width*0.48, height*0.50, width*0.42)
      n3.addColorStop(0,   'rgba(0,100,220,0.22)')
      n3.addColorStop(0.5, 'rgba(0,60,160,0.10)')
      n3.addColorStop(1,   'rgba(0,0,0,0)')
      ctx.fillStyle = n3
      ctx.fillRect(0, 0, width, height)

      // Nebula 4 — vivid sky-blue bottom-right
      const n4 = ctx.createRadialGradient(width*0.80, height*0.78, 0, width*0.80, height*0.78, width*0.40)
      n4.addColorStop(0,   'rgba(50,180,240,0.26)')
      n4.addColorStop(0.4, 'rgba(20,120,200,0.12)')
      n4.addColorStop(1,   'rgba(0,0,0,0)')
      ctx.fillStyle = n4
      ctx.fillRect(0, 0, width, height)

      // Nebula 5 — bright ice-blue top-right
      const n5 = ctx.createRadialGradient(width*0.75, height*0.08, 0, width*0.75, height*0.08, width*0.30)
      n5.addColorStop(0,   'rgba(180,235,255,0.22)')
      n5.addColorStop(0.5, 'rgba(90,180,240,0.10)')
      n5.addColorStop(1,   'rgba(0,0,0,0)')
      ctx.fillStyle = n5
      ctx.fillRect(0, 0, width, height)
    }

    // ── Draw Stars ────────────────────────────────────────────────────────────
    const drawStars = () => {
      const mx = (mouseX - width  / 2) / (width  / 2)
      const my = (mouseY - height / 2) / (height / 2)

      stars.forEach(star => {
        star.x += star.vx
        star.y += star.vy

        const cfg  = LAYERS[star.layer]
        const drawX = star.x + mx * cfg.parallax * width
        const drawY = star.y + my * cfg.parallax * height

        if (star.x < -10) star.x = width  + 10
        if (star.x > width  + 10) star.x = -10
        if (star.y < -10) star.y = height + 10
        if (star.y > height + 10) star.y = -10

        star.twinklePhase += star.twinkleSpeed
        const twinkle = Math.sin(star.twinklePhase) * 0.20
        star.alpha = Math.max(0.08, Math.min(1, star.baseAlpha + twinkle))

        ctx.globalAlpha = star.alpha
        ctx.fillStyle   = star.color
        ctx.beginPath()
        ctx.arc(drawX, drawY, star.radius, 0, Math.PI * 2)
        ctx.fill()

        if (star.radius > 1.2) {
          const glowR = star.radius * (star.layer === 2 ? 4.2 : 3.0)
          const glow  = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, glowR)
          glow.addColorStop(0, star.color)
          glow.addColorStop(1, star.color + '00')
          ctx.globalAlpha = star.alpha * (star.layer === 2 ? 0.55 : 0.28)
          ctx.fillStyle   = glow
          ctx.beginPath()
          ctx.arc(drawX, drawY, glowR, 0, Math.PI * 2)
          ctx.fill()
        }

        if (star.layer === 2 && star.radius > 2.5) {
          ctx.globalAlpha = star.alpha * 0.55
          ctx.strokeStyle = star.color
          ctx.lineWidth   = 0.6
          const len = star.radius * 3.5
          ctx.beginPath()
          ctx.moveTo(drawX - len, drawY); ctx.lineTo(drawX + len, drawY)
          ctx.moveTo(drawX, drawY - len); ctx.lineTo(drawX, drawY + len)
          ctx.stroke()
        }
      })
    }

    // ── Shooting Stars ────────────────────────────────────────────────────────
    let nextShootTimer = 3000 + Math.random() * 4000
    const drawShootingStars = (dt: number) => {
      nextShootTimer -= dt
      if (nextShootTimer <= 0) {
        const idle = shootingStars.find(s => !s.active)
        if (idle) idle.active = true
        nextShootTimer = 2500 + Math.random() * 5000
      }
      shootingStars.forEach(s => {
        if (!s.active) return
        if (s.alpha < 1) s.alpha = Math.min(1, s.alpha + 0.10)
        s.x += s.vx; s.y += s.vy
        const tailX = s.x - (s.vx / Math.hypot(s.vx, s.vy)) * s.length
        const tailY = s.y - (s.vy / Math.hypot(s.vx, s.vy)) * s.length
        const trail = ctx.createLinearGradient(tailX, tailY, s.x, s.y)
        trail.addColorStop(0,   'rgba(0,0,0,0)')
        trail.addColorStop(0.5, `rgba(80,190,240,${s.alpha * 0.25})`)
        trail.addColorStop(0.8, `rgba(140,220,255,${s.alpha * 0.55})`)
        trail.addColorStop(1,   `rgba(220,245,255,${s.alpha})`)
        ctx.globalAlpha = 1
        ctx.strokeStyle = trail
        ctx.lineWidth   = 1.8
        ctx.lineCap     = 'round'
        ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(s.x, s.y); ctx.stroke()
        const hg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 7)
        hg.addColorStop(0, `rgba(200,240,255,${s.alpha})`)
        hg.addColorStop(1, 'rgba(0,140,200,0)')
        ctx.fillStyle = hg
        ctx.beginPath(); ctx.arc(s.x, s.y, 7, 0, Math.PI * 2); ctx.fill()
        if (s.x > width + 100 || s.y > height + 100) resetShootingStar(s)
      })
    }

    // ── Loop ──────────────────────────────────────────────────────────────────
    let lastTime = performance.now()
    const animate = (now: number) => {
      const dt = now - lastTime
      lastTime = now
      time += dt
      ctx.globalAlpha = 1
      drawBackground()
      drawStreamStars()
      drawStars()
      drawShootingStars(dt)
      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }

    const handleMouse  = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY }
    const handleResize = () => {
      width = window.innerWidth; height = window.innerHeight
      canvas.width = width; canvas.height = height
      initStars(); initShootingStars(); initStreamStars()
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouse)
    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ zIndex: -9999 }}
      className="fixed inset-0 w-full h-full pointer-events-none"
    />
  )
}

export default AnimatedBackground