import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../../../api/api";
import { ZodSchema } from "zod";

interface FilterProps {
    [key: string]: any; // Allow dynamic filter keys
}

interface BaseIndexProps {
    filters?: FilterProps;
    search?: string;
    paginate?: number | boolean;
    queryKey: string;
    page?: number;
}

const useBaseIndex = <T>({
    queryKey,
    filters,
    search,
    paginate = 10,
    page,
    endpoint,
    schema,
}: BaseIndexProps & { endpoint: string; schema: ZodSchema<T> }) => {
    return useQuery({
        queryKey: [
            queryKey,
            ...Object.entries(filters ?? {})
                .filter(([_, value]) => value !== undefined && value !== null && value !== "")
                .map(([key, value]) => `${key}:${value}`),
            search,
            paginate,
            page,
        ],
        queryFn: async () => {
            try {
                const params = {
                    filter: Object.fromEntries(
                        Object.entries(filters ?? {}).filter(([_, value]) => value !== undefined && value !== null && value !== "")
                    ),
                    search: search || "",
                    paginate: paginate ? (typeof paginate === "number" ? paginate : 10) : null,
                    page,
                };

                const response = await privateApi.get(`/${endpoint}`, { params });

                // Validate response with Zod schema
                const validationResult = schema.safeParse(response.data);
                if (!validationResult.success) {
                    console.error("Validation failed:", validationResult.error.errors);
                    throw new Error(`Invalid ${queryKey} data format`);
                }
                return validationResult.data;
            } catch (error) {
                console.error(`Failed to fetch ${queryKey}`, error);
                throw error;
            }
        },
        retry: import.meta.env.VITE_MAX_RETRY,
        refetchOnWindowFocus: false,
    });
};

export default useBaseIndex;