"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import BackButton from "@/components/back-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ExternalLinkIcon, GithubIcon } from "lucide-react"

const projectsData = {
  "phiser-ai": {
    title: "Phiser.ai – AI-Powered Email Phishing Analyzer",
    description:
      "*NOTE: IF INTERNAL SERVER ERROR; REDUBMIT IN 30 SECONDS* A tool that analyzes email content using AI to detect phishing attempts. Flags suspicious content and assigns a threat score based on intent, urgency, and known patterns. Designed for users to quickly assess the safety of incoming emails.",
    fullDescription:
      "Phiser.ai is an advanced email security tool that leverages artificial intelligence to identify potential phishing attempts in real-time. The system analyzes various aspects of incoming emails including sender information, content patterns, urgency indicators, and linguistic markers commonly associated with phishing attacks. By assigning a comprehensive threat score based on multiple factors, it helps users make informed decisions about email safety without requiring technical expertise in cybersecurity.",
    technologies: ["React", "Next.js", "Flask", "GPT4o1", "Machine Learning", "scikit-learn"],
    features: [
      "Real-time email content analysis",
      "Threat scoring system based on multiple factors",
      "Visual indicators for suspicious elements",
      "User-friendly interface with clear security recommendations",
      "Integration capabilities with popular email clients",
    ],
    image: "/project-screenshots/phiser-ai-main.jpg",
    liveLink: "https://phisher-ai.vercel.app/",
    githubLink: "https://github.com/ThanhNguyen5653/phisher.ai",
  },
  "curve-ai": {
    title: "Curve.ai – Visual Learning via AI-Generated Mindmaps",
    description:
      "Co-built an AI-powered platform that turns study material into interactive mindmaps. Helps learners visualize complex topics for better retention and comprehension. Won 1st place @ Microsoft Reactor Hackathon.",
    fullDescription:
      "Curve.ai transforms how students learn by converting complex study materials into intuitive, interactive mind maps. The platform uses advanced natural language processing to analyze educational content and automatically generate visual knowledge structures that highlight key concepts and their relationships. This approach significantly improves information retention and comprehension by leveraging visual learning pathways in the brain.",
    technologies: ["React", "D3.js", "GPT-4", "Node.js", "Convex", "Clerk"],
    features: [
      "Automatic mind map generation from text",
      "Interactive node exploration",
      "Customizable visual themes",
      "Collaboration features for group study",
      "Export options for study materials",
    ],
    image: "/project-screenshots/curve-ai-main.jpg",
    liveLink: "https://curveai.vercel.app/",
    githubLink: "https://github.com/datduyng/kteam-hackathon",
  },
  investtrail: {
    title: "InvestTrail – Simulated Stock Trading with AI Insights",
    description:
      "Created a mock stock trading platform with real-time simulations and AI-driven investment suggestions. Users can practice trades and receive AI-generated risk/reward feedback. Built to help beginners understand market dynamics without real money.",
    fullDescription:
      "InvestTrail provides a comprehensive stock trading simulation environment where users can practice investment strategies without financial risk. The platform incorporates real market data and AI-powered analysis to provide realistic trading experiences and educational insights about market behavior and investment principles.",
    technologies: ["React", "Node.js", "SQLite", "MongoDB", "Flask", "Chart.js"],
    features: [
      "Real-time market data simulation",
      "AI-powered investment recommendations",
      "Portfolio tracking and analytics",
      "Risk assessment tools",
      "Educational resources and tutorials",
    ],
    image: "/project-screenshots/investTrail.jpg",
    githubLink: "https://github.com/ThanhNguyen5653/Invest_Trail",
  },
}

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

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState(null)
  const projectId = params.id

  useEffect(() => {
    // Check if this is a CTF project that should redirect
    if (projectId === "linux-ctf") {
      window.location.href = "https://www.notion.so/Linux-System-CTF-Capture-the-Flag-0d64a759ff4e4351a6e2bc1a85010cbc"
      return
    }
    if (projectId === "windows-forensic-ctf") {
      window.location.href = "https://www.notion.so/Windows-Endpoint-Forensic-CTF-19578bd3720b486cadb1a643816a9d4b"
      return
    }

    // In a real app, you would fetch this data from an API
    setProject(projectsData[projectId] || null)
  }, [projectId])

  if (!project) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pt-24 sm:pt-28">
        <BackButton href="/projects" label="Back to Projects" />
        <AnimatedSection>
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-white">Project not found</h1>
            <p className="text-gray-400 mt-4">The project you're looking for doesn't exist or has been removed.</p>
          </div>
        </AnimatedSection>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pt-24 sm:pt-28">
      <BackButton href="/projects" label="Back to Projects" />

      <AnimatedSection>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">{project.title}</h1>
      </AnimatedSection>

      <AnimatedSection delay={50}>
        <div className="mb-10">
          <img
            src={project.image || "/placeholder.svg"}
            alt={`${project.title} preview`}
            className="w-full h-auto rounded-xl border border-white/20 shadow-xl"
            onError={(e) => {
              e.currentTarget.src = "/icons/placeholder.svg"
            }}
          />
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <AnimatedSection delay={100} className="lg:col-span-2">
          <Card className="theme-card shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">{project.fullDescription}</p>
              <div className="flex gap-4">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors duration-200 cursor-pointer"
                  >
                    View Live Project
                    <ExternalLinkIcon className="h-5 w-5 ml-2" />
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors duration-200 cursor-pointer"
                  >
                    View on GitHub
                    <GithubIcon className="h-5 w-5 ml-2" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <Card className="theme-card shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-white">Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {project.technologies.map((tech, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <span className="h-2 w-2 bg-cyan-400 rounded-full mr-3"></span>
                    {tech}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="theme-card shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-white">Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <span className="h-5 w-5 text-cyan-400 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  )
}
