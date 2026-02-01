"use client"

import React from "react"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Bed, Bath, Maximize, LandPlot, Layers, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { properties as allProperties, Property } from "@/lib/data"

const locations = ["Autlán de Navarro", "El Grullo", "Cihuatlán", "Llanogrande", "Medellín", "Rionegro"]

export function PropertiesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [filters, setFilters] = useState({
    locations: [] as string[],
    statuses: [] as string[],
    types: [] as string[],
    priceRange: 50
  })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

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

  const filteredProperties = allProperties.filter(p => {
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
  const regularProperties = filteredProperties.filter(p => p.id !== featuredProperty?.id)

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

          {/* Results & Sort */}
          <div className={`flex justify-between items-center mb-8 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
            <p className="text-muted-foreground text-sm">
              Mostrando <span className="text-primary">{filteredProperties.length}</span> resultados
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Ordenar por:</span>
              <select className="bg-transparent border-none text-foreground focus:outline-none cursor-pointer">
                <option>Relevancia</option>
                <option>Precio: Menor a Mayor</option>
                <option>Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:col-span-1 transition-all duration-1000 delay-150 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}>
              {/* Keep existing filters structure */}
              <div className="bg-card border border-border p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
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
                    {locations.map(loc => (
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
                    {[
                      { label: "Casas", value: "Casa" },
                      { label: "Bodegas", value: "Bodega" },
                      { label: "Locales", value: "Local" },
                      { label: "Lotes", value: "Terreno" }
                    ].map((type) => (
                      <label key={type.value} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${filters.types.includes(type.value)
                          ? "bg-primary border-primary"
                          : "border-border group-hover:border-primary/50"
                          }`}>
                          {filters.types.includes(type.value) && (
                            <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {type.label}
                        </span>
                        <input
                          type="checkbox"
                          checked={filters.types.includes(type.value)}
                          onChange={() => toggleType(type.value)}
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
                  className="w-full py-4 bg-primary text-primary-foreground text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {regularProperties.map((property, index) => (
                  <Link
                    key={property.id}
                    href={`/propiedad/${property.id}`}
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
                        {property.price}
                      </p>

                      {/* Divider */}
                      <div className="w-24 h-px bg-white/30 mb-6" />

                      {/* Specs */}
                      <div className="flex items-center gap-6 mb-8 text-sm font-medium tracking-wider">
                        {property.bedrooms && (
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-lg">{property.bedrooms}</span>
                            <span className="text-[10px] text-white/70 uppercase">Habs</span>
                          </div>
                        )}
                        {property.bathrooms && (
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-lg">{property.bathrooms}</span>
                            <span className="text-[10px] text-white/70 uppercase">Baños</span>
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
                      <p className="text-primary font-medium">{property.price}</p>
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


