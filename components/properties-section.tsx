"use client"

import React from "react"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Bed, Bath, Maximize, LandPlot, Layers, X, ChevronLeft, ChevronRight, ChevronDown, SlidersHorizontal } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { client } from "@/sanity/lib/client"
import { ALL_PROPERTIES_QUERY, PROPERTY_CONFIGS_QUERY } from "@/sanity/lib/queries"
import { useSearchParams, useRouter } from "next/navigation"
import { formatPrice } from "@/lib/utils"

type Property = {
  id: string
  title: string
  slug: string
  location: string
  price: string
  currency?: string
  tag: string
  status: string
  type: string
  image: string
  bedrooms?: number
  bathrooms?: number
  halfBathrooms?: number
  area?: string
  landArea?: string
  levels?: number
  featured?: boolean
  code?: string
}

type FilterConfig = {
  locations: string[]
  propertyTypes: string[]
  amenities: string[]
}

export function PropertiesSection() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // Maintain raw search query for input, lowercased for filtering
  const rawSearchQuery = searchParams.get("search") || ""
  const searchQuery = rawSearchQuery.toLowerCase()

  // Local state for the input field
  const [searchTerm, setSearchTerm] = useState(rawSearchQuery)

  // Sync local state with URL param if it changes (e.g. navigation)
  useEffect(() => {
    setSearchTerm(rawSearchQuery)
  }, [rawSearchQuery])

  const [isVisible, setIsVisible] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [properties, setProperties] = useState<Property[]>([])
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    locations: [],
    propertyTypes: [],
    amenities: []
  })
  const [filters, setFilters] = useState({
    locations: [] as string[],
    statuses: [] as string[],
    types: [] as string[],
    priceRange: 50
  })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Reveal section if search query is present
    if (searchQuery) {
      setIsVisible(true)
    }
  }, [searchQuery])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propertiesData, configData] = await Promise.all([
          client.fetch(ALL_PROPERTIES_QUERY),
          client.fetch(PROPERTY_CONFIGS_QUERY)
        ])

        setProperties(propertiesData)
        if (configData) {
          setFilterConfig(configData)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    // If we already revealed it via search, don't observe
    if (searchQuery) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.05 } // Reducir el threshold ya que el contenedor de propiedades puede ser muy alto y no cumplir el 10% inicial
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
      
      // Salvavidas: si la página principal está arriba (menos de 200px de scroll), forzar la visibilidad 
      // para evitar que se quede en blanco hasta redimensionar.
      setTimeout(() => {
        if (window.scrollY < 200) {
          setIsVisible(true)
        }
      }, 100)
    }

    return () => observer.disconnect()
  }, [properties, searchQuery])

  const toggleLocation = (loc: string) => {
    setFilters(prev => ({
      ...prev,
      locations: prev.locations.includes(loc)
        ? prev.locations.filter(l => l !== loc)
        : [...prev.locations, loc]
    }))
  }

  const toggleStatus = (status: string) => {
    setFilters(prev => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter(s => s !== status)
        : [...prev.statuses, status]
    }))
  }

  const toggleType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
    }))
  }

  const resetFilters = () => {
    setFilters({ locations: [], statuses: [], types: [], priceRange: 50 })
  }

  const filteredProperties = properties.filter(p => {
    // Text Search Filter (Instant)
    if (searchTerm) {
      const searchContent = `${p.title} ${p.location} ${p.code || ""} ${p.type}`.toLowerCase()
      if (!searchContent.includes(searchTerm.toLowerCase())) {
        return false
      }
    }

    if (filters.locations.length > 0 && !filters.locations.some(loc => p.location.includes(loc))) {
      return false
    }
    if (filters.statuses.length > 0 && !filters.statuses.includes(p.status)) {
      return false
    }
    if (filters.types.length > 0 && !filters.types.includes(p.type)) {
      return false
    }
    return true
  })

  // Use the specific ID order or Featured flag logic if desired, or just first property as featured
  const featuredProperty = filteredProperties.find(p => p.featured) || filteredProperties[0]
  const regularProperties = filteredProperties // Show all properties in grid, or filter out featured if desired

  if (properties.length === 0) return null // Or loading state

  // Use configured locations or fallback to unique locations from properties if config is empty
  const availableLocations = filterConfig.locations.length > 0
    ? filterConfig.locations
    : Array.from(new Set(properties.map(p => p.location))).sort()

  // Use configured types or fallback
  const availableTypes = filterConfig.propertyTypes.length > 0
    ? filterConfig.propertyTypes
    : Array.from(new Set(properties.map(p => p.type))).sort()

  return (
    <>
      <section
        ref={sectionRef}
        id="propiedades"
        className="py-10 md:py-20 bg-secondary overflow-hidden min-h-screen"
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          {/* Header */}
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
            <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">
              Inventario 2025
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans text-foreground mt-4 mb-4 tracking-wide">
              Colección{" "}
              <span className="italic text-muted-foreground font-light">Privada</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Explora nuestra curaduría de propiedades exclusivas en las zonas más codiciadas de Jalisco.
            </p>
          </div>

          {/* Search and Results */}
          <div className={`mb-8 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
            {/* Search Input for Properties Page */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                // Update URL only on submit to persist/share
                router.replace(`/propiedades?search=${encodeURIComponent(searchTerm)}`, { scroll: false })
              }}
              className="w-full max-w-md mb-8 mx-auto"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar por ubicación, título..."
                  value={searchTerm}
                  onChange={(e) => {
                    const newValue = e.target.value
                    setSearchTerm(newValue)
                    // Optional: Update URL on debounce if desired, but local state filtering is enough for "instant" feel
                  }}
                  style={{ paddingLeft: "45px" }}
                  className="w-full  pr-4 py-4 bg-card border border-border text-foreground rounded-lg placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all text-base shadow-sm"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                </div>
              </div>
            </form>

            {/* Mobile Toolbar */}
            <div className="lg:hidden mb-8">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border text-foreground rounded-lg transition-colors hover:bg-accent active:scale-95 shadow-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="text-sm font-medium">Filtros</span>
                  {(filters.locations.length + filters.statuses.length + filters.types.length) > 0 && (
                    <span className="bg-primary text-primary-foreground text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                      {filters.locations.length + filters.statuses.length + filters.types.length}
                    </span>
                  )}
                </button>

                <div className="relative">
                  <select className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" aria-label="Ordenar propiedades">
                    <option>Relevancia</option>
                    <option>Precio: Menor a Mayor</option>
                    <option>Precio: Mayor a Menor</option>
                  </select>
                  <div className="flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border text-foreground rounded-lg h-full shadow-sm">
                    <span className="text-sm font-medium">Ordenar</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="text-center border-b border-border/40 pb-4">
                <p className="text-muted-foreground text-xs uppercase tracking-widest font-medium">
                  Se encontraron <span className="text-primary">{filteredProperties.length}</span> resultados
                </p>
              </div>
            </div>

            {/* Desktop Toolbar */}
            <div className="hidden lg:flex flex-row items-center justify-between mb-6 pb-4 border-b border-border/50">
              <p className="text-muted-foreground text-sm font-medium">
                <span className="text-primary">{filteredProperties.length}</span> resultados encontrados
              </p>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Ordenar por:</span>
                <div className="relative">
                  <select className="bg-transparent border-none text-foreground font-medium focus:outline-none cursor-pointer pr-6 appearance-none py-1 text-right">
                    <option>Relevancia</option>
                    <option>Precio: Menor a Mayor</option>
                    <option>Precio: Mayor a Menor</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className={`
              lg:col-span-1 lg:block transition-all duration-300
              ${showMobileFilters ? "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" : "hidden"}
            `}>
              {/* Mobile Overlay/Container */}
              <div className={`
                h-full lg:h-auto overflow-y-auto lg:overflow-visible
                ${showMobileFilters ? "fixed right-0 top-0 h-full w-[300px] bg-card p-6 shadow-2xl animate-in slide-in-from-right" : ""}
                lg:static lg:bg-transparent lg:p-0 lg:shadow-none lg:w-auto
              `}>
                {/* Mobile Close Button */}
                <div className="flex lg:hidden justify-between items-center mb-6">
                  <h3 className="text-xl font-sans text-foreground">Filtros</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-accent rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-card border border-border p-6 lg:sticky lg:top-24 rounded-lg">
                  <div className="hidden lg:flex justify-between items-center mb-6">
                    <h3 className="text-xl font-sans text-foreground tracking-wide">Filtros</h3>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wider uppercase"
                    >
                      Resetear
                    </button>
                  </div>

                  {/* Location Filter */}
                  <div className="mb-6">
                    <h4 className="text-primary text-xs font-medium tracking-wider uppercase mb-4">
                      Ubicación
                    </h4>
                    <div className="space-y-3">
                      {availableLocations.map(loc => (
                        <label key={loc} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${filters.locations.includes(loc)
                            ? "bg-primary border-primary"
                            : "border-border group-hover:border-primary/50"
                            }`}>
                            {filters.locations.includes(loc) && (
                              <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                            {loc}
                          </span>
                          <input
                            type="checkbox"
                            checked={filters.locations.includes(loc)}
                            onChange={() => toggleLocation(loc)}
                            className="sr-only"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="mb-6">
                    <h4 className="text-primary text-xs font-medium tracking-wider uppercase mb-4">
                      Modalidad
                    </h4>
                    <div className="space-y-3">
                      {["Venta", "Alquiler"].map(status => (
                        <label key={status} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${filters.statuses.includes(status)
                            ? "bg-primary border-primary"
                            : "border-border group-hover:border-primary/50"
                            }`}>
                            {filters.statuses.includes(status) && (
                              <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                            {status}
                          </span>
                          <input
                            type="checkbox"
                            checked={filters.statuses.includes(status)}
                            onChange={() => toggleStatus(status)}
                            className="sr-only"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Property Type Filter */}
                  <div className="mb-6">
                    <h4 className="text-primary text-xs font-medium tracking-wider uppercase mb-4">
                      Tipo de Propiedad
                    </h4>
                    <div className="space-y-3">
                      {availableTypes.map((type) => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${filters.types.includes(type)
                            ? "bg-primary border-primary"
                            : "border-border group-hover:border-primary/50"
                            }`}>
                            {filters.types.includes(type) && (
                              <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                            {type}
                          </span>
                          <input
                            type="checkbox"
                            checked={filters.types.includes(type)}
                            onChange={() => toggleType(type)}
                            className="sr-only"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-8">
                    <h4 className="text-primary text-xs font-medium tracking-wider uppercase mb-4">
                      Rango de Precio
                    </h4>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filters.priceRange}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceRange: Number(e.target.value) }))}
                      className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>$500K</span>
                      <span>$30,000K+</span>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button
                    type="button"
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full py-4 bg-primary text-primary-foreground text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors lg:hidden"
                  >
                    Ver Resultados
                  </button>
                  <button
                    type="button"
                    className="hidden lg:block w-full py-4 bg-primary text-primary-foreground text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors"
                  >
                    Aplicar Filtros
                  </button>
                </div>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {regularProperties.map((property, index) => (
                  <Link
                    key={property.id}
                    href={`/propiedad/${property.slug}`}
                    className={`group relative aspect-[4/5] w-full overflow-hidden bg-card text-left transition-all duration-700 block ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                      }`}
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    {/* Background Image */}
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Dark Overlay (Always present but darker on hover) */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 text-white z-10">

                      {/* Title */}
                      <h3 className="text-2xl font-sans tracking-wide mb-2 uppercase">
                        {property.title}
                      </h3>

                      {/* Price */}
                      <p className="text-xl text-primary font-medium mb-6">
                        {formatPrice(property.price, property.currency)}
                      </p>

                      {/* Divider */}
                      <div className="w-24 h-px bg-white/30 mb-6" />

                      {/* Specs */}
                      <div className="flex items-center gap-6 mb-8 text-sm font-medium tracking-wider">
                        {property.bedrooms !== undefined && (
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-lg">{property.bedrooms}</span>
                            <span className="text-[10px] text-white/70 uppercase">Habs</span>
                          </div>
                        )}
                        {property.bathrooms !== undefined && (
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-lg">{property.bathrooms}</span>
                            <span className="text-[10px] text-white/70 uppercase">Baños</span>
                          </div>
                        )}
                        {property.halfBathrooms !== undefined && (
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-lg">{property.halfBathrooms}</span>
                            <span className="text-[10px] text-white/70 uppercase">1/2 Baños</span>
                          </div>
                        )}
                        {(property.area || property.landArea) && (
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-lg">{property.area || property.landArea}</span>
                            <span className="text-[10px] text-white/70 uppercase">
                              {property.area ? "Const" : "Terr"}
                            </span>
                          </div>
                        )}
                        {(property.levels !== undefined && property.levels > 0) && (
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-lg">{property.levels}</span>
                            <span className="text-[10px] text-white/70 uppercase">Nivs</span>
                          </div>
                        )}
                      </div>

                      {/* Button */}
                      <span className="px-8 py-3 bg-transparent border border-white/50 text-white text-xs tracking-[0.2em] font-medium hover:bg-white hover:text-black transition-colors uppercase">
                        Ver Propiedad
                      </span>
                    </div>

                    {/* Default State (Visible when not hovering) */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                      <h3 className="text-white font-sans text-xl mb-1 truncate">{property.title}</h3>
                      <p className="text-primary font-medium">{formatPrice(property.price, property.currency)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


