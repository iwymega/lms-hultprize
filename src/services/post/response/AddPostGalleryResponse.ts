import { z } from "zod";
import { BaseResponseSchema } from "@/services/base/response/BaseResponseSchema";

export const AddPostGalleryDataSchema = z.object({
    message: z.string(),
    success: z.boolean(),
});

export const AddPostGalleryResponseSchema = BaseResponseSchema(AddPostGalleryDataSchema);
export type AddPostGalleryResponse = z.infer<typeof AddPostGalleryResponseSchema>;
