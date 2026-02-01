import { Metadata } from "next"
import Link from "next/link"
import { getPropertyById } from "@/lib/data"
import { PropertyDetailView } from "@/components/property-detail-view"

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id: paramId } = await params
    const id = Number(paramId)
    const property = getPropertyById(id)

    if (!property) {
        return {
            title: "Propiedad no encontrada",
        }
    }

    return {
        title: `${property.title} | Brambila's Inmobiliaria`,
        description: property.description.slice(0, 160),
        openGraph: {
            title: property.title,
            description: property.description,
            images: [property.image],
        },
    }
}

export default async function PropertyDetailPage({ params }: Props) {
    const { id: paramId } = await params
    const id = Number(paramId)
    const property = getPropertyById(id)

    if (!property) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <h1 className="text-2xl font-sans mb-4">Propiedad no encontrada</h1>
                <Link href="/" className="text-primary hover:underline">
                    Volver al Inicio
                </Link>
            </div>
        )
    }

    return <PropertyDetailView property={property} />
}
