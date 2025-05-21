import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../../../api/api";
import { ZodSchema } from "zod";

interface BaseShowProps {
    id?: string;
    queryKey: string;
    endpoint: string;
    schema: ZodSchema<any>;
    include?: string[]; // Untuk relasi opsional seperti roles, permissions
    enabled?: boolean; // Untuk mengontrol apakah query diaktifkan atau tidak
}

const useBaseShow = <_T>({ id, queryKey, endpoint, schema, include }: BaseShowProps) => {
    return useQuery({
        queryKey: [queryKey, id, include?.join(",")],
        queryFn: async () => {
            if (!id) throw new Error("ID is required");

            try {
                const params = include ? { include: include.join(",") } : {};
                const response = await privateApi.get(`/${endpoint}/${id}`, { params });

                // Validasi response dengan Zod
                const validationResult = schema.safeParse(response.data);
                if (!validationResult.success) {
                    console.error(`Validation failed for ${queryKey}:`, validationResult.error.errors);
                    throw new Error(`Invalid ${queryKey} data format`);
                }
                return validationResult.data;
            } catch (error) {
                console.error(`Failed to fetch ${queryKey} details`, error);
                throw error;
            }
        },
        enabled: !!id, // Hanya fetch jika ID tersedia
        retry: import.meta.env.VITE_MAX_RETRY,
        refetchOnWindowFocus: false,
    });
};

export default useBaseShow;