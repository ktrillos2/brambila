"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Bed, Bath, Maximize, LandPlot, Ruler, Compass, ChevronRight, X, Play, Layers, Share2, FileDown } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import QRCode from "qrcode"
import { PropertyPDF } from "@/components/property-pdf"
import { useEffect } from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { formatPrice } from "@/lib/utils"

type Property = {
    id: string
    title: string
    slug: string
    location: string
    locationPDF?: string
    price: string
    currency?: string

    tag: string
    status: string
    type: string
    image: string
    images?: string[]
    video?: any
    videoUrl?: string
    description?: string
    bedrooms?: number
    bathrooms?: number
    halfBathrooms?: number
    area?: string
    landArea?: string
    levels?: number
    code?: string
    sector?: string
    condition?: string
    features?: string[]

    latitude?: number
    longitude?: number
    measures?: {
        total?: string
        north?: string
        south?: string
        east?: string
        west?: string
    }
    featured?: boolean
    priceLabel?: string
}

type Props = {
    property: Property
    globalConfig?: any
}

export function PropertyDetailView({ property, globalConfig }: Props) {

    const [showVideo, setShowVideo] = useState(false)
    const [qrCodeUrl, setQrCodeUrl] = useState("")
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        // Generate QR Code
        QRCode.toDataURL(window.location.href)
            .then(url => {
                setQrCodeUrl(url)
            })
            .catch(err => {
                console.error("Error generating QR code", err)
            })
    }, [])


    const handleShare = async () => {
        const shareData = {
            title: property.title,
            text: `Mira esta propiedad: ${property.title}`,
            url: window.location.href,
        }

        try {
            if (navigator.share) {
                await navigator.share(shareData)
            } else {
                await navigator.clipboard.writeText(window.location.href)
                alert("Enlace copiado al portapapeles")
            }
        } catch (err) {
            console.error("Error al compartir:", err)
        }
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />

            {/* Hero Section */}
            <div className="relative h-[60vh] lg:h-[80vh] w-full mt-24">
                <Image
                    src={`${property.image}?auto=format&fit=crop&w=1920&q=80`}
                    alt={property.title}
                    fill
                    sizes="100vw"
                    className="object-cover"

                    priority

                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="container mx-auto">
                        <Link
                            href="/propiedades"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm tracking-widest uppercase transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver a propiedades
                        </Link>
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                            <div>
                                <span className="px-4 py-2 bg-primary text-black text-xs font-bold tracking-widest uppercase mb-4 inline-block">
                                    {property.tag}
                                </span>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans tracking-wide text-white mb-2 uppercase">
                                    {property.title}
                                </h1>
                                <div className="flex items-center gap-2 text-white/90">
                                    <MapPin className="w-5 h-5" />
                                    <span className="text-lg font-light">{property.location}</span>
                                </div>
                            </div>
                            <div className="text-left lg:text-right flex flex-col items-start lg:items-end gap-4">
                                <div>
                                    <p className="text-3xl lg:text-4xl font-light text-primary">
                                        {formatPrice(property.price, property.currency)}
                                    </p>
                                    {property.priceLabel && (
                                        <p className="text-white/70 text-sm tracking-wider uppercase">{property.priceLabel}</p>
                                    )}
                                </div>
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-2 px-6 py-2 border border-white/30 hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-widest uppercase text-white rounded-full bg-black/20 backdrop-blur-sm"
                                >
                                    <Share2 className="w-4 h-4" />
                                    Compartir
                                </button>
                                {isClient && (
                                    <PDFDownloadLink
                                        document={<PropertyPDF property={property} qrCodeUrl={qrCodeUrl} globalConfig={globalConfig} />}
                                        fileName={`ficha-${property.slug || 'propiedad'}.pdf`}
                                        className="flex items-center gap-2 px-6 py-2 border border-white/30 hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-widest uppercase text-white rounded-full bg-black/20 backdrop-blur-sm whitespace-nowrap"
                                    >

                                        {({ loading }) => (
                                            <>
                                                <FileDown className="w-4 h-4" />
                                                {loading ? "Generando..." : "Descargar Ficha"}
                                            </>
                                        )}
                                    </PDFDownloadLink>
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
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16 border-b border-border pb-16">
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
                            {property.halfBathrooms !== undefined && (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm uppercase tracking-wider">
                                        <Bath className="w-4 h-4" /> Medios Baños
                                    </div>
                                    <span className="text-3xl font-light">{property.halfBathrooms}</span>
                                </div>
                            )}
                            {(property.area) && (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm uppercase tracking-wider">
                                        <Maximize className="w-4 h-4" /> Construcción
                                    </div>
                                    <span className="text-3xl font-light">{property.area}</span>
                                </div>
                            )}
                            {(property.landArea) && (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm uppercase tracking-wider">
                                        <LandPlot className="w-4 h-4" /> Terreno
                                    </div>
                                    <span className="text-3xl font-light">{property.landArea}</span>
                                </div>
                            )}
                            {(property.levels !== undefined && property.levels > 0) && (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm uppercase tracking-wider">
                                        <Layers className="w-4 h-4" /> Niveles
                                    </div>
                                    <span className="text-3xl font-light">{property.levels}</span>
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

                        {/* Video Section */}
                        {property.videoUrl && (
                            <div className="mb-16">
                                <h2 className="text-2xl font-sans mb-6 uppercase tracking-wide">Video Recorrido</h2>
                                <div
                                    className="relative aspect-video w-full cursor-pointer group overflow-hidden rounded-lg bg-black"
                                    onClick={() => setShowVideo(true)}
                                >
                                    <video
                                        src={`${property.videoUrl}#t=0.1`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        preload="metadata"
                                        muted
                                        playsInline
                                    />
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                                <Play className="w-8 h-8 text-black fill-black ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Gallery Section */}
                        {property.images && property.images.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-2xl font-sans mb-6 uppercase tracking-wide">Galería</h2>
                                <GalleryCarousel images={property.images} title={property.title} />
                            </div>
                        )}

                        {/* Location Map */}
                        {(property.latitude && property.longitude) && (
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <h3 className="text-xl font-light text-white mb-6 tracking-wide">Ubicación</h3>
                                <div className="w-full aspect-video rounded-lg overflow-hidden bg-zinc-900 border border-white/10 relative">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        title="mapa-ubicacion"
                                        src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
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
                                    <span className="font-medium text-primary">{formatPrice(property.price, property.currency)}</span>
                                </div>
                                {property.condition && (
                                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                                        <span className="text-muted-foreground">Condición:</span>
                                        <span className="font-medium">{property.condition}</span>
                                    </div>
                                )}
                            </div>

                            <Link
                                href={`https://wa.me/523330366666?text=${encodeURIComponent(`Hola, estoy interesado en la propiedad: ${property.title} (Código: ${property.code || 'N/A'})`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full mt-8 bg-primary text-black py-4 font-bold tracking-widest uppercase hover:bg-white transition-colors block text-center"
                            >
                                Contactar Agente
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />

            {/* Video Modal */}
            {showVideo && property.videoUrl && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
                    onClick={() => setShowVideo(false)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowVideo(false);
                        }}
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div
                        className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <video
                            src={property.videoUrl}
                            className="w-full h-full"
                            controls
                            autoPlay
                            playsInline
                        />
                    </div>
                </div>
            )}
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
