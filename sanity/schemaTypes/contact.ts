import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'contact',
    title: 'Sección Contacto',
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
            name: 'scheduleTitle',
            title: 'Título Horario',
            type: 'string',
        }),
        defineField({
            name: 'schedule',
            title: 'Horario',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'days',
                            title: 'Días',
                            type: 'string',
                        }),
                        defineField({
                            name: 'hours',
                            title: 'Horas',
                            type: 'string',
                        }),
                    ],
                },
            ],
        }),
    ],
})
