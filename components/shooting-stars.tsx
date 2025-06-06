"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface Star {
  id: number
  delay: number
  duration: number
  length: number
  startX: number
  startY: number
}

export default function ShootingStars() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Create 3 lines with much more consistent, slower movement
    const initialStars: Star[] = [
      {
        id: 1,
        delay: 0,
        duration: 25000 + Math.random() * 5000, // 25-30 seconds - very consistent slow speed
        length: 40 + Math.random() * 30, // 40-70px line length
        startX: 5 + Math.random() * 15, // 5-20% from left
        startY: -5 + Math.random() * 20, // Start above or at top of screen
      },
      {
        id: 2,
        delay: 4000 + Math.random() * 3000, // 4-7 second delay
        duration: 26000 + Math.random() * 4000, // 26-30 seconds
        length: 35 + Math.random() * 35, // 35-70px line length
        startX: 8 + Math.random() * 12, // 8-20% from left
        startY: -10 + Math.random() * 25, // Start above screen
      },
      {
        id: 3,
        delay: 8000 + Math.random() * 4000, // 8-12 second delay
        duration: 27000 + Math.random() * 3000, // 27-30 seconds
        length: 30 + Math.random() * 40, // 30-70px line length
        startX: 3 + Math.random() * 18, // 3-21% from left
        startY: -8 + Math.random() * 30, // Start above screen
      },
    ]
    setStars(initialStars)
  }, [])

  const resetStar = (starId: number) => {
    setStars((prevStars) =>
      prevStars.map((star) =>
        star.id === starId
          ? {
              ...star,
              delay: Math.random() * 6000, // Random delay before next appearance
              duration: 25000 + Math.random() * 5000, // Consistent 25-30 seconds
              length: 30 + Math.random() * 40,
              startX: 3 + Math.random() * 18,
              startY: -10 + Math.random() * 30,
            }
          : star,
      ),
    )
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute shooting-line"
          style={
            {
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              animationDelay: `${star.delay}ms`,
              animationDuration: `${star.duration}ms`,
              "--line-length": `${star.length}px`,
            } as React.CSSProperties
          }
          onAnimationIteration={() => resetStar(star.id)}
        />
      ))}
    </div>
  )
}
