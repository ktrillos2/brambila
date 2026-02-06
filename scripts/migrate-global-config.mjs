import { createClient } from "next-sanity";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2024-02-05", // Use specific date or import from env
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

const globalConfig = {
    _id: "globalConfig",
    _type: "globalConfig",
    siteName: "Brambila's Inmobiliaria",
    email: "contacto@brambilas.com", // Found in footer
    phone: "+52 33 3036 6666", // Found in WhatsApp links
    whatsapp: "523330366666",
    address: "Guadalajara, Jalisco, México",
    footerText: "Redefiniendo el concepto inmobiliario. Donde la confianza encuentra la excelencia.",
    socialLinks: [
        {
            _key: "instagram",
            platform: "Instagram",
            url: "https://www.instagram.com/brambilas_inmobiliaria",
        },
        {
            _key: "facebook",
            platform: "Facebook",
            url: "https://www.facebook.com/brambilas.inmo",
        }
    ],
};

async function migrate() {
    try {
        console.log("Migrating global config...");
        const result = await client.createOrReplace(globalConfig);
        console.log("Migration successful:", result);

        // Upload Logo (assuming it exists locally, skipping for now if not easily accessible via script, user can upload via Studio)
        console.log("Note: Logos need to be uploaded manually via Sanity Studio or enhanced script.");

    } catch (error) {
        console.error("Migration failed:", error);
    }
}

migrate();
