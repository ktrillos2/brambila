"use client"

import Image from "next/image"
import { Users, Heart, Star, Shield } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { client } from "@/sanity/lib/client"
import { ABOUT_QUERY } from "@/sanity/lib/queries"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"
import { getLocalized } from "@/lib/sanity-i18n"

type AboutData = {
  title: any
  description1: any
  description2: any
  features: {
    label: any
    icon: string
  }[]
  image: string
}

// Icon mapping
const iconMap: Record<string, any> = {
  Users,
  Heart,
  Star,
  Shield
}

export function AboutSection() {
  const { language } = useLanguage()
  const t = translations[language]

  const [isVisible, setIsVisible] = useState(false)
  const [data, setData] = useState<AboutData | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(ABOUT_QUERY)
        if (result) {
          setData(result)
        }
      } catch (error) {
        console.error("Error fetching about data:", error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (!data) return

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

  const title = getLocalized(data.title, language) || t.about.title
  const description1 = getLocalized(data.description1, language)
  const description2 = getLocalized(data.description2, language)

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="py-10 md:py-20 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Text Side */}
          <div className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans text-foreground mb-4 tracking-wide">
              {title}
            </h2>

            {/* Gold underline */}
            <div className="w-20 h-1 bg-primary mb-10" />

            {description1 && (
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 whitespace-pre-wrap">
                {description1}
              </p>
            )}

            {description2 && (
              <p className="text-muted-foreground text-lg leading-relaxed mb-12 whitespace-pre-wrap">
                {description2}
              </p>
            )}

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {data.features?.map((feature, index) => {
                const IconComponent = iconMap[feature.icon] || Star
                const featureLabel = getLocalized(feature.label, language)

                return (
                  <div
                    key={featureLabel || index}
                    className={`flex items-center gap-4 transition-all duration-700 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-primary/10">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs tracking-[0.2em] text-muted-foreground font-medium uppercase">
                      {featureLabel}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Image Side */}
          <div className={`relative transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}>
            {/* Main Image with gold border accent */}
            <div className="relative">
              {/* Gold corner accents */}
              <div className="absolute -top-3 -right-3 w-32 h-32 border-t-2 border-r-2 border-primary z-10" />
              <div className="absolute -bottom-3 -left-3 w-32 h-32 border-b-2 border-l-2 border-primary z-10" />

              <div className="relative aspect-[4/3] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <Image
                  src={data.image || "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop"}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
