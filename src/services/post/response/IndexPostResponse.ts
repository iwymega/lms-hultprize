import { z } from "zod";
import { BaseResponseSchema } from "@/services/base/response/BaseResponseSchema";

export const FileItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    size: z.number(),
    ext: z.string(),
    mime_type: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const SinglePostSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    image: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    category_id: z.string().nullable(),
    files_count: z.number().optional(),
    files_exists: z.boolean().optional(),
    image_url: z.string().nullable().optional(),
    files: z.array(FileItemSchema).optional(),
});

export const PostSchema = z.array(SinglePostSchema);
export const IndexPostResponseSchema = BaseResponseSchema(PostSchema);
export type IndexPostResponse = z.infer<typeof IndexPostResponseSchema>;
export type SinglePostResponse = z.infer<typeof SinglePostSchema>;
