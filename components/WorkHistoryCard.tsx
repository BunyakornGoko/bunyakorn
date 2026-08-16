"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export type WorkPosition = {
  title: string
  type: string
  period: string
  duration?: string
  current?: boolean
  location?: string
}

export type WorkGroup = { company: string; logo: string; positions: WorkPosition[] }

// Add new work history here — prepend a group for a new company, or push a new
// position onto an existing group's `positions` array when your role changes.
export const workHistory: WorkGroup[] = [
  {
    company: "ODT",
    logo: "/ODT Logo White.png",
    positions: [
      { title: "Software Engineer", type: "Full-time", period: "May 2026 – Present", current: true },
      { title: "Software Engineer", type: "Part-time", period: "Mar 2026 – May 2026", duration: "3 mos" },
    ],
  },
  {
    company: "ODT",
    logo: "/ODT Logo White.png",
    positions: [
      { title: "Software Engineer", type: "ODDS · Internship", period: "Dec 2024 – Aug 2025", duration: "9 mos", location: "Thailand · On-site" },
    ],
  },
]

export function WorkHistoryCard({ history }: { history: WorkGroup[] }) {
  return (
    <motion.div
      className="mt-15 pt-4 border-t border-white/5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false }}
    >
      <p className="text-[0.7rem] text-muted-foreground font-mono uppercase tracking-widest mb-4">Work History</p>
      {history.map((group, gi) => (
        <div key={gi} className={gi > 0 ? "mt-4 pt-4 border-t border-white/10" : ""}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <Image src={group.logo} alt={group.company} width={26} height={26} className="object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              {group.positions.length > 1 ? (
                <p className="text-sm font-bold text-foreground">{group.company}</p>
              ) : (
                <>
                  <p className="text-sm font-bold text-foreground leading-snug">{group.positions[0].title}</p>
                  <p className="text-xs text-muted-foreground">{group.company} · {group.positions[0].type}</p>
                </>
              )}
            </div>
          </div>

          {group.positions.length > 1 && (
            <div className="mt-2.5 ml-4 pl-6 border-l border-white/10 space-y-3">
              {group.positions.map((p, pi) => (
                <div key={pi} className="relative">
                  <span
                    className={`absolute -left-[27px] top-1.5 w-2 h-2 rounded-full ${p.current ? "bg-emerald-400 shadow-glow" : "bg-white/30"}`}
                  />
                  <p className="text-[13px] font-semibold text-foreground leading-snug">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.type}</p>
                  <p className="text-[11px] text-muted-foreground/70 font-mono mt-0.5">
                    {p.period}{p.duration ? ` · ${p.duration}` : ""}
                  </p>
                </div>
              ))}
            </div>
          )}

          {group.positions.length === 1 && (
            <div className="mt-1 ml-11">
              <p className="text-[11px] text-muted-foreground/70 font-mono">
                {group.positions[0].period}{group.positions[0].duration ? ` · ${group.positions[0].duration}` : ""}
              </p>
              {group.positions[0].location && (
                <p className="text-[11px] text-muted-foreground/70">{group.positions[0].location}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </motion.div>
  )
}
