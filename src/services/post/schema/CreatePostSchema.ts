import { z } from "zod";

const CreatePostSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    author: z.string().min(1, "Author is required"),
    published: z.boolean().optional(),
});

export { CreatePostSchema };
export type CreatePost = z.infer<typeof CreatePostSchema>;
