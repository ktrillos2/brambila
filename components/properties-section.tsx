"use client"

import React, { useEffect, useRef, useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bed, Bath, Maximize, Layers, X, ChevronDown, SlidersHorizontal, Search } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { ALL_PROPERTIES_QUERY, PROPERTY_CONFIGS_QUERY } from "@/sanity/lib/queries"
import { useSearchParams, useRouter } from "next/navigation"
import { formatPrice } from "@/lib/utils"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"
import { getLocalized } from "@/lib/sanity-i18n"

type Property = {
  id: string
  title: any
  slug: string
  location: any
  price: string
  currency?: string
  tag: any
  status: any
  type: any
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
  propertyTypes: any[]
  amenities: any[]
}

export function PropertiesSection() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const rawSearchQuery = searchParams.get("search") || ""
  const searchQuery = rawSearchQuery.toLowerCase()

  const [searchTerm, setSearchTerm] = useState(rawSearchQuery)

  const { language } = useLanguage()
  const t = translations[language]

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
  const [sortBy, setSortBy] = useState<"relevance" | "price-asc" | "price-desc">("relevance")
  const [filters, setFilters] = useState({
    locations: [] as string[],
    statuses: [] as string[],
    types: [] as string[],
    priceRange: 100
  })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
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

        setProperties(propertiesData || [])
        if (configData) {
          setFilterConfig(configData)
        }
      } catch (error) {
        console.error("Failed to fetch properties data:", error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (searchQuery) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.05 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
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
    setFilters({ locations: [], statuses: [], types: [], priceRange: 100 })
  }

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter(p => {
        const pTitle = getLocalized(p.title, language).toLowerCase()
        const pLocation = getLocalized(p.location, language).toLowerCase()
        const pType = getLocalized(p.type, language).toLowerCase()
        const pStatus = getLocalized(p.status, language) || ""
        const pCode = p.code ? p.code.toLowerCase() : ""

        // Text Search
        if (searchTerm) {
          const searchContent = `${pTitle} ${pLocation} ${pCode} ${pType}`
          if (!searchContent.includes(searchTerm.toLowerCase())) {
            return false
          }
        }

        // Location filter
        if (filters.locations.length > 0) {
          const rawLoc = getLocalized(p.location, "es")
          if (!filters.locations.some(loc => rawLoc.includes(loc))) {
            return false
          }
        }

        // Status filter (Venta / Alquiler)
        if (filters.statuses.length > 0) {
          const rawStatus = typeof p.status === "string" ? p.status : (p.status?.es || "")
          const isSale = rawStatus.toLowerCase().includes("venta") || rawStatus.toLowerCase().includes("sale")
          const isRent = rawStatus.toLowerCase().includes("alquiler") || rawStatus.toLowerCase().includes("rent")
          
          const matches = filters.statuses.some(st => {
            if (st === "Venta" && isSale) return true
            if (st === "Alquiler" && isRent) return true
            return false
          })
          if (!matches) return false
        }

        // Type filter
        if (filters.types.length > 0) {
          const rawType = typeof p.type === "string" ? p.type : (p.type?.es || "")
          if (!filters.types.includes(rawType)) {
            return false
          }
        }

        return true
      })
      .sort((a, b) => {
        const parsePrice = (priceStr: string) => {
          const num = parseFloat(priceStr?.replace(/[^0-9.]/g, "") || "0")
          return isNaN(num) ? 0 : num
        }
        if (sortBy === "price-asc") {
          return parsePrice(a.price) - parsePrice(b.price)
        }
        if (sortBy === "price-desc") {
          return parsePrice(b.price) - parsePrice(a.price)
        }
        return 0
      })
  }, [properties, searchTerm, filters, sortBy, language])

  // Extract available locations and types
  const availableLocations = useMemo(() => {
    if (filterConfig.locations.length > 0) {
      return filterConfig.locations
    }
    return Array.from(new Set(properties.map(p => getLocalized(p.location, "es")))).filter(Boolean).sort()
  }, [filterConfig.locations, properties])

  const availableTypes = useMemo(() => {
    if (filterConfig.propertyTypes.length > 0) {
      return filterConfig.propertyTypes.map(t => typeof t === "object" ? (t.es || getLocalized(t, "es")) : t)
    }
    return Array.from(new Set(properties.map(p => typeof p.type === "object" ? (p.type.es || "") : p.type))).filter(Boolean).sort()
  }, [filterConfig.propertyTypes, properties])

  const getTypeLabel = (rawType: string) => {
    return (t.property.types as Record<string, string>)[rawType] || rawType
  }

  return (
    <section
      ref={sectionRef}
      id="propiedades"
      className="py-10 md:py-20 bg-secondary overflow-hidden min-h-screen"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">
            {t.catalog.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans text-foreground mt-4 mb-4 tracking-wide">
            {t.catalog.headingMain}{" "}
            <span className="italic text-muted-foreground font-light">{t.catalog.headingSub}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.catalog.subtitle}
          </p>
        </div>

        {/* Search and Results Toolbar */}
        <div className={`mb-8 transition-all duration-1000 delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          {/* Search Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              router.replace(`/propiedades?search=${encodeURIComponent(searchTerm)}`, { scroll: false })
            }}
            className="w-full max-w-md mb-8 mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder={t.catalog.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: "45px" }}
                className="w-full pr-4 py-4 bg-card border border-border text-foreground rounded-lg placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all text-base shadow-sm"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <Search className="w-5 h-5" />
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
                <span className="text-sm font-medium">{t.catalog.filtersButton}</span>
                {(filters.locations.length + filters.statuses.length + filters.types.length) > 0 && (
                  <span className="bg-primary text-primary-foreground text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {filters.locations.length + filters.statuses.length + filters.types.length}
                  </span>
                )}
              </button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                  aria-label={t.catalog.sortBy}
                >
                  <option value="relevance">{t.catalog.sortRelevance}</option>
                  <option value="price-asc">{t.catalog.sortPriceAsc}</option>
                  <option value="price-desc">{t.catalog.sortPriceDesc}</option>
                </select>
                <div className="flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border text-foreground rounded-lg h-full shadow-sm">
                  <span className="text-sm font-medium">{t.catalog.sortButton}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="text-center border-b border-border/40 pb-4">
              <p className="text-muted-foreground text-xs uppercase tracking-widest font-medium">
                {t.catalog.resultsCount(filteredProperties.length)}
              </p>
            </div>
          </div>

          {/* Desktop Toolbar */}
          <div className="hidden lg:flex flex-row items-center justify-between mb-6 pb-4 border-b border-border/50">
            <p className="text-muted-foreground text-sm font-medium">
              <span className="text-primary font-bold">{filteredProperties.length}</span> {t.catalog.resultsFound}
            </p>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">{t.catalog.sortBy}</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-none text-foreground font-medium focus:outline-none cursor-pointer pr-6 appearance-none py-1 text-right"
                  aria-label={t.catalog.sortBy}
                >
                  <option value="relevance">{t.catalog.sortRelevance}</option>
                  <option value="price-asc">{t.catalog.sortPriceAsc}</option>
                  <option value="price-desc">{t.catalog.sortPriceDesc}</option>
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
            <div className={`
              h-full lg:h-auto overflow-y-auto lg:overflow-visible
              ${showMobileFilters ? "fixed right-0 top-0 h-full w-[300px] bg-card p-6 shadow-2xl animate-in slide-in-from-right" : ""}
              lg:static lg:bg-transparent lg:p-0 lg:shadow-none lg:w-auto
            `}>
              {/* Mobile Close Button */}
              <div className="flex lg:hidden justify-between items-center mb-6">
                <h3 className="text-xl font-sans text-foreground">{t.catalog.filterSidebar.title}</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-accent rounded-full transition-colors"
                  aria-label="Cerrar filtros"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-card border border-border p-6 lg:sticky lg:top-24 rounded-lg">
                <div className="hidden lg:flex justify-between items-center mb-6">
                  <h3 className="text-xl font-sans text-foreground tracking-wide">{t.catalog.filterSidebar.title}</h3>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wider uppercase"
                  >
                    {t.catalog.filterSidebar.reset}
                  </button>
                </div>

                {/* Location Filter */}
                <div className="mb-6">
                  <h4 className="text-primary text-xs font-medium tracking-wider uppercase mb-4">
                    {t.catalog.filterSidebar.location}
                  </h4>
                  <div className="space-y-3">
                    {availableLocations.map(loc => (
                      <label key={loc} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                          filters.locations.includes(loc)
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
                    {t.catalog.filterSidebar.status}
                  </h4>
                  <div className="space-y-3">
                    {[
                      { key: "Venta", label: t.property.sale },
                      { key: "Alquiler", label: t.property.rent }
                    ].map(statusItem => (
                      <label key={statusItem.key} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                          filters.statuses.includes(statusItem.key)
                            ? "bg-primary border-primary"
                            : "border-border group-hover:border-primary/50"
                        }`}>
                          {filters.statuses.includes(statusItem.key) && (
                            <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {statusItem.label}
                        </span>
                        <input
                          type="checkbox"
                          checked={filters.statuses.includes(statusItem.key)}
                          onChange={() => toggleStatus(statusItem.key)}
                          className="sr-only"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Property Type Filter */}
                <div className="mb-6">
                  <h4 className="text-primary text-xs font-medium tracking-wider uppercase mb-4">
                    {t.catalog.filterSidebar.propertyType}
                  </h4>
                  <div className="space-y-3">
                    {availableTypes.map((type) => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                          filters.types.includes(type)
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
                          {getTypeLabel(type)}
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

                {/* Apply Button */}
                <button
                  type="button"
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full py-4 bg-primary text-primary-foreground text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors lg:hidden"
                >
                  {t.catalog.filterSidebar.viewResults}
                </button>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            {filteredProperties.length === 0 ? (
              <div className="bg-card border border-border p-12 text-center rounded-lg">
                <p className="text-muted-foreground text-lg mb-4">{t.catalog.noResults}</p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-2 bg-primary text-black text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors"
                >
                  {t.catalog.filterSidebar.reset}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProperties.map((property, index) => {
                  const propertyTitle = getLocalized(property.title, language)
                  const rawTag = getLocalized(property.tag, language) || property.tag || "Venta"
                  const isRent = rawTag.toLowerCase().includes("alquiler") || rawTag.toLowerCase().includes("rent")
                  const displayTag = isRent ? t.property.rent : t.property.sale

                  return (
                    <Link
                      key={property.id}
                      href={`/propiedad/${property.slug}`}
                      className={`group relative aspect-[4/5] w-full overflow-hidden bg-card text-left transition-all duration-700 block ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                      }`}
                      style={{ transitionDelay: `${200 + index * 80}ms` }}
                    >
                      {/* Background Image */}
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={propertyTitle}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Tag Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase ${
                          !isRent ? "bg-white text-black" : "bg-primary text-black"
                        }`}>
                          {displayTag}
                        </span>
                      </div>

                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500" />

                      {/* Content Overlay on Hover */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 text-white z-10">
                        <h3 className="text-2xl font-sans tracking-wide mb-2 uppercase">
                          {propertyTitle}
                        </h3>

                        <p className="text-xl text-primary font-medium mb-6">
                          {formatPrice(property.price, property.currency)}
                        </p>

                        <div className="w-24 h-px bg-white/30 mb-6" />

                        {/* Specs */}
                        <div className="flex items-center gap-6 mb-8 text-sm font-medium tracking-wider">
                          {property.bedrooms !== undefined && (
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-lg">{property.bedrooms}</span>
                              <span className="text-[10px] text-white/70 uppercase">{t.property.bedroomsShort}</span>
                            </div>
                          )}
                          {property.bathrooms !== undefined && (
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-lg">{property.bathrooms}</span>
                              <span className="text-[10px] text-white/70 uppercase">{t.property.bathroomsShort}</span>
                            </div>
                          )}
                          {property.halfBathrooms !== undefined && (
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-lg">{property.halfBathrooms}</span>
                              <span className="text-[10px] text-white/70 uppercase">{t.property.halfBathroomsShort}</span>
                            </div>
                          )}
                          {(property.area || property.landArea) && (
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-lg">{property.area || property.landArea}</span>
                              <span className="text-[10px] text-white/70 uppercase">
                                {property.area ? t.property.constructionShort : t.property.landShort}
                              </span>
                            </div>
                          )}
                          {(property.levels !== undefined && property.levels > 0) && (
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-lg">{property.levels}</span>
                              <span className="text-[10px] text-white/70 uppercase">{t.property.levelsShort}</span>
                            </div>
                          )}
                        </div>

                        {/* Button */}
                        <span className="px-8 py-3 bg-transparent border border-white/50 text-white text-xs tracking-[0.2em] font-medium hover:bg-white hover:text-black transition-colors uppercase">
                          {t.property.viewProperty}
                        </span>
                      </div>

                      {/* Default State */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                        <h3 className="text-white font-sans text-xl mb-1 truncate">{propertyTitle}</h3>
                        <p className="text-primary font-medium">{formatPrice(property.price, property.currency)}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
