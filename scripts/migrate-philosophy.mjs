import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-02-05',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
})

const philosophyData = {
    _type: 'philosophy',
    title: 'NUESTRA FILOSOFÍA',
    mission: 'Inmobiliaria es una empresa donde la confianza y la tranquilidad son primero. Comprometidos en brindar protección integral mediante nuestros servicios inmobiliarios.',
    vision: 'Estar dentro de las mejores opciones inmobiliarias en el país, donde el cliente confíe que su patrimonio y tranquilidad están en buenas manos.',
    values: [
        "Calidad",
        "Seguridad",
        "Honestidad",
        "Transparencia"
    ],
    quote: "SU PATRIMONIO Y TRANQUILIDAD ESTÁN EN BUENAS MANOS."
}

async function uploadImage(imageUrl) {
    try {
        const res = await fetch(imageUrl)
        if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`)
        const buffer = await res.arrayBuffer()
        const asset = await client.assets.upload('image', Buffer.from(buffer), {
            filename: 'philosophy-main-image.jpg'
        })
        return asset._id
    } catch (error) {
        console.error('Error uploading image:', error)
        return null
    }
}

async function migrate() {
    try {
        console.log('Migrating Philosophy section content...')

        // Check if document already exists
        const existing = await client.fetch('*[_type == "philosophy"][0]')
        if (existing) {
            console.log('Philosophy document already exists, skipping...')
            return
        }

        // Upload image
        const imageUrl = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
        const imageAssetId = await uploadImage(imageUrl)

        if (imageAssetId) {
            philosophyData.image = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: imageAssetId
                }
            }
        }

        // Create document
        const result = await client.create(philosophyData)
        console.log('Philosophy section content migrated successfully:', result._id)

    } catch (error) {
        console.error('Migration failed:', error)
    }
}

migrate()
