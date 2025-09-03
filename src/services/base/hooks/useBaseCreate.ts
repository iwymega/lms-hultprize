import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { privateApi } from "../../../api/api";
import type { ZodSchema } from "zod";
import type { AxiosRequestConfig } from "axios";

interface BaseCreateProps<T, R> {
    endpoint: string;
    schema: ZodSchema<R>;
    contentType?: "application/json" | "multipart/form-data";

    request?: AxiosRequestConfig;
    query?: Partial<UseMutationOptions<R, Error, T>>;
}

export const useBaseCreate = <T, R>({
    endpoint,
    schema,
    contentType = "application/json",
    request,
    query
}: BaseCreateProps<T, R>) => {
    return useMutation<R, Error, T>({
        mutationFn: async (formData: T): Promise<R> => {
            let dataToSend: any = formData;
            const headers: Record<string, string> = {};

            if (contentType === "multipart/form-data") {
                const formDataObject = new FormData();
                Object.entries(formData as Record<string, any>).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        // *** INI PERUBAHANNYA ***
                        // Jika value adalah FileList, ambil file pertama (value[0])
                        if (value instanceof FileList && value.length > 0) {
                            formDataObject.append(key, value[0]);
                        } else {
                            // Jika bukan, append seperti biasa
                            formDataObject.append(key, value);
                        }
                    }
                });
                dataToSend = formDataObject;
                headers["Content-Type"] = "multipart/form-data";
            } else {
                headers["Content-Type"] = "application/json";
            }

            const response = await privateApi.post(`/${endpoint}`, dataToSend, {
                headers,
                ...request,
            });

            return response.data;
        },

        onSuccess: async (data, variables, context) => {
            try {
                const validationResult = schema.safeParse(data);
                if (!validationResult.success) {
                    console.error("Validation failed:", validationResult.error.errors);
                    throw new Error(`Invalid ${endpoint} data format`);
                }

                if (query?.onSuccess) {
                    query.onSuccess(validationResult.data, variables, context);
                }
                return validationResult.data;
            } catch (error) {
                console.error(`Failed to validate ${endpoint}`, error);
                throw error;
            }
        },

        onError: (error, variables, context) => {
            console.error(`Failed to create ${endpoint}`, error);
            if (query?.onError) {
                query.onError(error, variables, context);
            }
            throw error;
        },

        ...query,
    });
};