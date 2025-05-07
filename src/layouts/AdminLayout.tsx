import SideBar from '@/shared/components/sidebar/SideBar'
import SidebarDrawer from '@/shared/components/sidebar/SidebarDrawer'
import TopBar from '@/shared/components/topbar/TopBar'
import { BarChart3, ChartBar, Clock, Computer, CreditCard, Settings, Users } from 'lucide-react'
import React, { ElementType } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
    children?: React.ReactNode
}

const AdminLayout: React.FC<Props> = ({ children }) => {
    const { t } = useTranslation();

    const menuSections = [
        {
            label: t('sidebar.main'),
            items: [
                { icon: Clock as ElementType, text: t('menu.dashboard'), bg: 'bg-gray-100', textColor: 'text-gray-900' },
                { icon: Computer as ElementType, text: t('menu.penjualan') },
                { icon: BarChart3 as ElementType, text: t('menu.inventory-stock') },
                { icon: CreditCard as ElementType, text: t('menu.hutang-piutang') },
                { icon: ChartBar as ElementType, text: t('menu.laporan-analitik') },
            ],
        },
        {
            label: t('sidebar.master'),
            items: [
                { icon: Users as ElementType, text: t('menu.pelanggan') },
                { icon: Users as ElementType, text: t('menu.user-management') },
                { icon: Settings as ElementType, text: t('menu.setting-konfigurasi') },
            ],
        },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <SideBar menuSections={menuSections} />

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <SidebarDrawer menuSections={menuSections} />
                <TopBar />
                {children}
            </div>
        </div>
    )
}

export default AdminLayout