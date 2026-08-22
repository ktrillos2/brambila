import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'contact',
    title: 'Sección Contacto',
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
            name: 'scheduleTitle',
            title: 'Título Horario (ES / EN)',
            type: 'localeString',
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
                            title: 'Días (ES / EN)',
                            type: 'localeString',
                        }),
                        defineField({
                            name: 'hours',
                            title: 'Horas (ES / EN)',
                            type: 'localeString',
                        }),
                    ],
                },
            ],
        }),
    ],
})
