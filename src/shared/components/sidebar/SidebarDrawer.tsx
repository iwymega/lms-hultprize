import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AlignJustify, RefreshCw } from 'lucide-react'
import React, { useState } from 'react'
import LanguageDropdown from '../topbar/LanguageDropdown'
import SidebarContent from './SidebarContent'
import { useLocation } from 'react-router'

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

interface SidebarDrawerProps {
    menuSections: MenuSection[];
}

const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ menuSections }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const location = useLocation()

    // Ambil bagian terakhir dari path dan formatnya
    const dynamicPageTitle = location.pathname === '/'
        ? 'Dashboard'  // Jika path-nya '/' setel ke Dashboard
        : location.pathname
            .split('/')
            .pop() // Ambil bagian terakhir (misal sales-transactions)
            ?.replace(/-/g, ' ') // Ganti hyphen dengan spasi
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize setiap kata

    return (
        <>
            {/* Mobile: Drawer trigger */}
            <div className="md:hidden">
                <Sheet open={openDrawer} onOpenChange={setOpenDrawer}>
                    <header className="flex items-center justify-between p-4 border-b bg-white">
                        <div className="flex items-center gap-2">
                            {/* Trigger hanya tampil di mobile */}
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <AlignJustify className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <h1 className="text-xl font-semibold">{dynamicPageTitle}</h1>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                                <RefreshCw className="h-4 w-4" />
                                Refresh Data
                            </Button>
                            <LanguageDropdown />
                        </div>
                    </header>
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
        </>
    )
}

export default SidebarDrawer