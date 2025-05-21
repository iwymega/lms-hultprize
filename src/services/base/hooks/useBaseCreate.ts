import { useMutation } from "@tanstack/react-query";
import { privateApi } from "../../../api/api";
import { ZodSchema } from "zod";

interface BaseCreateProps<_T, R> {
    endpoint: string;
    schema: ZodSchema<R>;
    contentType?: "application/json" | "multipart/form-data"; // Allow flexible content types
    onSuccess?: (data: R) => void;
    onError?: (error: any) => void;
}

export const useBaseCreate = <T, R>({
    endpoint,
    schema,
    contentType = "application/json",
    onSuccess,
    onError,
}: BaseCreateProps<T, R>) => {
    return useMutation<R, Error, T>({
        mutationFn: async (formData: T): Promise<R> => {  // Ensure it returns a Promise of the response
            let dataToSend: any = formData;
            const headers: Record<string, string> = {};

            if (contentType === "multipart/form-data") {
                const formDataObject = new FormData();
                Object.entries(formData as Record<string, any>).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        formDataObject.append(key, value);
                    }
                });
                dataToSend = formDataObject;
                headers["Content-Type"] = "multipart/form-data";
            } else {
                headers["Content-Type"] = "application/json";
            }

            const response = await privateApi.post(`/${endpoint}`, dataToSend, { headers });
            return response.data;  // Ensure that response.data is of type R
        },
        onSuccess: async (data) => {
            try {
                const validationResult = schema.safeParse(data);
                if (!validationResult.success) {
                    console.error("Validation failed:", validationResult.error.errors);
                    throw new Error(`Invalid ${endpoint} data format`);
                }
                onSuccess?.(validationResult.data);
                return validationResult.data;
            } catch (error) {
                console.error(`Failed to create ${endpoint}`, error);
                throw error;
            }
        },
        onError: (error) => {
            console.error(`Failed to create ${endpoint}`, error);
            onError?.(error);
            throw error;
        },
    });
};