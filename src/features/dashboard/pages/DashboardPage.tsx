import React from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import Dashboard from '../components/Dashboard'

const DashboardPage: React.FC = () => {

    return (
        <AdminLayout>
            <Dashboard />
        </AdminLayout>
    )
}

export default DashboardPage