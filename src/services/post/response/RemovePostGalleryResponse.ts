import { z } from "zod";

// For DELETE requests, the API might return null for data field
export const RemovePostGalleryResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    code: z.number(),
    data: z.any().nullable().optional(),
});

export type RemovePostGalleryResponse = z.infer<typeof RemovePostGalleryResponseSchema>;
