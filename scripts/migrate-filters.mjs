import { createClient } from "next-sanity";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2024-02-05",
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const DEFAULT_CONFIGS = {
    _type: "propertyConfigs",
    locations: ["Autlán de Navarro", "El Grullo", "Cihuatlán", "Llanogrande", "Medellín", "Rionegro"],
    propertyTypes: ["Casa", "Bodega", "Local", "Terreno", "Departamento", "Rancho"],
    amenities: [
        "Alberca",
        "Terraza",
        "Jardín",
        "Aire Acondicionado",
        "Cochera",
        "Seguridad Privada",
        "Cocina Integral",
        "Recámara en Planta Baja"
    ]
};

async function migrateFilters() {
    console.log("Checking for existing filter configuration...");
    const existing = await client.fetch(`*[_type == "propertyConfigs"][0]`);

    if (existing) {
        console.log("Configuration already exists. Skipping creation.");
        console.log("ID:", existing._id);
    } else {
        console.log("Creating default filter configuration...");
        const res = await client.create(DEFAULT_CONFIGS);
        console.log("Created configuration with ID:", res._id);
    }
}

migrateFilters();
