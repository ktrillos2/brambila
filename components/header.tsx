"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { GLOBAL_CONFIG_QUERY } from "@/sanity/lib/queries"

type GlobalConfig = {
  siteName: string;
  logo: string;
  headerMenu: { label: string; href: string }[];
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
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
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}>
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
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
          <nav className="hidden lg:flex items-center gap-12">
            {config?.headerMenu?.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs text-foreground/90 hover:text-foreground transition-colors duration-200 tracking-[0.2em]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="#contacto"
              className="border border-foreground/40 px-8 py-3 text-xs tracking-[0.2em] text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
            >
              CONSULTAR
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden text-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border py-6">
            <nav className="flex flex-col gap-6">
              {config?.headerMenu?.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-foreground/90 hover:text-primary transition-colors text-sm tracking-[0.2em]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contacto"
                className="border border-foreground/40 px-6 py-3 text-xs tracking-[0.2em] text-foreground text-center hover:bg-foreground hover:text-background transition-all duration-300 mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                CONSULTAR
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
