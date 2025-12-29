import { z } from "zod";
import { BaseResponseSchema } from "@/services/base/response/BaseResponseSchema";

export const AddedFileSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    folder_id: z.string().nullable(),
    visibility: z.string(),
    title: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    size: z.number(),
    mime_type: z.string(),
    ext: z.string(),
    url: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    deleted_at: z.string().nullable(),
    size_for_human: z.string().optional(),
});

export const AddPostGalleryDataSchema = z.array(AddedFileSchema);

export const AddPostGalleryResponseSchema = BaseResponseSchema(AddPostGalleryDataSchema);
export type AddPostGalleryResponse = z.infer<typeof AddPostGalleryResponseSchema>;
