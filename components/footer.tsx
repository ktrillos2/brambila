"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, Facebook, Instagram, Twitter, Linkedin, Youtube, ArrowUp, Heart, Link as LinkIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import { GLOBAL_CONFIG_QUERY } from "@/sanity/lib/queries"

type SocialLink = {
  platform: string;
  url: string;
}

type GlobalConfig = {
  siteName: string;
  logo: string;
  logoFooter: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  footerText: string;
  socialLinks: SocialLink[];
}

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [config, setConfig] = useState<GlobalConfig | null>(null)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await client.fetch(GLOBAL_CONFIG_QUERY)
        setConfig(data)
      } catch (error) {
        console.error("Failed to fetch global config:", error)
      }
    }

    fetchConfig()

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const quickLinks = [
    { label: "Inicio", href: "#inicio" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Servicios", href: "#servicios" },
    { label: "Propiedades", href: "#propiedades" },
    { label: "Contacto", href: "#contacto" },
  ]

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return Facebook
      case 'instagram': return Instagram
      case 'twitter': return Twitter
      case 'linkedin': return Linkedin
      case 'youtube': return Youtube
      default: return LinkIcon
    }
  }

  if (!config) return null // Or a loading skeleton

  return (
    <footer className="bg-card border-t border-border relative">
      {/* Scroll to top button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-14 left-4 md:left-8 w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center z-50 transition-all duration-500 hover:bg-primary/90 hover:scale-110 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Column */}
          <div className="lg:col-span-1 group">
            <Link href="/" className="flex items-center mb-6">
              <div className="relative w-48 h-16">
                <Image
                  src={config.logoFooter || "/logo-brambilas.png"}
                  alt={config.siteName || "Brambila's Inmobiliaria"}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              {config.footerText}
            </p>
            <div className="space-y-3">
              <a
                href={`tel:${config.phone?.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm group/link"
              >
                <Phone className="h-4 w-4 group-hover/link:scale-110 transition-transform" />
                {config.phone}
              </a>
              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm break-all group/link"
              >
                <Mail className="h-4 w-4 flex-shrink-0 group-hover/link:scale-110 transition-transform" />
                {config.email}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-6 text-sm tracking-wider uppercase">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-foreground font-semibold mb-6 text-sm tracking-wider uppercase">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/aviso-de-privacidad"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                  Aviso de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos-y-condiciones"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-foreground font-semibold mb-6 text-sm tracking-wider uppercase">Síguenos</h3>
            <div className="flex gap-3">
              {config.socialLinks?.map((social) => {
                const Icon = getSocialIcon(social.platform)
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
                    aria-label={social.platform}
                  >
                    <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </a>
                )
              })}
            </div>

            {/* Newsletter or CTA */}
            <div className="mt-8">
              <p className="text-muted-foreground text-sm mb-4">¿Listo para encontrar tu hogar ideal?</p>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline group"
              >
                Contáctanos hoy
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © {new Date().getFullYear()} {config.siteName}. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                {config.address}
              </p>
              <span className="hidden md:inline text-muted-foreground">|</span>
              <a
                href="https://www.kytcode.lat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground text-sm flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors"
                style={{ cursor: 'pointer' }}
              >
                Desarrollado por K&T
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
