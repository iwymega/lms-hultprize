import useBaseShow from "@/services/base/hooks/useBaseShow";
import { ShowPermissionResponseSchema } from "@/services/permission/response/ShowPermissionResponse";

const API_VERSION = "v1";

const useShowPermission = (id?: string, include?: string[]) => {
    return useBaseShow({
        id,
        queryKey: "permission",
        endpoint: `${API_VERSION}/permission`,
        schema: ShowPermissionResponseSchema,
        include: include, // Bisa dikosongkan jika tidak perlu
    });
};

export default useShowPermission;