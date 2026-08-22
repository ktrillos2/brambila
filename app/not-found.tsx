"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"

export default function NotFound() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-8 mt-24">
        <h1 className="text-6xl font-light mb-4">404</h1>
        <h2 className="text-2xl font-sans mb-8">{t.notFound.title}</h2>
        <p className="text-white/70 mb-8 max-w-md text-center">
          {t.notFound.description}
        </p>
        <Link 
          href="/propiedades" 
          className="bg-primary text-black px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          {t.notFound.backToProperties}
        </Link>
      </main>

      <Footer />
    </div>
  )
}
