import { useBaseUpdate } from "@/services/base/hooks/useBaseUpdate";
import { UpdatePermission } from "@/services/permission/schema/UpdatePermissionSchema";
import { UpdatePermissionResponse, UpdatePermissionResponseSchema } from "@/services/permission/response/UpdatePermissionResponse";

const API_VERSION = "v1";

export const useUpdatePermission = () => {
    return useBaseUpdate<{ permission_id: number; data: UpdatePermission }, UpdatePermissionResponse>({
        endpoint: ({ permission_id }: { permission_id: number }) => `${API_VERSION}/permission/${permission_id}`, // Multiple params
        schema: UpdatePermissionResponseSchema,
        contentType: "application/json",
        query: {
            onSuccess: (data: UpdatePermissionResponse) => data,
            onError: (error: Error) => {
                throw error;
            },
        }
    });
};