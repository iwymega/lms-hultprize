import { z } from "zod";
import { BaseResponseSchema } from "@/services/base/response/BaseResponseSchema";
import { SinglePostSchema } from "./IndexPostResponse";

export const ShowPostResponseSchema = BaseResponseSchema(SinglePostSchema);
export type ShowPostResponse = z.infer<typeof ShowPostResponseSchema>;
