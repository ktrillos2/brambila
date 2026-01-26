"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { Send, Phone, Mail, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Teléfono",
      value: "(321) 387 56 53",
      href: "tel:+523213875653"
    },
    {
      icon: Mail,
      title: "Email",
      value: "brambilasinmobiliaria@gmail.com",
      href: "mailto:brambilasinmobiliaria@gmail.com"
    },
    {
      icon: MapPin,
      title: "Ubicación",
      value: "Jalisco, México",
      href: null
    }
  ]

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
            <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">
              Hablemos
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-foreground mt-4 mb-6">
              ¿Estamos listos para empezar?
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground text-lg">
              Completa el formulario y de inmediato un experto de nuestro equipo se pondrá en contacto contigo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className={`lg:col-span-2 space-y-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}>
              {contactInfo.map((item, index) => (
                <div
                  key={item.title}
                  className={`group bg-card p-6 border border-border hover:border-primary/50 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-500">
                      <item.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold mb-1">{item.title}</h3>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group/link"
                        >
                          <span className="break-all">{item.value}</span>
                          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Map or Additional Info */}
              <div className={`bg-card p-6 border border-border transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                <h3 className="text-foreground font-semibold mb-3">Horario de Atención</h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p className="flex justify-between">
                    <span>Lunes - Viernes</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sábado</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Domingo</span>
                    <span>Cerrado</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`lg:col-span-3 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}>
              <form onSubmit={handleSubmit} className="bg-card p-8 border border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === "name" || formData.name
                        ? "-top-2.5 text-xs bg-card px-2 text-primary"
                        : "top-4 text-muted-foreground text-sm"
                        }`}
                    >
                      Nombre completo *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className="bg-transparent border-border focus:border-primary h-14 pt-4"
                    />
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === "email" || formData.email
                        ? "-top-2.5 text-xs bg-card px-2 text-primary"
                        : "top-4 text-muted-foreground text-sm"
                        }`}
                    >
                      Correo electrónico *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className="bg-transparent border-border focus:border-primary h-14 pt-4"
                    />
                  </div>
                </div>

                <div className="mb-6 relative">
                  <label
                    htmlFor="phone"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === "phone" || formData.phone
                      ? "-top-2.5 text-xs bg-card px-2 text-primary"
                      : "top-4 text-muted-foreground text-sm"
                      }`}
                  >
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-transparent border-border focus:border-primary h-14 pt-4"
                  />
                </div>

                <div className="mb-6 relative">
                  <label
                    htmlFor="message"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === "message" || formData.message
                      ? "-top-2.5 text-xs bg-card px-2 text-primary"
                      : "top-4 text-muted-foreground text-sm"
                      }`}
                  >
                    Mensaje *
                  </label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-transparent border-border focus:border-primary resize-none pt-6"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm tracking-wider uppercase group transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Enviar Mensaje
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
