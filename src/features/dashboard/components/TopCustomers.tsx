import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { formatter } from '@/lib/utils';
import { ArrowRight, ChevronDown, Clock, MoreHorizontal } from 'lucide-react';
import React from 'react'

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
    return (
        <div className="bg-white rounded-lg border">
            <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-lg font-medium">Top Customer</h2>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Clock className="h-4 w-4" />
                                Timeframe
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                            <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                            <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Spent
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Transactions
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Last Transactions
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
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
    return (
        <tr className="border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatter.format(customer.totalSpent)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.totalTransactions}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.lastTransaction}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Button variant="ghost" size="sm" className="h-6 px-2">
                    <span className="text-sm text-gray-500">See Detail</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
            </td>
        </tr>
    )
}