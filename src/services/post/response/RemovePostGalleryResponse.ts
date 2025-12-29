import { z } from "zod";
import { BaseResponseSchema } from "@/services/base/response/BaseResponseSchema";

export const RemovePostGalleryDataSchema = z.object({
    success: z.boolean().nullable(),
    message: z.string().nullable(),
    code: z.number().nullable(),
    data: z.nullable(z.any()),
});

export const RemovePostGalleryResponseSchema = BaseResponseSchema(RemovePostGalleryDataSchema);
export type RemovePostGalleryResponse = z.infer<typeof RemovePostGalleryResponseSchema>;
