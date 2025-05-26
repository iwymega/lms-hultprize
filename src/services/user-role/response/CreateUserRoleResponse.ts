import { z } from "zod";
import { BaseResponseSchema } from "@/services/base/response/BaseResponseSchema";

export const UserRoleSchema = z.object({});
export const CreateUserRoleResponseSchema = BaseResponseSchema(UserRoleSchema);
export type CreateUserRoleResponse = z.infer<typeof CreateUserRoleResponseSchema>;