"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es")

  useEffect(() => {
    // Check localStorage or browser language on mount
    try {
      const savedLang = localStorage.getItem("brambilas_lang") as Language | null
      if (savedLang === "es" || savedLang === "en") {
        setLanguageState(savedLang)
        document.documentElement.lang = savedLang
      } else {
        const browserLang = navigator.language.startsWith("en") ? "en" : "es"
        setLanguageState(browserLang)
        document.documentElement.lang = browserLang
      }
    } catch {
      // Fallback in case of SSR or restricted storage
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem("brambilas_lang", lang)
      document.cookie = `brambilas_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`
      document.documentElement.lang = lang
    } catch {
      // Ignore
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
