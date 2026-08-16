"use client"

import { motion } from "framer-motion"
import { Code2, Server, Wrench, Palette } from "lucide-react"
import { SectionHeading } from "@/components/SectionHeading"
import { TiltCard } from "@/components/TiltCard"

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

export function SkillsSection() {
  return (
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
              viewport={{ once: false }}
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
                        viewport={{ once: false }}
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
  )
}
