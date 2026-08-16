"use client"

import { useState, useRef } from "react"

export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0, lit: false })

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = ((e.clientY - r.top) / r.height - 0.5) * 14
    const y = -((e.clientX - r.left) / r.width - 0.5) * 14
    setTilt({ x, y, lit: true })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0, lit: false })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
        transition: "transform 0.15s ease, box-shadow 0.2s ease",
        boxShadow: tilt.lit
          ? "0 0 35px oklch(0.65 0.20 230 / 0.20), 0 25px 60px rgba(0,0,0,0.5)"
          : "0 4px 24px rgba(0,0,0,0.35)",
      }}
      className={className}
    >
      {children}
    </div>
  )
}
