import React from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import DashboardMainContent from '../components/DashboardMainContent'
import FacebookStyleChat from '@/shared/components/facebook-style-chat/components/FacebookStyleChat';

/**
 * This is the main page component for the dashboard when the application
 * is run standalone. It wraps the core content (`DashboardMainContent`)
 * with the application's specific layout (`AdminLayout`).
 */
const DashboardPage: React.FC = () => {
    return (
        <AdminLayout>
            <DashboardMainContent />
            <FacebookStyleChat />
        </AdminLayout>
    )
}

export default DashboardPage