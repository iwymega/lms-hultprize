import React from 'react';
import { Button } from "@/components/ui/button";

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

interface SidebarProps {
    collapsed: boolean;
    sections: MenuSection[];
};

const SidebarItem: React.FC<SidebarProps> = ({ collapsed, sections }) => {
    const shortenLabel = (label: string) => {
        const labelMap: Record<string, string> = {
            'General': 'Gen',
            'Dashboard': 'Dash',
            'Settings': 'Set',
            'Analytics': 'Anl',
            'Transaction': 'Tx',
            'Customers': 'Cus',
            'Reports': 'Rpt',
            'Security': 'Sec',
            'Integrations': 'Int',
            'Support': 'Sup',
        };
        return labelMap[label] || label.slice(0, 3);
    };

    return (
        <div>
            {sections.map((section) => (
                <div key={section.label} className="px-3 py-2">
                    <p
                        className={`
                text-xs font-medium uppercase text-gray-500
                transition-all duration-200
                h-10
                ${collapsed ? 'flex justify-center items-center px-0' : 'px-3'}
              `}
                    >
                        {collapsed ? shortenLabel(section.label) : section.label}
                    </p>
                    <div className="mt-2 space-y-1">
                        {section.items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Button
                                    key={item.text}
                                    variant="ghost"
                                    className={`w-full justify-start ${item.bg ?? ''} ${item.textColor ?? 'text-gray-700'} ${collapsed ? 'flex justify-center' : ''}`}
                                >
                                    <Icon className={`${collapsed ? '' : 'mr-2'} h-4 w-4`} />
                                    {!collapsed && item.text}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SidebarItem