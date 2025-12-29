import { z } from "zod";

const UpdatePostSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    content: z.string().min(1, "Content is required").optional(),
    author: z.string().min(1, "Author is required").optional(),
    published: z.boolean().optional(),
});

export { UpdatePostSchema };
export type UpdatePost = z.infer<typeof UpdatePostSchema>;
