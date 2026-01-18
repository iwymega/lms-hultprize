// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ROUTES } from '@/router/AppRouter'
import SideBar from '@/shared/components/sidebar/SideBar'
import SidebarDrawer from '@/shared/components/sidebar/SidebarDrawer'
import TopBar from '@/shared/components/topbar/TopBar'
import { Lock, Settings, ShieldUser, Users, FileText, FolderOpen, Video, Brain } from 'lucide-react'
import React, { ElementType } from 'react'
import { useTranslation } from 'react-i18next'
// import { Link } from 'react-router'

interface Props {
    children?: React.ReactNode
}

const AdminLayout: React.FC<Props> = ({ children }) => {
    const { t } = useTranslation();

    const menuSections = [
        {
            label: t('sidebar.main'),
            items: [
                // { icon: Clock as ElementType, text: t('menu.dashboard'), url: '/' },
                { icon: Video as ElementType, text: 'Educational Videos', url: ROUTES.EDUCATIONAL_VIDEO.path },
                { icon: Brain as ElementType, text: 'Science Quizzes', url: ROUTES.QUIZ.path },
                // { icon: Computer as ElementType, text: t('menu.penjualan'), url: '/penjualan' },
                // { icon: BarChart3 as ElementType, text: t('menu.inventory-stock'), url: '/inventory-stock' },
                // { icon: CreditCard as ElementType, text: t('menu.hutang-piutang'), url: '/hutang-piutang' },
                // { icon: ChartBar as ElementType, text: t('menu.laporan-analitik'), url: '/laporan-analitik' },
            ],
        },
        {
            label: t('sidebar.master'),
            items: [
                { icon: Users as ElementType, text: t('menu.pelanggan'), url: '/pelanggan' },
                { icon: FileText as ElementType, text: t('menu.post'), url: '/posts' },
                { icon: FolderOpen as ElementType, text: t('menu.file-manager'), url: '/file-manager' },
                { icon: Users as ElementType, text: t('menu.user-management'), url: ROUTES.USER_MANAGEMENT.path },
                { icon: Lock as ElementType, text: t('menu.permissions'), url: ROUTES.PERMISSIONS.path },
                { icon: ShieldUser as ElementType, text: t('menu.roles'), url: ROUTES.ROLES.path },
                { icon: Settings as ElementType, text: t('menu.setting-konfigurasi'), url: '/setting-konfigurasi' },
            ],
        },
    ];

    // const applicationSections = [
    //     {
    //         label: 'AHR',
    //         logo: '/logo/ahr/logo.png',
    //         desc: 'Aplikasi HRD',
    //         url: '/ahr'
    //     },
    //     {
    //         label: 'PM',
    //         logo: '/logo/pm/logo.png',
    //         desc: 'Aplikasi PM',
    //         url: '/pm'
    //     },
    //     {
    //         label: 'SOM',
    //         logo: '/logo/som/logo.png',
    //         desc: 'Aplikasi SOM',
    //         url: '/som'
    //     },
    //     {
    //         label: 'CRM',
    //         logo: '/logo/crm-logopng-QAC.png',
    //         desc: 'Aplikasi CRM',
    //         url: '/crm'
    //     }
    // ]

    return (
        <div className="flex h-screen bg-gray-50">
            {/* <div className={`flex flex-col transition-all duration-300 ease-in-out w-16 border-r bg-white relative h-screen`}>
                <div className="flex items-center justify-center h-16 border-b">
                    <img src="/logo/android-chrome-96x96.png" alt="Logo" className="w-10 h-10" />
                </div>
                <div className="flex flex-col items-center mt-4">
                    {applicationSections.map((item, idx) => (
                        <div key={idx} className="mb-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link to={item.url} className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md">
                                            <img key={idx} src={item.logo} alt={item.label} className="w-8 h-8 rounded-full" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side='right'>
                                        <p>{item.desc}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    ))}
                </div>
            </div> */}
            {/* Sidebar */}
            <SideBar menuSections={menuSections} />

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <SidebarDrawer menuSections={menuSections} />
                <TopBar />
                {children}
            </div>
        </div >
    )
}

export default AdminLayout
