"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SearchForm } from "@/components/search-form"
import { LyricsDisplay } from "@/components/lyrics-display"
import { TranslationModal } from "@/components/translation-modal"
import { TransliterationModal } from "@/components/transliteration-modal"
import { Clock, FileText } from "lucide-react"

interface TimestampedLyric {
  timestamp?: string
  text: string
}

export default function LyricsPage() {
  const [lyrics, setLyrics] = useState<string | TimestampedLyric[] | null>(null)
  const [artist, setArtist] = useState("")
  const [song, setSong] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasTimestamps, setHasTimestamps] = useState(false)
  const [error, setError] = useState("")
  const [showTranslationModal, setShowTranslationModal] = useState(false)
  const [showTransliterationModal, setShowTransliterationModal] = useState(false)
  const [showSynced, setShowSynced] = useState(true)

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

      if (data && (data.timed_lyrics || data.lyrics)) {
        if (data.timed_lyrics && Array.isArray(data.timed_lyrics) && data.timed_lyrics.length > 0) {
          setLyrics(data.timed_lyrics)
          setHasTimestamps(true)
          setShowSynced(true)
        } else if (data.lyrics) {
          setLyrics(data.lyrics)
          setHasTimestamps(false)
          setShowSynced(false)
        } else {
          throw new Error("No lyrics data found in response")
        }

        setArtist(artistName)
        setSong(songName)
      } else if (data.error) {
        throw new Error(typeof data.error === "string" ? data.error : data.error.message || "Unknown error")
      } else {
        throw new Error("No lyrics found. Try another song or artist.")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch lyrics. Please try again.")
      setLyrics(null)
    } finally {
      setIsLoading(false)
    }
  }

  const getDisplayLyrics = () => {
    if (!lyrics) return null

    if (showSynced && Array.isArray(lyrics)) {
      return lyrics
    }

    if (!showSynced && Array.isArray(lyrics)) {
      // Convert timed lyrics to plain text
      return lyrics.map((l: any) => (typeof l === "string" ? l : l.text)).join("\n")
    }

    return lyrics
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Search Lyrics</h1>
            <p className="text-xl text-foreground/70">
              Find your favorite songs with synchronized timestamps and lyrics.
            </p>
          </div>

          <SearchForm onSearch={handleSearch} isLoading={isLoading} />

          {error && (
            <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
              {error}
            </div>
          )}

          {lyrics && (
            <div className="mt-12">
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Lyrics Format</h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowSynced(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      showSynced
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-foreground/70 hover:bg-card/80"
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>Synced</span>
                  </button>
                  <button
                    onClick={() => setShowSynced(false)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      !showSynced
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-foreground/70 hover:bg-card/80"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Unsynced</span>
                  </button>
                </div>
              </div>

              <LyricsDisplay
                lyrics={getDisplayLyrics()}
                artist={artist}
                song={song}
                hasTimestamps={showSynced && Array.isArray(lyrics)}
              />

              <div className="mt-8 grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowTranslationModal(true)}
                  className="p-4 bg-card border border-border rounded-lg hover:bg-card/80 transition-colors text-left"
                >
                  <p className="font-semibold mb-1">Translate Lyrics</p>
                  <p className="text-sm text-foreground/60">Convert to another language</p>
                </button>
                <button
                  onClick={() => setShowTransliterationModal(true)}
                  className="p-4 bg-card border border-border rounded-lg hover:bg-card/80 transition-colors text-left"
                >
                  <p className="font-semibold mb-1">Transliterate Lyrics</p>
                  <p className="text-sm text-foreground/60">Convert script to Latin</p>
                </button>
              </div>
            </div>
          )}

          {!lyrics && !error && (
            <div className="mt-12 text-center py-20">
              {/* Placeholder for Music component */}
              <svg className="w-16 h-16 text-foreground/20 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v9.28c-.47-.46-1.12-.75-1.84-.75-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V7h4V3h-5z" />
              </svg>
              <h3 className="text-2xl font-semibold mb-2">Search for a song</h3>
              <p className="text-foreground/60">Enter an artist name and song title to get started</p>
            </div>
          )}
        </div>
      </main>

      <TranslationModal
        isOpen={showTranslationModal}
        onClose={() => setShowTranslationModal(false)}
        artist={artist}
        song={song}
      />
      <TransliterationModal
        isOpen={showTransliterationModal}
        onClose={() => setShowTransliterationModal(false)}
        artist={artist}
        song={song}
      />

      <Footer />
    </div>
  )
}
