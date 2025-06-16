// src/shared/hooks/useFormSubmit.tsx

import { FieldValues, UseFormSetError, Path } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCallback } from "react";
import { AxiosError } from "axios";
import { ErrorToast } from '@/shared/components/toasts/ErrorToast'; // Pastikan path ini benar

// Helper dan tipe props tidak perlu diubah
const getDetailedErrorMessage = (error: any): string => {
    if (error instanceof AxiosError && error.response) {
        return `Status: ${error.response.status}\nURL: ${error.config?.url}\nResponse: ${JSON.stringify(error.response.data, null, 2)}`;
    }
    if (error instanceof Error) {
        return error.stack || error.message;
    }
    return JSON.stringify(error, null, 2);
};

interface UseFormSubmitProps<TForm extends FieldValues, TMutate = TForm> {
    mutate: (data: TMutate) => Promise<any>;
    isPending: boolean;
    setError: UseFormSetError<TForm>;
    successMessage: string;
    errorMessage: string;
    queryKeyToRefetch?: string[];
    onSuccess?: (result: any) => void;
    transformPayload?: (formData: TForm) => TMutate;
}

export function useFormSubmit<TForm extends FieldValues, TMutate = TForm>({
    mutate,
    isPending,
    setError,
    successMessage,
    errorMessage,
    queryKeyToRefetch = [],
    onSuccess,
    transformPayload,
}: UseFormSubmitProps<TForm, TMutate>) {
    const queryClient = useQueryClient();

    const onSubmit = useCallback(
        async (formData: TForm) => {
            // PERBAIKAN: JANGAN BUAT TOAST LOADING DI SINI
            // const toastId = "submit-toast";
            // toast.loading("Submitting...", { id: toastId });

            try {
                const apiPayload = transformPayload
                    ? transformPayload(formData)
                    : (formData as unknown as TMutate);

                const result = await mutate(apiPayload);

                if (onSuccess) {
                    onSuccess(result);
                }

                if (queryKeyToRefetch.length > 0) {
                    await queryClient.refetchQueries({
                        predicate: (query) =>
                            query.queryKey.some((key) =>
                                queryKeyToRefetch.includes(key as string)
                            ),
                    });
                }

                // Tampilkan toast sukses HANYA SETELAH semua berhasil
                toast.success(successMessage);

            } catch (mutationError: any) {
                console.error("Mutation error:", mutationError);

                if (mutationError?.response?.status === 422) {
                    const validationErrors = mutationError.response.data?.errors;
                    if (validationErrors) {
                        for (const [field, messages] of Object.entries(validationErrors)) {
                            setError(field as Path<TForm>, {
                                type: "manual",
                                message: (messages as string[])[0],
                            });
                        }
                    }
                }

                // Tampilkan toast error kustom HANYA SETELAH error terjadi
                toast.custom(
                    (t) => (
                        <ErrorToast
                            toastId={t}
                            title={errorMessage}
                            details={getDetailedErrorMessage(mutationError)}
                        />
                    ),
                    { duration: Infinity } // Biarkan permanen sampai di-dismiss manual
                );
            }
        },
        [
            mutate,
            setError,
            successMessage,
            errorMessage,
            queryKeyToRefetch,
            onSuccess,
            transformPayload,
            queryClient,
        ]
    );

    return { onSubmit, isPending };
}