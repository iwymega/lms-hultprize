import { z } from "zod";

// Define the LoginData schema
const loginDataSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default loginDataSchema;
export type LoginData = z.infer<typeof loginDataSchema>;