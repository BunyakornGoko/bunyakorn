"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
]

const skills = {
  "Programming Languages": ["HTML", "CSS", "JavaScript", "Python", "Java", "SQL", "Ruby", "Golang"],
  "Frameworks & Libraries": ["Vue.js", "React", "Tailwind CSS", "DaisyUI", "SpringBoot", "Axios", "Express.js", "Rails", "FastAPI"],
  "Tools & Platforms": ["Node.js", "Git", "GitHub", "MySQL", "PostgreSQL", "MongoDB", "Jira", "Postman", "GitLab CI", "Cursor", "Antigravity"],
  "UX/UI": ["Figma", "Responsive Design", "Design Thinking"],
}

const experiences = [
  {
    title: "Project Fanato (The Financial Assistance)",
    period: "2025 - 2026",
    role: "Senior Project in KMUTT",
    highlights: [
      "Acted as Product Owner, Scrum Master, and Developer all in one.",
      "Developed a 3-tier architecture system using React, Golang, PostgreSQL stack and use Model Context Protocol for send the realtime data about stock price and news to our ai.",
      "Integrated GPT-5-mini to automate Risk Assessment, Financial Health Check, Investment Recommendation, ChatBot and Find Tax Deduction feature",
      "Managed infrastructure using Nginx and configured reverse proxy for public IP access.",
    ],
  },
  {
    title: "Project BMA Training (Bangkok Project)",
    period: "2025",
    role: "Intern at ODT 7 month",
    highlights: [
      "Facilitated team collaboration to enhance system performance.",
      "Designed ER Diagrams for the system.",
      "UX/UI design and Responsive design for laptops, tablet and phones.",
      "Conducted system research and Use Large Scale Scrum in BMA Training project.",
      "Performed E2E testing using Cucumber.",
      "Manage authentication and authorization via use Keycloak then handle about group, permission and role.",
      "Developed and maintained the BMA Training course reservation system using Ruby on Rails.",
    ],
  },
]

const softSkills = [
  "Leadership",
  "Scrum Teamwork",
  "Eager to Understand",
  "Brainstorm for Discussion",
  "Problem Solving",
  "NVC for Feedback and Communication",
]

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.a
              href="#"
              className="text-xl font-bold text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              BunyakornGoko
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-muted-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-background border-b border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-16 px-4 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <p className="text-primary font-mono text-sm mb-2">{"Hello, I'm"}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
              Bunyakorn<br />
              <span className="text-primary">Pornsombatpaibool</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              Full-Stack Developer
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Result-oriented Full-Stack Developer with a strong foundation in Ruby On Rails, Golang, React, and PostgreSQL.
              Experienced in building scalable 3-tier architectures and integrating advanced AI solutions like GPT models and Model Context Protocol.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="#contact">Contact Me</a>
              </Button>
              <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/10">
                <a href="#experience">View Projects</a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FullStack%20Resume%20A4-Xv2R0cqpFlp32gTHu0tdlYPkkB4yJ1.png"
                  alt="Bunyakorn Pornsombatpaibool"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <ChevronDown className="text-muted-foreground" size={32} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 flex items-center gap-4">
              <span className="text-primary font-mono text-xl">01.</span>
              About Me
              <span className="flex-1 h-px bg-border ml-4" />
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Passionate about solving complex technical challenges and delivering high-quality, user-centric web applications.
                  I specialize in Model-View-Controller architectures and have experience integrating advanced AI solutions.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  My approach combines technical expertise with a deep understanding of user needs, ensuring that every project
                  I work on delivers both functionality and an exceptional user experience.
                </p>

                <div className="pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Languages</h3>
                  <div className="flex gap-4">
                    <span className="px-4 py-2 bg-secondary rounded-lg text-sm text-secondary-foreground">
                      English (Intermediate)
                    </span>
                    <span className="px-4 py-2 bg-secondary rounded-lg text-sm text-secondary-foreground">
                      Thai (Native)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Soft Skills</h3>
                <div className="grid grid-cols-2 gap-3">
                  {softSkills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 flex items-center gap-4">
              <span className="text-primary font-mono text-xl">02.</span>
              Experience
              <span className="flex-1 h-px bg-border ml-4" />
            </h2>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                            {exp.title}
                            <ExternalLink size={16} className="text-primary" />
                          </h3>
                          <p className="text-primary font-medium">{exp.role}</p>
                        </div>
                        <span className="text-muted-foreground font-mono text-sm mt-2 md:mt-0">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="space-y-3">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="flex gap-3 text-muted-foreground">
                            <span className="text-primary mt-1.5 flex-shrink-0">▹</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 flex items-center gap-4">
              <span className="text-primary font-mono text-xl">03.</span>
              Skills & Tools
              <span className="flex-1 h-px bg-border ml-4" />
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(skills).map(([category, items], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card border-border h-full">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <span className="w-3 h-3 bg-primary rounded-sm" />
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill, index) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm font-mono hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 flex items-center gap-4">
              <span className="text-primary font-mono text-xl">04.</span>
              Education
              <span className="flex-1 h-px bg-border ml-4" />
            </h2>

            <Card className="bg-card border-border">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl font-bold text-primary">K</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {"King Mongkut's University of Technology Thonburi"}
                    </h3>
                    <p className="text-primary font-medium">School of Information Technology</p>
                    <p className="text-muted-foreground mt-2">
                      Bachelor&apos;s Degree in Computer Science / Information Technology
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <span className="text-primary font-mono text-xl block mb-2">05.</span>
              Get In Touch
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-12">
              {"I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!"}
            </p>

            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              <Card className="bg-card border-border hover:border-primary/50 transition-colors group">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-foreground font-medium">080-068-0597</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:border-primary/50 transition-colors group">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:bunyakorn.porn@gmail.com" className="text-foreground font-medium hover:text-primary transition-colors text-sm">
                    bunyakorn.porn@gmail.com
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:border-primary/50 transition-colors group">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground font-medium text-sm text-center">Bangkok, Thailand</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/BunyakornGoko"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/bunyakorn-pornsombatpaibool-3a4886254/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            Built with Next.js & Tailwind CSS
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            © 2026 Bunyakorn Pornsombatpaibool. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
