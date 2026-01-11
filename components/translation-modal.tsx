"use client"

import { useState } from "react"
import { X, Copy, Check, AlertCircle, Clock } from "lucide-react"
import { downloadFile } from "@/lib/download-utils"

interface TranslationModalProps {
  isOpen: boolean
  onClose: () => void
  artist: string
  song: string
}

const languages = [
  { code: "english", name: "English" },
  { code: "spanish", name: "Spanish" },
  { code: "french", name: "French" },
  { code: "german", name: "German" },
  { code: "italian", name: "Italian" },
  { code: "portuguese", name: "Portuguese" },
  { code: "russian", name: "Russian" },
  { code: "japanese", name: "Japanese" },
  { code: "korean", name: "Korean" },
  { code: "chinese", name: "Chinese" },
]

const TRANSLATION_TIMEOUT = 180000 // 3 minutes

export function TranslationModal({ isOpen, onClose, artist, song }: TranslationModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("english")
  const [translatedLyrics, setTranslatedLyrics] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [timeoutWarning, setTimeoutWarning] = useState(false)

  const handleTranslate = async () => {
    setIsLoading(true)
    setError("")
    setTimeoutWarning(false)
    setTranslatedLyrics("")

    const timeoutId = setTimeout(() => {
      setTimeoutWarning(true)
    }, TRANSLATION_TIMEOUT)

    try {
      const response = await fetch(
        `/api/translate?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}&language=${selectedLanguage}`,
        { signal: AbortSignal.timeout(TRANSLATION_TIMEOUT + 10000) },
      )

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Translation failed. Please try again.")
      }

      const data = await response.json()

      if (!data.lyrics && !data.translation) {
        throw new Error("No translation data received. The song may not be supported.")
      }

      setTranslatedLyrics(data.lyrics || data.translation || "")
    } catch (err) {
      clearTimeout(timeoutId)

      if (err instanceof Error) {
        if (err.name === "AbortError") {
          setError(
            "Translation took too long (3+ minutes). The service may be experiencing delays. Please try again later.",
          )
        } else {
          setError(err.message)
        }
      } else {
        setError("Failed to translate lyrics. Please try again.")
      }
      setTranslatedLyrics("")
    } finally {
      setIsLoading(false)
      setTimeoutWarning(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedLyrics)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadTranslation = (format: "txt" | "json") => {
    let content = ""
    const filename = `${artist}-${song}-translated`.replace(/[^a-z0-9]/gi, "-").toLowerCase()

    if (format === "txt") {
      content = `${song} (Translated to ${languages.find((l) => l.code === selectedLanguage)?.name})\nBy ${artist}\n\n---\n\n${translatedLyrics}`
    } else {
      const jsonData = {
        title: song,
        artist,
        language: languages.find((l) => l.code === selectedLanguage)?.name || selectedLanguage,
        source: "Lyrica Translation",
        lyrics: translatedLyrics,
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
          <h2 className="text-2xl font-bold">Translate Lyrics</h2>
          <button onClick={onClose} className="p-2 hover:bg-foreground/10 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="p-4 bg-primary/5 border border-primary/30 rounded-lg flex gap-3">
            <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-primary mb-1">Translation Beta Engine</p>
              <p className="text-sm text-foreground/70">
                The translation engine is in beta and may take up to 3 minutes to process. Please be patient.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3">Select Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleTranslate}
            disabled={isLoading}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50"
          >
            {isLoading ? "Translating... (this may take a few minutes)" : "Translate"}
          </button>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-destructive mb-1">Translation Failed</p>
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
                  Translation is taking longer than expected. Please keep waiting...
                </p>
              </div>
            </div>
          )}

          {translatedLyrics && (
            <div className="bg-background rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  Translated to {languages.find((l) => l.code === selectedLanguage)?.name}
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
                      onClick={() => handleDownloadTranslation("txt")}
                      className="px-3 py-1 text-sm rounded hover:bg-foreground/10 transition-colors"
                      title="Download as TXT"
                    >
                      TXT
                    </button>
                    <button
                      onClick={() => handleDownloadTranslation("json")}
                      className="px-3 py-1 text-sm rounded hover:bg-foreground/10 transition-colors"
                      title="Download as JSON"
                    >
                      JSON
                    </button>
                  </div>
                </div>
              </div>
              <p className="whitespace-pre-wrap leading-relaxed text-foreground/80">{translatedLyrics}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
