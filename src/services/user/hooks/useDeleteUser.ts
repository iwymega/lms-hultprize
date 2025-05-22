import { useBaseDelete } from "@/services/base/hooks/useBaseDelete";
import { DeleteUserResponse, DeleteUserResponseSchema } from "@/services/user/response/CreateUserResponseSchema";

const API_VERSION = "v1";

export const useDeleteUser = () => {
    return useBaseDelete<{ id: string }, DeleteUserResponse>({
        endpoint: ({ id }) => `${API_VERSION}/user/${id}`,
        schema: DeleteUserResponseSchema,
        onSuccess: (data) => data,
        onError: (error) => {
            throw error;
        },
    });
};