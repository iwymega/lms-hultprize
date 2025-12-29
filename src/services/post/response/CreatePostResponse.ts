import { z } from "zod";
import { BaseResponseSchema } from "@/services/base/response/BaseResponseSchema";
import { SinglePostSchema } from "./IndexPostResponse";

export const CreatePostResponseSchema = BaseResponseSchema(SinglePostSchema);
export type CreatePostResponse = z.infer<typeof CreatePostResponseSchema>;
