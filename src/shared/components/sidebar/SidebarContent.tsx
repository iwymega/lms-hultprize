import { Button } from '@/components/ui/button';
import { AlignJustify, Computer } from 'lucide-react';
import React from 'react'
import SearchBar from './SearchBar';
import SidebarItem from './SidebarItem';
import { SidebarUserSection } from './SidebarUserSection';

interface MenuItem {
    icon: React.ElementType;
    text: string;
    url: string;
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
                        <Computer className="w-5 h-5 text-blue-600" />
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

export default SidebarContent