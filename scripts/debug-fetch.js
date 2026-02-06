const { createClient } = require("next-sanity");
const dotenv = require("dotenv");
const { groq } = require("next-sanity");

dotenv.config({ path: ".env.local" });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2024-02-05", // Same as in the user's setup or derived from env
    useCdn: true, // Mimic client.ts
    token: process.env.SANITY_API_TOKEN,
});

// Exact query from queries.ts
const PROPERTY_BY_SLUG_QUERY = groq`*[_type == "property" && slug.current == $slug][0]{
  "id": _id,
  title,
  "slug": slug.current,
  location,
  price,
  tag,
  status,
  type,
  "image": mainImage.asset->url,
  "images": gallery[].asset->url,
  video, 
  "videoUrl": video.asset->url,
  description,
  bedrooms,
  bathrooms,
  area,
  landArea,
  levels,
  code,
  sector,
  condition,
  features,
  googleMapsUrl,
  "measures": {
    "total": area,
    "north": "",
    "south": "",
    "east": "",
    "west": ""
  }
}`;

async function debugPropertyFetch(slug) {
    console.log(`Fetching property with slug: "${slug}"...`);
    try {
        const property = await client.fetch(PROPERTY_BY_SLUG_QUERY, { slug });
        if (property) {
            console.log("✅ Success! Property found:");
            console.log(`   Title: ${property.title}`);
            console.log(`   ID: ${property.id}`);
        } else {
            console.log("❌ Property NOT found (returned null).");
            // Try finding it without validtion
            const anyProp = await client.fetch(`*[_type == "property" && slug.current == $slug][0]`, { slug });
            if (anyProp) console.log("   (But it DOES exist with a simpler query!)");
        }
    } catch (error) {
        console.error("❌ Error fetching property:", error.message);
    }
}

// Test with the slug causing 404
debugPropertyFetch("bodega-industrial-norte");
