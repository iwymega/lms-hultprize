import { useMutation } from "@tanstack/react-query";
import { privateApi } from "../../../api/api";
import { ZodSchema } from "zod";

interface BaseUpdateProps<T, R> {
    endpoint: string | ((params: T) => string); // Bisa string atau fungsi untuk multiple params
    schema: ZodSchema<R>;
    contentType?: "application/json" | "multipart/form-data";
    onSuccess?: (data: R) => void;
    onError?: (error: any) => void;
}

export const useBaseUpdate = <T, R>({
    endpoint,
    schema,
    contentType = "application/json",
    onSuccess,
    onError,
}: BaseUpdateProps<T, R>) => {
    return useMutation<R, Error, T>({
        mutationFn: async (params: T): Promise<R> => {
            const url = typeof endpoint === "function" ? endpoint(params) : endpoint; // Evaluasi endpoint jika berbentuk fungsi

            let dataToSend: any = (params as any).data || params;
            const headers: Record<string, string> = { "Content-Type": contentType };

            const response = await privateApi.put(url, dataToSend, { headers });
            return response.data;
        },
        onSuccess: async (data) => {
            try {
                const validationResult = schema.safeParse(data);
                if (!validationResult.success) {
                    console.error("Validation failed:", validationResult.error.errors);
                    throw new Error(`Invalid ${typeof endpoint === "function" ? "dynamic endpoint" : endpoint} data format`);
                }
                onSuccess?.(validationResult.data);
                return validationResult.data;
            } catch (error) {
                console.error(`Failed to update ${typeof endpoint === "function" ? "dynamic endpoint" : endpoint}`, error);
                throw error;
            }
        },
        onError: (error) => {
            console.error(`Failed to update ${typeof endpoint === "function" ? "dynamic endpoint" : endpoint}`, error);
            onError?.(error);
            throw error;
        },
    });
};