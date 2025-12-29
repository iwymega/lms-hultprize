import { z } from "zod";

export const DeleteFileResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
});

export type DeleteFileResponse = z.infer<typeof DeleteFileResponseSchema>;
