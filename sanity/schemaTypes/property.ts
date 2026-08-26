import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'property',
    title: 'Propiedades',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título (ES / EN)',
            type: 'localeString',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: (doc: any) => doc.title?.es || doc.title || '',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'location',
            title: 'Ubicación (ES / EN)',
            type: 'localeString',
        }),
        defineField({
            name: 'locationPDF',
            title: 'Ubicación para Ficha - PDF (ES / EN)',
            description: 'Si se llena, esta ubicación aparecerá en el PDF en lugar de la ubicación general.',
            type: 'localeString',
        }),

        defineField({
            name: 'price',
            title: 'Precio',
            type: 'string',
        }),
        defineField({
            name: 'currency',
            title: 'Moneda',
            type: 'string',
            options: {
                list: ['COP', 'MXN', 'USD'],
            },
        }),
        defineField({
            name: 'tag',
            title: 'Etiqueta',
            type: 'string',
            options: {
                list: ['Venta', 'Alquiler'],
            },
        }),
        defineField({
            name: 'status',
            title: 'Estado',
            type: 'string',
            options: {
                list: ['Venta', 'Alquiler'],
            }
        }),
        defineField({
            name: 'type',
            title: 'Tipo de Propiedad',
            type: 'string',
            options: {
                list: ['Casa', 'Terreno', 'Departamento', 'Comercial', 'Bodega', 'Local'],
            },
        }),
        defineField({
            name: 'mainImage',
            title: 'Imagen Principal',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'gallery',
            title: 'Galería',
            type: 'array',
            of: [{ type: 'image' }],
        }),
        defineField({
            name: 'description',
            title: 'Descripción (ES / EN)',
            type: 'localeText',
        }),
        defineField({
            name: 'bedrooms',
            title: 'Recámaras',
            type: 'number',
        }),
        defineField({
            name: 'bathrooms',
            title: 'Baños',
            type: 'number',
        }),
        defineField({
            name: 'halfBathrooms',
            title: 'Medios Baños',
            description: 'Especifica si tiene medio baño (solo tiene el sanitario)',
            type: 'number',
        }),
        defineField({
            name: 'area',
            title: 'Área Construcción',
            type: 'string',
        }),
        defineField({
            name: 'landArea',
            title: 'Área Terreno',
            type: 'string',
        }),
        defineField({
            name: 'levels',
            title: 'Niveles',
            type: 'number',
        }),
        defineField({
            name: 'code',
            title: 'Código',
            type: 'string',
        }),
        defineField({
            name: 'sector',
            title: 'Sector (ES / EN)',
            type: 'localeString',
        }),
        defineField({
            name: 'condition',
            title: 'Condición (ES / EN)',
            type: 'localeString',
        }),
        defineField({
            name: 'features',
            title: 'Características y Amenidades (ES / EN)',
            type: 'localeArray',
        }),

        defineField({
            name: 'latitude',
            title: 'Latitud',
            description: 'Ejemplo: 20.659698',
            type: 'number',
        }),
        defineField({
            name: 'longitude',
            title: 'Longitud',
            description: 'Ejemplo: -103.349609',
            type: 'number',
        }),

        defineField({
            name: 'video',
            title: 'Video de la Propiedad (Archivo Local)',
            type: 'file',
            options: {
                accept: 'video/*',
            },
        }),
        
        defineField({
            name: 'youtubeVideo',
            title: 'Video de YouTube / Vimeo (Enlace)',
            description: 'Pega aquí el enlace de YouTube o Vimeo (Ejemplo: https://www.youtube.com/watch?v=abcd123). Se usará si no hay un video local.',
            type: 'url',
        }),
    ],
    preview: {
        select: {
            titleEs: 'title.es',
            titleEn: 'title.en',
            rawTitle: 'title',
            price: 'price',
            currency: 'currency',
            media: 'mainImage',
        },
        prepare(selection) {
            const { titleEs, titleEn, rawTitle, price, currency, media } = selection
            const title =
                titleEs ||
                titleEn ||
                (typeof rawTitle === 'string' ? rawTitle : '') ||
                'Propiedad sin título'

            const subtitle = price ? `${currency ? `${currency} ` : ''}${price}` : undefined

            return {
                title,
                subtitle,
                media,
            }
        },
    },
})

