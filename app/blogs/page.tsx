"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

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

export default function BlogsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pt-24 sm:pt-28 min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center">
      <AnimatedSection>
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8 text-cyan-400">Blog</h1>
        <p className="text-xl sm:text-2xl text-slate-300 text-center">
          Exciting blog posts are on the way. Check back later!
        </p>
      </AnimatedSection>
    </div>
  )
}
