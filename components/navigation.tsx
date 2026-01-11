"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useTheme } from "@/lib/theme-provider"
import { Moon, Sun } from "lucide-react"

export function Navigation() {
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const [isOpen, setIsOpen] = useState(false)

  // Don't render until mounted on client to avoid SSR mismatch
  if (!mounted) {
    return (
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            Lyrica
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/lyrics" className="text-foreground/80 hover:text-foreground transition-colors text-sm">
              Explore
            </Link>
            <Link href="/about" className="text-foreground/80 hover:text-foreground transition-colors text-sm">
              About
            </Link>
            <div className="p-2 rounded-lg" />
            <Link
              href="/lyrics"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              Search Lyrics
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Lyrica
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/lyrics" className="text-foreground/80 hover:text-foreground transition-colors text-sm">
            Explore
          </Link>
          <Link href="/about" className="text-foreground/80 hover:text-foreground transition-colors text-sm">
            About
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-card rounded-lg transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link
            href="/lyrics"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Search Lyrics
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-card rounded-lg transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="w-6 h-6 flex flex-col justify-center gap-1.5">
            <span className="h-0.5 w-full bg-foreground rounded" />
            <span className="h-0.5 w-full bg-foreground rounded" />
            <span className="h-0.5 w-full bg-foreground rounded" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link
              href="/lyrics"
              className="text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/about"
              className="text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/lyrics"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-center"
              onClick={() => setIsOpen(false)}
            >
              Search Lyrics
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
