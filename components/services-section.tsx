"use client"

import { Home, Key, FileText, ArrowRight, LucideIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { client } from "@/sanity/lib/client"
import { SERVICES_QUERY } from "@/sanity/lib/queries"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"
import { getLocalized } from "@/lib/sanity-i18n"
import Link from "next/link"

const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  Key,
  FileText
}

type ServiceItem = {
  icon: string
  title: any
  description: any
}

type ServicesData = {
  subtitle: any
  title: any
  description: any
  servicesList: ServiceItem[]
}

export function ServicesSection() {
  const { language } = useLanguage()
  const t = translations[language]

  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [data, setData] = useState<ServicesData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(SERVICES_QUERY)
        setData(result)
      } catch (error) {
        console.error("Failed to fetch services:", error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [data])

  if (!data) return null

  const subtitle = getLocalized(data.subtitle, language) || t.services.badge
  const title = getLocalized(data.title, language) || t.services.title
  const description = getLocalized(data.description, language) || t.services.description

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="py-20 md:py-32 bg-secondary overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">
            {subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans text-foreground mt-4 mb-6 tracking-wide">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.servicesList?.map((service, index) => {
            const IconComponent = ICON_MAP[service.icon] || Home
            const serviceTitle = getLocalized(service.title, language)
            const serviceDesc = getLocalized(service.description, language)

            return (
              <div
                key={serviceTitle || index}
                className={`group relative bg-card p-8 md:p-10 border border-border hover:border-primary/50 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                {/* Icon */}
                <div className="mb-8">
                  <IconComponent className="w-12 h-12 text-muted-foreground/50 group-hover:text-primary transition-colors duration-500" />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-sans text-foreground mb-4 tracking-wide">
                  {serviceTitle}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {serviceDesc}
                </p>

                {/* CTA Link */}
                <Link
                  href="/#contacto"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium tracking-wider uppercase group/link"
                >
                  <span>{t.services.learnMore}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
