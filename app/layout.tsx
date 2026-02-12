import React from "react"
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppButton } from "@/components/whatsapp-button"
import './globals.css'

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair'
});

const gotham = localFont({
  src: [
    {
      path: '../public/fonts/metropolis/Metropolis-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/metropolis/Metropolis-ThinItalic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../public/fonts/metropolis/Metropolis-ExtraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/metropolis/Metropolis-ExtraLightItalic.otf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../public/fonts/metropolis/Metropolis-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/metropolis/Metropolis-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/metropolis/Metropolis-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/metropolis/Metropolis-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/metropolis/Metropolis-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/metropolis/Metropolis-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/metropolis/Metropolis-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/metropolis/Metropolis-SemiBoldItalic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../public/fonts/metropolis/Metropolis-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/metropolis/Metropolis-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/metropolis/Metropolis-ExtraBold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/metropolis/Metropolis-ExtraBoldItalic.otf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../public/fonts/metropolis/Metropolis-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/metropolis/Metropolis-BlackItalic.otf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-gotham'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.brambilasinmobiliaria.com'),
  title: "Brambila's Inmobiliaria | Bienes Raíces en Jalisco",

  description: 'Tu aliado confiable en bienes raíces. Compra, venta y renta de propiedades en Jalisco, México. Asesores expertos con servicio excepcional.',
  generator: 'v0.app',
  keywords: ['inmobiliaria', 'bienes raíces', 'Jalisco', 'México', 'casas', 'terrenos', 'venta', 'renta'],
  icons: {
    icon: '/logo-brambilas.png',
    apple: '/logo-brambilas.png',
  },
  openGraph: {
    images: ['/logo-brambilas.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${gotham.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}
