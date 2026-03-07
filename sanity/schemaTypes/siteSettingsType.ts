import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Nomor WhatsApp Utama',
      description: 'Format internasional tanpa +, contoh: 6281234567890',
      type: 'string',
      validation: (rule) => rule.required().regex(/^[1-9][0-9]{8,15}$/, {name: 'whatsapp'}),
    }),
    defineField({
      name: 'defaultWhatsappTemplate',
      title: 'Template Pesan WhatsApp Default',
      description:
        'Gunakan placeholder: {{itemName}} dan {{intent}}. Contoh: Halo Yakba, saya ingin {{intent}} {{itemName}}.',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: 'mainMenu',
      title: 'Menu Utama',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Path',
              description: 'Contoh: /program atau /tentang',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        defineField({
          name: 'gaMeasurementId',
          title: 'GA4 Measurement ID',
          type: 'string',
        }),
        defineField({
          name: 'gtmContainerId',
          title: 'GTM Container ID',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      subtitle: 'whatsappNumber',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Site Settings',
        subtitle: selection.subtitle ? `WA: ${selection.subtitle}` : 'Pengaturan global',
      }
    },
  },
})
