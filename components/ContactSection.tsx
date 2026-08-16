"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Facebook, Mail, Phone, MapPin } from "lucide-react"
import { TiltCard } from "@/components/TiltCard"

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

export function ContactSection() {
  return (
    <section id="contact" className="py-28 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
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
  )
}
