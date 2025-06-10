import React from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import DashboardMainContent from '../components/DashboardMainContent'
import FacebookStyleChat from '@/shared/components/facebook-style-chat/components/FacebookStyleChat';

const DashboardPage: React.FC = () => {

    return (
        <AdminLayout>
            <DashboardMainContent />
            <FacebookStyleChat />
        </AdminLayout>
    )
}

export default DashboardPage