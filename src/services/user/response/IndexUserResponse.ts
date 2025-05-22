import { z } from "zod";
import { BaseResponseSchema } from "@/services/base/response/BaseResponseSchema";

export const UserSchema = z.object({});
export const IndexUserResponseSchema = BaseResponseSchema(UserSchema);
export type IndexUserResponse = z.infer<typeof IndexUserResponseSchema>;