import { z } from "zod";
import { BaseResponseSchema } from "@/services/base/response/BaseResponseSchema";

export const SinglePostSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    author: z.string(),
    published: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const PostSchema = z.array(SinglePostSchema);
export const IndexPostResponseSchema = BaseResponseSchema(PostSchema);
export type IndexPostResponse = z.infer<typeof IndexPostResponseSchema>;
export type SinglePostResponse = z.infer<typeof SinglePostSchema>;
