"use client"

import { ThemeProvider } from "@/lib/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import type React from "react"

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Navigation />
      {children}
      <Footer />
    </ThemeProvider>
  )
}
