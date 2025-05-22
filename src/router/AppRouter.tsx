import React, { JSX } from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import LoginPage from "../auth/pages/LoginPage";
import ForbiddenPage from "../auth/pages/ForbiddenPage";
import RequireAuth from "../auth/middleware/RequireAuth";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import GuestOnly from "@/auth/middleware/GuestOnly";
import UserManagementPage from "@/features/user-management/pages/UserManagementPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import PermissionsPage from "@/features/permission/pages/PermissionsPage";

type ProtectedRoute = {
    path: string;
    element: JSX.Element;
    protected: true;
    roles: string[];
    permissions?: string[];
};

type GuestOnlyRoute = {
    path: string;
    element: JSX.Element;
    guestOnly: true;
};

type PublicRoute = {
    path: string;
    element: JSX.Element;
};

type AppRoute = ProtectedRoute | GuestOnlyRoute | PublicRoute;


export const ROUTES: Record<string, AppRoute> = {
    DASHBOARD: {
        path: "/",
        element: <DashboardPage />,
        protected: true,
        roles: ["superadmin"],
        permissions: [],
    },
    USER_MANAGEMENT: {
        path: "/user-management",
        element: <UserManagementPage />,
        protected: true,
        roles: ["superadmin"],
        permissions: [],
    },
    PERMISSIONS: {
        path: "/permissions",
        element: <PermissionsPage />,
        protected: true,
        roles: ["superadmin"],
        permissions: [],
    },
    PROFILE: {
        path: "/profile",
        element: <ProfilePage />,
        protected: true,
        roles: ["superadmin"],
        permissions: [],
    },
    CHANGE_PASSWORD: {
        path: "/profile/change-password",
        element: <ProfilePage />,
        protected: true,
        roles: ["superadmin"],
        permissions: [],
    },
    LOGIN: {
        path: "/login",
        element: <LoginPage />,
        guestOnly: true,
    },
    FORBIDDEN: {
        path: "/forbidden",
        element: <ForbiddenPage />,
    },
};

const AppRouter: React.FC = () => (
    <BrowserRouter>
        <Routes>
            {Object.entries(ROUTES).map(([_key, config], index) => {
                let wrappedElement = config.element;

                if ("protected" in config && config.protected) {
                    wrappedElement = (
                        <RequireAuth requiredRoles={config.roles} requiredPermissions={config.permissions ?? []}>
                            {config.element}
                        </RequireAuth>
                    );
                } else if ("guestOnly" in config && config.guestOnly) {
                    wrappedElement = <GuestOnly>{config.element}</GuestOnly>;
                }

                return <Route key={index} path={config.path} element={wrappedElement} />;
            })}
        </Routes>
    </BrowserRouter>
);

export default AppRouter;