import { Metadata } from 'next'
import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertiesSection } from "@/components/properties-section"

export const metadata: Metadata = {
    title: "Propiedades | Brambila's Inmobiliaria",
    description: "Explora nuestro catálogo de propiedades exclusivas en venta y renta en Jalisco, México.",
    alternates: {
        canonical: '/propiedades',
    },
}

export default function PropiedadesPage() {
    return (
        <main className="min-h-screen bg-secondary">
            <h1 className="sr-only">Catálogo de Propiedades - Brambila's Inmobiliaria</h1>
            <Header />
            <div className="pt-20">
                <Suspense fallback={<div className="container mx-auto px-6 py-20 text-center">Cargando propiedades...</div>}>
                    <PropertiesSection />
                </Suspense>
            </div>
            <Footer />
        </main>
    )
}
