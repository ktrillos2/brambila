import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'globalConfig',
    title: 'Global Configuration',
    type: 'document',
    fields: [
        defineField({
            name: 'siteName',
            title: 'Site Name',
            type: 'string',
        }),
        defineField({
            name: 'logo',
            title: 'LOGO Header',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'logoFooter',
            title: 'LOGO Footer',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'email',
            title: 'Contact Email',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
        }),
        defineField({
            name: 'whatsapp',
            title: 'WhatsApp Number',
            type: 'string',
            description: 'Format: 5211234567890 (International format without +)',
        }),
        defineField({
            name: 'address',
            title: 'Address',
            type: 'text',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'platform',
                            title: 'Platform',
                            type: 'string',
                        }),
                        defineField({
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'footerText',
            title: 'Footer Text',
            type: 'text',
        }),
    ],
})
