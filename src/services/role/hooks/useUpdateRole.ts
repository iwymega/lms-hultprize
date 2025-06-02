import { useBaseUpdate } from "@/services/base/hooks/useBaseUpdate";
import { UpdateRole } from "@/services/role/schema/UpdateRoleSchema";
import { UpdateRoleResponse, UpdateRoleResponseSchema } from "@/services/role/response/UpdateRoleResponse";

const API_VERSION = "v1";

export const useUpdateRole = () => {
    return useBaseUpdate<{ role_id: number; data: UpdateRole }, UpdateRoleResponse>({
        endpoint: ({ role_id }: { role_id: number }) => `${API_VERSION}/role/${role_id}`, // Multiple params
        schema: UpdateRoleResponseSchema,
        contentType: "application/json",
        query: {
            onSuccess: (data: UpdateRoleResponse) => data,
            onError: (error: unknown) => {
                throw error;
            },
        }
    });
};