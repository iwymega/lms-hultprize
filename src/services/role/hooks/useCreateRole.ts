import { useBaseCreate } from "@/services/base/hooks/useBaseCreate";
import { CreateRole } from "@/services/role/schema/CreateRoleSchema";
import { CreateRoleResponse, CreateRoleResponseSchema } from "@/services/role/response/CreateRoleResponse";

const API_VERSION = "v1";

export default function useCreateRole() {
    return useBaseCreate<CreateRole, CreateRoleResponse>({
        endpoint: `${API_VERSION}/role`,
        schema: CreateRoleResponseSchema,
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