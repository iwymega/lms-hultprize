import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../../../api/api";
import { ZodSchema } from "zod";

interface FilterProps {
    [key: string]: any; // Dynamic filter keys
}

interface BaseIndexProps {
    filters?: FilterProps;
    search?: string;
    paginate?: number | boolean;
    queryKey: string;
    page?: number;
    [key: string]: any; // <- ✨ Untuk menerima key tambahan seperti `include`, `sort`, etc
}

const useBaseIndex = <T>({
    queryKey,
    filters,
    search,
    paginate = 10,
    page,
    endpoint,
    schema,
    ...rest // <- ✨ Tangkap semua key selain yang didefinisikan
}: BaseIndexProps & { endpoint: string; schema: ZodSchema<T> }) => {
    // Pisahkan key khusus & key lainnya
    const reservedKeys = ["filters", "search", "paginate", "page", "queryKey", "endpoint", "schema"];
    const otherParams = Object.fromEntries(
        Object.entries(rest).filter(([key]) => !reservedKeys.includes(key))
    );

    return useQuery({
        queryKey: [
            queryKey,
            ...Object.entries(filters ?? {})
                .filter(([_, value]) => value !== undefined && value !== null && value !== "")
                .map(([key, value]) => `${key}:${value}`),
            search,
            paginate,
            page,
            ...Object.entries(otherParams).map(([key, value]) => `${key}:${value}`),
        ],
        queryFn: async () => {
            try {
                const params = {
                    filter: Object.fromEntries(
                        Object.entries(filters ?? {}).filter(
                            ([_, value]) => value !== undefined && value !== null && value !== ""
                        )
                    ),
                    search: search || "",
                    paginate: paginate ? (typeof paginate === "number" ? paginate : 10) : null,
                    page,
                    ...otherParams, // <- ✨ Ini yang membuat prop tambahan otomatis masuk ke query
                };

                const response = await privateApi.get(`/${endpoint}`, { params });

                // Validasi response dengan Zod
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
