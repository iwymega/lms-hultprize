// src/auth/middleware/GuestOnly.tsx
import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthProvider";

const GuestOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();

    if (user) {
        // Redirect user yang sudah login
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default GuestOnly;
