"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  baseOpacity: number
  twinkleSpeed: number
  twinklePhase: number
  layer: number
  color: string
}

interface Shoot {
  x: number; y: number
  vx: number; vy: number
  len: number; life: number; maxLife: number
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })!

    let raf: number
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let w = 0, h = 0

    function resize() {
      w = canvas.width  = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // ── Star color palette ──────────────────────────────────────────────────
    const palette = ["255,255,255", "200,220,255", "255,240,210", "180,200,255", "230,220,255"]

    // ── Generate stars (with Milky Way band) ─────────────────────────────────
    const stars: Star[] = []
    const TOTAL = 320

    for (let i = 0; i < TOTAL; i++) {
      const inBand = Math.random() < 0.38
      let x: number, y: number

      if (inBand) {
        const t  = Math.random()
        const sp = (Math.random() - 0.5) * 0.22
        x = Math.max(0, Math.min(1, 1 - t * 0.75 + sp))
        y = Math.max(0, Math.min(1, t * 0.85 + sp * 0.4))
      } else {
        x = Math.random()
        y = Math.random()
      }

      const bright = Math.random() < 0.09
      stars.push({
        x, y,
        size:         bright ? Math.random() * 1.6 + 1.0 : Math.random() * 0.8 + 0.15,
        baseOpacity:  bright ? 0.9 : Math.random() * 0.55 + 0.2,
        twinkleSpeed: Math.random() * 0.022 + 0.004,
        twinklePhase: Math.random() * Math.PI * 2,
        layer:        Math.floor(Math.random() * 3) + 1,
        color:        palette[Math.floor(Math.random() * palette.length)],
      })
    }

    // ── Nebula definitions ───────────────────────────────────────────────────
    const nebulae = [
      { cx: 0.68, cy: 0.22, r: 0.38, c: "56,119,248",  a: 0.055 },
      { cx: 0.12, cy: 0.70, r: 0.30, c: "139,92,246",  a: 0.050 },
      { cx: 0.88, cy: 0.78, r: 0.25, c: "56,189,248",  a: 0.042 },
      { cx: 0.50, cy: 0.50, r: 0.50, c: "30,58,138",   a: 0.030 },
    ]

    // ── Shooting stars ───────────────────────────────────────────────────────
    const shoots: Shoot[] = []
    let nextShoot = Date.now() + 2500 + Math.random() * 4000

    function spawnShoot() {
      const angleDeg = 12 + Math.random() * 28
      const angle    = angleDeg * Math.PI / 180
      const spd      = (0.35 + Math.random() * 0.40) * (w / 100)
      shoots.push({
        x:       Math.random() * w * 0.75,
        y:       Math.random() * h * 0.40,
        vx:      Math.cos(angle) * spd / 60,
        vy:      Math.sin(angle) * spd / 60,
        len:     90 + Math.random() * 130,
        life:    0,
        maxLife: 55 + Math.random() * 45,
      })
    }

    let t = 0

    function draw() {
      ctx.clearRect(0, 0, w, h)
      t++

      // ── Nebula glows ───────────────────────────────────────────────────────
      nebulae.forEach(n => {
        const g = ctx.createRadialGradient(n.cx*w, n.cy*h, 0, n.cx*w, n.cy*h, n.r*Math.max(w,h))
        g.addColorStop(0, `rgba(${n.c},${n.a})`)
        g.addColorStop(1, "transparent")
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      })

      // ── Stars ──────────────────────────────────────────────────────────────
      const mx = (mouseX / w - 0.5)
      const my = (mouseY / h - 0.5)

      stars.forEach(s => {
        const tw      = Math.sin(t * s.twinkleSpeed + s.twinklePhase)
        const opacity = Math.min(1, s.baseOpacity * (0.60 + 0.40 * tw))
        const px      = mx * s.layer * 9
        const py      = my * s.layer * 9
        const sx      = s.x * w + px
        const sy      = s.y * h + py

        // Outer glow (bright stars only)
        if (s.size > 1.0) {
          ctx.beginPath()
          ctx.arc(sx, sy, s.size * 4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${s.color},${opacity * 0.10})`
          ctx.fill()

          ctx.beginPath()
          ctx.arc(sx, sy, s.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${s.color},${opacity * 0.22})`
          ctx.fill()
        }

        // Star core
        ctx.beginPath()
        ctx.arc(sx, sy, Math.max(0.01, s.size), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${s.color},${opacity})`
        ctx.fill()
      })

      // ── Shooting stars ─────────────────────────────────────────────────────
      const now = Date.now()
      if (now >= nextShoot) {
        spawnShoot()
        nextShoot = now + 4500 + Math.random() * 7500
      }

      for (let i = shoots.length - 1; i >= 0; i--) {
        const s = shoots[i]
        s.x += s.vx
        s.y += s.vy
        s.life++

        const p     = Math.min(1, s.life / s.maxLife)
        const alpha = Math.max(0, p < 0.25 ? p / 0.25 : 1 - (p - 0.25) / 0.75)
        const mag   = Math.hypot(s.vx, s.vy)
        const tx    = s.x - (s.vx / mag) * s.len * alpha
        const ty    = s.y - (s.vy / mag) * s.len * alpha

        const g = ctx.createLinearGradient(tx, ty, s.x, s.y)
        g.addColorStop(0, "transparent")
        g.addColorStop(0.65, `rgba(200,225,255,${alpha * 0.25})`)
        g.addColorStop(1,    `rgba(230,245,255,${alpha * 0.95})`)

        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = g
        ctx.lineWidth   = 1.5 * alpha
        ctx.stroke()

        // Bright head
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.8 * alpha, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()

        if (s.life >= s.maxLife || alpha <= 0) { shoots.splice(i, 1); continue }
      }

      raf = requestAnimationFrame(draw)
    }

    const onMouse = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY }
    window.addEventListener("mousemove", onMouse)
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    />
  )
}
