import { Suspense } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HomeCollectionSection } from "@/components/home-collection-section"
import { PropertiesSection } from "@/components/properties-section"
import { ServicesSection } from "@/components/services-section"

import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <HomeCollectionSection />
      
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
