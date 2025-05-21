import { z } from "zod";

// Pagination schema (optional field)
const PaginationSchema = z.object({
    current_page: z.number(),
    from: z.number().nullable().optional(), // Allow null or undefined
    to: z.number().nullable().optional(), // Allow null or undefined
    total: z.number(),
    per_page: z.number(),
    last_page: z.number(),
    next_page: z.number(),
    prev_page: z.number(),
    path: z.string(),
});

// Base API Response Schema
export const BaseResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
        success: z.boolean(),
        message: z.string(),
        code: z.number(),
        data: dataSchema,
        pagination: z.nullable(PaginationSchema).optional(), // Optional pagination field
    });