import { z } from "zod";

const UploadFileSchema = z.object({
    file: z.instanceof(File),
    name: z.string().optional(),
    type: z.string().optional(),
});

export { UploadFileSchema };
export type UploadFile = z.infer<typeof UploadFileSchema>;
