"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { client } from "@/sanity/lib/client"
import { PHILOSOPHY_QUERY } from "@/sanity/lib/queries"

type PhilosophyData = {
  title: string
  mission: string
  vision: string
  values: string[]
  quote: string
  image: string
}

export function PhilosophySection() {
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

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-[#080808] text-white relative overflow-hidden"
    >
      {/* Background Texture/Gradient (Subtle) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] opacity-50" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Side */}
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}>
            <span className="text-[#D4AF37] text-xs font-medium tracking-[0.2em] uppercase block mb-4">
              QUIÉNES SOMOS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans text-white mb-16 tracking-wide leading-tight">
              {data.title || "NUESTRA FILOSOFÍA"}
            </h2>

            {/* Misión */}
            <div className="mb-12 border-l border-[#D4AF37] pl-8">
              <h3 className="text-lg font-sans text-white mb-4 tracking-widest uppercase">
                MISIÓN
              </h3>
              <p className="text-white/60 text-lg leading-relaxed font-light whitespace-pre-wrap">
                {data.mission}
              </p>
            </div>

            {/* Visión */}
            <div className="mb-12 border-l border-[#D4AF37] pl-8">
              <h3 className="text-lg font-sans text-white mb-4 tracking-widest uppercase">
                VISIÓN
              </h3>
              <p className="text-white/60 text-lg leading-relaxed font-light whitespace-pre-wrap">
                {data.vision}
              </p>
            </div>

            {/* Valores */}
            <div className="border-l border-[#D4AF37] pl-8">
              <h3 className="text-lg font-sans text-white mb-6 tracking-widest uppercase">
                VALORES
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {data.values?.map((value) => (
                  <div
                    key={value}
                    className="flex items-center gap-3"
                  >
                    <Check className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-white/60 font-light text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className={`relative h-full min-h-[600px] transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}>
            {/* Main Image */}
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={data.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"}
                alt="Arquitectura moderna"
                fill
                className="object-cover"
              />
              {/* Overlay Gradient on Image */}
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Quote Card - Bottom Right Overlay */}
            <div className="absolute bottom-12 -left-12 right-12 md:right-auto md:left-8 w-auto md:w-[90%] bg-[#0f0f0f]/95 backdrop-blur-sm p-8 border border-white/5 shadow-2xl">
              <span className="text-4xl text-[#D4AF37] font-sans leading-none block mb-4">“</span>

              <p className="text-white font-sans italic text-lg lg:text-xl leading-relaxed mb-6 tracking-wide whitespace-pre-wrap">
                {data.quote}
              </p>

              <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase block">
                INMOBILIARIA
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
