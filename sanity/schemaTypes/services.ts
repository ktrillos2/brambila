import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'services',
    title: 'Sección Servicios',
    type: 'document',
    fields: [
        defineField({
            name: 'subtitle',
            title: 'Subtítulo (ES / EN)',
            type: 'localeString',
        }),
        defineField({
            name: 'title',
            title: 'Título (ES / EN)',
            type: 'localeString',
        }),
        defineField({
            name: 'description',
            title: 'Descripción Principal (ES / EN)',
            type: 'localeText',
        }),
        defineField({
            name: 'servicesList',
            title: 'Lista de Servicios',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'icon',
                            title: 'Icono',
                            type: 'string',
                            options: {
                                list: ['Home', 'Key', 'FileText'],
                            },
                        }),
                        defineField({
                            name: 'title',
                            title: 'Título del Servicio (ES / EN)',
                            type: 'localeString',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Descripción (ES / EN)',
                            type: 'localeText',
                        }),
                    ],
                },
            ],
        }),
    ],
})
