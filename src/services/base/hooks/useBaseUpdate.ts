import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { privateApi } from "../../../api/api";
import type { ZodSchema } from "zod";
import type { AxiosRequestConfig } from "axios";

interface BaseUpdateProps<T, R> {
    endpoint: string | ((params: T) => string);
    schema: ZodSchema<R>;
    contentType?: "application/json" | "multipart/form-data";

    request?: AxiosRequestConfig;
    query?: Partial<UseMutationOptions<R, Error, T>>;
}

export const useBaseUpdate = <T, R>({
    endpoint,
    schema,
    contentType = "application/json",
    request,
    query
}: BaseUpdateProps<T, R>) => {
    return useMutation<R, Error, T>({
        mutationFn: async (params: T): Promise<R> => {
            const url = typeof endpoint === "function" ? endpoint(params) : endpoint; 
            let dataToSend: any = (params as any).data || params;
            const headers: Record<string, string> = {};

            if (contentType === "multipart/form-data") {
                const formDataObject = new FormData();
                Object.entries(dataToSend as Record<string, any>).forEach(([key, value]) => {
                    if (value !== undefined) {
                        formDataObject.append(key, value);
                    }
                });
                dataToSend = formDataObject;
                headers["Content-Type"] = "multipart/form-data";
            } else {
                headers["Content-Type"] = "application/json";
            }

            const response = await privateApi.put(`/${url}`, dataToSend, {
                headers,
                ...request, // ← Inject custom Axios config if provided
            });

            return response.data;
        },

        // Core success logic with schema validation
        onSuccess: async (data, variables, context) => {
            try {
                const validationResult = schema.safeParse(data);
                if (!validationResult.success) {
                    console.error("Validation failed:", validationResult.error.errors);
                    throw new Error(`Invalid ${endpoint} data format`);
                }

                // Call external onSuccess if provided via query layer
                if (query?.onSuccess) {
                    query.onSuccess(validationResult.data, variables, context);
                }
                return validationResult.data;
            } catch (error) {
                console.error(`Failed to validate ${endpoint}`, error);
                throw error;
            }
        },

        // Custom error handler
        onError: (error, variables, context) => {
            console.error(`Failed to update ${endpoint}`, error);
            if (query?.onError) {
                query.onError(error, variables, context);
            }
            throw error;
        },

        ...query,
    });
};