import {defineField, defineType} from 'sanity'

export const whatsappCtaType = defineType({
  name: 'whatsappCta',
  title: 'WhatsApp CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable CTA',
      type: 'boolean',
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intent',
      title: 'Intent',
      type: 'string',
      options: {
        list: [
          {title: 'Beli', value: 'beli'},
          {title: 'Tanya', value: 'tanya'},
        ],
        layout: 'radio',
      },
      initialValue: 'tanya',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      initialValue: 'Hubungi via WhatsApp',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'messageTemplate',
      title: 'Message Template',
      description:
        'Gunakan placeholder: {{itemName}} dan {{intent}}. Contoh: Halo Yakba, saya ingin {{intent}} {{itemName}}.',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(10),
    }),
  ],
})
