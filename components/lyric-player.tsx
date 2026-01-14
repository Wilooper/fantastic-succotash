"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Play, Pause, Grid3x3, Download } from "lucide-react"

interface TimestampedLyric {
  timestamp?: string
  text: string
}

interface LyricPlayerProps {
  lyrics: string | TimestampedLyric[] | null
  artist: string
  song: string
  hasTimestamps: boolean
  onDownload?: (format: string) => void
}

export function LyricPlayer({ lyrics, artist, song, hasTimestamps, onDownload }: LyricPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0)
  const [showEqualizer, setShowEqualizer] = useState(true)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const lyricsArray = Array.isArray(lyrics)
    ? lyrics
    : typeof lyrics === "string"
      ? lyrics.split("\n").map((text) => ({ text }))
      : []

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
      updateCurrentLyric()
    }

    const updateDuration = () => {
      setDuration(audio.duration)
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("play", () => setIsPlaying(true))
    audio.addEventListener("pause", () => setIsPlaying(false))
    audio.addEventListener("ended", () => setIsPlaying(false))

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("play", () => setIsPlaying(true))
      audio.removeEventListener("pause", () => setIsPlaying(false))
      audio.removeEventListener("ended", () => setIsPlaying(false))
    }
  }, [])

  const updateCurrentLyric = () => {
    if (!hasTimestamps || !Array.isArray(lyrics)) return

    const currentMs = (audioRef.current?.currentTime || 0) * 1000

    for (let i = lyricsArray.length - 1; i >= 0; i--) {
      const lyric = lyricsArray[i]
      if (lyric.timestamp) {
        const [minutes, seconds] = lyric.timestamp.split(":").map(Number)
        const lyricMs = (minutes * 60 + seconds) * 1000
        if (currentMs >= lyricMs) {
          setCurrentLyricIndex(i)
          break
        }
      }
    }
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number.parseFloat(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setAudioUrl(url)
    }
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden flex flex-col items-center justify-center p-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 to-transparent opacity-30 blur-3xl"></div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{song}</h2>
          <p className="text-lg text-slate-400">{artist}</p>
        </div>

        <div className="min-h-80 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 md:p-12 mb-8 flex items-center justify-center">
          {lyricsArray.length > 0 ? (
            <div className="text-center w-full">
              <p className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg transition-all duration-300">
                {hasTimestamps && Array.isArray(lyrics)
                  ? lyricsArray[currentLyricIndex]?.text || "Loading..."
                  : typeof lyrics === "string"
                    ? lyrics.split("\n")[0]
                    : "No lyrics"}
              </p>
            </div>
          ) : (
            <p className="text-slate-400">No lyrics available</p>
          )}
        </div>

        {showEqualizer && (
          <div className="flex items-end justify-center gap-2 h-20 mb-8">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-primary to-primary/40 rounded-full transition-all duration-100"
                style={{
                  height: isPlaying ? `${20 + Math.random() * 60}px` : "20px",
                }}
              ></div>
            ))}
          </div>
        )}

        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-6">
          {audioUrl && <audio ref={audioRef} src={audioUrl} className="hidden" crossOrigin="anonymous" />}

          <div className="mb-4">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePlayPause}
                className="w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>

              <label className="w-10 h-10 bg-slate-700 hover:bg-slate-600 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer">
                📁
                <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowEqualizer(!showEqualizer)}
                className="w-10 h-10 bg-slate-700 hover:bg-slate-600 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>

              {onDownload && (
                <button
                  onClick={() => onDownload("txt")}
                  className="w-10 h-10 bg-slate-700 hover:bg-slate-600 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
          <label className="inline-block px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors cursor-pointer">
            Upload Audio File
            <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  )
}
