import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'hero',
    title: 'Sección Hero',
    type: 'document',
    fields: [
        defineField({
            name: 'title1',
            title: 'Título Principal (Línea 1)',
            type: 'string',
            description: 'Primera línea del título principal (ej. Brambila\'s)',
        }),
        defineField({
            name: 'title2',
            title: 'Título Principal (Línea 2)',
            type: 'string',
            description: 'Segunda línea del título principal (ej. INMOBILIARIA)',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtítulo',
            type: 'text',
            description: 'Texto descriptivo debajo del título',
        }),
        defineField({
            name: 'searchPlaceholder',
            title: 'Placeholder del Buscador',
            type: 'string',
            description: 'Texto que aparece en la caja de búsqueda',
        }),
        defineField({
            name: 'images',
            title: 'Imágenes de Fondo',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'image',
                            title: 'Imagen',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                        }),
                        defineField({
                            name: 'alt',
                            title: 'Texto Alternativo',
                            type: 'string',
                        }),
                    ],
                },
            ],
        }),
    ],
})
