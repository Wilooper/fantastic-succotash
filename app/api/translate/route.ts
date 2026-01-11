import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const artist = searchParams.get("artist")
  const song = searchParams.get("song")
  const language = searchParams.get("language") || "english"

  if (!artist || !song) {
    return NextResponse.json({ error: "Artist and song are required" }, { status: 400 })
  }

  try {
    console.log("[v0] Translating lyrics for:", artist, song, "to", language)

    const response = await fetch(
      `https://automatic-engine-nc2j.onrender.com/translate/${encodeURIComponent(artist)}/${encodeURIComponent(song)}/${language}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    )

    console.log("[v0] Translation API response status:", response.status)

    if (!response.ok) {
      console.log("[v0] Translation API error:", response.statusText)
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Translation not available for this song. Try another language or song." },
          { status: 404 },
        )
      } else if (response.status === 503) {
        return NextResponse.json(
          { error: "Translation service is temporarily unavailable. Please try again later." },
          { status: 503 },
        )
      }
      return NextResponse.json({ error: "Translation failed. Please try again." }, { status: response.status })
    }

    const data = await response.json()
    console.log("[v0] Successfully translated lyrics")

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Translation API error:", error)
    return NextResponse.json(
      { error: "Failed to translate lyrics. The service may be experiencing delays." },
      { status: 500 },
    )
  }
}
