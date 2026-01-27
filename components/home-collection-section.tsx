"use client"

import * as React from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight, Bed, Bath, Maximize } from "lucide-react"

import { properties as allProperties, Property } from "@/lib/data"
import Link from "next/link"



export function HomeCollectionSection() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: true,
        skipSnaps: false,
        dragFree: true
    })

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <section className="py-20 bg-[#0a0a0a] text-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                {/* Header with Navigation */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div>
                        <h3 className="text-primary text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase mb-4">
                            Curaduría Exclusiva
                        </h3>
                        <h2 className="text-4xl md:text-5xl font-sans tracking-wide">
                            Colección <span className="text-muted-foreground italic font-light">Privada</span>
                        </h2>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={scrollPrev}
                            className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
                            aria-label="Previous slide"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
                            aria-label="Next slide"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
                    <div className="flex gap-6">
                        {allProperties.slice(0, 4).map((property) => (
                            <div
                                key={property.id}
                                className="flex-[0_0_100%] md:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0"
                            >
                                <Link
                                    href={`/propiedad/${property.id}`}
                                    className="group relative aspect-[4/5] w-full overflow-hidden bg-card text-left transition-all duration-700 cursor-pointer block"
                                >
                                    {/* Background Image */}
                                    <Image
                                        src={property.image}
                                        alt={property.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Tag (Always Visible) */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase ${property.tag === "Venta"
                                            ? "bg-white text-black"
                                            : "bg-primary text-black"
                                            }`}>
                                            {property.tag}
                                        </span>
                                    </div>

                                    {/* Dark Overlay (Always present but darker on hover) */}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500" />

                                    {/* Content Overlay (Hover State) */}
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
                                                    <Bed className="w-5 h-5 text-primary" />
                                                    <span className="text-lg">{property.bedrooms}</span>
                                                    <span className="text-[10px] text-white/70 uppercase">Labs</span>
                                                </div>
                                            )}
                                            {property.bathrooms && (
                                                <div className="flex flex-col items-center gap-1">
                                                    <Bath className="w-5 h-5 text-primary" />
                                                    <span className="text-lg">{property.bathrooms}</span>
                                                    <span className="text-[10px] text-white/70 uppercase">Baños</span>
                                                </div>
                                            )}
                                            {property.area && (
                                                <div className="flex flex-col items-center gap-1">
                                                    <Maximize className="w-5 h-5 text-primary" />
                                                    <span className="text-lg">{property.area}</span>
                                                    <span className="text-[10px] text-white/70 uppercase">Área</span>
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
                                        <h3 className="text-white font-sans text-xl mb-1 truncate uppercase tracking-wider">{property.title}</h3>
                                        <p className="text-primary font-medium">{property.price}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
