"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/SectionHeading"
import { WorkHistoryCard, workHistory } from "@/components/WorkHistoryCard"

const softSkills = [
  "Leadership",
  "Scrum Teamwork",
  "Eager to Understand",
  "Brainstorm for Discussion",
  "Problem Solving",
  "NVC for Feedback",
]

export function AboutSection() {
  return (
    <section id="about" className="py-28 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="01" title="About Me" />

        <div className="mt-12 grid md:grid-cols-2 gap-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
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
            <WorkHistoryCard history={workHistory} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: false }}
          >
            <p className="text-[0.7rem] text-muted-foreground font-mono uppercase tracking-widest mb-4">Soft Skills</p>
            <div className="grid grid-cols-2 gap-2.5">
              {softSkills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  viewport={{ once: false }}
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 group-hover:shadow-glow transition-shadow" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{skill}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-white/5">
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
        </div>
      </div>
    </section>
  )
}
