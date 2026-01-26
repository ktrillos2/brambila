"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Bed, Bath, Maximize, LandPlot, Ruler, Compass, ChevronRight, X } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getPropertyById } from "@/lib/data"

export default function PropertyDetailPage() {
    const params = useParams()
    const id = Number(params?.id)
    const property = getPropertyById(id)

    if (!property) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <h1 className="text-2xl font-serif mb-4">Propiedad no encontrada</h1>
                <Link href="/" className="text-primary hover:underline">
                    Volver al Inicio
                </Link>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />

            {/* Hero Section */}
            <div className="relative h-[60vh] lg:h-[80vh] w-full mt-24">
                <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="container mx-auto">
                        <Link
                            href="/coleccion"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm tracking-widest uppercase transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver a la colección
                        </Link>
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                            <div>
                                <span className="px-4 py-2 bg-primary text-black text-xs font-bold tracking-widest uppercase mb-4 inline-block">
                                    {property.tag}
                                </span>
                                <h1 className="text-4xl lg:text-6xl font-sans tracking-wide text-white mb-2 uppercase">
                                    {property.title}
                                </h1>
                                <div className="flex items-center gap-2 text-white/90">
                                    <MapPin className="w-5 h-5" />
                                    <span className="text-lg font-light">{property.location}</span>
                                </div>
                            </div>
                            <div className="text-left lg:text-right">
                                <p className="text-4xl lg:text-5xl font-light text-primary">
                                    {property.price}
                                </p>
                                {property.priceLabel && (
                                    <p className="text-white/70 text-sm tracking-wider uppercase">{property.priceLabel}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Key Specs */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 border-b border-border pb-16">
                            {property.bedrooms !== undefined && (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm uppercase tracking-wider">
                                        <Bed className="w-4 h-4" /> Recámaras
                                    </div>
                                    <span className="text-3xl font-light">{property.bedrooms}</span>
                                </div>
                            )}
                            {property.bathrooms !== undefined && (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm uppercase tracking-wider">
                                        <Bath className="w-4 h-4" /> Baños
                                    </div>
                                    <span className="text-3xl font-light">{property.bathrooms}</span>
                                </div>
                            )}
                            {(property.area || property.landArea) && (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm uppercase tracking-wider">
                                        {property.area ? <Maximize className="w-4 h-4" /> : <LandPlot className="w-4 h-4" />}
                                        {property.area ? "Construcción" : "Terreno"}
                                    </div>
                                    <span className="text-3xl font-light">{property.area || property.landArea}</span>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-16">
                            <h2 className="text-2xl font-sans mb-6 uppercase tracking-wide">Descripción</h2>
                            <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                                {property.description}
                                {property.measures && (
                                    <div className="mt-8 bg-card p-8 border border-border">
                                        <h3 className="text-lg text-foreground font-medium mb-4 flex items-center gap-2">
                                            <Ruler className="w-5 h-5 text-primary" />
                                            Medidas y Colindancias
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            {property.measures.total && <p><strong className="text-foreground">Superficie Total:</strong> {property.measures.total}</p>}
                                            {property.measures.north && <p><strong className="text-foreground">Norte:</strong> {property.measures.north}</p>}
                                            {property.measures.south && <p><strong className="text-foreground">Sur:</strong> {property.measures.south}</p>}
                                            {property.measures.east && <p><strong className="text-foreground">Oriente:</strong> {property.measures.east}</p>}
                                            {property.measures.west && <p><strong className="text-foreground">Poniente:</strong> {property.measures.west}</p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Features List (if available) */}
                        {property.features && (
                            <div className="mb-16">
                                <h2 className="text-2xl font-sans mb-6 uppercase tracking-wide">Amenidades y Características</h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {property.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Gallery Section */}
                        {property.images && property.images.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-2xl font-sans mb-6 uppercase tracking-wide">Galería</h2>
                                <GalleryCarousel images={property.images} title={property.title} />
                            </div>
                        )}
                    </div>

                    {/* Sidebar Details */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Technical Details Card */}
                        <div className="bg-card border border-border p-8 sticky top-32">
                            <h3 className="text-xl font-sans mb-6 uppercase tracking-wide border-b border-border pb-4">Detalles</h3>
                            <div className="space-y-4 text-sm">
                                {property.code && (
                                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                                        <span className="text-muted-foreground">Código:</span>
                                        <span className="font-medium">{property.code}</span>
                                    </div>
                                )}
                                {property.sector && (
                                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                                        <span className="text-muted-foreground">Sector:</span>
                                        <span className="font-medium">{property.sector}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center py-2 border-b border-border/50">
                                    <span className="text-muted-foreground">Tipo:</span>
                                    <span className="font-medium">{property.type}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-border/50">
                                    <span className="text-muted-foreground">Operación:</span>
                                    <span className="font-medium">{property.status}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-border/50">
                                    <span className="text-muted-foreground">Precio:</span>
                                    <span className="font-medium text-primary">{property.price}</span>
                                </div>
                                {property.condition && (
                                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                                        <span className="text-muted-foreground">Condición:</span>
                                        <span className="font-medium">{property.condition}</span>
                                    </div>
                                )}
                            </div>

                            <button className="w-full mt-8 bg-primary text-black py-4 font-bold tracking-widest uppercase hover:bg-white transition-colors">
                                Contactar Agente
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    )
}

function GalleryCarousel({ images, title }: { images: string[], title: string }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
    const scrollNext = () => emblaApi && emblaApi.scrollNext()

    return (
        <>
            <div className="relative group">
                <div className="overflow-hidden rounded-lg" ref={emblaRef}>
                    <div className="flex">
                        {images.map((img, index) => (
                            <div key={index} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4 first:pl-0">
                                <div
                                    className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <Image
                                        src={img}
                                        alt={`${title} - Imagen ${index + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:bg-black/70"
                    onClick={scrollPrev}
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:bg-black/70"
                    onClick={scrollNext}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Lightbox Overlay */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div className="relative w-full max-w-7xl h-full max-h-[90vh] flex items-center justify-center">
                        <Image
                            src={selectedImage}
                            alt="Vista ampliada"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            )}
        </>
    )
}
