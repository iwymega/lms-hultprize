import { useMutation } from '@tanstack/react-query';
import { publicApi } from '../../api/api';
import { useAuth } from '../context/AuthProvider';
import loginDataSchema from '../schema/loginDataSchema';
import loginResponseSchema from '../response/loginResponseSchema';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';

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
            const { role, permissions, ...rest } = data.data;

            const user = {
                ...rest,
                roles: role.map((r) => ({
                    id: r,
                    name: r,
                    display_name: r,
                })),
                permissions: permissions.map((p) => ({
                    id: p,
                    name: p,
                    display_name: p,
                    group: '', // Atau isi sesuai backend
                })),
            };

            login(user, data.token);
            navigate('/');
        },
    });
};
