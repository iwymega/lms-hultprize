import useBaseIndex from "@/services/base/hooks/useBaseIndex";
import { IndexFileResponseSchema } from "@/services/file/response/IndexFileResponse";

const API_VERSION = "v1";

interface IndexFileProps {
    params?: { [key: string]: any };
}

const useIndexFile = (query: IndexFileProps) =>
    useBaseIndex({
        request: {
            endpoint: `${API_VERSION}/files`,
            params: query.params,
        },
        query: {
            key: "file-list",
        },
        schema: IndexFileResponseSchema,
    });

export default useIndexFile;
