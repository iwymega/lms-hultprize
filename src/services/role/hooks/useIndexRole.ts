import useBaseIndex from "@/services/base/hooks/useBaseIndex";
import { IndexRoleResponseSchema } from "@/services/role/response/IndexRoleResponse";

const API_VERSION = "v1";

interface IndexRoleProps {
    filters?: { [key: string]: any };
    search?: string;
    paginate?: number;
    page?: number;
    [key: string]: any;
}

const useIndexRole = (query: IndexRoleProps) =>
    useBaseIndex({
        ...query,
        queryKey: "role-list",
        endpoint: `${API_VERSION}/role`,
        schema: IndexRoleResponseSchema,
    });

export default useIndexRole;