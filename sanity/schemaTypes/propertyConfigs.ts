import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'propertyConfigs',
    title: 'Configuración de Propiedades',
    type: 'document',
    fields: [
        defineField({
            name: 'locations',
            title: 'Ubicaciones Disponibles',
            description: 'Lista de ubicaciones que aparecerán en los filtros',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'propertyTypes',
            title: 'Tipos de Propiedad (ES / EN)',
            description: 'Lista de tipos de propiedad (ej: Casa / House, Terreno / Land)',
            type: 'array',
            of: [{ type: 'localeString' }, { type: 'string' }],
        }),
        defineField({
            name: 'amenities',
            title: 'Amenidades Comunes (ES / EN)',
            description: 'Lista de amenidades sugeridas para las propiedades',
            type: 'array',
            of: [{ type: 'localeString' }, { type: 'string' }],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Configuración de Filtros y Listas'
            }
        }
    }
})
