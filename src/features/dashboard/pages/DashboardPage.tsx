import React from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import DashboardMainContent from '../components/DashboardMainContent'

const DashboardPage: React.FC = () => {

    return (
        <AdminLayout>
            <DashboardMainContent />
        </AdminLayout>
    )
}

export default DashboardPage