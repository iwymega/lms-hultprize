import { z } from "zod";
import { BaseResponseSchema } from "@/services/base/response/BaseResponseSchema";

export const SingleFileSchema = z.object({
    id: z.string(),
    folder_id: z.number().nullable().optional(),
    user_id: z.string(),
    file_path: z.string(),
    file_name: z.string(),
    file_size: z.number(),
    file_type: z.string(),
    mime_type: z.string(),
    is_compressed: z.boolean().nullable().optional(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    visibility: z.enum(["public", "private"]).optional(),
    created_at: z.string(),
    updated_at: z.string(),
    deleted_at: z.string().nullable().optional(),
    // Relations
    folder: z.any().optional(),
    file_items: z.array(z.any()).optional(),
    posts: z.array(z.any()).optional(),
});

export const FileSchema = z.array(SingleFileSchema);
export const IndexFileResponseSchema = BaseResponseSchema(FileSchema);
export type IndexFileResponse = z.infer<typeof IndexFileResponseSchema>;
export type SingleFileResponse = z.infer<typeof SingleFileSchema>;
