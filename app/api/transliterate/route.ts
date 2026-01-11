import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const artist = searchParams.get("artist")
  const song = searchParams.get("song")
  const system = searchParams.get("system") || "latin"

  if (!artist || !song) {
    return NextResponse.json({ error: "Artist and song are required" }, { status: 400 })
  }

  try {
    console.log("[v0] Transliterating lyrics for:", artist, song, "to", system)

    const response = await fetch(
      `https://automatic-engine-nc2j.onrender.com/transliterate/${encodeURIComponent(artist)}/${encodeURIComponent(song)}/${system}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    )

    console.log("[v0] Transliteration API response status:", response.status)

    if (!response.ok) {
      console.log("[v0] Transliteration API error:", response.statusText)
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Transliteration not available for this song. Try another system or song." },
          { status: 404 },
        )
      } else if (response.status === 503) {
        return NextResponse.json(
          { error: "Transliteration service is temporarily unavailable. Please try again later." },
          { status: 503 },
        )
      }
      return NextResponse.json({ error: "Transliteration failed. Please try again." }, { status: response.status })
    }

    const data = await response.json()
    console.log("[v0] Successfully transliterated lyrics")

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Transliteration API error:", error)
    return NextResponse.json(
      { error: "Failed to transliterate lyrics. The service may be experiencing delays." },
      { status: 500 },
    )
  }
}
