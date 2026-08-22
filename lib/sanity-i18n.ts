import { Language } from "@/context/language-context"

/**
 * Safely extract a localized string from a field that could be:
 * 1. A localized object: { es: "...", en: "..." }
 * 2. A legacy plain string: "..."
 * 3. Undefined / null
 */
export function getLocalized(value: any, lang: Language = "es"): string {
  if (!value) return ""
  if (typeof value === "string") return value
  if (typeof value === "object") {
    if (value[lang]) return String(value[lang])
    if (value.es) return String(value.es)
    if (value.en) return String(value.en)
  }
  return ""
}

/**
 * Safely extract a localized array from a field that could be:
 * 1. A localized object with arrays: { es: [...], en: [...] }
 * 2. An array of localized items: [{ es: "...", en: "..." }]
 * 3. An array of plain strings: ["...", "..."]
 * 4. Undefined / null
 */
export function getLocalizedArray(value: any, lang: Language = "es"): string[] {
  if (!value) return []
  
  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === "object" ? getLocalized(item, lang) : String(item))).filter(Boolean)
  }

  if (typeof value === "object") {
    if (Array.isArray(value[lang])) {
      return value[lang].map((item: any) => (typeof item === "object" ? getLocalized(item, lang) : String(item))).filter(Boolean)
    }
    if (Array.isArray(value.es)) {
      return value.es.map((item: any) => (typeof item === "object" ? getLocalized(item, lang) : String(item))).filter(Boolean)
    }
    if (Array.isArray(value.en)) {
      return value.en.map((item: any) => (typeof item === "object" ? getLocalized(item, lang) : String(item))).filter(Boolean)
    }
  }

  return []
}
