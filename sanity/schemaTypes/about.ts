import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'about',
    title: 'Nosotros',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
            type: 'string',
            initialValue: 'Nosotros',
        }),
        defineField({
            name: 'description1',
            title: 'Descripción (Párrafo 1)',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'description2',
            title: 'Descripción (Párrafo 2)',
            type: 'text',
            rows: 4,
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
                            title: 'Etiqueta',
                            type: 'string',
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
                            title: 'label',
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
