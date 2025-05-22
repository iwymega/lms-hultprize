import { useBaseCreate } from "@/services/base/hooks/useBaseCreate";
import { CreateUser } from "@/services/user/schema/CreateUserSchema";
import { CreateUserResponse } from "@/services/user/response/CreateUserResponseSchema";

const API_VERSION = "v1";

export default function useCreateUser() {
    return useBaseCreate<CreateUser, CreateUserResponse>({
        endpoint: `${API_VERSION}/user`,
        schema: 'CreateUserResponse',
        contentType: "application/json",
        onSuccess: (data) => data,
        onError: (error) => {
            console.error("Error creating user:", error);
            throw error;
        },
    });
}