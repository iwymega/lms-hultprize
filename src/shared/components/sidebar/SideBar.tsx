import React, { useState } from 'react'
import SidebarContent from './SidebarContent'

interface MenuItem {
    icon: React.ElementType;
    text: string;
    url: string;
};

interface MenuSection {
    label: string;
    items: MenuItem[];
};

interface SidebarProps {
    menuSections: MenuSection[];
}

const SideBar: React.FC<SidebarProps> = ({ menuSections }) => {
    const [collapsed, setCollapsed] = useState(false)

    const toggleSidebar = () => {
        setCollapsed(prev => !prev)
    }

    return (
        <div className="hidden md:block" >
            <SidebarContent
                collapsed={collapsed}
                toggleSidebar={toggleSidebar}
                setCollapsed={setCollapsed}
                menuSections={menuSections}
            />
        </div>
    )
}

export default SideBar