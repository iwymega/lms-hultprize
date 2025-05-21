import { useBaseUpdate } from "@/services/base/hooks/useBaseUpdate";
import { UpdateProfile } from "@/services/profile/schema/UpdateProfileSchema";
import { UpdateProfileResponse, UpdateProfileResponseSchema } from "@/services/profile/response/UpdateProfileResponseSchema";

const API_VERSION = "v1";

export const useUpdateProfile = () => {
    return useBaseUpdate<UpdateProfile, UpdateProfileResponse>({
        endpoint: () => `${API_VERSION}/me`, // Multiple params
        schema: UpdateProfileResponseSchema,
        contentType: "application/json",
        onSuccess: (data) => data,
        onError: (error) => {
            throw error;
        },
    });
};