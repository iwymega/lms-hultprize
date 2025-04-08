import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import loginDataSchema, { LoginData } from '../schema/loginDataSchema';
import { useLogin } from '../hooks/useLogin';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormSubmit } from '@/shared/hooks/useFormSubmit';

const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginData>({
        resolver: zodResolver(loginDataSchema),
    });

    const { mutateAsync, isPending } = useLogin();

    // Use the form submit handler
    const { onSubmit } = useFormSubmit({
        mutate: mutateAsync,
        isPending: isPending,
        setError: setError,
        successMessage: "Login Successfull!",
        errorMessage: "Failed to Login.",
        queryKeyToRefetch: ["auth"], // Assuming you want to refetch the `users` query
    });

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4 mb-4">
                    {/* {errors && (
                        <Alert variant="destructive">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {Object.values(errors).map((error, index) => (
                                    <p key={index}>{error?.message}</p>
                                ))}
                            </AlertDescription>
                        </Alert>
                    )} */}

                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>
                </CardContent>

                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "Logging in..." : "Login"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default LoginForm;