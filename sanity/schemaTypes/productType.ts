import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Produk',
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
      name: "type",
      title: "Tipe Produk",
      type: "string",
      options: {
        list: [
          { title: "Digital", value: "digital" },
          { title: "Fisik", value: "fisik" }
        ],
        layout: "radio"
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'shortDescription',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Lengkap',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Harga',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "discount",
      title: "Diskon (%)",
      type: "number",
      description: "Isi jika ada diskon. Contoh: 20 berarti diskon 20%",
      validation: (rule) => rule.min(0).max(90),
    }),
    defineField({
      name: 'currency',
      title: 'Mata Uang',
      type: 'string',
      initialValue: 'IDR',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'stock',
      title: 'Stok',
      description: 'Wajib untuk produk kategori fisik.',
      type: 'number',
      hidden: ({parent}) => (parent as {category?: string})?.category !== 'fisik',
      validation: (rule) =>
        rule.custom((value, context) => {
          const category = (context.parent as {category?: string})?.category
          if (category === 'fisik' && (value === undefined || value === null)) {
            return 'Stok wajib diisi untuk produk fisik.'
          }
          if (typeof value === 'number' && value < 0) {
            return 'Stok tidak boleh negatif.'
          }
          return true
        }),
    }),
    defineField({
      name: 'isPublished',
      title: 'Publikasikan di katalog',
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
        intent: 'beli',
        buttonLabel: 'Beli via WhatsApp',
        messageTemplate: 'Halo Yakba, saya ingin {{intent}} produk {{itemName}}.',
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
      subtitle: 'category',
      media: 'media.0',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.subtitle ? `Kategori: ${selection.subtitle}` : 'Tanpa kategori',
        media: selection.media,
      }
    },
  },
})
