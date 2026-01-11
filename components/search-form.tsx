"use client"

import type React from "react"

import { useState } from "react"
import { Search, Loader } from "lucide-react"

interface SearchFormProps {
  onSearch: (artist: string, song: string) => void
  isLoading?: boolean
}

export function SearchForm({ onSearch, isLoading = false }: SearchFormProps) {
  const [artist, setArtist] = useState("")
  const [song, setSong] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (artist.trim() && song.trim()) {
      onSearch(artist.trim(), song.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Artist name..."
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          disabled={isLoading}
          className="flex-1 px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
        />
        <input
          type="text"
          placeholder="Song title..."
          value={song}
          onChange={(e) => setSong(e.target.value)}
          disabled={isLoading}
          className="flex-1 px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <span className="hidden sm:inline">Searching...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
