import { useBaseUpdate } from "@/services/base/hooks/useBaseUpdate";
import { UpdatePost } from "@/services/post/schema/UpdatePostSchema";
import { UpdatePostResponse, UpdatePostResponseSchema } from "@/services/post/response/UpdatePostResponse";

const API_VERSION = "v1";

export const useUpdatePost = () => {
    return useBaseUpdate<{ post_id: string; data: UpdatePost }, UpdatePostResponse>({
        endpoint: ({ post_id }: { post_id: string }) => `${API_VERSION}/post/${post_id}`,
        schema: UpdatePostResponseSchema,
        contentType: "application/json",
        query: {
            onSuccess: (data: UpdatePostResponse) => data,
            onError: (error: Error) => {
                throw error;
            },
        }
    });
};
