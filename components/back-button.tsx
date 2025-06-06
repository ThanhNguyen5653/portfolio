"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"

interface BackButtonProps {
  href?: string
  label?: string
}

export default function BackButton({ href, label = "Back" }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }

    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, 100)
  }

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className="mb-6 border-white/20 hover:border-cyan-400 hover:bg-black/30 text-white hover:text-cyan-400 transition-all duration-300 group cursor-pointer"
    >
      <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
      {label}
    </Button>
  )
}
