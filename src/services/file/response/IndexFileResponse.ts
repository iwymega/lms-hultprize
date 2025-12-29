import { z } from "zod";
import { BaseResponseSchema } from "@/services/base/response/BaseResponseSchema";

export const SingleFileSchema = z.object({
    id: z.string(),
    name: z.string(),
    size: z.string(),
    url: z.string(),
    type: z.string(),
    mime_type: z.string().optional(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const FileSchema = z.array(SingleFileSchema);
export const IndexFileResponseSchema = BaseResponseSchema(FileSchema);
export type IndexFileResponse = z.infer<typeof IndexFileResponseSchema>;
export type SingleFileResponse = z.infer<typeof SingleFileSchema>;
