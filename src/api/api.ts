import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

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
        const token = localStorage.getItem('authToken'); // Get token from localStorage
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
            localStorage.removeItem('authToken'); // Clear token on 401
            window.location.href = '/login'; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export { publicApi, privateApi };
