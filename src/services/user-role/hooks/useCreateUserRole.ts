import { useBaseCreate } from "@/services/base/hooks/useBaseCreate";
import { CreateUserRole } from "@/services/user-role/schema/CreateUserRoleSchema";
import { CreateUserRoleResponse, CreateUserRoleResponseSchema } from "@/services/user-role/response/CreateUserRoleResponse";

const API_VERSION = "v1";

export default function useCreateUserRole() {
    return useBaseCreate<CreateUserRole, CreateUserRoleResponse>({
        endpoint: `${API_VERSION}/user-role/sync-users`,
        schema: CreateUserRoleResponseSchema,
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