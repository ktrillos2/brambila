import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'globalConfig',
    title: 'Configuración Global',
    type: 'document',
    fields: [
        defineField({
            name: 'siteName',
            title: 'Nombre del Sitio',
            type: 'string',
        }),
        defineField({
            name: 'logo',
            title: 'Logo Encabezado',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'logoFooter',
            title: 'Logo Pie de Página',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'email',
            title: 'Correo de Contacto',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Teléfono',
            type: 'string',
        }),
        defineField({
            name: 'whatsapp',
            title: 'Número de WhatsApp',
            type: 'string',
            description: 'Formato: 5211234567890 (Formato internacional sin +)',
        }),
        defineField({
            name: 'address',
            title: 'Dirección',
            type: 'text',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Redes Sociales',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'platform',
                            title: 'Plataforma',
                            type: 'string',
                        }),
                        defineField({
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'headerMenu',
            title: 'Menú Encabezado',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Etiqueta',
                            type: 'string',
                        }),
                        defineField({
                            name: 'href',
                            title: 'Enlace',
                            type: 'string',
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'footerMenu',
            title: 'Menú Pie de Página',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Etiqueta',
                            type: 'string',
                        }),
                        defineField({
                            name: 'href',
                            title: 'Enlace',
                            type: 'string',
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'legalMenu',
            title: 'Menú Legal',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Etiqueta',
                            type: 'string',
                        }),
                        defineField({
                            name: 'href',
                            title: 'Enlace',
                            type: 'string',
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'footerText',
            title: 'Footer Text',
            type: 'text',
        }),
    ],
})
