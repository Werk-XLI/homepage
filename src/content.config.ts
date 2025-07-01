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

export const collections = {
  liveDates: liveDatesCollection,
  markdown: defaultCollection
};