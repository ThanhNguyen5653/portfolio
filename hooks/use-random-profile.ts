"use client"

import { useState, useEffect } from "react"

const profileImages = ["/images/profile-1.jpeg", "/images/profile-2.jpeg"]

export function useRandomProfile() {
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Preload all images
    const preloadImages = async () => {
      const imagePromises = profileImages.map((src) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.onload = () => resolve()
          img.onerror = () => reject()
          img.src = src
        })
      })

      try {
        await Promise.all(imagePromises)

        // After all images are preloaded, randomly select one
        const randomIndex = Math.floor(Math.random() * profileImages.length)
        setSelectedImage(profileImages[randomIndex])
        setIsLoaded(true)
      } catch (error) {
        console.error("Error preloading profile images:", error)
        // Fallback to first image if preloading fails
        setSelectedImage(profileImages[0])
        setIsLoaded(true)
      }
    }

    preloadImages()
  }, [])

  return { selectedImage, isLoaded }
}
