"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useInView, AnimatePresence } from "framer-motion"
import {
  Github, Linkedin, Facebook, Mail, Phone, MapPin,
  ExternalLink, Menu, X, ChevronDown, Code2, Server, Wrench, Palette,
} from "lucide-react"
import Image from "next/image"
import { StarField } from "@/components/StarField"

// ─── Data ─────────────────────────────────────────────────────────────────────

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
]

const ROLES = [
  "Full-Stack Developer",
  "Ruby on Rails Engineer",
  "Golang Backend Dev",
  "React Frontend Dev",
  "AI Integration",
]

const skills = {
  "Programming Languages": {
    icon: Code2,
    items: ["HTML", "CSS", "JavaScript", "Python", "Java", "SQL", "Ruby", "Golang"],
  },
  "Frameworks & Libraries": {
    icon: Server,
    items: ["Vue.js", "React", "Tailwind CSS", "DaisyUI", "SpringBoot", "Axios", "Express.js", "Rails", "FastAPI"],
  },
  "Tools & Platforms": {
    icon: Wrench,
    items: ["Node.js", "Git", "GitHub", "MySQL", "PostgreSQL", "MongoDB", "Jira", "Postman", "GitLab CI", "Cursor", "Antigravity"],
  },
  "UX / UI": {
    icon: Palette,
    items: ["Figma", "Responsive Design", "Design Thinking"],
  },
}

const experiences = [
  {
    title: "Project Fanato — The Financial Assistance",
    period: "2025 – 2026",
    role: "Senior Project @ KMUTT",
    accent: "from-blue-500/15 to-cyan-500/10",
    dotColor: "bg-blue-400",
    highlights: [
      "Acted as Product Owner, Scrum Master, and Developer all in one.",
      "Built a 3-tier architecture with React, Golang, PostgreSQL and used Model Context Protocol to stream real-time stock price & news to the AI layer.",
      "Integrated GPT-5-mini for Risk Assessment, Financial Health Check, Investment Recommendation, ChatBot, and Tax Deduction features.",
      "Managed infrastructure with Nginx and configured reverse proxy for public IP access.",
      "Fanato team won 1st runner-up in the D-DAY IT Bangmod 2026."
    ],
    images: ["/fanato-dashboard.png", "/fanato-poster.png", "/fanato-team.png"],
  },
  {
    title: "Project BMA Training — Bangkok",
    period: "2025",
    role: "Intern at ODT — 7 months",
    accent: "from-violet-500/15 to-purple-500/10",
    dotColor: "bg-violet-400",
    image: "/bma-team.png",
    highlights: [
      "Facilitated team collaboration to enhance system performance.",
      "Designed ER Diagrams and applied Large Scale Scrum.",
      "UX/UI design and responsive layout for laptops, tablets, and phones.",
      "Performed E2E testing using Cucumber.",
      "Managed authentication & authorization via Keycloak (groups, permissions, roles).",
      "Developed and maintained the BMA Training course reservation system using Ruby on Rails.",
    ],
  },
  {
    title: "ETDA Bootcamp 2026 — Empowering Digital Citizens",
    period: "2026",
    role: "Participant — Honorable Mention",
    accent: "from-emerald-500/15 to-teal-500/10",
    dotColor: "bg-emerald-400",
    image: "/long-do-dev.jpg",
    highlights: [
      "Learned about the VC ecosystem from ETDA.",
      "LongCheck: Verification as a Service (VaaS) — verifies digital certificates for businesses and SMEs, reducing PDPA & cybersecurity risks.",
      "Long Do Dev team received an honorable mention at ETDA 2026.",
    ],
  },
]

const softSkills = [
  "Leadership",
  "Scrum Teamwork",
  "Eager to Understand",
  "Brainstorm for Discussion",
  "Problem Solving",
  "NVC for Feedback",
]

const contactItems = [
  { icon: Phone, label: "Phone", value: "080-068-0597", href: "tel:0800680597" },
  { icon: Mail, label: "Email", value: "bunyakorn.porn@gmail.com", href: "mailto:bunyakorn.porn@gmail.com" },
  { icon: MapPin, label: "Location", value: "Bangkok, Thailand", href: null },
]

const socialLinks = [
  { icon: Github, href: "https://github.com/BunyakornGoko", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/bunyakorn-pornsombatpaibool-3a4886254/", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/bunyakorn.goko/", label: "Facebook" },
]

const heroTechBadges = [
  { label: "Go", top: "8%", left: "-14%" },
  { label: "RoR", top: "74%", left: "-14%" },
  { label: "React", top: "82%", left: "92%" },
  { label: "AI", top: "5%", left: "90%" },
]

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useMousePosition() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 })
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", h)
    return () => window.removeEventListener("mousemove", h)
  }, [])
  return pos
}

function useTypewriter(words: string[], speed = 75, pause = 1800) {
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    let t: ReturnType<typeof setTimeout>

    if (!deleting && charIdx < word.length) {
      t = setTimeout(() => setCharIdx(c => c + 1), speed)
    } else if (!deleting && charIdx === word.length) {
      t = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      t = setTimeout(() => setCharIdx(c => c - 1), speed / 2)
    } else {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    }

    return () => clearTimeout(t)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return words[wordIdx].slice(0, charIdx)
}

function useActiveSection() {
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

// ─── Circular Scroll Progress ─────────────────────────────────────────────────

function CircularScrollProgress() {
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

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55 }}
      viewport={{ once: true }}
      className="flex items-center gap-4"
    >
      <span className="font-mono text-primary text-lg font-bold">{number}.</span>
      <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const mouse = useMousePosition()
  const role = useTypewriter(ROLES)
  const activeSection = useActiveSection()


  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ── Cursor spotlight ─────────────────────────────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(700px circle at ${mouse.x}px ${mouse.y}px, oklch(0.65 0.20 230 / 0.07), transparent 60%)`,
        }}
      />

      {/* ── Circular scroll progress (bottom-right) ──────────────────────────── */}
      <CircularScrollProgress />

      {/* ── Star field ───────────────────────────────────────────────────────── */}
      <StarField />

      {/* ── Grid background ──────────────────────────────────────────────────── */}
      <div className="fixed inset-0 z-0 grid-bg" />


      {/* ── Navigation ───────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <motion.a
              href="#"
              className="font-mono font-bold text-xl relative group glow-text text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              BunyakornGoko
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full shadow-glow" />
            </motion.a>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors duration-200 ${activeSection === item.href.slice(1)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                >
                  {item.name}
                  {activeSection === item.href.slice(1) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary shadow-glow"
                    />
                  )}
                </motion.a>
              ))}
            </div>

            <button
              className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <motion.div
            className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-white/5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-1 text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-28 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeading number="01" title="About Me" />

          <div className="mt-12 grid md:grid-cols-2 gap-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <p className="text-muted-foreground leading-relaxed text-[0.92rem]">
                Passionate about solving complex technical challenges and delivering high-quality, user-centric web applications.
                I specialize in Model-View-Controller architectures and have experience integrating advanced AI solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed text-[0.92rem]">
                My approach combines technical expertise with a deep understanding of user needs, ensuring that every project
                I work on delivers both functionality and an exceptional user experience.
              </p>
              <div className="pt-4 border-t border-white/5">
                <p className="text-[0.7rem] text-muted-foreground font-mono uppercase tracking-widest mb-3">Languages</p>
                <div className="flex gap-3 flex-wrap">
                  {["English (Intermediate)", "Thai (Native)"].map(lang => (
                    <span
                      key={lang}
                      className="px-3.5 py-1.5 border border-primary/30 bg-primary/5 rounded-full text-xs text-primary font-mono"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-[0.7rem] text-muted-foreground font-mono uppercase tracking-widest mb-4">Soft Skills</p>
              <div className="grid grid-cols-2 gap-2.5">
                {softSkills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 group-hover:shadow-glow transition-shadow" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          EXPERIENCE — vertical timeline
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="experience" className="py-28 px-4 relative z-10 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto">
          <SectionHeading number="02" title="Experience" />

          <div className="mt-14 relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px timeline-line md:-translate-x-1/2" />

            <div className="space-y-14">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row gap-0 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                >
                  {/* Dot on timeline */}
                  <div
                    className={`absolute left-4 md:left-1/2 top-6 w-3.5 h-3.5 rounded-full ${exp.dotColor} md:-translate-x-1/2 shadow-glow z-10 border-2 border-background`}
                  />

                  {/* Period label — desktop only, opposite side */}
                  <div className={`hidden md:flex md:w-1/2 items-start pt-5 ${i % 2 === 0 ? "justify-end pr-12" : "justify-start pl-12"}`}>
                    <span className="font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
                      {exp.period}
                    </span>
                  </div>

                  {/* Card */}
                  <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                    <TiltCard
                      className={`rounded-2xl border border-white/8 bg-gradient-to-br ${exp.accent} backdrop-blur-sm shimmer-border overflow-hidden`}
                    >
                      <div className="p-6 md:p-7">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-base font-bold text-foreground leading-snug">{exp.title}</h3>
                          <ExternalLink size={13} className="text-primary flex-shrink-0 mt-0.5" />
                        </div>
                        <p className="text-primary text-sm font-semibold mb-0.5">{exp.role}</p>
                        <span className="md:hidden font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
                          {exp.period}
                        </span>
                        <ul className="mt-4 space-y-2">
                          {exp.highlights.map((h, j) => (
                            <li key={j} className="flex gap-2.5 text-[0.82rem] text-muted-foreground">
                              <span className="text-primary mt-[3px] flex-shrink-0 text-xs">▹</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                        {exp.images && exp.images.length > 0 && (
                          <div className="mt-5 space-y-2">
                            {/* Dashboard — full width */}
                            <div className="rounded-xl overflow-hidden border border-white/10">
                              <Image src={exp.images[0]} alt={`${exp.title} dashboard`} width={600} height={300} className="w-full h-auto object-cover" />
                            </div>
                            {/* Poster (1/3) + Team (2/3) */}
                            <div className="grid grid-cols-3 gap-2">
                              <div className="col-span-1 rounded-xl overflow-hidden border border-white/10">
                                <Image src={exp.images[1]} alt={`${exp.title} poster`} width={200} height={300} className="w-full h-full object-cover" />
                              </div>
                              <div className="col-span-2 rounded-xl overflow-hidden border border-white/10">
                                <Image src={exp.images[2]} alt={`${exp.title} team`} width={400} height={300} className="w-full h-full object-cover" />
                              </div>
                            </div>
                          </div>
                        )}
                        {exp.image && (
                          <div className="mt-5 rounded-xl overflow-hidden border border-white/10">
                            <Image src={exp.image} alt={exp.title} width={600} height={300} className="w-full h-auto object-cover" />
                          </div>
                        )}
                      </div>
                    </TiltCard>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SKILLS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="skills" className="py-28 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeading number="03" title="Skills & Tools" />

          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {Object.entries(skills).map(([category, { icon: Icon, items }], ci) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: ci * 0.08 }}
                viewport={{ once: true }}
              >
                <TiltCard className="h-full rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden shimmer-border">
                  <div className="p-6">
                    <h3 className="text-[0.7rem] font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Icon size={14} className="text-primary" />
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill, si) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          transition={{
                            default: { duration: 0.18, delay: ci * 0.08 + si * 0.035 },
                            scale: { duration: 0.12 },
                          }}
                          viewport={{ once: true }}
                          className="px-3 py-1.5 bg-background/60 border border-primary/18 text-muted-foreground rounded-lg text-xs font-mono cursor-default hover:border-primary hover:text-primary hover:shadow-glow transition-all duration-200"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          EDUCATION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="education" className="py-28 px-4 relative z-10 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto">
          <SectionHeading number="04" title="Education" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <TiltCard className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/6 to-transparent shimmer-border overflow-hidden">
              <div className="p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-20 h-20 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center flex-shrink-0 overflow-hidden group">
                  <Image src="/kmutt.png" alt="KMUTT" width={80} height={80} className="w-full h-full object-cover z-10" />
                  <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 rounded-2xl transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {"King Mongkut's University of Technology Thonburi"}
                  </h3>
                  <p className="text-primary font-semibold text-sm mt-1">School of Information Technology</p>
                  <p className="text-muted-foreground text-sm mt-2">{"Bachelor's Degree in Information Technology"}</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CONTACT
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-28 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="font-mono text-primary text-xs uppercase tracking-widest mb-3">05. What&apos;s Next?</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">Get In Touch</h2>
            <div
              className="w-20 h-0.5 mx-auto mb-6 rounded-full"
              style={{ background: "linear-gradient(to right, oklch(0.65 0.20 230), oklch(0.55 0.22 220))", boxShadow: "0 0 10px oklch(0.65 0.20 230 / 0.5)" }}
            />
            <p className="text-muted-foreground max-w-xl mx-auto mb-12 text-[0.9rem] leading-relaxed">
              {"I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!"}
            </p>

            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <TiltCard key={label} className="rounded-2xl border border-white/8 bg-white/[0.03] shimmer-border">
                  <div className="p-6 flex flex-col items-center group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 group-hover:shadow-glow transition-all duration-200">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <p className="text-[0.65rem] text-muted-foreground font-mono uppercase tracking-widest mb-1">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-foreground font-medium hover:text-primary transition-colors text-center leading-snug break-all"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground font-medium text-center">{value}</p>
                    )}
                  </div>
                </TiltCard>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.93 }}
                  className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/8 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-glow hover:bg-primary/8 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="py-8 px-4 border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground text-[0.75rem] font-mono">
            Designed &amp; Built by{" "}
            <span className="text-primary glow-text">Bunyakorn Pornsombatpaibool</span>
          </p>
          <p className="text-muted-foreground text-[0.75rem] mt-1">© 2026 — All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
