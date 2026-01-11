import { CheckCircle, Zap, Globe, Lock } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        <section className="pt-32 md:pt-40 pb-20 md:pb-32 px-6 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">About Lyrica</h1>
            <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-3xl">
              Lyrica is a premium lyrics platform designed for music lovers worldwide. We believe that understanding
              lyrics deepens your connection to music, transcending language and cultural barriers.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-32 px-6 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 md:mb-20">Our Mission</h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                  We aim to bridge the gap between music and language. Whether you're a casual listener or a dedicated
                  music enthusiast, Lyrica helps you explore lyrics in multiple languages and scripts, making global
                  music accessible to everyone.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                  By combining AI-powered translation and transliteration with synchronized lyrics, we create a
                  comprehensive platform for discovering and understanding music worldwide.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Our commitment is to make music education and enjoyment universal, breaking down language barriers one
                  song at a time.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">AI-Powered Accuracy</h3>
                      <p className="text-foreground/70">
                        Using advanced Google Geema AI technology for precise translations and transliterations.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Instant Results</h3>
                      <p className="text-foreground/70">
                        Get translations, transliterations, and synced lyrics in real-time as you search.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <Globe className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Global Coverage</h3>
                      <p className="text-foreground/70">
                        Support for songs from artists worldwide in multiple languages and scripts.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <Lock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Privacy First</h3>
                      <p className="text-foreground/70">
                        Your search history and preferences are kept private and secure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 px-6 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 md:mb-16">Features</h2>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Synchronized Lyrics</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Follow along with timestamped lyrics that match the music perfectly, enhancing your listening
                  experience.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Multi-Language Translation</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Translate lyrics into over 10 major languages including English, Spanish, French, German, and more.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Transliteration Support</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Convert any non-Latin script to Latin characters for easy pronunciation and understanding.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Premium Interface</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Enjoy a beautifully designed, minimalist interface that keeps focus on the music and lyrics.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Easy Sharing</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Copy lyrics with a single click. Share your favorite songs and translations with friends.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Fast Search</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Search by artist name and song title to instantly find the lyrics you're looking for.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 px-6 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-12">How It Works</h2>

            <div className="space-y-8">
              <div className="flex gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Search</h3>
                  <p className="text-lg text-foreground/70">
                    Enter the artist name and song title in our search bar to find the lyrics you want.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">View Lyrics</h3>
                  <p className="text-lg text-foreground/70">
                    Get instant access to synchronized lyrics with timestamps. See the words as the song plays.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Translate or Transliterate</h3>
                  <p className="text-lg text-foreground/70">
                    Choose to translate the lyrics into your preferred language or convert the script to Latin
                    characters.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-bold">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Share & Enjoy</h3>
                  <p className="text-lg text-foreground/70">
                    Copy the lyrics, share with friends, and enjoy your favorite music with deeper understanding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 px-6 border-b border-border bg-card">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Technology Behind Lyrica</h2>
            <p className="text-xl text-foreground/70 mb-12 leading-relaxed">
              Lyrica is built on cutting-edge technology combining robust REST APIs with AI-powered language processing.
            </p>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-background border border-border rounded-lg p-6 md:p-8">
                <h3 className="font-bold text-lg mb-3">Lyrica API</h3>
                <p className="text-foreground/70 text-sm">
                  Lyrics Service providing synchronized and timestamped lyrics with fast, reliable delivery.
                </p>
              </div>

              <div className="bg-background border border-border rounded-lg p-6 md:p-8">
                <h3 className="font-bold text-lg mb-3">Google Geema AI</h3>
                <p className="text-foreground/70 text-sm">
                  Advanced language AI powering our translation and transliteration capabilities with precision.
                </p>
              </div>

              <div className="bg-background border border-border rounded-lg p-6 md:p-8">
                <h3 className="font-bold text-lg mb-3">REST Architecture</h3>
                <p className="text-foreground/70 text-sm">
                  Clean, scalable API architecture for seamless integration and fast response times.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Started Today</h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Explore lyrics from artists around the world and deepen your connection to music.
            </p>
            <a
              href="/lyrics"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg"
            >
              Search Lyrics Now
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
