"use client"

import { useState, useEffect } from "react"

export function useMousePosition() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 })
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", h)
    return () => window.removeEventListener("mousemove", h)
  }, [])
  return pos
}
