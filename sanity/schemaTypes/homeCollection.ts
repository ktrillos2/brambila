import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'homeCollection',
    title: 'Sección Colección (Home)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título (ES / EN)',
            type: 'localeString',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtítulo (ES / EN)',
            type: 'localeString',
        }),
        defineField({
            name: 'featuredProperties',
            title: 'Propiedades Destacadas',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'property' }],
                },
            ],
        }),
    ],
})
