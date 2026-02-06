"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    alt: "Cocina moderna de lujo"
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    alt: "Casa moderna exterior"
  },
  {
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
    alt: "Sala de estar elegante"
  },
  {
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop",
    alt: "Terraza con vista"
  }
]

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [isTransitioning])

  const prevSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [isTransitioning])

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden">
      {/* Background Slider with Zoom Effect */}
      {heroSlides.map((slide, index) => (
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
        {heroSlides.map((_, index) => (
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
        <p className="text-primary text-xs md:text-sm tracking-[0.4em] mb-8 text-center animate-fade-in-up font-medium">
          Compra, Vende, Renta... profesionales expertos en Bienes Raíces
        </p>

        {/* Main Title */}
        <h1 className="text-center mb-4">
          <span className="block font-sans text-6xl md:text-8xl lg:text-9xl text-white font-bold tracking-wide drop-shadow-2xl animate-fade-in-up animation-delay-100">
            Brambila&apos;s
          </span>
          <span className="block font-sans text-4xl md:text-6xl lg:text-7xl text-white font-bold tracking-wide drop-shadow-2xl animate-fade-in-up animation-delay-100">
            INMOBILIARIA
          </span>

        </h1>

        {/* Tagline */}
        <div className="text-center mt-10 mb-16 max-w-xl animate-fade-in-up animation-delay-300">
          <p className="text-white/90 text-base md:text-lg leading-relaxed font-light">
            Redefiniendo el concepto inmobiliario.
          </p>
          <p className="text-white/90 text-base md:text-lg leading-relaxed font-light">
            Donde la confianza encuentra la excelencia.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl animate-fade-in-up animation-delay-400">
          <div className="flex items-center bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-center gap-4 px-6 py-5 flex-1">
              <span className="text-white/70 text-xs tracking-[0.2em] shrink-0 font-medium">BUSCAR:</span>
              <input
                type="text"
                placeholder="Ubicación, Zona, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder-white/40 text-sm w-full font-light"
              />
            </div>
            <button
              type="button"
              className="bg-white text-black px-10 py-5 text-xs tracking-[0.2em] hover:bg-primary transition-colors duration-300 flex items-center gap-2 shrink-0 font-medium"
            >
              <Search className="w-4 h-4" />
              EXPLORAR
            </button>
          </div>
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
