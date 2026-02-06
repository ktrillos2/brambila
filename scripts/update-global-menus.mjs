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

async function migrate() {
    try {
        console.log("Updating Global Config with Menus...");
        const globalConfig = await client.fetch(`*[_type == "globalConfig"][0]`);

        if (!globalConfig) {
            console.error("Global config not found!");
            return;
        }

        const startUpdate = client.patch(globalConfig._id)
            .set({
                headerMenu: [
                    { label: "INICIO", href: "/" },
                    { label: "PROPIEDADES", href: "/propiedades" },
                    { label: "NOSOTROS", href: "/nosotros" },
                    { label: "SERVICIOS", href: "/#servicios" },
                ],
                footerMenu: [
                    { label: "Inicio", href: "#inicio" },
                    { label: "Nosotros", href: "#nosotros" },
                    { label: "Servicios", href: "#servicios" },
                    { label: "Propiedades", href: "#propiedades" },
                    { label: "Contacto", href: "#contacto" },
                ],
                legalMenu: [
                    { label: "Aviso de Privacidad", href: "/aviso-de-privacidad" },
                    { label: "Términos y Condiciones", href: "/terminos-y-condiciones" },
                ]
            });

        const result = await startUpdate.commit();
        console.log("Global Config menus updated successfuly:", result);

    } catch (error) {
        console.error("Migration failed:", error);
    }
}

migrate();
