import { BarChart3, Bell, Clock, Computer, CreditCard, FileText, Lock, MessageCircleQuestion, Puzzle, Settings, Users } from "lucide-react";
import { ElementType } from "react";

export const menuSections = [
    {
        label: 'General',
        items: [
            { icon: Clock as ElementType, text: 'Dashboard', bg: 'bg-gray-100', textColor: 'text-gray-900' },
            { icon: Computer as ElementType, text: 'Sales Transactions' },
            { icon: BarChart3 as ElementType, text: 'Inventory Stock' },
            { icon: CreditCard as ElementType, text: 'Hutang Piutang' },
            { icon: Users as ElementType, text: 'Penjualan' },
            { icon: FileText as ElementType, text: 'Pelanggan' },
        ],
    },
    {
        label: 'Account',
        items: [
            { icon: Bell as ElementType, text: 'Notification' },
            { icon: Settings as ElementType, text: 'Settings' },
            { icon: Lock as ElementType, text: 'Security' },
            { icon: Puzzle as ElementType, text: 'Integrations' },
            { icon: MessageCircleQuestion as ElementType, text: 'Support' },
        ],
    },
];