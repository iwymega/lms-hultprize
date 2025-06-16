// src/auth/components/LoginFormWithGraphic.tsx

import { Eye, EyeOff, Key, Mail, User } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../hooks/useLogin';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import { loginSchema, LoginPayload } from '../schema/loginSchemas'; // Menggunakan skema superRefine baru
import { useFormSubmit } from '@/shared/hooks/useFormSubmit.tsx';
import { ApiLoginPayload } from '../schema/loginDataSchema';

const LoginFormWithGraphic: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginMethod, setLoginMethod] = useState<'email' | 'username'>('email');

    // Tipe generic sekarang adalah objek tunggal, bukan union
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        clearErrors,
    } = useForm<LoginPayload>({
        resolver: zodResolver(loginSchema),
        // Default values sekarang bisa berisi semua field, tidak ada lagi error!
        defaultValues: {
            loginMethod: 'email',
            email: '',
            username: '',
            password: '',
        },
    });

    // useEffect sekarang lebih sederhana, hanya perlu mengatur nilai dan membersihkan error
    useEffect(() => {
        setValue('loginMethod', loginMethod);
        clearErrors(['email', 'username']);
    }, [loginMethod, setValue, clearErrors]);

    const { mutateAsync, isPending } = useLogin();

    const { onSubmit } = useFormSubmit<LoginPayload, ApiLoginPayload>({
        mutate: mutateAsync,
        isPending,
        setError,
        successMessage: "Login Successful!",
        errorMessage: "Failed to Login.",
        queryKeyToRefetch: ["auth"],
        transformPayload: (data) => {
            const { loginMethod, email, username, password } = data;
            if (loginMethod === 'email') {
                return { email, password };
            } else {
                return { username, password };
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-400">
            <div className="bg-white rounded-3xl w-full max-w-5xl shadow-lg overflow-hidden mx-4 md:mx-0">
                <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-2/3 bg-blue-200 p-6 hidden md:block" style={{ backgroundImage: 'url(/bg-login.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: 'auto', minHeight: '700px' }}>
                        <div className="flex justify-between items-start">
                            <h1 className="text-blue-600 font-bold text-4xl hover:text-blue-400 transition-all duration-300 ease-in-out">SuperApp.</h1>
                        </div>
                    </div>

                    <div className="w-full md:w-3/5 p-8 md:p-12 flex items-center justify-center">
                        <div className="max-w-md w-full">
                            <h2 className="text-4xl font-bold mb-6 text-center md:text-left">Login</h2>

                            <div className="flex border border-gray-300 rounded-lg p-1 mb-6 bg-gray-50">
                                <button type="button" onClick={() => setLoginMethod('email')} className={clsx('w-1/2 p-2 rounded-md text-sm font-medium transition-all duration-200', { 'bg-blue-600 text-white shadow': loginMethod === 'email', 'text-gray-600 hover:bg-gray-200': loginMethod !== 'email' })}>
                                    Login with Email
                                </button>
                                <button type="button" onClick={() => setLoginMethod('username')} className={clsx('w-1/2 p-2 rounded-md text-sm font-medium transition-all duration-200', { 'bg-blue-600 text-white shadow': loginMethod === 'username', 'text-gray-600 hover:bg-gray-200': loginMethod !== 'username' })}>
                                    Login with Username
                                </button>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                {loginMethod === 'email' ? (
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-lg">Email</Label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
                                            <Input id="email" type="email" placeholder="Type your email" className="pl-10" {...register("email")} />
                                        </div>
                                        {/* TIDAK ADA LAGI ERROR DI SINI! */}
                                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Label htmlFor="username" className="text-lg">Username</Label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
                                            <Input id="username" type="text" placeholder="Type your username" className="pl-10" {...register("username")} />
                                        </div>
                                        {/* TIDAK ADA LAGI ERROR DI SINI! */}
                                        {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-lg">Password</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Key className="h-5 w-5 text-gray-400" /></div>
                                        <Input id="password" type={showPassword ? "text" : "password"} placeholder="Type your password" className="pl-10 pr-10" {...register("password")} />
                                        <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center z-10" onClick={() => setShowPassword(!showPassword)}>
                                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                            {showPassword ? <EyeOff className="w-5 h-5 text-blue-500" /> : <Eye className="w-5 h-5 text-blue-500" />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                                </div>

                                <div className="flex justify-end">
                                    <Link to="#" className="text-sm text-blue-500 hover:text-blue-700 font-medium">Forgot Password?</Link>
                                </div>

                                <button type="submit" className={clsx('w-full text-white font-medium py-3 px-4 rounded-lg transition-colors', isPending ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700')} disabled={isPending}>
                                    {isPending ? 'Logging In...' : 'Log In'}
                                </button>
                            </form>

                            <div className="text-center mt-8">
                                <p className="text-gray-600">
                                    Don't have an account?
                                    <Link to="#" className="text-blue-600 ml-1 font-medium hover:underline">Sign Up here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginFormWithGraphic;