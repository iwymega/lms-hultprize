import { FieldValues, UseFormSetError, Path } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCallback } from "react";

interface UseFormSubmitProps<T extends FieldValues> {
    mutate: (data: T) => Promise<unknown>;
    isPending: boolean;
    setError: UseFormSetError<T>;  // Ensure it uses T (CreateUser) as the type for setError
    successMessage: string;
    errorMessage: string;
    queryKeyToRefetch: string[];
    onSuccess?: () => void; // Optional onSuccess callback
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
                // Call mutate directly
                await mutate(data);  // Mutate function passed as prop
                await queryClient.refetchQueries({
                    predicate: (query) =>
                        query.queryKey.some((key) => queryKeyToRefetch.includes(key as string)),
                });
                toast.success(successMessage, { id: "submit" });
                if (onSuccess) {
                    onSuccess();
                }
            } catch (mutationError: any) {
                // Handling 422 error and validation errors
                if (mutationError?.response?.status === 422) {
                    const validationErrors = mutationError?.response?.data?.errors;
                    if (validationErrors) {
                        for (const [field, messages] of Object.entries(validationErrors)) {
                            setError(field as Path<T>, {
                                type: "manual",
                                message: (messages as string[])[0], // Set first error message
                            });
                        }
                        toast.error(errorMessage, { id: "submit" });
                    }
                } else {
                    // Handle other errors
                    toast.error(mutationError?.message || errorMessage, { id: "submit" });
                }
            }
        },
        [mutate, queryClient, setError, successMessage, errorMessage, queryKeyToRefetch]
    );

    return { onSubmit, isPending };
}
