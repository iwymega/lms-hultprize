import { useBaseCreate } from "@/services/base/hooks/useBaseCreate";
import { CreatePost } from "@/services/post/schema/CreatePostSchema";
import { CreatePostResponse, CreatePostResponseSchema } from "@/services/post/response/CreatePostResponse";

const API_VERSION = "v1";

export default function useCreatePost() {
    return useBaseCreate<CreatePost, CreatePostResponse>({
        endpoint: `${API_VERSION}/post`,
        schema: CreatePostResponseSchema,
        contentType: "application/json",
        query: {
            onSuccess: (data) => data,
            onError: (error) => {
                console.error("Error creating post:", error);
                throw error;
            },
        }
    });
}
