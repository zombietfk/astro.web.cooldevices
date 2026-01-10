import { defineCollection, z } from "astro:content";

const contentCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        pubDate: z.date().optional(),
        tags: z.array(z.string()).optional(),
        keywords: z.array(z.string()).optional(),
    }),
});

export const collections = {
    other: contentCollection,
    ideas: contentCollection,
    devblog: contentCollection,
    tutorials: contentCollection,
};