"use client"

import { useMousePosition } from "@/hooks/use-mouse-position"
import { CircularScrollProgress } from "@/components/CircularScrollProgress"
import { StarField } from "@/components/StarField"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { AboutSection } from "@/components/AboutSection"
import { ExperienceSection } from "@/components/ExperienceSection"
import { SkillsSection } from "@/components/SkillsSection"
import { EducationSection } from "@/components/EducationSection"
import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"

export default function Portfolio() {
  const mouse = useMousePosition()

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

      <Navbar />
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
