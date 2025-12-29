import { z } from "zod";

const AddPostGallerySchema = z.object({
    file_ids: z.string().max(50, "File IDs must be 50 characters or less"),
});

export { AddPostGallerySchema };
export type AddPostGallery = z.infer<typeof AddPostGallerySchema>;
