"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight, Bed, Bath, Maximize, Layers } from "lucide-react"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { HOME_COLLECTION_QUERY } from "@/sanity/lib/queries"
import { formatPrice } from "@/lib/utils"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"
import { getLocalized } from "@/lib/sanity-i18n"

type Property = {
    id: string
    slug: string
    title: any
    location: any
    price: string
    currency?: string
    tag: any
    image: string
    bedrooms?: number
    bathrooms?: number
    halfBathrooms?: number
    area?: string
    levels?: number
}

type HomeCollectionData = {
    title: any
    subtitle: any
    featuredProperties: Property[]
}

export function HomeCollectionSection() {
    const { language } = useLanguage()
    const t = translations[language]

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: true,
        skipSnaps: false,
        dragFree: true
    })
    const [data, setData] = useState<HomeCollectionData | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch(HOME_COLLECTION_QUERY)
                setData(result)
            } catch (error) {
                console.error("Failed to fetch home collection:", error)
            }
        }
        fetchData()
    }, [])

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    if (!data) return null

    const sectionTitle = getLocalized(data.title, language) || t.collection.title
    const sectionSubtitle = getLocalized(data.subtitle, language) || t.collection.badge
    const titleParts = sectionTitle.split(' ')

    return (
        <section className="py-20 bg-[#0a0a0a] text-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                {/* Header with Navigation */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div>
                        <h3 className="text-primary text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase mb-4">
                            {sectionSubtitle}
                        </h3>
                        <h2 className="text-4xl md:text-5xl font-sans tracking-wide uppercase">
                            {titleParts[0]} <span className="text-muted-foreground italic font-light">{titleParts.slice(1).join(' ')}</span>
                        </h2>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={scrollPrev}
                            className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
                            aria-label={t.collection.prevSlide}
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
                            aria-label={t.collection.nextSlide}
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Carousel with Native Touch Swipe */}
                <div className="overflow-hidden -mx-4 px-4 touch-pan-y" ref={emblaRef}>
                    <div className="flex gap-6">
                        {data.featuredProperties?.filter(p => p.slug).map((property) => {
                            const propertyTitle = getLocalized(property.title, language)
                            const rawTag = getLocalized(property.tag, language) || property.tag || "Venta"
                            const isRent = rawTag.toLowerCase().includes("alquiler") || rawTag.toLowerCase().includes("rent")
                            const displayTag = isRent ? t.property.rent : t.property.sale

                            return (
                                <div
                                    key={property.id}
                                    className="flex-[0_0_100%] md:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0"
                                >
                                    <Link
                                        href={`/propiedad/${property.slug}`}
                                        className="group relative aspect-[4/5] w-full overflow-hidden bg-card text-left transition-all duration-700 cursor-pointer block"
                                    >
                                        {/* Background Image */}
                                        {property.image && (
                                            <Image
                                                src={property.image}
                                                alt={propertyTitle}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        )}

                                        {/* Tag (Always Visible) */}
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase ${
                                                !isRent ? "bg-white text-black" : "bg-primary text-black"
                                            }`}>
                                                {displayTag}
                                            </span>
                                        </div>

                                        {/* Dark Overlay */}
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500" />

                                        {/* Content Overlay (Hover State) */}
                                        <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 text-white z-10">
                                            {/* Title */}
                                            <h3 className="text-2xl font-sans tracking-wide mb-2 uppercase">
                                                {propertyTitle}
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
                                                        <Bed className="w-5 h-5 text-primary" />
                                                        <span className="text-lg">{property.bedrooms}</span>
                                                        <span className="text-[10px] text-white/70 uppercase">{t.property.bedroomsShort}</span>
                                                    </div>
                                                )}
                                                {property.bathrooms !== undefined && (
                                                    <div className="flex flex-col items-center gap-1">
                                                        <Bath className="w-5 h-5 text-primary" />
                                                        <span className="text-lg">{property.bathrooms}</span>
                                                        <span className="text-[10px] text-white/70 uppercase">{t.property.bathroomsShort}</span>
                                                    </div>
                                                )}
                                                {property.halfBathrooms !== undefined && (
                                                    <div className="flex flex-col items-center gap-1">
                                                        <Bath className="w-5 h-5 text-primary" />
                                                        <span className="text-lg">{property.halfBathrooms}</span>
                                                        <span className="text-[10px] text-white/70 uppercase">{t.property.halfBathroomsShort}</span>
                                                    </div>
                                                )}
                                                {property.area && (
                                                    <div className="flex flex-col items-center gap-1">
                                                        <Maximize className="w-5 h-5 text-primary" />
                                                        <span className="text-lg">{property.area}</span>
                                                        <span className="text-[10px] text-white/70 uppercase">{t.property.constructionShort}</span>
                                                    </div>
                                                )}
                                                {(property.levels !== undefined && property.levels > 0) && (
                                                    <div className="flex flex-col items-center gap-1">
                                                        <Layers className="w-5 h-5 text-primary" />
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
                                            <h3 className="text-white font-sans text-xl mb-1 truncate uppercase tracking-wider">{propertyTitle}</h3>
                                            <p className="text-primary font-medium">{formatPrice(property.price, property.currency)}</p>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
