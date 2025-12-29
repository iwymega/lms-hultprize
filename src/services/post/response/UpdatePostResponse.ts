import { z } from "zod";
import { BaseResponseSchema } from "@/services/base/response/BaseResponseSchema";
import { SinglePostSchema } from "./IndexPostResponse";

export const UpdatePostResponseSchema = BaseResponseSchema(SinglePostSchema);
export type UpdatePostResponse = z.infer<typeof UpdatePostResponseSchema>;
