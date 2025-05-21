import { useBaseUpdate } from "@/services/base/hooks/useBaseUpdate";
import { ChangePassword } from "../schema/ChangePasswordSchema";
import { ChangePasswordResponse, ChangePasswordResponseSchema } from "../response/ChangePasswordResponseSchema";

const API_VERSION = "v1";

export const useChangePassword = () => {
    return useBaseUpdate<ChangePassword, ChangePasswordResponse>({
        endpoint: () => `${API_VERSION}/change-password`, // Multiple params
        schema: ChangePasswordResponseSchema,
        contentType: "application/json",
        onSuccess: (data) => data,
        onError: (error) => {
            throw error;
        },
    });
};