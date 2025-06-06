"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ExternalLinkIcon, ShieldIcon, MonitorIcon, WrenchIcon, EyeIcon, RouterIcon } from "lucide-react"

const notes = [
  {
    id: "uber-data-breach",
    title: "Uber Data Breach Report",
    description:
      "A detailed analysis of the 2022 Uber cyberattack, including how the breach occurred, attack vectors used, and possible mitigations.",
    icon: <ShieldIcon className="h-8 w-8 text-cyan-400" />,
    externalLink: "https://www.notion.so/Uber-Data-Breach-Report-3076402b7ff3448da706d1860c511391",
  },
  {
    id: "ubuntu-virtualbox-silicon",
    title: "Deploying Ubuntu through VirtualBox on Silicon Mac",
    description: "Step-by-step guide for setting up Ubuntu virtual machines on Apple Silicon Macs.",
    icon: <MonitorIcon className="h-8 w-8 text-cyan-400" />,
    externalLink:
      "https://www.notion.so/Ubuntu-Installation-on-VirtualBox-Apple-Silicon-Mac-A-Step-by-Step-Guide-1c87e66581b080369aecdb2abf45fb76",
  },
  {
    id: "kali-virtualbox-silicon",
    title: "Deploying Kali Linux through VirtualBox on Silicon Mac",
    description: "Complete walkthrough for installing Kali Linux on Apple Silicon hardware.",
    icon: <MonitorIcon className="h-8 w-8 text-cyan-400" />,
    externalLink:
      "https://www.notion.so/Kali-Linux-Installation-on-VirtualBox-Apple-Silicon-Mac-A-Step-by-Step-Guide-1c87e66581b080ac9772ed7ac59418a9?pvs=25",
  },
  {
    id: "vmware-alternative",
    title: "VMWare: A Simpler Alternative",
    description: "Exploring VMWare as an alternative virtualization solution with easier setup and management.",
    icon: <WrenchIcon className="h-8 w-8 text-cyan-400" />,
    externalLink: "https://www.notion.so/VMWare-1ca7e66581b080cb91dfdefe604aaac7",
  },
  {
    id: "wazuh-siem-malware",
    title: "Wazuh SIEM: Malware Detection and Configuration",
    description: "Comprehensive guide to setting up Wazuh SIEM for effective malware detection and monitoring.",
    icon: <EyeIcon className="h-8 w-8 text-cyan-400" />,
    externalLink: "https://www.notion.so/Wazuh-Beginner-Lab-94e189ba5de2458fb9108fd595459ddb",
  },
  {
    id: "packet-tracer-vlan",
    title: "Packet Tracer: Understanding VLAN and Trunking Configuration",
    description: "Hands-on tutorial for configuring VLANs and trunking using Cisco Packet Tracer.",
    icon: <RouterIcon className="h-8 w-8 text-cyan-400" />,
    externalLink: "https://www.notion.so/VLANs-Trunking-Lab-1e17e66581b0807b9d13fce15a417938",
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

export default function NotesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pt-24 sm:pt-28">
      <AnimatedSection>
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-cyan-400">Notes</h1>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {notes.map((note, index) => (
          <AnimatedSection key={note.id} delay={index * 75}>
            <a href={note.externalLink} target="_blank" rel="noopener noreferrer">
              <Card className="theme-card theme-card-hover shadow-xl h-full group cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">{note.icon}</div>
                    <CardTitle className="text-xl sm:text-2xl text-white font-bold flex-1 flex items-center">
                      {note.title}
                      <ExternalLinkIcon className="ml-2 h-5 w-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200" />
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">{note.description}</p>
                  <div className="flex items-center text-cyan-400 font-medium group-hover:text-cyan-300 transition-colors duration-200">
                    <span className="mr-2">read more</span>
                    <ExternalLinkIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </CardContent>
              </Card>
            </a>
          </AnimatedSection>
        ))}
      </div>
    </div>
  )
}
