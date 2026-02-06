const { createClient } = require("next-sanity");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2024-02-05",
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

async function checkProperties() {
    const properties = await client.fetch(`*[_type == "property"]{title, "slug": slug.current, _id}`);
    console.log("Properties found:", properties.length);
    properties.forEach(p => {
        console.log(`- ${p.title} (Slug: ${p.slug})`);
    });
}

checkProperties();
