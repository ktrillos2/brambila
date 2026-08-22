"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { client } from "@/sanity/lib/client"
import { PHILOSOPHY_QUERY } from "@/sanity/lib/queries"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"
import { getLocalized, getLocalizedArray } from "@/lib/sanity-i18n"

type PhilosophyData = {
  title: any
  mission: any
  vision: any
  values: any
  quote: any
  image: string
}

export function PhilosophySection() {
  const { language } = useLanguage()
  const t = translations[language]

  const [isVisible, setIsVisible] = useState(false)
  const [data, setData] = useState<PhilosophyData | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(PHILOSOPHY_QUERY)
        if (result) {
          setData(result)
        }
      } catch (error) {
        console.error("Error fetching philosophy data:", error)
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

  const title = getLocalized(data.title, language) || t.about.philosophyTitle
  const mission = getLocalized(data.mission, language)
  const vision = getLocalized(data.vision, language)
  const quote = getLocalized(data.quote, language)
  const values = getLocalizedArray(data.values, language)

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-[#080808] text-white relative overflow-hidden"
    >
      {/* Background Texture/Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] opacity-50" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Side */}
          <div className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}>
            <span className="text-[#D4AF37] text-xs font-medium tracking-[0.2em] uppercase block mb-4">
              {t.about.philosophyBadge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans text-white mb-16 tracking-wide leading-tight">
              {title}
            </h2>

            {/* Misión */}
            {mission && (
              <div className="mb-12 border-l border-[#D4AF37] pl-8">
                <h3 className="text-lg font-sans text-white mb-4 tracking-widest uppercase">
                  {t.about.mission}
                </h3>
                <p className="text-white/60 text-lg leading-relaxed font-light whitespace-pre-wrap">
                  {mission}
                </p>
              </div>
            )}

            {/* Visión */}
            {vision && (
              <div className="mb-12 border-l border-[#D4AF37] pl-8">
                <h3 className="text-lg font-sans text-white mb-4 tracking-widest uppercase">
                  {t.about.vision}
                </h3>
                <p className="text-white/60 text-lg leading-relaxed font-light whitespace-pre-wrap">
                  {vision}
                </p>
              </div>
            )}

            {/* Valores */}
            {values.length > 0 && (
              <div className="border-l border-[#D4AF37] pl-8">
                <h3 className="text-lg font-sans text-white mb-6 tracking-widest uppercase">
                  {t.about.values}
                </h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {values.map((value, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-white/60 font-light text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Image Side */}
          <div className={`relative h-full min-h-[600px] transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}>
            {/* Main Image */}
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={data.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"}
                alt="Arquitectura moderna"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Quote Card */}
            {quote && (
              <div className="absolute bottom-12 -left-12 right-12 md:right-auto md:left-8 w-auto md:w-[90%] bg-[#0f0f0f]/95 backdrop-blur-sm p-8 border border-white/5 shadow-2xl">
                <span className="text-4xl text-[#D4AF37] font-sans leading-none block mb-4">“</span>

                <p className="text-white font-sans italic text-lg lg:text-xl leading-relaxed mb-6 tracking-wide whitespace-pre-wrap">
                  {quote}
                </p>

                <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase block">
                  {t.about.realEstateSub}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
