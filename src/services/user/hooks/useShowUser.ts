import { useBaseShow } from "@/services/base/hooks/useBaseShow";
import { ShowUserResponseSchema } from "@/services/user/response/ShowUserResponseSchema";

const API_VERSION = "v1";

const useShowUser = (id?: string, include?: string[]) => {
    return useBaseShow({
        id,
        queryKey: "user",
        endpoint: `${API_VERSION}/user`,
        schema: ShowUserResponseSchema,
        include: include, // Bisa dikosongkan jika tidak perlu
    });
};

export default useShowUser;