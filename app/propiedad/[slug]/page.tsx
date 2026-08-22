import { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { PROPERTY_BY_SLUG_QUERY, GLOBAL_CONFIG_QUERY } from "@/sanity/lib/queries"
import { PropertyDetailView } from "@/components/property-detail-view"
import { getLocalized } from "@/lib/sanity-i18n"

export const revalidate = 0 // Disable cache for property details to ensure latest data

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const property = await client.fetch(PROPERTY_BY_SLUG_QUERY, { slug })

    if (!property) {
        return {
            title: "Propiedad no encontrada | Brambila's Inmobiliaria",
            description: "La propiedad que estás buscando no existe o ha sido eliminada.",
            robots: {
                index: false,
                follow: false,
            }
        }
    }

    const title = getLocalized(property.title, "es")
    const description = getLocalized(property.description, "es")

    return {
        title: `${title} | Brambila's Inmobiliaria`,
        description: description?.slice(0, 160) || "Propiedad exclusiva en Jalisco con Brambila's Inmobiliaria.",
        openGraph: {
            title: title,
            description: description,
            images: property.image ? [property.image] : [],
        },
        alternates: {
            canonical: `/propiedad/${slug}`,
        },
    }
}

export default async function PropertyDetailPage({ params }: Props) {
    const { slug } = await params
    const property = await client.fetch(PROPERTY_BY_SLUG_QUERY, { slug })

    if (!property) {
        notFound()
    }

    const globalConfig = await client.fetch(GLOBAL_CONFIG_QUERY)

    return <PropertyDetailView property={property} globalConfig={globalConfig} />
}
