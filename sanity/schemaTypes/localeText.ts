import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'localeText',
  title: 'Texto largo localizado (ES / EN)',
  type: 'object',
  fields: [
    defineField({
      name: 'es',
      title: 'Español (ES)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'en',
      title: 'English (EN)',
      type: 'text',
      rows: 4,
    }),
  ],
  options: {
    collapsible: true,
    collapsed: false,
  },
})
