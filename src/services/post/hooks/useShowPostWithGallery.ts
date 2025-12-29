import { useQuery } from "@tanstack/react-query";
import { privateApi } from "@/api/api";
import { ShowPostWithGalleryResponseSchema, ShowPostWithGalleryResponse } from "@/services/post/response/ShowPostWithGalleryResponse";

const API_VERSION = "v1";

interface ShowPostWithGalleryParams {
    id: string;
    params?: {
        include?: string;
        "filter[content]"?: string;
        "filter[id]"?: string;
        "filter[image]"?: string;
        "filter[title]"?: string;
        [key: string]: any;
    };
}

export const useShowPostWithGallery = ({ id, params }: ShowPostWithGalleryParams) => {
    return useQuery<ShowPostWithGalleryResponse, Error>({
        queryKey: ['post-with-gallery', id, params],
        queryFn: async (): Promise<ShowPostWithGalleryResponse> => {
            const response = await privateApi.get(`/${API_VERSION}/post/${id}/with-gallery`, {
                params: params
            });

            return ShowPostWithGalleryResponseSchema.parse(response.data);
        },
    });
};

export default useShowPostWithGallery;
