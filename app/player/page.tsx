import { Suspense } from "react"
import PlayerPageContent from "./player-content"

export default function PlayerPage() {
  return (
    <Suspense fallback={null}>
      <PlayerPageContent />
    </Suspense>
  )
}
