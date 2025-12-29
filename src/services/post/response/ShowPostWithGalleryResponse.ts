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

export const PostWithGallerySchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    image: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    files: z.array(FileItemSchema).optional(),
    filesCount: z.number().optional(),
    filesExists: z.boolean().optional(),
});

export const ShowPostWithGalleryResponseSchema = BaseResponseSchema(PostWithGallerySchema);
export type ShowPostWithGalleryResponse = z.infer<typeof ShowPostWithGalleryResponseSchema>;
export type PostWithGallery = z.infer<typeof PostWithGallerySchema>;
