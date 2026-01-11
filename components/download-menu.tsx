"use client"

import { useState } from "react"
import { Download, ChevronDown } from "lucide-react"
import { generateLRC, generateTXT, generateJSON, downloadFile } from "@/lib/download-utils"

interface DownloadMenuProps {
  lyrics: string | Array<{ timestamp?: string; text: string }>
  artist: string
  song: string
  isSync: boolean
}

export function DownloadMenu({ lyrics, artist, song, isSync }: DownloadMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleDownload = (format: "lrc" | "txt" | "json") => {
    if (format === "lrc" && !isSync) return

    let content = ""
    const filename = `${artist}-${song}`.replace(/[^a-z0-9]/gi, "-").toLowerCase()

    switch (format) {
      case "lrc":
        content = generateLRC(lyrics, artist, song)
        break
      case "txt":
        content = generateTXT(lyrics, artist, song)
        break
      case "json":
        content = generateJSON(lyrics, artist, song)
        break
    }

    downloadFile(content, filename, format)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-colors text-primary font-medium"
      >
        <Download className="w-4 h-4" />
        Download
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50">
          {isSync && (
            <button
              onClick={() => handleDownload("lrc")}
              className="block w-full text-left px-4 py-2 hover:bg-foreground/10 first:rounded-t-lg transition-colors text-sm"
            >
              Download as .lrc
            </button>
          )}
          <button
            onClick={() => handleDownload("txt")}
            className={`block w-full text-left px-4 py-2 hover:bg-foreground/10 transition-colors text-sm ${isSync ? "" : "first:rounded-t-lg"}`}
          >
            Download as .txt
          </button>
          <button
            onClick={() => handleDownload("json")}
            className="block w-full text-left px-4 py-2 hover:bg-foreground/10 last:rounded-b-lg transition-colors text-sm"
          >
            Download as .json
          </button>
        </div>
      )}
    </div>
  )
}
