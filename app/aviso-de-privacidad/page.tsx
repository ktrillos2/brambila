"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

export default function AvisoDePrivacidad() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-md bg-card/90">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm tracking-wider uppercase">Volver al Inicio</span>
          </Link>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 border border-primary/50 flex items-center justify-center">
              <span className="text-primary font-bold">B</span>
            </div>
            <span className="text-foreground font-semibold hidden sm:block">Brambila´s</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative py-20 bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
            <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">
              Legal
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-foreground mt-4 mb-4">
              Aviso de Privacidad
            </h1>
            <div className="w-16 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground">
              Tu privacidad es importante para nosotros
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
          <div className="space-y-8">
            <p className="text-muted-foreground leading-relaxed text-lg">
              En cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de Particulares,
              <strong className="text-foreground"> BRAMBILA´S INMOBILIARIA ®</strong>, con domicilio en el estado de Jalisco, México,
              pone a su disposición el presente Aviso de Privacidad.
            </p>

            {[
              {
                title: "1. Datos Personales Recabados",
                content: (
                  <>
                    <p>
                      Para las finalidades señaladas en el presente Aviso de Privacidad, podemos recabar sus datos personales
                      de distintas formas: cuando usted nos los proporciona directamente, cuando visita nuestro sitio de
                      Internet o utiliza nuestros servicios en línea, y cuando obtenemos información a través de otras
                      fuentes que están permitidas por la ley.
                    </p>
                    <p className="mt-4">Los datos personales que podemos recabar incluyen:</p>
                    <ul className="mt-3 space-y-2">
                      {["Nombre completo", "Correo electrónico", "Número de teléfono", "Dirección", "Datos de identificación fiscal (en caso de operaciones de compraventa)"].map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )
              },
              {
                title: "2. Finalidades del Tratamiento de Datos",
                content: (
                  <>
                    <p>Sus datos personales serán utilizados para las siguientes finalidades:</p>
                    <ul className="mt-3 space-y-2">
                      {[
                        "Identificarle como cliente o prospecto",
                        "Proporcionar los servicios inmobiliarios solicitados",
                        "Enviar información sobre propiedades que puedan ser de su interés",
                        "Dar seguimiento a sus solicitudes y consultas",
                        "Elaborar contratos de compraventa, arrendamiento o intermediación",
                        "Cumplir con obligaciones legales y fiscales"
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )
              },
              {
                title: "3. Transferencia de Datos",
                content: (
                  <p>
                    BRAMBILA´S INMOBILIARIA ® se compromete a no transferir su información personal a terceros sin
                    su consentimiento, salvo las excepciones previstas en el artículo 37 de la Ley Federal de
                    Protección de Datos Personales en Posesión de los Particulares, así como a realizar esta
                    transferencia en los términos que fija esa ley.
                  </p>
                )
              },
              {
                title: "4. Derechos ARCO",
                content: (
                  <>
                    <p>
                      Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos
                      y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la
                      corrección de su información personal en caso de que esté desactualizada, sea inexacta o
                      incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando
                      considere que la misma no está siendo utilizada conforme a los principios, deberes y
                      obligaciones previstas en la normativa (Cancelación); así como oponerse al uso de sus datos
                      personales para fines específicos (Oposición).
                    </p>
                    <p className="mt-4">Para ejercer cualquiera de los derechos ARCO, puede contactarnos a través de:</p>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        Correo electrónico: <a href="mailto:brambilasinmobiliaria@gmail.com" className="text-primary hover:underline">brambilasinmobiliaria@gmail.com</a>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        Teléfono: <a href="tel:+523213875653" className="text-primary hover:underline">(321) 387 56 53</a>
                      </li>
                    </ul>
                  </>
                )
              },
              {
                title: "5. Modificaciones al Aviso de Privacidad",
                content: (
                  <>
                    <p>
                      Nos reservamos el derecho de efectuar en cualquier momento modificaciones o actualizaciones
                      al presente aviso de privacidad, para la atención de novedades legislativas, políticas
                      internas o nuevos requerimientos para la prestación u ofrecimiento de nuestros servicios.
                    </p>
                    <p className="mt-4">Las modificaciones estarán disponibles en nuestro sitio web.</p>
                  </>
                )
              },
              {
                title: "6. Contacto",
                content: (
                  <>
                    <p>Si tiene alguna duda sobre este Aviso de Privacidad, puede contactarnos en:</p>
                    <div className="mt-4 p-6 bg-card border border-border hover:border-primary/30 transition-colors">
                      <p className="font-semibold text-foreground text-lg">BRAMBILA´S INMOBILIARIA ®</p>
                      <div className="mt-3 space-y-1 text-muted-foreground">
                        <p>Jalisco, México</p>
                        <p>Teléfono: <a href="tel:+523213875653" className="text-primary hover:underline">(321) 387 56 53</a></p>
                        <p>Email: <a href="mailto:brambilasinmobiliaria@gmail.com" className="text-primary hover:underline">brambilasinmobiliaria@gmail.com</a></p>
                      </div>
                    </div>
                  </>
                )
              }
            ].map((section, index) => (
              <section
                key={section.title}
                className={`p-8 bg-card border border-border hover:border-primary/30 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary/10 flex items-center justify-center text-primary text-sm">
                    {index + 1}
                  </span>
                  {section.title.replace(/^\d+\.\s/, '')}
                </h2>
                <div className="text-muted-foreground leading-relaxed">
                  {section.content}
                </div>
              </section>
            ))}

            <p className="text-sm text-muted-foreground pt-8 border-t border-border">
              Última actualización: Enero 2026
            </p>
          </div>

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/20 text-sm tracking-wider uppercase group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 Brambila´s Inmobiliaria ®. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  )
}
