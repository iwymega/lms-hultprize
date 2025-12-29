import { z } from "zod";
import { BaseResponseSchema } from "@/services/base/response/BaseResponseSchema";

export const DeletePostResponseSchema = BaseResponseSchema(z.object({
    message: z.string(),
}));
export type DeletePostResponse = z.infer<typeof DeletePostResponseSchema>;
