import { useBaseCreate } from "@/services/base/hooks/useBaseCreate";
import { CreateUser } from "@/services/user/schema/CreateUserSchema";
import { CreateUserResponse, CreateUserResponseSchema } from "@/services/user/response/CreateUserResponse";

const API_VERSION = "v1";

export default function useCreateUser() {
    return useBaseCreate<CreateUser, CreateUserResponse>({
        endpoint: `${API_VERSION}/user`,
        schema: CreateUserResponseSchema,
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