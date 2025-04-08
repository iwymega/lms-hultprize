import React from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import LoginPage from "../auth/pages/LoginPage";
import ForbiddenPage from "../auth/pages/ForbiddenPage";
import RequireAuth from "../auth/middleware/RequireAuth";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import GuestOnly from "@/auth/middleware/GuestOnly";

const AppRouter: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<RequireAuth requiredRoles={['superadmin']}><DashboardPage /></RequireAuth>} />

            {/* Authentication */}
            <Route path="/login" element={<GuestOnly><LoginPage /></GuestOnly>} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
        </Routes>
    </BrowserRouter>
)

export default AppRouter;