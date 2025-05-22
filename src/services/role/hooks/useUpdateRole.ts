import { useBaseUpdate } from "@/services/base/hooks/useBaseUpdate";
import { UpdateRole } from "@/services/role/schema/UpdateRoleSchema";
import { UpdateRoleResponse, UpdateRoleResponseSchema } from "@/services/role/response/UpdateRoleResponse";

const API_VERSION = "v1";

export const useUpdateRole = () => {
    return useBaseUpdate<{ role_id: number; data: UpdateRole }, UpdateRoleResponse>({
        endpoint: ({ role_id }) => `${API_VERSION}/role/${role_id}`, // Multiple params
        schema: UpdateRoleResponseSchema,
        contentType: "application/json",
        onSuccess: (data) => data,
        onError: (error) => {
            throw error;
        },
    });
};