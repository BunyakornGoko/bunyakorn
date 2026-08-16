"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import { SectionHeading } from "@/components/SectionHeading"
import { TiltCard } from "@/components/TiltCard"
import { periodYears } from "@/lib/utils"

const experiences = [
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
]

const sortedExperiences = [...experiences].sort((a, b) => {
  const pa = periodYears(a.period), pb = periodYears(b.period)
  return pb.end - pa.end || pb.start - pa.start
})

export function ExperienceSection() {
  return (
    <section id="experience" className="py-28 px-4 relative z-10 bg-white/[0.015]">
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="02" title="Experience" />

        <div className="mt-14 relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px timeline-line md:-translate-x-1/2" />

          <div className="space-y-14">
            {sortedExperiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: i * 0.08 }}
                viewport={{ once: false }}
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
  )
}
