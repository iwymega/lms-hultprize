import React from 'react'
import { useAuth } from '../../../auth/context/AuthProvider'
import AdminLayout from '@/layouts/AdminLayout'

const DashboardPage: React.FC = () => {
    const { logout } = useAuth()

    return (
        <AdminLayout>
            <span>DashboardPage</span>
            <button onClick={() => logout()}>Logout</button>
        </AdminLayout>
    )
}

export default DashboardPage