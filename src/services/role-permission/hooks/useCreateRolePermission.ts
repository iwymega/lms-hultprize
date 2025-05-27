import { useBaseCreate } from "@/services/base/hooks/useBaseCreate";
import { CreateRolePermission } from "@/services/role-permission/schema/CreateRolePermissionSchema";
import { CreateRolePermissionResponse, CreateRolePermissionResponseSchema } from "@/services/role-permission/response/CreateRolePermissionResponse";

const API_VERSION = "v1";

export default function useCreateRolePermission() {
    return useBaseCreate<CreateRolePermission, CreateRolePermissionResponse>({
        endpoint: `${API_VERSION}/role-permission/sync-permissions`,
        schema: CreateRolePermissionResponseSchema,
        contentType: "application/json",
        onSuccess: (data) => data,
        onError: (error) => {
            console.error("Error creating user:", error);
            throw error;
        },
    });
}