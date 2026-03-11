import { Metadata } from 'next'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutSection } from "@/components/about-section"
import { PhilosophySection } from "@/components/philosophy-section"

export const metadata: Metadata = {
    title: "Nosotros | Brambila's Inmobiliaria",
    description: "Conoce más sobre Brambila's Inmobiliaria, nuestra filosofía y nuestro equipo de expertos en bienes raíces en Jalisco.",
    alternates: {
        canonical: '/nosotros',
    },
}

export default function NosotrosPage() {
    return (
        <main className="min-h-screen bg-background">
            <h1 className="sr-only">Nosotros - Brambila's Inmobiliaria</h1>
            <Header />
            <div className="pt-20">
                <AboutSection />
                <PhilosophySection />
            </div>
            <Footer />
        </main>
    )
}
