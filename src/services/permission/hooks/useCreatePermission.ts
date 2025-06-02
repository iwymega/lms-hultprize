import { useBaseCreate } from "@/services/base/hooks/useBaseCreate";
import { CreatePermission } from "@/services/permission/schema/CreatePermissionSchema";
import { CreatePermissionResponse, CreatePermissionResponseSchema } from "@/services/permission/response/CreatePermissionResponse";

const API_VERSION = "v1";

export default function useCreatePermission() {
    return useBaseCreate<CreatePermission, CreatePermissionResponse>({
        endpoint: `${API_VERSION}/permission`,
        schema: CreatePermissionResponseSchema,
        contentType: "application/json",
        query: {
            onSuccess: (data) => data,
            onError: (error) => {
                console.error("Error creating user:", error);
                throw error;
            },
        }
    });
}