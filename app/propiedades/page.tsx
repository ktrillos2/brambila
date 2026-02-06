import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertiesSection } from "@/components/properties-section"

export default function PropiedadesPage() {
    return (
        <main className="min-h-screen bg-secondary">
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
