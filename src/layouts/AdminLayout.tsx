import SideBar from '@/shared/components/menubar/SideBar'
import TopBar from '@/shared/components/menubar/TopBar'
import React from 'react'

interface Props {
    children?: React.ReactNode
}

const AdminLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <TopBar />
                {children}
            </div>
        </div>
    )
}

export default AdminLayout