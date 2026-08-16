"use client"

import { motion } from "framer-motion"

export function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55 }}
      viewport={{ once: false }}
      className="flex items-center gap-4"
    >
      <span className="font-mono text-primary text-lg font-bold">{number}.</span>
      <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
    </motion.div>
  )
}
