import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
                h-10 flex items-center
                ${collapsed ? 'justify-center px-0' : 'px-3'}
              `}
                    >
                        {collapsed ? shortenLabel(section.label) : section.label}
                    </p>
                    <div className="mt-2 space-y-1">
                        {section.items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                key={item.text}
                                                variant="ghost"
                                                className={`
                                                    w-full justify-start overflow-hidden text-ellipsis whitespace-nowrap
                                                    ${item.bg ?? ''} 
                                                    ${item.textColor ?? 'text-gray-700'} 
                                                    ${collapsed ? 'flex justify-center' : ''}
                                                `}
                                            >
                                                <Icon className={`${collapsed ? '' : 'mr-2'} h-4 w-4`} />
                                                {!collapsed && (
                                                    <span className="truncate max-w-[140px]">{item.text}</span>
                                                )}
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            {item.text}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SidebarItem