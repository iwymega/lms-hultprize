import { useBaseUpdate } from "@/services/base/hooks/useBaseUpdate";
import { UpdateUser } from "@/services/user/schema/UpdateUserSchema";
import { UpdateUserResponse, UpdateUserResponseSchema } from "@/services/user/response/UpdateUserResponse";

const API_VERSION = "v1";

export const useUpdateUser = () => {
    return useBaseUpdate<{ user_id: string; data: UpdateUser }, UpdateUserResponse>({
        endpoint: ({ user_id }) => `${API_VERSION}/user/${user_id}`, // Multiple params
        schema: UpdateUserResponseSchema,
        contentType: "application/json",
        onSuccess: (data) => data,
        onError: (error) => {
            throw error;
        },
    });
};