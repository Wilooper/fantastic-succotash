"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Music, Globe, Volume2, Sparkles, Github, Star } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1">
        <section className="pt-32 md:pt-40 pb-20 md:pb-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 inline-block">
              <span className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium">
                Discover Music Like Never Before
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Lyrics at Your Fingertips
            </h1>

            <p className="text-xl md:text-2xl text-foreground/70 mb-8 leading-relaxed max-w-2xl mx-auto">
              Explore song lyrics with synchronized timestamps, instant translations, and transliterations. Your premium
              gateway to understanding music worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/lyrics"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg"
              >
                Start Exploring
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border border-border bg-card text-foreground rounded-lg hover:bg-card/80 transition-colors font-semibold text-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-20">Premium Features</h2>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="bg-card border border-border rounded-lg p-8 md:p-10">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                  <Music className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Synchronized Lyrics</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Experience timestamped lyrics that sync with music playback. Follow along with precise timing to
                  understand every lyric perfectly.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-8 md:p-10">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Instant Translation</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Translate lyrics into multiple languages with a single click. Break language barriers and enjoy music
                  from around the world.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-8 md:p-10">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                  <Volume2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Transliteration</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Convert lyrics from any script to Latin characters. Perfect for pronouncing words in languages you
                  don't read fluently.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-8 md:p-10">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Premium Interface</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Enjoy a minimalist, distraction-free experience designed for music lovers. Beautiful typography and
                  intuitive navigation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 px-6 border-t border-border bg-card/30">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Github className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">Open Source Project</h2>
            </div>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Lyrica is a free, open-source project powered by the{" "}
              <a
                href="https://github.com/wilooper/Lyrica"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                Lyrica API
              </a>
              . We're committed to making lyrics accessible to everyone, regardless of language or script. Your support
              helps us improve the platform.
            </p>
            <a
              href="https://github.com/wilooper/Lyrica"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg"
            >
              <Star className="w-5 h-5" />
              Star us on GitHub
            </a>
          </div>
        </section>

        <section className="py-20 md:py-32 px-6 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Explore?</h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Start your journey with Lyrica today. Search for your favorite songs and discover lyrics like never
              before.
            </p>
            <Link
              href="/lyrics"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg"
            >
              Search Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
