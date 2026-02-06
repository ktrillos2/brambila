import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'philosophy',
    title: 'Filosofía',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título Principal',
            type: 'string',
            initialValue: 'NUESTRA FILOSOFÍA',
        }),
        defineField({
            name: 'mission',
            title: 'Misión',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'vision',
            title: 'Visión',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'values',
            title: 'Valores',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'image',
            title: 'Imagen Principal',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'quote',
            title: 'Cita Destacada',
            type: 'text',
            rows: 2,
        }),
    ],
})
