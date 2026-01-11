interface TimestampedLyric {
  timestamp?: string
  text: string
}

type LyricsData = string | TimestampedLyric[]

export function generateLRC(lyrics: LyricsData, artist: string, song: string): string {
  const lines: string[] = []
  lines.push(`[ar:${artist}]`)
  lines.push(`[ti:${song}]`)
  lines.push(`[al:Lyrica]`)
  lines.push(`[by:Lyrica]`)

  if (Array.isArray(lyrics)) {
    lyrics.forEach((lyric) => {
      if (lyric.timestamp && lyric.text) {
        lines.push(`${lyric.timestamp}${lyric.text}`)
      } else if (lyric.text) {
        lines.push(lyric.text)
      }
    })
  } else {
    lyrics.split("\n").forEach((line) => {
      if (line.trim()) lines.push(line)
    })
  }

  return lines.join("\n")
}

export function generateTXT(lyrics: LyricsData, artist: string, song: string): string {
  let content = `${song}\nBy ${artist}\n\n`
  content += "---\n\n"

  if (Array.isArray(lyrics)) {
    lyrics.forEach((lyric) => {
      if (lyric.timestamp && lyric.text) {
        content += `[${lyric.timestamp}] ${lyric.text}\n`
      } else if (lyric.text) {
        content += `${lyric.text}\n`
      }
    })
  } else {
    content += lyrics
  }

  return content
}

export function generateJSON(lyrics: LyricsData, artist: string, song: string): string {
  const jsonData = {
    title: song,
    artist,
    source: "Lyrica",
    lyrics: Array.isArray(lyrics) ? lyrics : lyrics.split("\n").map((text) => ({ text })),
  }

  return JSON.stringify(jsonData, null, 2)
}

export function downloadFile(content: string, filename: string, format: "lrc" | "txt" | "json") {
  const mimeTypes = {
    lrc: "text/plain",
    txt: "text/plain",
    json: "application/json",
  }

  const element = document.createElement("a")
  element.setAttribute("href", `data:${mimeTypes[format]};charset=utf-8,${encodeURIComponent(content)}`)
  element.setAttribute("download", `${filename}.${format}`)
  element.style.display = "none"

  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
