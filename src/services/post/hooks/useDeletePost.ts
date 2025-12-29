import { useBaseDelete } from "@/services/base/hooks/useBaseDelete";
import { DeletePostResponse, DeletePostResponseSchema } from "@/services/post/response/DeletePostResponse";

const API_VERSION = "v1";

export const useDeletePost = () => {
    return useBaseDelete<{ id: string }, DeletePostResponse>({
        endpoint: ({ id }) => `${API_VERSION}/post/${id}`,
        schema: DeletePostResponseSchema,
        query: {
            onSuccess: (data) => data,
            onError: (error) => {
                throw error;
            },
        }
    });
};
