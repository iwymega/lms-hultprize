import useBaseIndex from "@/services/base/hooks/useBaseIndex";
import { IndexUserResponseSchema } from "@/services/user/response/IndexUserResponse";

const API_VERSION = "v1";

interface IndexUserProps {
    filters?: { [key: string]: any };
    search?: string;
    paginate?: number;
    page?: number;
    [key: string]: any;
}

const useIndexUser = (query: IndexUserProps) =>
    useBaseIndex({
        ...query,
        queryKey: "user-list",
        endpoint: `${API_VERSION}/user`,
        schema: IndexUserResponseSchema,
    });

export default useIndexUser;
