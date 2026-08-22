import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'philosophy',
    title: 'Filosofía',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título Principal (ES / EN)',
            type: 'localeString',
        }),
        defineField({
            name: 'mission',
            title: 'Misión (ES / EN)',
            type: 'localeText',
        }),
        defineField({
            name: 'vision',
            title: 'Visión (ES / EN)',
            type: 'localeText',
        }),
        defineField({
            name: 'values',
            title: 'Valores (ES / EN)',
            type: 'localeArray',
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
            title: 'Cita Destacada (ES / EN)',
            type: 'localeText',
        }),
    ],
})
