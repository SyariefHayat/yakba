import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Halaman',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageKey',
      title: 'Tipe Halaman',
      type: 'string',
      options: {
        list: [
          {title: 'Beranda', value: 'home'},
          {title: 'Tentang', value: 'about'},
          {title: 'Kemitraan', value: 'partnership'},
          {title: 'Kontak', value: 'contact'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'heroImage',
      title: 'Gambar Utama',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'body',
      title: 'Konten',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
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
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'pageKey',
      media: 'heroImage',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.subtitle ? `Halaman: ${selection.subtitle}` : 'Halaman',
        media: selection.media,
      }
    },
  },
})
