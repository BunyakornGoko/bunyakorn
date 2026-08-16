"use client"

import { useState, useEffect } from "react"

export function useActiveSection() {
  const [active, setActive] = useState("")
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: "-35% 0px -55% 0px" }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])
  return active
}
