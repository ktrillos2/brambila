"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { HERO_QUERY } from "@/sanity/lib/queries"

type HeroSlide = {
  image: string
  alt: string
}

type HeroData = {
  title1: string
  title2: string
  subtitle: string
  searchPlaceholder: string
  images: HeroSlide[]
}

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [heroData, setHeroData] = useState<HeroData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(HERO_QUERY)
        setHeroData(data)
      } catch (error) {
        console.error("Failed to fetch hero data:", error)
      }
    }
    fetchData()
  }, [])

  const slides = heroData?.images || []

  const nextSlide = useCallback(() => {
    if (isTransitioning || slides.length === 0) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [isTransitioning, slides.length])

  const prevSlide = useCallback(() => {
    if (isTransitioning || slides.length === 0) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [isTransitioning, slides.length])

  useEffect(() => {
    if (slides.length === 0) return
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [nextSlide, slides.length])

  if (!heroData) return null // Or loading skeleton

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden">
      {/* Background Slider with Zoom Effect */}
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
        >
          <div
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${index === currentSlide ? "animate-slow-zoom" : ""
              }`}
            style={{
              backgroundImage: `url('${slide.image}')`
            }}
          />
        </div>
      ))}

      {/* Dark Gradient Overlay - Bottom to Top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

      {/* Additional vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* Slider Navigation Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 group"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 group"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-6 md:right-12 lg:right-16 flex items-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={`slide-indicator-${index}`}
            type="button"
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true)
                setCurrentSlide(index)
                setTimeout(() => setIsTransitioning(false), 1000)
              }
            }}
            className={`h-1 transition-all duration-500 ${index === currentSlide
              ? "w-8 bg-primary"
              : "w-4 bg-white/30 hover:bg-white/50"
              }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-20">
        {/* Small Tagline */}
        <p className="text-primary text-xs md:text-sm tracking-[0.4em] mb-8 text-center animate-fade-in-up font-medium" style={{ whiteSpace: 'pre-line' }}>
          {heroData.subtitle.split('\n\n')[0]}
        </p>

        {/* Main Title */}
        <h1 className="text-center mb-4">
          <span className="block font-sans text-6xl md:text-8xl lg:text-9xl text-white font-bold tracking-wide drop-shadow-2xl animate-fade-in-up animation-delay-100">
            {heroData.title1}
          </span>
          <span className="block font-sans text-4xl md:text-6xl lg:text-7xl text-white font-bold tracking-wide drop-shadow-2xl animate-fade-in-up animation-delay-100 uppercase">
            {heroData.title2}
          </span>

        </h1>

        {/* Tagline */}
        <div className="text-center mt-10 mb-16 max-w-xl animate-fade-in-up animation-delay-300">
          {heroData.subtitle.split('\n\n')[1]?.split('\n').map((line, i) => (
            <p key={i} className="text-white/90 text-base md:text-lg leading-relaxed font-light">
              {line}
            </p>
          ))}
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl animate-fade-in-up animation-delay-400">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (searchQuery.trim()) {
                // Redirect to properties page with search param
                window.location.href = `/propiedades?search=${encodeURIComponent(searchQuery)}`
              }
            }}
            className="flex items-center bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center gap-4 px-6 py-5 flex-1">
              <span className="text-white/70 text-xs tracking-[0.2em] shrink-0 font-medium">BUSCAR:</span>
              <input
                type="text"
                placeholder={heroData.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder-white/40 text-sm w-full font-light"
              />
            </div>
            <button
              type="submit"
              className="bg-white text-black px-10 py-5 text-xs tracking-[0.2em] hover:bg-primary transition-colors duration-300 flex items-center gap-2 shrink-0 font-medium"
            >
              <Search className="w-4 h-4" />
              EXPLORAR
            </button>
          </form>
        </div>
      </div>

      {/* Scroll Indicator - Bottom Left */}
      <div className="absolute bottom-8 left-6 md:left-12 lg:left-16 flex items-center gap-4 z-10 animate-fade-in-up animation-delay-500">
        <div className="w-12 h-px bg-white/40" />
        <span className="text-white/60 text-xs tracking-[0.2em] font-medium">DESLIZA</span>
      </div>
    </section>
  )
}
