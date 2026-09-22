import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const liveDatesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/liveDates" }),
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
  loader: glob({ pattern: "**/*.md", base: "./src/content/markdown" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional()
  }),
});

export const collections = {
  liveDates: liveDatesCollection,
  markdown: defaultCollection
};