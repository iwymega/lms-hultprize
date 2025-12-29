import useBaseIndex from "@/services/base/hooks/useBaseIndex";
import { IndexPostResponseSchema } from "@/services/post/response/IndexPostResponse";

const API_VERSION = "v1";

interface IndexPostProps {
    params?: { [key: string]: any };
}

const useIndexPost = (query: IndexPostProps) =>
    useBaseIndex({
        request: {
            endpoint: `${API_VERSION}/post`,
            params: query.params,
        },
        query: {
            key: "post-list",
        },
        schema: IndexPostResponseSchema,
    });

export default useIndexPost;
