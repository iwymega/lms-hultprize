import { useQuery } from '@tanstack/react-query';
import { privateApi } from '../../api/api';
import { useAuth } from '../context/AuthProvider';

export const useUser = () => {
    const { login } = useAuth();

    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await privateApi.get('/v3/me');

            login(response.data.data, localStorage.getItem('authToken') || '');

            return response.data;
        }
    });
};
