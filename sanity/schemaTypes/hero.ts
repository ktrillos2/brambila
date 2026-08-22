import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'hero',
    title: 'Sección Hero',
    type: 'document',
    fields: [
        defineField({
            name: 'title1',
            title: 'Título Principal - Línea 1 (ES / EN)',
            type: 'localeString',
            description: 'Primera línea del título principal (ej. Brambila\'s)',
        }),
        defineField({
            name: 'title2',
            title: 'Título Principal - Línea 2 (ES / EN)',
            type: 'localeString',
            description: 'Segunda línea del título principal (ej. INMOBILIARIA / REAL ESTATE)',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtítulo (ES / EN)',
            type: 'localeText',
            description: 'Texto descriptivo debajo del título',
        }),
        defineField({
            name: 'searchPlaceholder',
            title: 'Placeholder del Buscador (ES / EN)',
            type: 'localeString',
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
                            title: 'Texto Alternativo (ES / EN)',
                            type: 'localeString',
                        }),
                    ],
                },
            ],
        }),
    ],
})
