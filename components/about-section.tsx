"use client"

import Image from "next/image"
import { Users, Heart, Star, Shield } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const features = [
  { icon: Users, label: "RED DE EXPERTOS" },
  { icon: Heart, label: "TRATO HUMANO" },
  { icon: Star, label: "SERVICIO EXCEPCIONAL" },
  { icon: Shield, label: "ALIADO CONFIABLE" }
]

export function AboutSection() {
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
      id="nosotros"
      className="py-20 md:py-32 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Text Side */}
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-4 tracking-wide">
              Nosotros
            </h2>

            {/* Gold underline */}
            <div className="w-20 h-1 bg-primary mb-10" />

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Estamos ubicados en el estado de <span className="text-foreground font-semibold">Jalisco, México</span>. Somos una inmobiliaria que cuenta con una red de asesores expertos, con el compromiso de brindar un trato humano y un servicio excepcional a todos nuestros clientes.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mb-12">
              Nos esforzamos cada día para ser un aliado confiable y guiarte durante todo el proceso de comprar, vender o rentar un inmueble.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.label}
                  className={`flex items-center gap-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs tracking-[0.15em] text-muted-foreground font-medium">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}>
            {/* Main Image with gold border accent */}
            <div className="relative">
              {/* Gold corner accents */}
              <div className="absolute -top-3 -right-3 w-32 h-32 border-t-2 border-r-2 border-primary z-10" />
              <div className="absolute -bottom-3 -left-3 w-32 h-32 border-b-2 border-l-2 border-primary z-10" />

              <div className="relative aspect-[4/3] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop"
                  alt="Equipo Brambila's Inmobiliaria"
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
