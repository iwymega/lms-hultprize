import useBaseShow from "@/services/base/hooks/useBaseShow";
import { ShowRoleResponseSchema } from "@/services/role/response/ShowRoleResponse";

const API_VERSION = "v1";

const useShowRole = (id?: string, include?: string[]) => {
    return useBaseShow({
        id,
        queryKey: "role",
        endpoint: `${API_VERSION}/role`,
        schema: ShowRoleResponseSchema,
        include: include, // Bisa dikosongkan jika tidak perlu
    });
};

export default useShowRole;