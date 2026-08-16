"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { SectionHeading } from "@/components/SectionHeading"
import { TiltCard } from "@/components/TiltCard"

export function EducationSection() {
  return (
    <section id="education" className="py-28 px-4 relative z-10 bg-white/[0.015]">
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="04" title="Education" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
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
  )
}
