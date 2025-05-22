import { z } from "zod";
import { BaseResponseSchema } from "@/services/base/response/BaseResponseSchema";

const UserRoleSchema = z.object({
    id: z.number(),
    display_name: z.string(),
    name: z.string(),
});

const UserPermissionSchema = z.object({
    id: z.number(),
    display_name: z.string(),
    name: z.string(),
    group: z.string(),
});

const SingleUserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    created_at: z.string(),
    updated_at: z.string(),
    roles: z.array(UserRoleSchema).optional(),
    permissions: z.array(UserPermissionSchema).optional()
});

export const UserSchema = z.array(SingleUserSchema);
export const IndexUserResponseSchema = BaseResponseSchema(UserSchema);
export type IndexUserResponse = z.infer<typeof IndexUserResponseSchema>;
export type SingleUserResponse = z.infer<typeof SingleUserSchema>;