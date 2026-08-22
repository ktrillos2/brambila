import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'localeArray',
  title: 'Lista localizada (ES / EN)',
  type: 'object',
  fields: [
    defineField({
      name: 'es',
      title: 'Español (ES)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'en',
      title: 'English (EN)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  options: {
    collapsible: true,
    collapsed: false,
  },
})
