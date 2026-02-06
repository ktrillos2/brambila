const { createClient } = require("next-sanity");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2024-02-05",
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

async function verify() {
    try {
        const query = `*[_type == "services"][0]{
      subtitle,
      title,
      description,
      servicesList[]{
        icon,
        title,
        description
      }
    }`;
        const data = await client.fetch(query);
        console.log("Fetched Data:", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Fetch failed:", error);
    }
}

verify();
