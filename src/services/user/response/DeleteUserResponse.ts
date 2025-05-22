import { z } from "zod";
import { BaseResponseSchema } from "@/services/base/response/BaseResponseSchema";

export const UserSchema = z.object({});
export const DeleteUserResponseSchema = BaseResponseSchema(UserSchema);
export type DeleteUserResponse = z.infer<typeof DeleteUserResponseSchema>;