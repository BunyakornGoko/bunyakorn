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
    const canvas = canvasRef.current!
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

    // ── Generate stars (with Milky Way band) ────────────────────────────────
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
    let nextShoot = Date.now() + 400

    function spawnShoot() {
      // มุมซ้ายบน → ขวาล่าง: 40-52°
      const angleDeg = 40 + Math.random() * 12
      const angle    = angleDeg * Math.PI / 180
      const spd      = 8 + Math.random() * 5        // 8-13 px/frame
      shoots.push({
        x:       Math.random() * w * 0.85,
        y:       Math.random() * h * 0.70,
        vx:      Math.cos(angle) * spd,
        vy:      Math.sin(angle) * spd,
        len:     340 + Math.random() * 220,          // trail 340-560px
        life:    0,
        maxLife: 65 + Math.random() * 45,            // 65-110 frames
      })
    }

    let t = 0

    function draw() {
      ctx.clearRect(0, 0, w, h)
      t++

      // ── Nebula glows ──────────────────────────────────────────────────────
      nebulae.forEach(n => {
        const g = ctx.createRadialGradient(n.cx*w, n.cy*h, 0, n.cx*w, n.cy*h, n.r*Math.max(w,h))
        g.addColorStop(0, `rgba(${n.c},${n.a})`)
        g.addColorStop(1, "transparent")
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      })

      // ── Stars ─────────────────────────────────────────────────────────────
      const mx = (mouseX / w - 0.5)
      const my = (mouseY / h - 0.5)

      stars.forEach(s => {
        const tw      = Math.sin(t * s.twinkleSpeed + s.twinklePhase)
        const opacity = Math.min(1, s.baseOpacity * (0.60 + 0.40 * tw))
        const px      = mx * s.layer * 9
        const py      = my * s.layer * 9
        const sx      = s.x * w + px
        const sy      = s.y * h + py

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

        ctx.beginPath()
        ctx.arc(sx, sy, Math.max(0.01, s.size), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${s.color},${opacity})`
        ctx.fill()
      })

      // ── Shooting stars ────────────────────────────────────────────────────
      const now = Date.now()
      if (now >= nextShoot) {
        spawnShoot()
        if (Math.random() < 0.15) spawnShoot()       // 15% chance: 2 พร้อมกัน
        nextShoot = now + 2500 + Math.random() * 3000
      }

      ctx.save()
      ctx.globalAlpha = 0.2
      for (let i = shoots.length - 1; i >= 0; i--) {
        const s = shoots[i]
        s.x += s.vx
        s.y += s.vy
        s.life++

        // alpha: fade-in เร็ว 10%, เต็ม 65%, fade-out 25%
        const p     = Math.min(1, s.life / s.maxLife)
        const alpha = Math.max(0, p < 0.10 ? p / 0.10 : p < 0.75 ? 1 : 1 - (p - 0.75) / 0.25)

        if (alpha <= 0 || s.life > s.maxLife) { shoots.splice(i, 1); continue }

        const mag = Math.hypot(s.vx, s.vy)
        const ux  = s.vx / mag           // unit vector
        const uy  = s.vy / mag
        const tx  = s.x - ux * s.len    // tail start (fixed length)
        const ty  = s.y - uy * s.len

        // ── Layer 1: wide outer glow ──────────────────────────────────────
        const gOuter = ctx.createLinearGradient(tx, ty, s.x, s.y)
        gOuter.addColorStop(0,   "transparent")
        gOuter.addColorStop(0.5, `rgba(130,180,255,${alpha * 0.05})`)
        gOuter.addColorStop(1,   `rgba(180,220,255,${alpha * 0.14})`)
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = gOuter
        ctx.lineWidth   = 18
        ctx.stroke()

        // ── Layer 2: mid glow ─────────────────────────────────────────────
        const gMid = ctx.createLinearGradient(tx, ty, s.x, s.y)
        gMid.addColorStop(0,    "transparent")
        gMid.addColorStop(0.45, `rgba(170,210,255,${alpha * 0.18})`)
        gMid.addColorStop(0.85, `rgba(220,240,255,${alpha * 0.55})`)
        gMid.addColorStop(1,    `rgba(240,250,255,${alpha * 0.80})`)
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = gMid
        ctx.lineWidth   = 6
        ctx.stroke()

        // ── Layer 3: bright core ──────────────────────────────────────────
        const gCore = ctx.createLinearGradient(tx, ty, s.x, s.y)
        gCore.addColorStop(0,    "transparent")
        gCore.addColorStop(0.35, `rgba(210,235,255,${alpha * 0.5})`)
        gCore.addColorStop(0.80, `rgba(245,252,255,${alpha * 0.95})`)
        gCore.addColorStop(1,    `rgba(255,255,255,${alpha})`)
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = gCore
        ctx.lineWidth   = 1.8
        ctx.stroke()

        // ── Head glow: 3 ชั้น ─────────────────────────────────────────────
        const headR = Math.max(0.01, alpha)

        // halo กว้าง
        ctx.beginPath()
        ctx.arc(s.x, s.y, 18 * headR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(150,200,255,${alpha * 0.06})`
        ctx.fill()

        // mid glow
        ctx.beginPath()
        ctx.arc(s.x, s.y, 8 * headR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,230,255,${alpha * 0.20})`
        ctx.fill()

        // core สว่าง
        ctx.beginPath()
        ctx.arc(s.x, s.y, 3 * headR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()

        // sparkle cross (+)
        ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.5})`
        ctx.lineWidth   = 0.8
        const cl = 7 * headR
        ctx.beginPath()
        ctx.moveTo(s.x - cl, s.y); ctx.lineTo(s.x + cl, s.y)
        ctx.moveTo(s.x, s.y - cl); ctx.lineTo(s.x, s.y + cl)
        ctx.stroke()
      }
      ctx.restore()

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
      className="fixed inset-0 z-0 pointer-events-none opacity-80"
      aria-hidden="true"
    />
  )
}
