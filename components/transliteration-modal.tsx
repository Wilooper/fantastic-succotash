"use client"

import { useState } from "react"
import { X, Copy, Check, AlertCircle, Clock } from "lucide-react"
import { downloadFile } from "@/lib/download-utils"

interface TransliterationModalProps {
  isOpen: boolean
  onClose: () => void
  artist: string
  song: string
}

const transliterationSystems = [
  { code: "latin", name: "Latin (Most Common)" },
  { code: "roman", name: "Roman" },
  { code: "iso", name: "ISO Standard" },
]

const TRANSLITERATION_TIMEOUT = 180000 // 3 minutes

export function TransliterationModal({ isOpen, onClose, artist, song }: TransliterationModalProps) {
  const [selectedSystem, setSelectedSystem] = useState("latin")
  const [transliteratedLyrics, setTransliteratedLyrics] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [timeoutWarning, setTimeoutWarning] = useState(false)

  const handleTransliterate = async () => {
    setIsLoading(true)
    setError("")
    setTimeoutWarning(false)
    setTransliteratedLyrics("")

    const timeoutId = setTimeout(() => {
      setTimeoutWarning(true)
    }, TRANSLITERATION_TIMEOUT)

    try {
      const response = await fetch(
        `/api/transliterate?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}&system=${selectedSystem}`,
        { signal: AbortSignal.timeout(TRANSLITERATION_TIMEOUT + 10000) },
      )

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Transliteration failed. Please try again.")
      }

      const data = await response.json()

      if (!data.lyrics && !data.transliteration) {
        throw new Error("No transliteration data received. The song may not be supported.")
      }

      setTransliteratedLyrics(data.lyrics || data.transliteration || "")
    } catch (err) {
      clearTimeout(timeoutId)

      if (err instanceof Error) {
        if (err.name === "AbortError") {
          setError(
            "Transliteration took too long (3+ minutes). The service may be experiencing delays. Please try again later.",
          )
        } else {
          setError(err.message)
        }
      } else {
        setError("Failed to transliterate lyrics. Please try again.")
      }
      setTransliteratedLyrics("")
    } finally {
      setIsLoading(false)
      setTimeoutWarning(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(transliteratedLyrics)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadTransliteration = (format: "txt" | "json") => {
    let content = ""
    const filename = `${artist}-${song}-transliterated`.replace(/[^a-z0-9]/gi, "-").toLowerCase()

    if (format === "txt") {
      content = `${song} (Transliterated to ${transliterationSystems.find((s) => s.code === selectedSystem)?.name})\nBy ${artist}\n\n---\n\n${transliteratedLyrics}`
    } else {
      const jsonData = {
        title: song,
        artist,
        system: transliterationSystems.find((s) => s.code === selectedSystem)?.name || selectedSystem,
        source: "Lyrica Transliteration",
        lyrics: transliteratedLyrics,
      }
      content = JSON.stringify(jsonData, null, 2)
    }

    downloadFile(content, filename, format)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
          <h2 className="text-2xl font-bold">Transliterate Lyrics</h2>
          <button onClick={onClose} className="p-2 hover:bg-foreground/10 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="p-4 bg-primary/5 border border-primary/30 rounded-lg flex gap-3">
            <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-primary mb-1">Transliteration Beta Engine</p>
              <p className="text-sm text-foreground/70">
                The transliteration engine is in beta and may take up to 3 minutes to process. Please be patient.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3">Select System</label>
            <select
              value={selectedSystem}
              onChange={(e) => setSelectedSystem(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
            >
              {transliterationSystems.map((system) => (
                <option key={system.code} value={system.code}>
                  {system.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleTransliterate}
            disabled={isLoading}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50"
          >
            {isLoading ? "Transliterating... (this may take a few minutes)" : "Transliterate"}
          </button>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-destructive mb-1">Transliteration Failed</p>
                <p className="text-sm text-foreground/80">{error}</p>
              </div>
            </div>
          )}

          {timeoutWarning && isLoading && (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex gap-3">
              <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-yellow-600 mb-1">Still Processing</p>
                <p className="text-sm text-foreground/80">
                  Transliteration is taking longer than expected. Please keep waiting...
                </p>
              </div>
            </div>
          )}

          {transliteratedLyrics && (
            <div className="bg-background rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  Transliterated to {transliterationSystems.find((s) => s.code === selectedSystem)?.name}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2 bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-primary" />}
                  </button>
                  <div className="flex gap-1 border border-border rounded-lg p-1 bg-card">
                    <button
                      onClick={() => handleDownloadTransliteration("txt")}
                      className="px-3 py-1 text-sm rounded hover:bg-foreground/10 transition-colors"
                      title="Download as TXT"
                    >
                      TXT
                    </button>
                    <button
                      onClick={() => handleDownloadTransliteration("json")}
                      className="px-3 py-1 text-sm rounded hover:bg-foreground/10 transition-colors"
                      title="Download as JSON"
                    >
                      JSON
                    </button>
                  </div>
                </div>
              </div>
              <p className="whitespace-pre-wrap leading-relaxed text-foreground/80">{transliteratedLyrics}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
