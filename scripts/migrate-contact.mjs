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

const contactData = {
    _id: "contact",
    _type: "contact",
    subtitle: "Hablemos",
    title: "¿Estamos listos para empezar?",
    description: "Completa el formulario y de inmediato un experto de nuestro equipo se pondrá en contacto contigo.",
    scheduleTitle: "Horario de Atención",
    schedule: [
        { days: "Lunes - Viernes", hours: "9:00 AM - 7:00 PM" },
        { days: "Sábado", hours: "10:00 AM - 2:00 PM" },
        { days: "Domingo", hours: "Cerrado" }
    ]
};

async function migrate() {
    try {
        console.log("Starting Contact migration...");
        const result = await client.createOrReplace(contactData);
        console.log("Contact migration successful:", result);
    } catch (error) {
        console.error("Migration failed:", error);
    }
}

migrate();
