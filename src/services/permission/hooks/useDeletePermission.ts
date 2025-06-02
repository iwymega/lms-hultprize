import { useBaseDelete } from "@/services/base/hooks/useBaseDelete";
import { DeletePermissionResponse, DeletePermissionResponseSchema } from "@/services/permission/response/DeletePermissionResponse";

const API_VERSION = "v1";

export const useDeletePermission = () => {
    return useBaseDelete<{ id: number }, DeletePermissionResponse>({
        endpoint: ({ id }) => `${API_VERSION}/permission/${id}`,
        schema: DeletePermissionResponseSchema,
        query: {
            onSuccess: (data) => data,
            onError: (error) => {
                throw error;
            },
        }
    });
};