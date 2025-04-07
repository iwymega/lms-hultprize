import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import loginDataSchema from '../schemas/loginDataSchema';
import { useLogin } from '../hooks/useLogin';
import { useCallback, useState } from 'react';

type LoginFormValues = {
    email: string;
    password: string;
};

const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginDataSchema),
    });

    const { mutate, isPending } = useLogin();
    const [apiError, setApiError] = useState<string | null>(null);

    const onSubmit = useCallback((data: LoginFormValues) => {
        setApiError(null);
        mutate(data, {
            onError: (err: any) => {
                const errorMessage = err.response?.data?.message || "Something went wrong, please try again";
                setApiError(errorMessage);
            },
        });
    }, [mutate]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {apiError && <div>{apiError}</div>}
            <div>
                <input placeholder="Email" autoComplete="off" disabled={isPending} {...register('email')} />
                {errors.email && <div>{errors.email.message}</div>}
            </div>
            <div>
                <input type="password" placeholder="Password" autoComplete="off" disabled={isPending} {...register('password')} />
                {errors.password && <div>{errors.password.message}</div>}
            </div>

            {/* Login Button */}
            <div>
                <button type="submit" disabled={isPending}>
                    {isPending ? 'Loading...' : 'Login'}
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
