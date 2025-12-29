import { z } from "zod";

const CreatePostSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title must be 255 characters or less"),
    content: z.string().min(1, "Content is required").max(1000, "Content must be 1000 characters or less"),
    image: z.instanceof(File, { message: "Image is required" }),
});

export { CreatePostSchema };
export type CreatePost = z.infer<typeof CreatePostSchema>;
