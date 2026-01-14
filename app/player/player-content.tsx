"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SearchForm } from "@/components/search-form"
import { LyricPlayer } from "@/components/lyric-player"

interface TimestampedLyric {
  timestamp?: string
  text: string
}

export default function PlayerPageContent() {
  const [lyrics, setLyrics] = useState<string | TimestampedLyric[] | null>(null)
  const [artist, setArtist] = useState("")
  const [song, setSong] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasTimestamps, setHasTimestamps] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (artistName: string, songName: string) => {
    setIsLoading(true)
    setError("")
    setLyrics(null)

    try {
      const response = await fetch(
        `/api/lyrics?artist=${encodeURIComponent(artistName)}&song=${encodeURIComponent(songName)}&timestamps=true`,
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Lyrics not found. Try another song or artist.")
      }

      const data = await response.json()

      if (data.lyrics) {
        setLyrics(data.lyrics)
        setArtist(artistName)
        setSong(songName)
        setHasTimestamps(true)
      } else {
        setError("No lyrics found for this song.")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch lyrics. Please try again.")
      setLyrics(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = (format: string) => {
    if (!lyrics) return

    let content = ""
    let filename = `${artist}-${song}`

    if (Array.isArray(lyrics)) {
      if (format === "lrc") {
        content = lyrics.map((l) => `[${l.timestamp || "00:00"}] ${l.text}`).join("\n")
        filename += ".lrc"
      } else if (format === "txt") {
        content = lyrics.map((l) => l.text).join("\n")
        filename += ".txt"
      } else if (format === "json") {
        content = JSON.stringify(lyrics, null, 2)
        filename += ".json"
      }
    } else {
      if (format === "txt") {
        content = lyrics
        filename += ".txt"
      } else if (format === "json") {
        content = JSON.stringify({ lyrics }, null, 2)
        filename += ".json"
      }
    }

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  if (lyrics) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-1">
          <LyricPlayer
            lyrics={lyrics}
            artist={artist}
            song={song}
            hasTimestamps={hasTimestamps}
            onDownload={handleDownload}
          />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Lyric Player
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Experience synchronized lyrics with our premium lyric player. Search, play, and dive into your favorite
              songs.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            {error && (
              <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
                {error}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
