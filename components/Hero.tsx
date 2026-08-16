"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { useTypewriter } from "@/hooks/use-typewriter"

const ROLES = [
  "Full-Stack Developer",
  "Ruby on Rails Engineer",
  "Golang Backend Dev",
  "React Frontend Dev",
  "AI Integration",
]

const heroTechBadges = [
  { label: "Go", top: "8%", left: "-14%" },
  { label: "RoR", top: "74%", left: "-14%" },
  { label: "React", top: "82%", left: "92%" },
  { label: "AI", top: "5%", left: "90%" },
]

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let current = 0
    const step = target / 50
    const timer = setInterval(() => {
      current += step
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 28)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export function Hero() {
  const role = useTypewriter(ROLES)

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col-reverse lg:grid lg:grid-cols-[1fr_auto] lg:gap-16 xl:gap-20 items-center">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full mt-10 lg:mt-0"
        >
          <motion.p
            className="font-mono text-sm text-primary mb-3 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="block w-8 h-px bg-primary" />
            Hello, I&apos;m
          </motion.p>

          {/* Glitch name */}
          <div className="relative mb-2">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-none glitch"
              data-text="Bunyakorn"
            >
              Bunyakorn
            </h1>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-5">
            <span className="gradient-text">Pornsombatpaibool</span>
          </h1>

          {/* Typewriter */}
          <div className="h-9 mb-6 flex items-center">
            <p className="text-lg md:text-xl text-muted-foreground font-mono">
              {role}
              <span className="inline-block w-[2px] h-5 bg-primary ml-1 animate-blink align-middle" />
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg text-[0.9rem]">
            Result-oriented Full-Stack Developer with a strong foundation in Ruby on Rails, Golang, React, and PostgreSQL.
            Experienced in building scalable 3-tier architectures and integrating advanced AI solutions like GPT models and MCP.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative px-7 py-3 rounded-lg font-semibold text-sm overflow-hidden group"
              style={{
                background: "oklch(0.65 0.20 230)",
                color: "oklch(0.98 0 0)",
              }}
            >
              <span className="relative z-10">Contact Me</span>
              <span className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.a>
            <motion.a
              href="#experience"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-7 py-3 border border-primary/50 text-primary font-semibold text-sm rounded-lg hover:bg-primary/10 hover:border-primary transition-all duration-200"
            >
              View Projects
            </motion.a>
          </div>

          {/* Stats row */}
          <div className="flex gap-10 mt-10 pt-8 border-t border-white/5">
            {[
              { label: "Projects", value: 10, suffix: "+" },
              { label: "Languages", value: 8, suffix: "+" },
              { label: "Frameworks", value: 9, suffix: "+" },
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-primary font-mono">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[0.72rem] text-muted-foreground uppercase tracking-widest mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="w-full flex justify-center lg:w-auto lg:justify-end lg:pr-14"
        >
          <div className="relative flex items-center mt-16 lg:mt-0 justify-center w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] lg:w-[300px] lg:h-[300px]">
            {/* Inner ring — always visible */}
            <div className="absolute rounded-full border border-primary/25 animate-spin-slow" style={{ inset: "-28px" }} />
            {/* Outer ring — desktop only */}
            <div className="absolute rounded-full border border-primary/12 animate-spin-slow-reverse" style={{ inset: "-52px" }} />

            {/* Orbiting dot on inner ring */}
            <div className="absolute animate-orbit pointer-events-none" style={{ inset: "-28px", borderRadius: "50%" }}>
              <div
                className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-glow"
              />
            </div>

            {/* Photo circle */}
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-primary/40 animate-pulse-glow">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FullStack%20Resume%20A4-Xv2R0cqpFlp32gTHu0tdlYPkkB4yJ1.png"
                alt="Bunyakorn Pornsombatpaibool"
                width={320}
                height={320}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>

            {/* Glow blobs */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-accent/8 rounded-full blur-3xl pointer-events-none" />

            {/* Tech badges */}
            {heroTechBadges.map((b, i) => (
              <motion.div
                key={b.label}
                className="absolute px-2.5 py-1 bg-background/90 border border-primary/30 rounded-full text-xs font-mono text-primary whitespace-nowrap"
                style={{ top: b.top, left: b.left }}
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 2.2 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
              >
                {b.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown className="text-primary/60" size={22} />
        </motion.div>
      </motion.div>
    </section>
  )
}
