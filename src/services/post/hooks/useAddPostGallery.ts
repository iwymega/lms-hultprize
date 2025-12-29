import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "@/api/api";
import { AddPostGallery } from "@/services/post/schema/AddPostGallerySchema";
import { AddPostGalleryResponse, AddPostGalleryResponseSchema } from "@/services/post/response/AddPostGalleryResponse";

const API_VERSION = "v1";

interface AddPostGalleryParams {
    post_id: string;
    data: AddPostGallery;
}

export const useAddPostGallery = () => {
    const queryClient = useQueryClient();

    return useMutation<AddPostGalleryResponse, Error, AddPostGalleryParams>({
        mutationFn: async (params: AddPostGalleryParams): Promise<AddPostGalleryResponse> => {
            const response = await privateApi.post(`/${API_VERSION}/post/${params.post_id}/gallery`, params.data);

            return AddPostGalleryResponseSchema.parse(response.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post-with-gallery'] });
            queryClient.invalidateQueries({ queryKey: ['post-gallery'] });
        },
    });
};

export default useAddPostGallery;
