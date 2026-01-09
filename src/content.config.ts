import { defineCollection, z } from "astro:content";

const contentCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        pubDate: z.string().optional(),
        heroImage: z.string().optional(),
        preview: z.string().optional(),
    }),
}),

export const collections = {
    other: contentCollection,
    ideas: contentCollection,
    devblog: contentCollection,
    tutorials: contentCollection,
};