import { useMutation } from "@tanstack/react-query";
import { privateApi } from "../../../api/api";
import { ZodSchema } from "zod";
import { AxiosResponse } from "axios";

interface BaseDeleteProps<T, R> {
    endpoint: string | ((params: T) => string); // Bisa string atau fungsi untuk multiple params
    schema: ZodSchema<R>; // Schema untuk validasi data response
    onSuccess?: (data: R) => void;
    onError?: (error: any) => void;
}

export const useBaseDelete = <T, R>({
    endpoint,
    schema,
    onSuccess,
    onError,
}: BaseDeleteProps<T, R>) => {
    return useMutation<R, Error, T>({
        mutationFn: async (params: T): Promise<R> => {
            const url = typeof endpoint === "function" ? endpoint(params) : endpoint; // Evaluasi endpoint jika berbentuk fungsi
            const response: AxiosResponse = await privateApi.delete(url); // Mendapatkan response dari API
            return response.data; // Mengembalikan data dari response untuk diproses lebih lanjut
        },
        onSuccess: async (data) => {
            try {
                // Validasi data menggunakan Zod schema
                const validationResult = schema.safeParse(data);
                if (!validationResult.success) {
                    console.error("Validation failed:", validationResult.error.errors);
                    throw new Error(`Invalid data format`);
                }
                // Jika validasi berhasil, panggil onSuccess yang diteruskan
                onSuccess?.(validationResult.data);
                return validationResult.data;
            } catch (error) {
                console.error("Failed to delete", error);
                throw error;
            }
        },
        onError: (error) => {
            console.error("Failed to delete", error);
            onError?.(error);
            throw error;
        },
    });
};