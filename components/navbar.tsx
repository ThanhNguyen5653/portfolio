"use client"

import Link from "next/link"
import { MenuIcon, XIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Certifications", href: "/certifications" },
  { name: "Notes", href: "/notes" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavClick = () => {
    setIsOpen(false)
    // Small delay to ensure navigation happens before scroll
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, 100)
  }

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between">
          {/* Profile Circle with Initials */}
          <Link href="/" className="flex-shrink-0 cursor-pointer" onClick={handleNavClick}>
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center text-black font-bold text-lg hover:from-cyan-300 hover:to-cyan-500 transition-all duration-300 shadow-lg cursor-pointer">
              DN
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className="text-white hover:text-cyan-400 transition-colors duration-300 text-lg font-medium relative group cursor-pointer"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-cyan-400 hover:bg-white/10 rounded-full w-10 h-10 p-0 cursor-pointer"
            >
              {isOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className="block px-4 py-3 text-white hover:text-cyan-400 hover:bg-white/10 rounded-xl transition-colors duration-300 text-lg font-medium cursor-pointer"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
