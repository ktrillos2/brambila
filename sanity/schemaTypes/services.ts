import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'services',
    title: 'Sección Servicios',
    type: 'document',
    fields: [
        defineField({
            name: 'subtitle',
            title: 'Subtítulo',
            type: 'string',
        }),
        defineField({
            name: 'title',
            title: 'Título',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Descripción Principal',
            type: 'text',
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
                            title: 'Título del Servicio',
                            type: 'string',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Descripción',
                            type: 'text',
                        }),
                    ],
                },
            ],
        }),
    ],
})
