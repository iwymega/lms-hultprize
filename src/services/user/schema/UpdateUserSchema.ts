import { z } from "zod";

const UpdateUserSchema = z.object({});

export { UpdateUserSchema };
export type UpdateUser = z.infer<typeof UpdateUserSchema>;