import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const artist = searchParams.get("artist")
  const song = searchParams.get("song")
  const timestamps = searchParams.get("timestamps") || "true"

  if (!artist || !song) {
    return NextResponse.json({ error: "Artist and song are required" }, { status: 400 })
  }

  try {
    console.log("[v0] Fetching lyrics for:", artist, song)

    const response = await fetch(
      `https://test-0k.onrender.com/lyrics/?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}&timestamps=${timestamps}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    )

    console.log("[v0] API response status:", response.status)

    if (!response.ok) {
      console.log("[v0] API error response:", response.statusText)
      return NextResponse.json({ error: "Lyrics not found. Try another song or artist." }, { status: response.status })
    }

    const data = await response.json()
    console.log("[v0] Successfully fetched lyrics")

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Lyrics API error:", error)
    return NextResponse.json({ error: "Failed to fetch lyrics. The service may be unavailable." }, { status: 500 })
  }
}
