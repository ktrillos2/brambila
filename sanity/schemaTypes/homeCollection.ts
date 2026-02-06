import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'homeCollection',
    title: 'Sección Colección (Home)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
            type: 'string',
            initialValue: 'COLECCIÓN PRIVADA',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtítulo',
            type: 'string',
            initialValue: 'Curaduría Exclusiva',
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
