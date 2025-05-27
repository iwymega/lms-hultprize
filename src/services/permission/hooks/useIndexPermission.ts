import useBaseIndex from "@/services/base/hooks/useBaseIndex";
import { IndexPermissionResponseSchema } from "@/services/permission/response/IndexPermissionResponse";

const API_VERSION = "v1";

interface IndexPermissionProps {
    filters?: { [key: string]: any };
    search?: string;
    paginate?: number | boolean;
    page?: number;
    [key: string]: any;
}

const useIndexPermission = (query: IndexPermissionProps) =>
    useBaseIndex({
        ...query,
        queryKey: "permission-list",
        endpoint: `${API_VERSION}/permission`,
        schema: IndexPermissionResponseSchema,
    });

export default useIndexPermission;