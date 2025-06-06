"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const certifications = [
  {
    name: "CompTIA Security+",
    icon: <img src="/icons/comptia.svg" alt="CompTIA Security+" className="h-8 w-8" />,
    description: "Industry-standard cybersecurity certification covering security concepts and practices.",
  },
  {
    name: "Microsoft Azure Fundamentals (AZ-900)",
    icon: <img src="/icons/microsoft.svg" alt="Microsoft Azure" className="h-8 w-8" />,
    description: "Foundational knowledge of cloud services and Microsoft Azure platform.",
  },
  {
    name: "Microsoft Azure AI Fundamentals (AI-900)",
    icon: <img src="/icons/microsoft.svg" alt="Microsoft Azure AI" className="h-8 w-8" />,
    description: "Introduction to artificial intelligence and machine learning on Azure.",
  },
  {
    name: "Google IT Support Certificate",
    icon: <img src="/icons/google.svg" alt="Google" className="h-8 w-8" />,
    description: "Comprehensive IT support skills including troubleshooting and customer service.",
  },
  {
    name: "Certificate of Cybersecurity Training from Masterschool",
    icon: <img src="/icons/masterschool.svg" alt="Masterschool" className="h-8 w-8" />,
    description: "Intensive cybersecurity training covering modern security practices and tools.",
  },
  {
    name: "CS50: Introduction to Computer Science",
    icon: <img src="/icons/harvard.svg" alt="Harvard University" className="h-8 w-8" />,
    description: "Harvard's introduction to computer science and programming fundamentals.",
  },
  {
    name: "Cisco: Linux Unhatched",
    icon: <img src="/icons/Cisco-dark.svg" alt="Cisco" className="h-8 w-10" />,
    description: "Foundational knowledge of the Linux operating system and command line.",
  },
  {
    name: "TryHackMe: Pre Security",
    icon: <img src="/icons/thm.svg" alt="TryHackMe" className="h-8 w-10" />,
    description:
      "Foundational cybersecurity concepts through hands-on labs, covering topics like networking, Linux, and basic threat analysis.",
  },
]

function AnimatedSection({ children, className = "", delay = 0 }) {
  const { ref, isVisible = false } = useScrollAnimation(0.1, "0px 0px -50px 0px")

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

export default function CertificationsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pt-24 sm:pt-28">
      <AnimatedSection>
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-cyan-400">Certifications</h1>
        <p className="text-xl sm:text-2xl text-center text-gray-300 mb-12">
          Actively expanding my skill set – more to come!
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <AnimatedSection key={cert.name} delay={index * 75}>
            <Card className="theme-card theme-card-hover shadow-xl h-full cursor-pointer">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-cyan-500/20 rounded-full flex items-center justify-center">{cert.icon}</div>
                </div>
                <CardTitle className="text-lg sm:text-xl text-white font-bold leading-tight">{cert.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center text-base leading-relaxed">{cert.description}</p>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </div>
  )
}
