import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertiesSection } from "@/components/properties-section"

export default function PropiedadesPage() {
    return (
        <main className="min-h-screen bg-secondary">
            <Header />
            <div className="pt-20">
                <PropertiesSection />
            </div>
            <Footer />
        </main>
    )
}
