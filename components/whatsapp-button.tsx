import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { GLOBAL_CONFIG_QUERY } from "@/sanity/lib/queries"

export function WhatsAppButton() {
    const [whatsappNumber, setWhatsappNumber] = useState("523330366666") // Fallback default

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const data = await client.fetch(GLOBAL_CONFIG_QUERY)
                if (data?.whatsapp) {
                    setWhatsappNumber(data.whatsapp.replace(/\D/g, '')) // Ensure only digits
                }
            } catch (error) {
                console.error("Failed to fetch global config:", error)
            }
        }

        fetchConfig()
    }, [])

    return (
        <Link
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 transition-transform duration-300 hover:scale-110"
            aria-label="Contactar por WhatsApp"
        >
            <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-[#25D366] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-slow">
                <div className="relative w-8 h-8 md:w-10 md:h-10">
                    <Image
                        src="/whatsapp-custom.png"
                        alt="WhatsApp"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </Link>
    )
}
