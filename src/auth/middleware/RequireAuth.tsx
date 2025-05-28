import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthProvider";

type RequireAuthProps = {
    children: React.ReactNode;
    requiredRoles?: string[];
    requiredPermissions?: string[];
};

const RequireAuth: React.FC<RequireAuthProps> = ({
    children,
    requiredRoles = [],
    requiredPermissions = [],
}) => {
    const { user, hasRole, hasPermission } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const hasRequiredRoles = requiredRoles.every((role) => hasRole(role));
    const hasRequiredPermissions = requiredPermissions.every((permission) =>
        hasPermission(permission)
    );

    if (!hasRequiredRoles || !hasRequiredPermissions) {
        return <Navigate to="/forbidden" replace />;
    }

    return <>{children}</>;
};

export default RequireAuth;