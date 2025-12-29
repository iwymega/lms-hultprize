import { useQuery } from "@tanstack/react-query";
import { privateApi } from "@/api/api";
import { GetPostGalleryResponseSchema, GetPostGalleryResponse } from "@/services/post/response/GetPostGalleryResponse";

const API_VERSION = "v1";

interface GetPostGalleryParams {
    post_id: string;
}

export const useGetPostGallery = ({ post_id }: GetPostGalleryParams) => {
    return useQuery<GetPostGalleryResponse, Error>({
        queryKey: ['post-gallery', post_id],
        queryFn: async (): Promise<GetPostGalleryResponse> => {
            const response = await privateApi.get(`/${API_VERSION}/post/${post_id}/gallery`);

            return GetPostGalleryResponseSchema.parse(response.data);
        },
    });
};

export default useGetPostGallery;
