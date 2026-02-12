import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components"
import * as React from "react"

interface ContactEmailProps {
    name: string
    email: string
    phone: string
    message: string
}

export default function ContactEmail({
    name,
    email,
    phone,
    message,
}: ContactEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Nuevo mensaje de contacto de {name}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>Nuevo Mensaje de Contacto</Heading>
                    <Text style={text}>
                        Has recibido un nuevo mensaje a través del formulario de contacto de Brambila's Inmobiliaria.
                    </Text>
                    <Section style={section}>
                        <Text style={label}>Nombre:</Text>
                        <Text style={value}>{name}</Text>

                        <Text style={label}>Email:</Text>
                        <Text style={value}>{email}</Text>

                        <Text style={label}>Teléfono:</Text>
                        <Text style={value}>{phone || "No proporcionado"}</Text>

                        <Hr style={hr} />

                        <Text style={label}>Mensaje:</Text>
                        <Text style={paragraph}>{message}</Text>
                    </Section>
                    <Hr style={hr} />
                    <Text style={footer}>
                        Este correo fue enviado desde el sitio web de Brambila's Inmobiliaria.
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    maxWidth: "580px",
}

const h1 = {
    color: "#1a1a1a",
    fontSize: "24px",
    fontWeight: "600",
    lineHeight: "1.3",
    margin: "0 0 20px",
}

const section = {
    padding: "24px",
    border: "1px solid #e6e6e6",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
}

const text = {
    color: "#4a4a4a",
    fontSize: "16px",
    lineHeight: "1.5",
    margin: "0 0 20px",
}

const paragraph = {
    color: "#4a4a4a",
    fontSize: "16px",
    lineHeight: "1.5",
    margin: "0",
    whiteSpace: "pre-wrap" as const,
}

const label = {
    color: "#8898aa",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase" as const,
    margin: "0 0 4px",
}

const value = {
    color: "#1a1a1a",
    fontSize: "16px",
    margin: "0 0 16px",
}

const hr = {
    borderColor: "#e6e6e6",
    margin: "20px 0",
}

const footer = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "1.5",
    margin: "0",
}
