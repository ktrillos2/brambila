"use client"

import Image from "next/image"
import Link from "next/link"

export function WhatsAppButton() {
    return (
        <Link
            href="https://wa.me/523213875653"
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
