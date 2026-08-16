"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, AnimatePresence } from "framer-motion"

export function CircularScrollProgress() {
  const { scrollYProgress } = useScroll()
  const [pct, setPct] = useState(0)

  useEffect(() => {
    return scrollYProgress.on("change", v => setPct(Math.round(v * 100)))
  }, [scrollYProgress])

  const R = 22
  const circ = 2 * Math.PI * R
  const offset = circ * (1 - pct / 100)

  return (
    <AnimatePresence>
      {pct > 1 && (
        <motion.button
          key="circ-progress"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 cursor-pointer group"
          aria-label={`Scroll progress ${pct}%. Click to return to top.`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" overflow="visible">
            <circle
              cx="32" cy="32" r="29"
              fill="oklch(0.10 0.025 250 / 0.88)"
              stroke="oklch(0.28 0.04 250)"
              strokeWidth="1"
            />
            <circle
              cx="32" cy="32" r={R}
              fill="none"
              stroke="oklch(0.22 0.03 250)"
              strokeWidth="3.5"
            />
            <circle
              cx="32" cy="32" r={R}
              fill="none"
              stroke="oklch(0.65 0.20 230)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              transform="rotate(-90 32 32)"
              style={{
                transition: "stroke-dashoffset 0.15s ease",
                filter: "drop-shadow(0 0 5px rgba(66, 153, 225, 0.75))",
              }}
            />
            <text
              x="32" y="36"
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
              fill="oklch(0.65 0.20 230)"
            >
              {pct}%
            </text>
          </svg>
          <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-background/90 border border-white/10 text-[10px] font-mono text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Back to top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
