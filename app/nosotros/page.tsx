import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutSection } from "@/components/about-section"
import { PhilosophySection } from "@/components/philosophy-section"

export default function NosotrosPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <div className="pt-20">
                <AboutSection />
                <PhilosophySection />
            </div>
            <Footer />
        </main>
    )
}
