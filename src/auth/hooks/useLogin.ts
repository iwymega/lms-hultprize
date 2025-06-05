import { useMutation } from '@tanstack/react-query';
import { publicApi } from '../../api/api';
import { useAuth } from '../context/AuthProvider';
import loginDataSchema from '../schema/loginDataSchema';
import loginResponseSchema from '../response/loginResponseSchema';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { getRedirectPathFromPermissions } from '../utils/utils';

type LoginData = z.infer<typeof loginDataSchema>;
type LoginResponse = z.infer<typeof loginResponseSchema>;

export const useLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    return useMutation<LoginResponse, AxiosError, LoginData>({
        mutationFn: async (data) => {
            const response = await publicApi.post<LoginResponse>('/v1/login', data);
            return response.data;
        },
        onSuccess: (data) => {
            login(data.data, data.token);

            const roles = data?.data?.roles || [];
            const permissions = data?.data?.permissions || [];
            const redirectPath = getRedirectPathFromPermissions(permissions, roles);

            // navigate('/');
            navigate(redirectPath);
        },
    });
};