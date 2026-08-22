import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'about',
    title: 'Nosotros',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título (ES / EN)',
            type: 'localeString',
        }),
        defineField({
            name: 'description1',
            title: 'Descripción - Párrafo 1 (ES / EN)',
            type: 'localeText',
        }),
        defineField({
            name: 'description2',
            title: 'Descripción - Párrafo 2 (ES / EN)',
            type: 'localeText',
        }),
        defineField({
            name: 'features',
            title: 'Características',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Etiqueta (ES / EN)',
                            type: 'localeString',
                        }),
                        defineField({
                            name: 'icon',
                            title: 'Icono (Nombre Lucide)',
                            type: 'string',
                            description: 'Ej: Users, Heart, Star, Shield',
                            initialValue: 'Star'
                        })
                    ],
                    preview: {
                        select: {
                            title: 'label.es',
                            subtitle: 'icon'
                        }
                    }
                }
            ]
        }),
        defineField({
            name: 'image',
            title: 'Imagen Principal',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],
})
