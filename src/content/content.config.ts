import { defineCollection, z } from "astro:content";

const liveDatesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string().transform((date) => new Date(date).toLocaleDateString('de-DE')),
    venue: z.string(),
    city: z.string(),
    time: z.string().transform((time) => new Date(time).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })),
    price: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  liveDates: liveDatesCollection,
};