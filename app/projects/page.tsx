"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLinkIcon, GithubIcon } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const githubProjects = [
  {
    id: "phiser-ai",
    title: "Phiser.ai – AI-Powered Email Phishing Analyzer",
    description:
      "A tool that analyzes email content using AI to detect phishing attempts. Flags suspicious content and assigns a threat score based on intent, urgency, and known patterns. Designed for users to quickly assess the safety of incoming emails.",
    liveLink: "https://phisher-ai.vercel.app/",
    githubLink: "https://github.com/ThanhNguyen5653/phisher.ai",
    image: "/project-screenshots/phiser-ai.jpg",
  },
  {
    id: "curve-ai",
    title: "Curve.ai – Visual Learning via AI-Generated Mindmaps",
    description:
      "Co-built an AI-powered platform that turns study material into interactive mindmaps. Helps learners visualize complex topics for better retention and comprehension. Won 1st place @ Microsoft Reactor Hackathon.",
    liveLink: "https://curveai.vercel.app/",
    githubLink: "https://github.com/datduyng/kteam-hackathon",
    image: "/project-screenshots/curve-ai-card.jpg",
  },
  {
    id: "investtrail",
    title: "InvestTrail – Simulated Stock Trading with AI Insights",
    description:
      "Created a mock stock trading platform with real-time simulations and AI-driven investment suggestions. Users can practice trades and receive AI-generated risk/reward feedback. Built to help beginners understand market dynamics without real money.",
    githubLink: "https://github.com/ThanhNguyen5653/Invest_Trail",
    image: "/project-screenshots/investTrail.jpg",
  },
]

const ctfProjects = [
  {
    id: "linux-ctf",
    title: "Linux System CTF – File System Navigation & Network Scanning",
    description:
      "Used advanced command-line tools and file manipulation techniques to explore directories and system configs. Employed Nmap for network reconnaissance to detect hidden services and vulnerabilities. Strengthened knowledge in Linux environments, cybersecurity tools, and system analysis.",
    externalLink: "https://www.notion.so/Linux-System-CTF-Capture-the-Flag-0d64a759ff4e4351a6e2bc1a85010cbc",
    image: "/project-screenshots/linuxCTF.jpg",
  },
  {
    id: "windows-forensic-ctf",
    title: "Windows Endpoint Forensic CTF – Log Analysis & Phishing Investigation",
    description:
      "Conducted a forensic investigation of a simulated phishing attack using KAPE-collected log files. Analyzed artifacts with Sysinternals Suite and Eric Zimmerman's tools to trace suspicious behavior. Identified indicators of compromise and reconstructed the attack timeline in a structured report.",
    externalLink: "https://www.notion.so/Windows-Endpoint-Forensic-CTF-19578bd3720b486cadb1a643816a9d4b",
    image: "/project-screenshots/wef.jpg",
  },
]

function AnimatedSection({ children, className = "", delay = 0 }) {
  const { ref, isVisible } = useScrollAnimation(0.1, "0px 0px -50px 0px")

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

const handleProjectClick = () => {
  // Scroll to top when navigating to project detail
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, 100)
}

export default function ProjectsPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pt-24 sm:pt-28">
        <AnimatedSection>
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-cyan-400">My Projects</h1>
        </AnimatedSection>

        <section id="github-projects" className="mb-16 sm:mb-24">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white text-center">GitHub Projects</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {githubProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 75}>
                <Card className="theme-card shadow-xl theme-card-hover transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col cursor-pointer h-full">
                  <Link href={`/projects/${project.id}`} onClick={handleProjectClick}>
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={`${project.title} preview`}
                      className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
                      onError={(e) => {
                        e.currentTarget.src = "/icons/placeholder.svg"
                      }}
                    />
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl text-cyan-300">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-gray-300 text-md sm:text-lg mb-4">
                        {project.description}
                      </CardDescription>
                    </CardContent>
                  </Link>
                  <div className="p-6 pt-0">
                    <div className="flex gap-3">
                      {project.liveLink && (
                        <Button
                          asChild
                          variant="outline"
                          className="flex-1 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900 transition-colors duration-200 text-lg cursor-pointer"
                        >
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            View Live <ExternalLinkIcon className="ml-2 h-5 w-5" />
                          </a>
                        </Button>
                      )}
                      {project.githubLink && (
                        <Button
                          asChild
                          variant="outline"
                          className={`${project.liveLink ? "flex-1" : "w-full"} border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-slate-900 transition-colors duration-200 text-lg cursor-pointer`}
                        >
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            GitHub <GithubIcon className="ml-2 h-5 w-5" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </section>

        <section id="ctf-projects">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white text-center">
              CTF (Capture the Flag) Projects
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ctfProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 75}>
                <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
                  <Card className="theme-card shadow-xl theme-card-hover transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col cursor-pointer h-full">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={`${project.title} preview`}
                      className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
                      onError={(e) => {
                        e.currentTarget.src = "/icons/placeholder.svg"
                      }}
                    />
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl text-cyan-300 flex items-center">
                        {project.title}
                        <ExternalLinkIcon className="ml-2 h-5 w-5" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-gray-300 text-md sm:text-lg">
                        {project.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
