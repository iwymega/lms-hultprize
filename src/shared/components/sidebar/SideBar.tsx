import { Button } from '@/components/ui/button'
import { AlignJustify, BarChart3, ChartBar, Clock, Computer, CreditCard, Settings, Users } from 'lucide-react'
import React, { ElementType, useState } from 'react'
import SearchBar from './SearchBar'
import SidebarItem from './SidebarItem'
import { SidebarUserSection } from './SidebarUserSection'
import { useTranslation } from 'react-i18next'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const SideBar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(prev => !prev)
    }

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
        <>
            {/* Mobile: Drawer trigger */}
            <div className="md:hidden p-2">
                <Sheet open={openDrawer} onOpenChange={setOpenDrawer}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <AlignJustify className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 h-screen w-screen max-w-[100vw] sm:max-w-sm md:max-w-md lg:max-w-lg">
                        <SidebarContent
                            collapsed={false}
                            toggleSidebar={() => setOpenDrawer(false)}
                            setCollapsed={() => { }}
                            menuSections={menuSections}
                            isDrawer={true}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop: Static sidebar */}
            <div className="hidden md:block">
                <SidebarContent
                    collapsed={collapsed}
                    toggleSidebar={toggleSidebar}
                    setCollapsed={setCollapsed}
                    menuSections={menuSections}
                />
            </div>
        </>
    )
}

export default SideBar

interface MenuItem {
    icon: React.ElementType;
    text: string;
    bg?: string;
    textColor?: string;
};

interface MenuSection {
    label: string;
    items: MenuItem[];
};

interface SidebarContentProps {
    collapsed: boolean,
    toggleSidebar: () => void,
    setCollapsed: (value: boolean) => void,
    menuSections: MenuSection[],
    isDrawer?: boolean,
}

const SidebarContent: React.FC<SidebarContentProps> = ({ collapsed, toggleSidebar, setCollapsed, menuSections, isDrawer }) => {
    return (
        <div className={`flex flex-col transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : isDrawer ? 'w-screen' : 'w-64'} border-r bg-white relative h-screen`}>
            <div className="flex items-center gap-2 p-4 border-b">
                {!collapsed && (
                    <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-md">
                        <Computer className="w-5 h-5 text-indigo-600" />
                    </div>
                )}
                {!collapsed && <span className="text-xl font-bold">POS</span>}
                {!isDrawer && (
                    <div className={`${collapsed ? 'ml-auto mr-auto' : 'ml-auto'}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleSidebar}>
                            <AlignJustify className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>

            <SearchBar isCollapsed={collapsed} />

            <div className="flex-1 overflow-y-auto">
                <SidebarItem collapsed={collapsed} sections={menuSections} />
            </div>

            <SidebarUserSection collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
    )
}