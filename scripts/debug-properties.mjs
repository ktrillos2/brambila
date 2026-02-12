import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Get current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env.local (assuming script is in /scripts)
// resolve to ../.env.local
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

console.log('Sanity Config:', {
    projectId: config.projectId,
    dataset: config.dataset,
    hasToken: !!config.token
})

if (!config.projectId) {
    console.error('Error: NEXT_PUBLIC_SANITY_PROJECT_ID is missing')
    process.exit(1)
}

const client = createClient(config)

async function run() {
    try {
        console.log('Fetching properties...')
        const query = `*[_type == "property"]{
            _id,
            title,
            "slug": slug.current,
            _updatedAt,
            _createdAt
        } | order(_createdAt desc)`

        // Set a timeout
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout fetching properties')), 10000)
        )

        const properties = await Promise.race([
            client.fetch(query),
            timeoutPromise
        ])

        console.log(`Found ${properties.length} properties.`)

        const missingSlug = properties.filter(p => !p.slug)
        const drafts = properties.filter(p => p._id.startsWith('drafts.'))
        const published = properties.filter(p => !p._id.startsWith('drafts.'))
        const valid = published.filter(p => p.slug)

        console.log('--- Summary ---')
        console.log(`Total Documents: ${properties.length}`)
        console.log(`Drafts: ${drafts.length}`)
        console.log(`Published: ${published.length}`)
        console.log(`Published with Slug (Visible): ${valid.length}`)
        console.log(`Published without Slug (Invisible): ${published.length - valid.length}`)

        if (missingSlug.length > 0) {
            console.log('\n--- Documents Missing Slug ---')
            missingSlug.forEach(p => {
                const isDraft = p._id.startsWith('drafts.')
                console.log(`${isDraft ? '[DRAFT]' : '[PUBLISHED]'} ID: ${p._id} | Title: "${p.title || 'Untitled'}"`)
            })
        }

        if (drafts.length > 0) {
            console.log('\n--- Draft Documents ---')
            drafts.forEach(p => {
                console.log(`ID: ${p._id} | Title: "${p.title || 'Untitled'}" | Slug: ${p.slug || 'MISSING'}`)
            })
        }

    } catch (error) {
        console.error('Error execution:', error)
    }
}

run()
