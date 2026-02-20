import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'property',
    title: 'Propiedades',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'location',
            title: 'Ubicación',
            type: 'string',
        }),
        defineField({
            name: 'locationPDF',
            title: 'Ubicación para Ficha (PDF)',
            description: 'Si se llena, esta ubicación aparecerá en el PDF en lugar de la ubicación general.',
            type: 'string',
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
            title: 'Descripción',
            type: 'text',
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
            title: 'Sector',
            type: 'string',
        }),
        defineField({
            name: 'condition',
            title: 'Condición',
            type: 'string',
        }),
        defineField({
            name: 'features',
            title: 'Características',
            type: 'array',
            of: [{ type: 'string' }],
        }),

        defineField({
            name: 'mapEmbed',
            title: 'Mapa Insertado (Embed Iframe)',
            description: 'Pega aquí el código HTML del iframe de Google Maps',
            type: 'text',
        }),

        defineField({
            name: 'video',
            title: 'Video de la Propiedad',
            type: 'file',
            options: {
                accept: 'video/*',
            },
        }),
    ],
})
