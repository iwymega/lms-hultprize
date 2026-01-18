import React, { JSX } from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import LoginPage from "../auth/pages/LoginPage";
import ForbiddenPage from "../auth/pages/ForbiddenPage";
import RequireAuth from "../auth/middleware/RequireAuth";
// import DashboardPage from "../features/dashboard/pages/DashboardPage";
import GuestOnly from "@/auth/middleware/GuestOnly";
import UserManagementPage from "@/features/user-management/pages/UserManagementPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import PermissionsPage from "@/features/permission/pages/PermissionsPage";
import RolePage from "@/features/role/pages/RolePage";
import RoleUsersAssignedPage from "@/features/role/pages/RoleUsersAssignedPage";
import RolePermissionsAssignedPage from "@/features/role/pages/RolePermissionsAssignedPage";
import AllNotificationPage from "@/features/notification/pages/AllNotificationPage";
import ImageMapPage from "@/features/image-map/pages/ImageMapPage";
import CardScannerPage from "@/features/card-scanner/pages/CardScannerPage";
import NotFound from "@/shared/components/error-page/NotFound";
import PostPage from "@/features/post/pages/PostPage";
import CreatePostPage from "@/features/post/pages/CreatePostPage";
import EditPostPage from "@/features/post/pages/EditPostPage";
import FileManagerPage from "@/features/file-manager/pages/FileManagerPage";
import { EducationalVideoPage } from "@/features/educational-video/pages/EducationalVideoPage";
import QuizPage from "@/features/quiz/pages/QuizPage";

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
        element: <EducationalVideoPage />,
        // protected: true,
        // roles: ["superadmin"],
        // permissions: [],
    },
    USER_MANAGEMENT: {
        path: "/user-management",
        element: <UserManagementPage />,
        // protected: true,
        // roles: ["superadmin"],
        // permissions: [],
    },
    PERMISSIONS: {
        path: "/permissions",
        element: <PermissionsPage />,
        // protected: true,
        // roles: ["superadmin"],
        // permissions: [],
    },
    ROLES: {
        path: "/roles",
        element: <RolePage />,
        // protected: true,
        // roles: ["superadmin"],
        // permissions: [],
    },
    ROLES_USERS_ASSIGNED: {
        path: "/roles/:roleId/users",
        element: <RoleUsersAssignedPage />,
        // protected: true,
        // roles: ["superadmin"],
        // permissions: [],
    },
    ROLES_PERMISSIONS_ASSIGNED: {
        path: "/roles/:roleId/permissions",
        element: <RolePermissionsAssignedPage />,
        // protected: true,
        // roles: ["superadmin"],
        // permissions: [],
    },
    PROFILE: {
        path: "/profile",
        element: <ProfilePage />,
        // protected: true,
        // roles: ["superadmin"],
        // permissions: [],
    },
    CHANGE_PASSWORD: {
        path: "/profile/change-password",
        element: <ProfilePage />,
        // protected: true,
        // roles: ["superadmin"],
        // permissions: [],
    },
    NOTIFICATIONS: {
        path: "/notifications",
        element: <AllNotificationPage />, // Assuming this is the correct page for notifications
        // protected: true,
        // roles: ["superadmin"],
        // permissions: [],
    },
    IMAGE_MAP: {
        path: "/image-map",
        element: <ImageMapPage />,
        // protected: true,
        // roles: ["superadmin"],
        // permissions: [],
    },
    CARD_SCANNER: {
        path: "/card-scanner",
        element: <CardScannerPage />,
        // protected: true,
        // roles: ["superadmin"],
        // permissions: [],
    },
    POST: {
        path: "/posts",
        element: <PostPage />, // Replace with actual PostPage component
        // protected: true,
        // roles: ["superadmin"],
        // permissions: [],
    },
    CREATE_POST: {
        path: "/posts/create",
        element: <CreatePostPage />, // Replace with actual CreatePostPage component
        // protected: true,
        // roles: ["superadmin"],
        // permissions: [],
    },
    EDIT_POST: {
        path: "/posts/edit/:postId",
        element: <EditPostPage />, // Replace with actual EditPostPage component
        // protected: true,
        // roles: ["superadmin"],
        // permissions: [],
    },
    FILE_MANAGER: {
        path: "/file-manager",
        element: <FileManagerPage />,
        // protected: true,
        // roles: ["superadmin"],
        // permissions: [],
    },
    EDUCATIONAL_VIDEO: {
        path: "/educational-video",
        element: <EducationalVideoPage />,
        // protected: true,
        // roles: ["superadmin"],
        // permissions: [],
    },
    QUIZ: {
        path: "/quizzes",
        element: <QuizPage />,
        // protected: true,
        // roles: ["superadmin"],
        // permissions: [],
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
    NOT_FOUND: {
        path: "*",
        element: <NotFound />,
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
