import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          <div>
            <h3 className="font-bold text-lg mb-4">Lyrica</h3>
            <p className="text-foreground/60 text-sm">Premium lyrics platform with translation and transliteration.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Navigate</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-foreground/60 hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/lyrics" className="text-foreground/60 hover:text-foreground transition-colors">
                  Lyrics
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground/60 hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/lyrics" className="text-foreground/60 hover:text-foreground transition-colors">
                  Search Lyrics
                </Link>
              </li>
              <li>
                <Link href="/lyrics" className="text-foreground/60 hover:text-foreground transition-colors">
                  Translate
                </Link>
              </li>
              <li>
                <Link href="/lyrics" className="text-foreground/60 hover:text-foreground transition-colors">
                  Transliterate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-foreground/60 text-sm">© 2025 Lyrica. All rights reserved.</p>
          <p className="text-foreground/60 text-sm">Powered by Lyrica API</p>
        </div>
      </div>
    </footer>
  )
}
