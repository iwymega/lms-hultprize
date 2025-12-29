import { z } from "zod";

const UpdatePostSchema = z.object({
    title: z.string().max(255, "Title must be 255 characters or less").optional(),
    content: z.string().max(1000, "Content must be 1000 characters or less").optional(),
    image: z.instanceof(File).optional(),
});

export { UpdatePostSchema };
export type UpdatePost = z.infer<typeof UpdatePostSchema>;
