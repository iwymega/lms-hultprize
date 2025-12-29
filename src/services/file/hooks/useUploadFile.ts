import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "@/api/api";
import { UploadFileResponse, UploadFileResponseSchema } from "@/services/file/response/UploadFileResponse";

const API_VERSION = "v1";

interface UploadFileParams {
    file: File;
    name?: string;
    type?: string;
}

export const useUploadFile = () => {
    const queryClient = useQueryClient();

    return useMutation<UploadFileResponse, Error, UploadFileParams>({
        mutationFn: async (params: UploadFileParams): Promise<UploadFileResponse> => {
            const formData = new FormData();
            formData.append('file', params.file);
            
            if (params.name) {
                formData.append('name', params.name);
            }
            if (params.type) {
                formData.append('type', params.type);
            }

            const response = await privateApi.post(`/${API_VERSION}/files`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return UploadFileResponseSchema.parse(response.data);
        },
        onSuccess: () => {
            // Invalidate file list to refetch
            queryClient.invalidateQueries({ queryKey: ['file-list'] });
        },
    });
};

export default useUploadFile;
