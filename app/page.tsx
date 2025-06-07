"use client"

import type React from "react"
import Link from "next/link"
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  NewspaperIcon,
  WrenchIcon,
  DumbbellIcon,
  MapPinIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  BrainIcon,
  CalendarIcon,
  DatabaseIcon,
  TerminalIcon,
  FolderIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ContactForm from "@/components/contact-form"
import ShootingStars from "@/components/shooting-stars"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import PortfolioChat from "@/components/portfolio-chat" // Make sure this import is correct

const skillCategories = [
  {
    title: "Programming Languages & Tech Stacks",
    skills: [
      {
        name: "React",
        icon: <img src="/icons/react-dark.svg" alt="React" className="h-10 w-10 mb-2" />,
      },
      {
        name: "Next.js",
        icon: <img src="/icons/nextjs.svg" alt="Next.js" className="h-10 w-10 mb-2" />,
      },
      {
        name: "Flask",
        icon: <img src="/icons/flask-dark.svg" alt="Flask" className="h-10 w-10 mb-2" />,
      },
      {
        name: "PostgreSQL",
        icon: <img src="/icons/postgresql.svg" alt="PostgreSQL" className="h-10 w-10 mb-2" />,
      },
      {
        name: "Python",
        icon: <img src="/icons/python.svg" alt="Python" className="h-10 w-10 mb-2" />,
      },
      {
        name: "C",
        icon: <img src="/icons/c.svg" alt="C" className="h-10 w-10 mb-2" />,
      },
      {
        name: "SQLite",
        icon: <DatabaseIcon className="h-10 w-10 mb-2" />,
      },
      {
        name: "TypeScript",
        icon: <img src="/icons/typescript.svg" alt="TypeScript" className="h-10 w-10 mb-2" />,
      },
    ],
  },
  {
    title: "Tools & Software",
    skills: [
      {
        name: "VSCode",
        icon: <img src="/icons/vscode.svg" alt="Visual Studio Code" className="h-10 w-10 mb-2" />,
      },
      { name: "Active Directory", icon: <FolderIcon className="h-10 w-10 mb-2" /> },
      {
        name: "Azure Portal",
        icon: <img src="/icons/azure.svg" alt="Microsoft Azure" className="h-10 w-10 mb-2" />,
      },
      { name: "GitHub", icon: <GithubIcon className="h-10 w-10 mb-2" /> },
    ],
  },
  {
    title: "Operating Systems",
    skills: [
      {
        name: "Windows 10/11",
        icon: <img src="/icons/windows.svg" alt="Windows" className="h-10 w-10 mb-2" />,
      },
      { name: "Linux", icon: <TerminalIcon className="h-10 w-10 mb-2" /> },
      {
        name: "macOS",
        icon: <img src="/icons/apple-dark.svg" alt="Apple macOS" className="h-10 w-10 mb-2" />,
      },
    ],
  },
]

const education = [
  {
    period: "2025 - 2026",
    institution: "Year Up United",
    description: "An intensive IT training program",
    icon: <BriefcaseIcon className="h-6 w-6" />,
  },
  {
    period: "2023 - 2024",
    institution: "Masterschool Cybersecurity Training",
    description: "An immersive training program in cybersecurity fundamentals",
    icon: <BriefcaseIcon className="h-6 w-6" />,
  },
  {
    period: "2019 - 2022",
    institution: "Camden County College",
    description: "Majored in Electrical Engineering",
    icon: <GraduationCapIcon className="h-6 w-6" />,
  },
]

const hobbies = [
  {
    name: "LeetCode enthusiast",
    description: "Solved 150+ algorithm problems and counting.",
    icon: <BrainIcon className="h-8 w-8 text-cyan-400" />,
  },
  {
    name: "Tech chaser",
    description: "Stay up to date with the latest in IT and cybersecurity news.",
    icon: <NewspaperIcon className="h-8 w-8 text-cyan-400" />,
  },
  {
    name: "Builder at heart",
    description: "Tinker with hardware and bring ideas to life by designing and building projects on GitHub.",
    icon: <WrenchIcon className="h-8 w-8 text-cyan-400" />,
  },
  {
    name: "Fitness-focused",
    description: "Hit the gym regularly to stay disciplined, energized, and balanced.",
    icon: <DumbbellIcon className="h-8 w-8 text-cyan-400" />,
  },
]

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1, "0px 0px -50px 0px") // Trigger animation earlier

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="relative">
      {/* Shooting Stars Background */}
      <ShootingStars />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="min-h-[calc(80vh-4rem)] flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-8 md:gap-12 mb-10 md:mb-20">
          {" "}
          {/* Reduced bottom margin */}
          <AnimatedSection className="md:w-1/3 flex justify-center">
            <div className="rounded-full border-4 border-cyan-500 shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden w-[250px] h-[250px] flex items-center justify-center bg-gray-800">
              <img
                src="/images/profile-2.jpeg"
                alt="Duy Nguyen - Profile Photo"
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>
          <AnimatedSection className="md:w-2/3" delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-white">
              Duy Nguyen <span className="text-gray-400 text-3xl sm:text-4xl">(aka Michael Nguyen)</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-4 flex items-center justify-center md:justify-start">
              <MapPinIcon className="h-6 w-6 mr-2 text-cyan-400" /> Tech lover from Seattle, WA.
            </p>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-2xl mx-auto md:mx-0">
              Apart from that, I&apos;m an IT/Cybersecurity enthusiast | Always interested in the Cloud & AI | ☁️ + 🤖 
            </p>
            <div className="flex justify-center md:justify-start space-x-6 mb-6">
              <Link
                href="https://github.com/ThanhNguyen5653"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="transform hover:scale-110 transition-transform duration-200 cursor-pointer"
              >
                <GithubIcon className="h-10 w-10 text-white hover:text-cyan-400 transition-colors duration-200" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/duynguyen1020/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="transform hover:scale-110 transition-transform duration-200 cursor-pointer"
              >
                <LinkedinIcon className="h-10 w-10 text-white hover:text-cyan-400 transition-colors duration-200" />
              </Link>
              <button
                onClick={() => {
                  const contactSection = document.getElementById("contact")
                  contactSection?.scrollIntoView({ behavior: "smooth" })
                }}
                aria-label="Scroll to Contact Form"
                className="transform hover:scale-110 transition-all duration-200 cursor-pointer"
              >
                <MailIcon className="h-10 w-10 text-white hover:text-cyan-400 transition-colors duration-200" />
              </button>
            </div>
          </AnimatedSection>
        </section>

        {/* Portfolio Chat Section */}
        <AnimatedSection delay={150}>
          {" "}
          {/* Adjusted delay slightly */}
          <PortfolioChat />
        </AnimatedSection>

        {/* Skills Section */}
        <AnimatedSection delay={200}>
          <section id="skills" className="mb-20 md:mb-32">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-cyan-400">Skills</h2>
            {skillCategories.map((category, categoryIndex) => (
              <AnimatedSection key={category.title} delay={categoryIndex * 75} className="mb-12">
                {" "}
                {/* Reduced delay increment */}
                <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white text-center">{category.title}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                  {category.skills.map((skill, index) => (
                    <AnimatedSection key={skill.name} delay={index * 40}>
                      {" "}
                      {/* Reduced delay increment */}
                      <div className="theme-card theme-card-hover p-6 rounded-xl shadow-lg flex flex-col items-center text-center cursor-pointer">
                        <div className="text-cyan-400">{skill.icon}</div>
                        <p className="font-semibold text-white text-lg">{skill.name}</p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </section>
        </AnimatedSection>

        {/* Education Section */}
        <AnimatedSection delay={250}>
          <section id="education" className="mb-20 md:mb-32">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-cyan-400">Education</h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Main timeline line */}
                <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-cyan-400 to-cyan-600"></div>

                {education.map((edu, index) => (
                  <AnimatedSection key={edu.institution} delay={index * 75}>
                    <div className={`relative flex items-center mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                      {/* Timeline dot */}
                      <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-black shadow-lg shadow-cyan-500/50 z-10 timeline-dot"></div>

                      {/* Content card */}
                      <div
                        className={`w-full md:w-5/12 ml-20 md:ml-0 ${index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}
                      >
                        <Card className="theme-card theme-card-hover shadow-xl">
                          <CardHeader className="pb-3">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">{edu.icon}</div>
                            </div>
                            <CardTitle className="text-xl sm:text-2xl text-white font-bold">
                              {edu.institution}
                            </CardTitle>
                            <div className="flex items-center text-cyan-400 font-medium">
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              {edu.period}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-300 text-lg leading-relaxed">{edu.description}</p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Timeline connector line for mobile */}
                      <div className="absolute left-8 top-4 w-12 h-0.5 bg-cyan-500 md:hidden"></div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Hobbies Section */}
        <AnimatedSection delay={300}>
          <section id="hobbies" className="mb-20 md:mb-32">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-cyan-400">Hobbies</h2>
            <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto text-lg sm:text-xl">
              Outside of work, I enjoy spending time on hobbies that keep me curious, creative, and balanced—here are a
              few that inspire me the most.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {hobbies.map((hobby, index) => (
                <AnimatedSection key={hobby.name} delay={index * 50}>
                  <Card className="theme-card theme-card-hover shadow-lg h-full">
                    <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                      {hobby.icon}
                      <CardTitle className="text-xl sm:text-2xl text-cyan-300">{hobby.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-md sm:text-lg">{hobby.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection delay={350}>
          <section id="contact" className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-cyan-400">Let&apos;s Stay Connected</h2>
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  )
}
