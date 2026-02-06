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

const aboutData = {
    _type: 'about',
    title: 'Nosotros',
    description1: 'Estamos ubicados en el estado de Jalisco, México. Somos una inmobiliaria que cuenta con una red de asesores expertos, con el compromiso de brindar un trato humano y un servicio excepcional a todos nuestros clientes.',
    description2: 'Nos esforzamos cada día para ser un aliado confiable y guiarte durante todo el proceso de comprar, vender o rentar un inmueble.',
    features: [
        {
            _key: '1',
            label: 'RED DE EXPERTOS',
            icon: 'Users'
        },
        {
            _key: '2',
            label: 'TRATO HUMANO',
            icon: 'Heart'
        },
        {
            _key: '3',
            label: 'SERVICIO EXCEPCIONAL',
            icon: 'Star'
        },
        {
            _key: '4',
            label: 'ALIADO CONFIABLE',
            icon: 'Shield'
        }
    ]
}

async function uploadImage(imageUrl) {
    try {
        const res = await fetch(imageUrl)
        if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`)
        const buffer = await res.arrayBuffer()
        const asset = await client.assets.upload('image', Buffer.from(buffer), {
            filename: 'about-main-image.jpg'
        })
        return asset._id
    } catch (error) {
        console.error('Error uploading image:', error)
        return null
    }
}

async function migrate() {
    try {
        console.log('Migrating About section content...')

        // Check if document already exists
        const existing = await client.fetch('*[_type == "about"][0]')
        if (existing) {
            console.log('About document already exists, skipping...')
            return
        }

        // Upload image
        const imageUrl = "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop"
        const imageAssetId = await uploadImage(imageUrl)

        if (imageAssetId) {
            aboutData.image = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: imageAssetId
                }
            }
        }

        // Create document
        const result = await client.create(aboutData)
        console.log('About section content migrated successfully:', result._id)

    } catch (error) {
        console.error('Migration failed:', error)
    }
}

migrate()
