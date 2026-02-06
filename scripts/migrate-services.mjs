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

const servicesData = {
    _id: "services",
    _type: "services",
    subtitle: "Lo que hacemos",
    title: "Nuestros Servicios",
    description: "Explora nuestros servicios y recursos, y déjanos ser tu socio de confianza. Juntos, hagamos que cada transacción cuente.",
    servicesList: [
        {
            icon: "Home",
            title: "Vendemos tu propiedad",
            description: "Te ayudamos a vender de forma rápida, segura y al mejor precio. Desarrollamos material publicitario, fotografía y video profesional."
        },
        {
            icon: "Key",
            title: "Rentamos tu propiedad",
            description: "Administramos tu propiedad para brindarte certeza jurídica, evitando conflictos de interés y solucionando cualquier inconformidad."
        },
        {
            icon: "FileText",
            title: "Asesoría Inmobiliaria",
            description: "Asesoría personalizada para compras, búsqueda y actos de compraventa, cuidando minuciosamente los aspectos fiscales, contables y legales."
        }
    ]
};

async function migrate() {
    try {
        console.log("Starting Services migration...");
        const result = await client.createOrReplace(servicesData);
        console.log("Services migration successful:", result);
    } catch (error) {
        console.error("Migration failed:", error);
    }
}

migrate();
