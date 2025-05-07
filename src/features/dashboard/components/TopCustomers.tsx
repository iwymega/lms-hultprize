import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import { formatter } from '@/lib/utils';
import { ArrowRight, ChevronDown, Clock, MoreHorizontal, X } from 'lucide-react';
import React from 'react'
import { useTranslation } from 'react-i18next';

type Customer = {
    id: number;
    name: string;
    totalSpent: number;
    totalTransactions: number;
    lastTransaction: string; // ISO date string
};

export const topCustomers: Customer[] = [
    {
        id: 1,
        name: "Budi Santoso",
        totalSpent: 120000000,
        totalTransactions: 25,
        lastTransaction: "2025-04-28",
    },
    {
        id: 2,
        name: "Sari Wijaya",
        totalSpent: 98500000,
        totalTransactions: 18,
        lastTransaction: "2025-04-25",
    },
    {
        id: 3,
        name: "PT Amanah Sejahtera",
        totalSpent: 85000000,
        totalTransactions: 10,
        lastTransaction: "2025-04-27",
    },
    {
        id: 4,
        name: "Lina Permata",
        totalSpent: 74200000,
        totalTransactions: 20,
        lastTransaction: "2025-04-29",
    },
    {
        id: 5,
        name: "Dedi Gunawan",
        totalSpent: 70750000,
        totalTransactions: 22,
        lastTransaction: "2025-04-26",
    },
];


const TopCustomers: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-lg border">
            <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-lg font-medium">{t("dashboard.top-customers.title")}</h2>
                <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Clock className="h-4 w-4" />
                                    {t("dashboard.top-customers.timeframe.title")}
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>{t("dashboard.top-customers.timeframe.last-7-days")}</DropdownMenuItem>
                                <DropdownMenuItem>{t("dashboard.top-customers.timeframe.last-30-days")}</DropdownMenuItem>
                                <DropdownMenuItem>{t("dashboard.top-customers.timeframe.last-90-days")}</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <IconDropdownWithMenus />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t("dashboard.top-customers.table.user-name")}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t("dashboard.top-customers.table.total-spent")}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t("dashboard.top-customers.table.total-transactions")}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t("dashboard.top-customers.table.last-transaction")}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t("dashboard.top-customers.table.action.title")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {topCustomers.map((customer) => (
                            <TopCustomersItem customer={customer} key={customer.id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TopCustomers

interface TopCustomersItemProps {
    customer: Customer;
}

const TopCustomersItem: React.FC<TopCustomersItemProps> = ({ customer }) => {
    const { t } = useTranslation();
    return (
        <tr className="border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatter.format(customer.totalSpent)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.totalTransactions}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.lastTransaction}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Button variant="ghost" size="sm" className="h-6 px-2">
                    <span className="text-sm text-gray-500">{t("dashboard.top-customers.table.action.see-detail")}</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
            </td>
        </tr>
    )
}

function IconDropdownWithMenus() {
    const { t } = useTranslation();

    const handleClose = () => {
        console.log("Dropdown closed");
        // Tambahkan logika untuk close action jika diperlukan
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {/* Tampilkan submenus hanya di mobile */}
                <div className="md:hidden">
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <Clock className="mr-2 h-4 w-4" />
                            {t("dashboard.top-customers.timeframe.title")}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>{t("dashboard.top-customers.timeframe.last-7-days")}</DropdownMenuItem>
                            <DropdownMenuItem>{t("dashboard.top-customers.timeframe.last-30-days")}</DropdownMenuItem>
                            <DropdownMenuItem>{t("dashboard.top-customers.timeframe.last-90-days")}</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </div>

                {/* Item "Close" */}
                <DropdownMenuItem onClick={handleClose}>
                    <X className="mr-2 h-4 w-4 text-red-500" />
                    <span className="text-red-500">{t("common.close")}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}