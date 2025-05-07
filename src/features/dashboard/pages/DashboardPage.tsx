import React from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import Dashboard from '../components/Dashboard'
import DashboardMainContent from '../components/DashboardMainContent'

const DashboardPage: React.FC = () => {

    return (
        <AdminLayout>
            {/* <Dashboard /> */}
            <DashboardMainContent />
        </AdminLayout>
    )
}

export default DashboardPage