import { NextResponse } from "next/server"
import { Resend } from "resend"
import ContactEmail from "@/components/emails/contact-email"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    email: z.string().email("Email inválido"),
    phone: z.string().optional(),
    message: z.string().min(1, "El mensaje es requerido"),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, phone, message } = contactSchema.parse(body)

        const data = await resend.emails.send({
            from: "Contact Form <onboarding@resend.dev>",
            to: ["brambilasinmobiliaria@gmail.com"],
            subject: `Nuevo mensaje de contacto de ${name}`,
            react: ContactEmail({ name, email, phone: phone || "", message }),
            replyTo: email,
        })

        return NextResponse.json(data)
    } catch (error) {
        console.error("Error sending email:", error)
        return NextResponse.json(
            { error: "Error al enviar el mensaje" },
            { status: 500 }
        )
    }
}
