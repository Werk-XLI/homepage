import { defineCollection, z } from "astro:content";

const liveDatesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    venue: z.string(),
    city: z.string(),
    time: z.string(),
    price: z.string().optional()
  }),
});
const defaultCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional()
  }),
});
const productsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    price: z.string(),
    category: z.enum(["merch", "music", "bundle"]),
    image: z.string().optional(),
    available: z.boolean().default(true),
    featured: z.boolean().default(false)
  }),
});

export const collections = {
  liveDates: liveDatesCollection,
  markdown: defaultCollection,
  products: productsCollection
};