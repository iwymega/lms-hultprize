import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "@/api/api";
import { RemovePostGalleryResponse, RemovePostGalleryResponseSchema } from "@/services/post/response/RemovePostGalleryResponse";

const API_VERSION = "v1";

interface RemovePostGalleryParams {
    post_id: string;
    file_id: string;
}

export const useRemovePostGallery = () => {
    const queryClient = useQueryClient();

    return useMutation<RemovePostGalleryResponse, Error, RemovePostGalleryParams>({
        mutationFn: async (params: RemovePostGalleryParams): Promise<RemovePostGalleryResponse> => {
            const response = await privateApi.delete(`/${API_VERSION}/post/${params.post_id}/gallery/${params.file_id}`);

            return RemovePostGalleryResponseSchema.parse(response.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post-with-gallery'] });
            queryClient.invalidateQueries({ queryKey: ['post-gallery'] });
        },
    });
};

export default useRemovePostGallery;
