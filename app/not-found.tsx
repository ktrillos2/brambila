import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-8 mt-24">
        <h1 className="text-6xl font-light mb-4">404</h1>
        <h2 className="text-2xl font-sans mb-8">Página no encontrada</h2>
        <p className="text-white/70 mb-8 max-w-md text-center">
          Lo sentimos, la propiedad o la página que estás buscando no existe o ha sido movida.
        </p>
        <Link 
          href="/propiedades" 
          className="bg-primary text-black px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Ver propiedades disponibles
        </Link>
      </main>

      <Footer />
    </div>
  )
}
