import { z } from "zod";
import { BaseResponseSchema } from "@/services/base/response/BaseResponseSchema";

export const GalleryFileSchema = z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    size: z.number(),
    ext: z.string(),
    mime_type: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const PostGalleryDataSchema = z.array(GalleryFileSchema);
export const GetPostGalleryResponseSchema = BaseResponseSchema(PostGalleryDataSchema);
export type GetPostGalleryResponse = z.infer<typeof GetPostGalleryResponseSchema>;
export type GalleryFile = z.infer<typeof GalleryFileSchema>;
