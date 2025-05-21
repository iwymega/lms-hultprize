import useBaseIndex from "@/services/base/hooks/useBaseIndex";
import { GetUserLoginResponseSchema } from "@/services/profile/response/GetUserLoginResponseSchema";

const API_VERSION = "v1";

const useGetUserLogin = () =>
    useBaseIndex({
        queryKey: "user",
        endpoint: `${API_VERSION}/me`,
        schema: GetUserLoginResponseSchema,
    });

export default useGetUserLogin;