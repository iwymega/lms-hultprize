import { useBaseIndex } from "@/services/base/hooks/useBaseIndex";
import { IndexUserResponseSchema } from "@/services/user/response/IndexUserResponseSchema";

const API_VERSION = "v1";

interface IndexUserProps {
    filters?: {};
    search?: string;
    paginate?: number;
    page?: number;
    include?: string;
}

const useIndexUser = (query: IndexUserProps) =>
    useBaseIndex({
        ...query,
        queryKey: "user-list",
        endpoint: `${API_VERSION}/user`,
        schema: IndexUserResponseSchema,
    });

export default useIndexUser;