import { z } from "zod";
import { BaseResponseSchema } from "@/services/base/response/BaseResponseSchema";

export const UserSchema = z.object({});
export const CreateUserResponseSchema = BaseResponseSchema(UserSchema);
export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>;