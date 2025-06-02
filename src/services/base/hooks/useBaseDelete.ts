import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { privateApi } from "../../../api/api";
import { ZodSchema } from "zod";

interface BaseDeleteProps<T, R> {
    endpoint: string | ((params: T) => string);
    schema: ZodSchema<R>;
    request?: AxiosRequestConfig; // Custom axios config: headers, params, etc.
    query?: {
        onSuccess?: (data: R) => void;
        onError?: (error: any) => void;
        retry?: number;
        // bisa tambah config tanstack query lain sesuai kebutuhan
    };
}

export const useBaseDelete = <T, R>({
    endpoint,
    schema,
    request,
    query,
}: BaseDeleteProps<T, R>) => {
    return useMutation<R, Error, T>({
        mutationFn: async (params: T): Promise<R> => {
            const url = typeof endpoint === "function" ? endpoint(params) : endpoint;
            const response: AxiosResponse = await privateApi.delete(url, {
                ...request,
            });
            return response.data;
        },
        onSuccess: async (data) => {
            try {
                const validationResult = schema.safeParse(data);
                if (!validationResult.success) {
                    console.error("Validation failed:", validationResult.error.errors);
                    throw new Error(`Invalid data format`);
                }
                query?.onSuccess?.(validationResult.data);
                return validationResult.data;
            } catch (error) {
                console.error("Failed to delete", error);
                throw error;
            }
        },
        onError: (error) => {
            console.error("Failed to delete", error);
            query?.onError?.(error);
            throw error;
        },
        retry: query?.retry,
    });
};
