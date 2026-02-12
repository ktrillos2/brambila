import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.brambilasinmobiliaria.com'

    // Get all properties
    const properties = await client.fetch(
        groq`*[_type == "property"]{ "slug": slug.current, _updatedAt }`
    )

    const propertyUrls = properties.map((property: any) => ({
        url: `${baseUrl}/propiedad/${property.slug}`,
        lastModified: new Date(property._updatedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/propiedades`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/nosotros`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/aviso-de-privacidad`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        ...propertyUrls,
    ]
}
