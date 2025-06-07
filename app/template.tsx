import type React from "react"
import ScrollToTopHandler from "@/components/scroll-to-top-handler"

export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ScrollToTopHandler />
      {children}
    </>
  )
}
