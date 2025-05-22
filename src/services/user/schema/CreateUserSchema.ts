import { z } from "zod";

const CreateUserSchema = z.object({});

export { CreateUserSchema };
export type CreateUser = z.infer<typeof CreateUserSchema>;