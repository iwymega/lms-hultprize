import React from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import LoginPage from "../auth/pages/LoginPage";
import ForbiddenPage from "../auth/pages/ForbiddenPage";
import RequireAuth from "../auth/middleware/RequireAuth";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import GuestOnly from "@/auth/middleware/GuestOnly";
import UserManagementPage from "@/features/user-management/pages/UserManagementPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";

export const appUrl = [
    {
        path: "/",
        element: <DashboardPage />,
        protected: true,
        roles: ["superadmin"],
        permissions: [],
    },
    {
        path: "/user-management",
        element: <UserManagementPage />,
        protected: true,
        roles: ["superadmin"],
        permissions: [],
    },
    {
        path: "/profile",
        element: <ProfilePage />,
        protected: true,
        roles: ["superadmin"],
        permissions: [],
    },
    {
        path: "/login",
        element: <LoginPage />,
        guestOnly: true,
    },
    {
        path: "/forbidden",
        element: <ForbiddenPage />,
    },
];

const AppRouter: React.FC = () => (
    <BrowserRouter>
        <Routes>
            {appUrl.map(({ path, element, protected: isProtected, guestOnly, roles, permissions }, index) => {
                let wrappedElement = element;

                if (isProtected) {
                    wrappedElement = (
                        <RequireAuth requiredRoles={roles} requiredPermissions={permissions}>
                            {element}
                        </RequireAuth>
                    );
                } else if (guestOnly) {
                    wrappedElement = <GuestOnly>{element}</GuestOnly>;
                }

                return <Route key={index} path={path} element={wrappedElement} />;
            })}
        </Routes>
    </BrowserRouter>
);

export default AppRouter;