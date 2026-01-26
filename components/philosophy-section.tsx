"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const values = [
  "Calidad",
  "Seguridad",
  "Honestidad",
  "Transparencia"
]

export function PhilosophySection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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
  }, [])

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
            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase block mb-4">
              QUIÉNES SOMOS
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-16 tracking-wide leading-tight">
              NUESTRA FILOSOFÍA
            </h2>

            {/* Misión */}
            <div className="mb-12 border-l border-[#D4AF37] pl-8">
              <h3 className="text-lg font-serif text-white mb-4 tracking-widest uppercase">
                MISIÓN
              </h3>
              <p className="text-white/60 leading-relaxed font-light">
                <span className="text-[#D4AF37] font-medium">Inmobiliaria</span> es una empresa donde la confianza y la tranquilidad son primero.
                Comprometidos en brindar protección integral mediante nuestros servicios inmobiliarios.
              </p>
            </div>

            {/* Visión */}
            <div className="mb-12 border-l border-[#D4AF37] pl-8">
              <h3 className="text-lg font-serif text-white mb-4 tracking-widest uppercase">
                VISIÓN
              </h3>
              <p className="text-white/60 leading-relaxed font-light">
                Estar dentro de las mejores opciones inmobiliarias en el país, donde el cliente confíe que su
                patrimonio y tranquilidad están en buenas manos.
              </p>
            </div>

            {/* Valores */}
            <div className="border-l border-[#D4AF37] pl-8">
              <h3 className="text-lg font-serif text-white mb-6 tracking-widest uppercase">
                VALORES
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {values.map((value, index) => (
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
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                alt="Arquitectura moderna"
                fill
                className="object-cover"
              />
              {/* Overlay Gradient on Image */}
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Quote Card - Bottom Right Overlay */}
            <div className="absolute bottom-12 -left-12 right-12 md:right-auto md:left-8 w-auto md:w-[90%] bg-[#0f0f0f]/95 backdrop-blur-sm p-8 border border-white/5 shadow-2xl">
              <span className="text-4xl text-[#D4AF37] font-serif leading-none block mb-4">“</span>

              <p className="text-white font-serif italic text-lg lg:text-xl leading-relaxed mb-6 tracking-wide">
                SU PATRIMONIO Y TRANQUILIDAD ESTÁN EN BUENAS MANOS.
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
