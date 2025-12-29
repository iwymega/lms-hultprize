import { useBaseDelete } from "@/services/base/hooks/useBaseDelete";
import { DeleteFileResponse, DeleteFileResponseSchema } from "@/services/file/response/DeleteFileResponse";

const API_VERSION = "v1";

export const useDeleteFile = () => {
    return useBaseDelete<{ id: string }, DeleteFileResponse>({
        endpoint: ({ id }) => `${API_VERSION}/file/${id}`,
        schema: DeleteFileResponseSchema,
        query: {
            onSuccess: (data) => data,
            onError: (error) => {
                throw error;
            },
        }
    });
};

export default useDeleteFile;
