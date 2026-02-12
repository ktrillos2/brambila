
import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Get current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env.local
const envPath = path.resolve(__dirname, '../.env.local')
console.log(`Loading env from: ${envPath}`)
dotenv.config({ path: envPath })

const config = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-02-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
}

if (!config.token) {
    console.error('Error: SANITY_API_TOKEN is missing. Cannot write to dataset.')
    process.exit(1)
}

const client = createClient(config)

function generateSlug(title) {
    return title
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
        .trim()
        .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
}

async function run() {
    try {
        console.log('Fetching properties without slugs...')
        const query = `*[_type == "property" && !defined(slug.current) && !(_id in path("drafts.**"))]{
            _id,
            title
        }`

        const properties = await client.fetch(query)
        console.log(`Found ${properties.length} published properties without slugs.`)

        if (properties.length === 0) {
            console.log('No properties to fix.')
            return
        }

        for (const property of properties) {
            if (!property.title) {
                console.warn(`Skipping property ${property._id} because it has no title to generate a slug from.`)
                continue
            }

            const newSlug = generateSlug(property.title)
            console.log(`Fixing property "${property.title}" (${property._id}) -> slug: "${newSlug}"`)

            await client.patch(property._id)
                .set({
                    slug: {
                        _type: 'slug',
                        current: newSlug
                    }
                })
                .commit()
                .then(updatedProperty => {
                    console.log(`Success! Updated ${property._id}`)
                })
                .catch(err => {
                    console.error(`Failed to update ${property._id}:`, err.message)
                })
        }

        console.log('Done.')

    } catch (error) {
        console.error('Error execution:', error)
    }
}

run()
