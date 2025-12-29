import { useBaseUpdate } from "@/services/base/hooks/useBaseUpdate";
import { UpdateFile } from "@/services/file/schema/UpdateFileSchema";
import { UpdateFileResponse, UpdateFileResponseSchema } from "@/services/file/response/UpdateFileResponse";

const API_VERSION = "v1";

export const useUpdateFile = () => {
    return useBaseUpdate<{ file_id: string; data: UpdateFile }, UpdateFileResponse>({
        endpoint: ({ file_id }) => `${API_VERSION}/file/${file_id}`,
        schema: UpdateFileResponseSchema,
        contentType: "application/json",
        query: {
            onSuccess: (data) => data,
            onError: (error) => {
                console.error("Error updating file:", error);
                throw error;
            },
        }
    });
};

export default useUpdateFile;
