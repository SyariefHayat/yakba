import { client } from "@/sanity/lib/client";
import type { Product, Category, Program } from "./types";

// Get all published products with category expanded
export async function getAllProducts(): Promise<Product[]> {
  return client.fetch(
    `*[_type == "product" && isPublished == true] | order(_createdAt desc) {
      _id,
      name,
      slug,
      type,
      category->{
        _id,
        name,
        slug
      },
      shortDescription,
      description,
      price,
      discount,
      currency,
      media,
      stock,
      isPublished,
      whatsappCta,
      seo
    }`
  );
}

// Get a single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug && isPublished == true][0] {
      _id,
      name,
      slug,
      type,
      category->{
        _id,
        name,
        slug
      },
      shortDescription,
      description,
      price,
      discount,
      currency,
      media,
      stock,
      isPublished,
      whatsappCta,
      seo
    }`,
    { slug }
  );
}

// Get all categories
export async function getAllCategories(): Promise<Category[]> {
  return client.fetch(
    `*[_type == "category"] | order(name asc) {
      _id,
      name,
      slug
    }`
  );
}

// Get all product slugs (for static generation)
export async function getAllProductSlugs(): Promise<{ slug: { current: string } }[]> {
  return client.fetch(
    `*[_type == "product" && isPublished == true] { slug }`
  );
}

// Get all published programs
export async function getAllPrograms(): Promise<Program[]> {
  return client.fetch(
    `*[_type == "program" && isPublished == true] | order(_createdAt desc) {
      _id,
      name,
      slug,
      targetAgeRange,
      learningOutcomes,
      scheduleModel,
      curriculumSummary,
      heroImage,
      isPublished,
      whatsappCta,
      seo
    }`
  );
}

// Get a single program by slug
export async function getProgramBySlug(slug: string): Promise<Program | null> {
  return client.fetch(
    `*[_type == "program" && slug.current == $slug && isPublished == true][0] {
      _id,
      name,
      slug,
      targetAgeRange,
      learningOutcomes,
      scheduleModel,
      curriculumSummary,
      heroImage,
      isPublished,
      whatsappCta,
      seo
    }`,
    { slug }
  );
}
