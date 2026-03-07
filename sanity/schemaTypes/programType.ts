import {defineField, defineType} from 'sanity'

export const programType = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Program',
      type: 'string',
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'targetAgeRange',
      title: 'Rentang Usia',
      type: 'string',
      description: 'Contoh: 4-6 tahun',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'learningOutcomes',
      title: 'Hasil Belajar',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'scheduleModel',
      title: 'Model Jadwal',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'curriculumSummary',
      title: 'Ringkasan Kurikulum',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Gambar Utama',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'isPublished',
      title: 'Publikasikan di website',
      type: 'boolean',
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'whatsappCta',
      title: 'WhatsApp CTA',
      type: 'whatsappCta',
      initialValue: {
        enabled: true,
        intent: 'tanya',
        buttonLabel: 'Tanya Program via WhatsApp',
        messageTemplate: 'Halo Yakba, saya ingin {{intent}} program {{itemName}}.',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'targetAgeRange',
      media: 'heroImage',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.subtitle ? `Usia: ${selection.subtitle}` : 'Tanpa rentang usia',
        media: selection.media,
      }
    },
  },
})
