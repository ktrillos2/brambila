import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Aviso de Privacidad | Brambila's Inmobiliaria",
    description: "Conoce nuestro aviso de privacidad y cómo protegemos tus datos personales en Brambila's Inmobiliaria.",
    alternates: {
        canonical: '/aviso-de-privacidad',
    },
}

export default function AvisoDePrivacidadLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}
