"use client"

import React from "react"
import { useLanguage, Language } from "@/context/language-context"

interface LanguageSwitcherProps {
  variant?: "header" | "mobile"
  className?: string
}

// Crisp Vector SVG Flag for Mexico (ES)
function MexicoFlag({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      className={`${className} rounded-full overflow-hidden shrink-0 shadow-sm ring-1 ring-black/20`}
      aria-hidden="true"
    >
      <rect width="12" height="36" fill="#006847" />
      <rect x="12" width="12" height="36" fill="#FFFFFF" />
      <rect x="24" width="12" height="36" fill="#CE1126" />
      {/* Eagle crest in center */}
      <circle cx="18" cy="18" r="3.2" fill="#8B5A2B" opacity="0.85" />
      <path d="M16.2 18.5 Q18 15.5 19.8 18.5 Q18 20.2 16.2 18.5 Z" fill="#4A2E12" />
      <circle cx="18" cy="17" r="1.1" fill="#D4AF37" />
    </svg>
  )
}

// Crisp Vector SVG Flag for USA (EN)
function USAFlag({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      className={`${className} rounded-full overflow-hidden shrink-0 shadow-sm ring-1 ring-black/20`}
      aria-hidden="true"
    >
      {/* Stripes */}
      <rect width="36" height="36" fill="#BF0A30" />
      <rect y="2.77" width="36" height="2.77" fill="#FFFFFF" />
      <rect y="8.31" width="36" height="2.77" fill="#FFFFFF" />
      <rect y="13.85" width="36" height="2.77" fill="#FFFFFF" />
      <rect y="19.38" width="36" height="2.77" fill="#FFFFFF" />
      <rect y="24.92" width="36" height="2.77" fill="#FFFFFF" />
      <rect y="30.46" width="36" height="2.77" fill="#FFFFFF" />
      {/* Blue Canton */}
      <rect width="16" height="19.38" fill="#002868" />
      {/* Stars */}
      <circle cx="4" cy="4" r="1" fill="#FFFFFF" />
      <circle cx="8" cy="4" r="1" fill="#FFFFFF" />
      <circle cx="12" cy="4" r="1" fill="#FFFFFF" />
      <circle cx="6" cy="7.5" r="1" fill="#FFFFFF" />
      <circle cx="10" cy="7.5" r="1" fill="#FFFFFF" />
      <circle cx="4" cy="11" r="1" fill="#FFFFFF" />
      <circle cx="8" cy="11" r="1" fill="#FFFFFF" />
      <circle cx="12" cy="11" r="1" fill="#FFFFFF" />
      <circle cx="6" cy="14.5" r="1" fill="#FFFFFF" />
      <circle cx="10" cy="14.5" r="1" fill="#FFFFFF" />
    </svg>
  )
}

export function LanguageSwitcher({ variant = "header", className = "" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = (lang: Language) => {
    if (language !== lang) {
      setLanguage(lang)
    }
  }

  if (variant === "mobile") {
    return (
      <div
        className={`flex items-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md ${className}`}
        role="group"
        aria-label="Selector de idioma / Language selector"
      >
        <button
          type="button"
          onClick={() => toggleLanguage("es")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-300 ${
            language === "es"
              ? "bg-primary text-black shadow-md font-bold"
              : "text-white/70 hover:text-white hover:bg-white/5"
          }`}
          aria-pressed={language === "es"}
          aria-label="Cambiar idioma a Español"
        >
          <MexicoFlag className="w-4 h-4" />
          <span>Español</span>
        </button>

        <button
          type="button"
          onClick={() => toggleLanguage("en")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-300 ${
            language === "en"
              ? "bg-primary text-black shadow-md font-bold"
              : "text-white/70 hover:text-white hover:bg-white/5"
          }`}
          aria-pressed={language === "en"}
          aria-label="Switch language to English"
        >
          <USAFlag className="w-4 h-4" />
          <span>English</span>
        </button>
      </div>
    )
  }

  return (
    <div
      className={`relative inline-flex items-center p-1 bg-black/50 backdrop-blur-md border border-white/20 hover:border-primary/50 transition-all duration-300 rounded-full shadow-lg ${className}`}
      role="group"
      aria-label="Selector de idioma / Language selector"
    >
      {/* Spanish / México */}
      <button
        type="button"
        onClick={() => toggleLanguage("es")}
        className={`group flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full transition-all duration-300 ${
          language === "es"
            ? "bg-primary text-black font-bold shadow-sm scale-105"
            : "text-white/70 hover:text-white hover:bg-white/10"
        }`}
        aria-pressed={language === "es"}
        aria-label="Español (México)"
        title="Español"
      >
        <MexicoFlag className={`w-3.5 h-3.5 transition-transform duration-300 ${language === "es" ? "scale-110" : "group-hover:scale-105"}`} />
        <span>ES</span>
      </button>

      {/* English / USA */}
      <button
        type="button"
        onClick={() => toggleLanguage("en")}
        className={`group flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full transition-all duration-300 ${
          language === "en"
            ? "bg-primary text-black font-bold shadow-sm scale-105"
            : "text-white/70 hover:text-white hover:bg-white/10"
        }`}
        aria-pressed={language === "en"}
        aria-label="English (USA)"
        title="English"
      >
        <USAFlag className={`w-3.5 h-3.5 transition-transform duration-300 ${language === "en" ? "scale-110" : "group-hover:scale-105"}`} />
        <span>EN</span>
      </button>
    </div>
  )
}
