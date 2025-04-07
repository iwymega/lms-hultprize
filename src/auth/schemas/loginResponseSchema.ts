import { z } from "zod";

// Define the LoginResponse schema
const loginResponseSchema = z.object({
    data: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        email_verified_at: z.string().nullable(),
        created_at: z.string(),
        updated_at: z.string(),
        channex_user_api_key: z.string(),
        username: z.string(),
        phone: z.string(),
        permissions: z.array(z.string()),
        role: z.array(z.string()),
        active_property: z.string(),
        active_property_id: z.string(),
        properties: z.record(z.string()),
    }),
    token: z.string(),
    expired: z.string(),
});

export default loginResponseSchema;