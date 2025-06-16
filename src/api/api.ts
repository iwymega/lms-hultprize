// src/api/api.ts

import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
// Import authService yang sudah kita buat
import { authService } from '@/auth/services/authService';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Setup Public API instance (No auth required)
const publicApi: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Setup Private API instance (Auth required)
const privateApi: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercept requests for Private API
privateApi.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Ambil token dari authService, bukan localStorage langsung
        const token = authService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercept responses for Private API
privateApi.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        // Handle token expiration or unauthorized access
        if (error.response?.status === 401) {
            // Gunakan authService untuk membersihkan seluruh sesi (token dan data user)
            authService.clearSession();
            // Redirect ke halaman login. Ini adalah pendekatan yang simpel dan efektif.
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export { publicApi, privateApi };