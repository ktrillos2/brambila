"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { GLOBAL_CONFIG_QUERY } from "@/sanity/lib/queries"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"
import { getLocalized } from "@/lib/sanity-i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

type GlobalConfig = {
  siteName: string;
  logo: string;
  headerMenu: { label: any; href: string }[];
  phone?: string;
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [config, setConfig] = useState<GlobalConfig | null>(null)
  const { language } = useLanguage()
  const t = translations[language]

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
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Default menu items in case Sanity menu is empty
  const defaultMenu = [
    { label: t.header.nav.home, href: "/" },
    { label: t.header.nav.properties, href: "/propiedades" },
    { label: t.header.nav.about, href: "/nosotros" },
    { label: t.header.nav.services, href: "/#servicios" },
    { label: t.header.nav.contact, href: "/#contacto" },
  ]

  const menuItems = (config?.headerMenu && config.headerMenu.length > 0)
    ? config.headerMenu.map((item) => ({
        label: getLocalized(item.label, language) || item.href,
        href: item.href,
      }))
    : defaultMenu

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-black/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 relative z-50">
            <div className="relative w-32 h-12 md:w-40 md:h-14">
              <Image
                src={config?.logo || "/logo-brambilas.png"}
                alt={config?.siteName || "Brambila's Inmobiliaria"}
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-10">
            {menuItems.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="text-xs text-foreground/90 hover:text-foreground transition-colors duration-200 tracking-[0.2em]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions: Language Switcher & CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <LanguageSwitcher variant="header" />
            <Link
              href="/#contacto"
              className="border border-foreground/40 px-7 py-2.5 text-xs tracking-[0.2em] text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
            >
              {t.header.inquire}
            </Link>
          </div>

          {/* Mobile Actions (Lang + Hamburger) */}
          <div className="lg:hidden flex items-center gap-3 relative z-50">
            <LanguageSwitcher variant="header" />
            <button
              type="button"
              className="text-foreground p-2 transition-colors duration-300 hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-xl animate-in fade-in duration-300 lg:hidden flex flex-col items-center justify-center p-8">
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              {/* Language Switcher in Mobile Drawer */}
              <div className="mb-2">
                <LanguageSwitcher variant="mobile" />
              </div>

              <nav className="flex flex-col items-center gap-6 text-center">
                {menuItems.map((item, i) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className="text-2xl md:text-3xl font-light text-white hover:text-primary transition-all duration-300 tracking-widest animate-in slide-in-from-bottom-4 fade-in fill-mode-backwards"
                    style={{ animationDelay: `${i * 80}ms` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <Link
                  href="/#contacto"
                  className="mt-6 border border-white/30 px-10 py-3.5 text-sm tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all duration-300 animate-in slide-in-from-bottom-4 fade-in fill-mode-backwards"
                  style={{ animationDelay: "400ms" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.header.inquire}
                </Link>
              </nav>

              {/* Decorative line */}
              <div className="w-16 h-[1px] bg-white/10 mt-4 mb-2"></div>

              {/* Footer info in menu */}
              <div className="text-center space-y-1 animate-in slide-in-from-bottom-4 fade-in fill-mode-backwards" style={{ animationDelay: "500ms" }}>
                <p className="text-white/40 text-xs tracking-wider uppercase">{t.header.contactUs}</p>
                <p className="text-white/60 text-sm tracking-widest font-light">{config?.phone}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
