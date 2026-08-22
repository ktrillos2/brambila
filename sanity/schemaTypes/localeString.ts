import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'localeString',
  title: 'Texto localizado (ES / EN)',
  type: 'object',
  fields: [
    defineField({
      name: 'es',
      title: 'Español (ES)',
      type: 'string',
    }),
    defineField({
      name: 'en',
      title: 'English (EN)',
      type: 'string',
    }),
  ],
  options: {
    collapsible: true,
    collapsed: false,
  },
})
