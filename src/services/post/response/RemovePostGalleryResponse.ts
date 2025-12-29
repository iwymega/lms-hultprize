import { z } from "zod";
import { BaseResponseSchema } from "@/services/base/response/BaseResponseSchema";

export const RemovePostGalleryDataSchema = z.object({
    message: z.string(),
    success: z.boolean(),
});

export const RemovePostGalleryResponseSchema = BaseResponseSchema(RemovePostGalleryDataSchema);
export type RemovePostGalleryResponse = z.infer<typeof RemovePostGalleryResponseSchema>;
