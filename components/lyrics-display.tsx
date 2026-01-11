"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { DownloadMenu } from "./download-menu"

interface TimestampedLyric {
  timestamp?: string
  text: string
}

interface LyricsDisplayProps {
  lyrics: string | TimestampedLyric[]
  artist: string
  song: string
  hasTimestamps: boolean
}

export function LyricsDisplay({ lyrics, artist, song, hasTimestamps }: LyricsDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = Array.isArray(lyrics)
      ? lyrics.map((l) => `${l.timestamp ? `[${l.timestamp}] ` : ""}${l.text}`).join("\n")
      : lyrics

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lyricsArray: TimestampedLyric[] = Array.isArray(lyrics) ? lyrics : lyrics.split("\n").map((text) => ({ text }))

  return (
    <div className="bg-card border border-border rounded-lg p-8 md:p-10">
      <div className="flex items-start justify-between mb-8 flex-col sm:flex-row gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{song}</h2>
          <p className="text-lg text-foreground/70">by {artist}</p>
        </div>
        <div className="flex gap-3">
          <DownloadMenu lyrics={lyrics} artist={artist} song={song} isSync={hasTimestamps} />
          <button
            onClick={handleCopy}
            className="p-3 bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-colors"
            title="Copy lyrics"
          >
            {copied ? <Check className="w-5 h-5 text-primary" /> : <Copy className="w-5 h-5 text-primary" />}
          </button>
        </div>
      </div>

      <div className="space-y-4 text-foreground/80">
        {lyricsArray.map((lyric, index) => (
          <div key={index} className="group">
            {lyric.timestamp && hasTimestamps && (
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded text-sm font-mono mr-3 mb-2">
                {lyric.timestamp}
              </span>
            )}
            <p className="leading-relaxed">{lyric.text}</p>
          </div>
        ))}
      </div>

      {!lyricsArray.some((l) => l.text.trim()) && (
        <div className="text-center py-12">
          <p className="text-foreground/50">No lyrics available</p>
        </div>
      )}
    </div>
  )
}
