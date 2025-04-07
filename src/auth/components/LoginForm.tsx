import React, { useCallback, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import loginDataSchema, { LoginData } from '../schema/loginDataSchema';
import { useLogin } from '../hooks/useLogin';
import { useForm } from 'react-hook-form';

const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
        resolver: zodResolver(loginDataSchema),
    });

    const { mutate, isPending } = useLogin();
    const [apiError, setApiError] = useState<string | null>(null);

    const onSubmit = useCallback((data: LoginData) => {
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
                <label htmlFor="email">Username or Email</label>
                <input id="email" type="email" {...register("email")} aria-label="Email input" />
                {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" {...register("password")} aria-label="Password input" />
                {errors.password && <p>{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isPending}>
                {isPending ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};

export default LoginForm;