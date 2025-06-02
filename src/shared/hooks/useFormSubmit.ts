import { FieldValues, UseFormSetError, Path } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCallback } from "react";

interface UseFormSubmitProps<T extends FieldValues> {
    mutate: (data: T) => Promise<any>; // Promise-based mutate (e.g. mutateAsync)
    isPending: boolean;
    setError: UseFormSetError<T>;
    successMessage: string;
    errorMessage: string;
    queryKeyToRefetch: string[];
    onSuccess?: (result: any) => void;
}

export function useFormSubmit<T extends FieldValues>({
    mutate,
    isPending,
    setError,
    successMessage,
    errorMessage,
    queryKeyToRefetch,
    onSuccess
}: UseFormSubmitProps<T>) {
    const queryClient = useQueryClient();

    const onSubmit = useCallback(
        async (data: T) => {
            toast.loading("Submitting...", { id: "submit" });

            try {
                const result = await mutate(data);

                // Optional logging/debug
                console.log("Mutation result:", result);

                // Trigger optional success callback
                if (onSuccess) {
                    onSuccess(result);
                }

                // Refetch any required queries
                await queryClient.refetchQueries({
                    predicate: (query) =>
                        query.queryKey.some((key) =>
                            queryKeyToRefetch.includes(key as string)
                        ),
                });

                toast.success(successMessage, { id: "submit" });
            } catch (mutationError: any) {
                console.error("Mutation error:", mutationError);

                // Handle Laravel 422 validation error
                if (mutationError?.response?.status === 422) {
                    const validationErrors = mutationError.response.data?.errors;
                    if (validationErrors) {
                        for (const [field, messages] of Object.entries(validationErrors)) {
                            setError(field as Path<T>, {
                                type: "manual",
                                message: (messages as string[])[0],
                            });
                        }
                    }
                }

                toast.error(
                    mutationError?.message || errorMessage,
                    { id: "submit" }
                );
            }
        },
        [
            mutate,
            queryClient,
            setError,
            successMessage,
            errorMessage,
            queryKeyToRefetch,
            onSuccess,
        ]
    );

    return { onSubmit, isPending };
}
