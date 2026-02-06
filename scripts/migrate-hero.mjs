import { createClient } from "next-sanity";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2024-02-05",
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

const heroData = {
    _id: "hero",
    _type: "hero",
    title1: "Brambila's",
    title2: "INMOBILIARIA",
    subtitle: "Compra, Vende, Renta... profesionales expertos en Bienes Raíces\n\nRedefiniendo el concepto inmobiliario.\nDonde la confianza encuentra la excelencia.",
    searchPlaceholder: "Ubicación, Zona, ID...",
};

const heroSlides = [
    {
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
        alt: "Cocina moderna de lujo"
    },
    {
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
        alt: "Casa moderna exterior"
    },
    {
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
        alt: "Sala de estar elegante"
    },
    {
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop",
        alt: "Terraza con vista"
    }
];

// Reusing global fetch which is available in Node 18+

async function uploadImage(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch image: ${url}`);
        const buffer = await response.arrayBuffer();
        return await client.assets.upload('image', Buffer.from(buffer), {
            filename: url.split('/').pop()
        });
    } catch (error) {
        console.error("Image upload failed:", error);
        return null;
    }
}

async function migrate() {
    try {
        console.log("Starting Hero migration...");

        const uploadedImages = [];

        // Upload images sequentially
        for (const [index, slide] of heroSlides.entries()) {
            console.log(`Uploading image ${index + 1}/${heroSlides.length}...`);
            const asset = await uploadImage(slide.image);

            if (asset) {
                uploadedImages.push({
                    _key: `hero-image-${index}`,
                    image: {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: asset._id
                        }
                    },
                    alt: slide.alt
                });
            }
        }

        const doc = {
            ...heroData,
            images: uploadedImages
        };

        const result = await client.createOrReplace(doc);
        console.log("Hero migration successful:", result);

    } catch (error) {
        console.error("Migration failed:", error);
    }
}

migrate();
