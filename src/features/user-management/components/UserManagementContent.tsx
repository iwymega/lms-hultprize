import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { DashboardCard } from '@/shared/components/card/DashboardCard';
import { AlertTriangle, CreditCard, Download, Filter, Plus, Search, ShoppingCart, UserPlus } from 'lucide-react';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import UserManagementTable from './UserManagementTable';
import { Checkbox } from '@/components/ui/checkbox';
import PaginationWithShow from '@/shared/components/pagination/PaginationWithShow';

const UserManagementContent: React.FC = () => {
    const { t } = useTranslation();
    const dashboardCards = [
        {
            title: t("dashboard.total-sales-today"),
            icon: <ShoppingCart className="h-4 w-4 text-blue-600" />,
            iconBg: "bg-blue-100",
            value: "$1,204.00",
            change: "+12% vs " + t("dashboard.yesterday"),
            changeType: "up" as "up",
        },
        {
            title: t("dashboard.total-transactions"),
            icon: <CreditCard className="h-4 w-4 text-blue-600" />,
            iconBg: "bg-blue-100",
            value: "342",
            change: "+5% vs " + t("dashboard.yesterday"),
            changeType: "up" as "up",
        },
        {
            title: t("dashboard.low-stock-warning"),
            icon: <AlertTriangle className="h-4 w-4 text-blue-600" />,
            iconBg: "bg-blue-100",
            value: "8 Items",
            change: "2 " + t("dashboard.new-warning"),
            changeType: "down" as "down",
        },
        {
            title: t("dashboard.new-customers-today"),
            icon: <UserPlus className="h-4 w-4 text-blue-600" />,
            iconBg: "bg-blue-100",
            value: "24",
            change: "+9% vs " + t("dashboard.yesterday"),
            changeType: "up" as "up",
        },
    ]

    return (
        <main className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                {dashboardCards.map((card, idx) => (
                    <DashboardCard
                        key={idx}
                        {...card}
                        onDetailClick={() => console.log(`Detail clicked: ${card.title}`)}
                    />
                ))}
            </div>

            {/* Action Bar */}
            <div className="flex justify-between items-center mb-6 flex-wrap gap-y-4">
                {/* Left - Add Button */}
                <Button onClick={() => console.log("Add clicked")} className="flex items-center gap-2 bg-blue-600">
                    <Plus className="h-4 w-4" />
                    Add User
                </Button>

                {/* Right - Search, Filter, Download */}
                <div className="flex items-center gap-2">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search"
                            className="pl-10"
                        />
                    </div>

                    {/* Filter Dropdown */}
                    <FilterDropdown />

                    {/* Download Button */}
                    <Button className="bg-emerald-600 hover:bg-emerald-300 flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download
                    </Button>
                </div>
            </div>

            {/* Table User Management */}
            <UserManagementTable />

            {/* Pagination */}
            <PaginationWithShow
                totalItems={100}
                itemsPerPage={10}
                currentPage={1}
                onPageChange={(page) => console.log(`Page changed to: ${page}`)}
                onItemsPerPageChange={(items) => console.log(`Items per page changed to: ${items}`)}
            />
        </main>
    )
}

export default UserManagementContent

const FilterDropdown = () => {
    const [isActive, setIsActive] = useState(false);
    const [isInactive, setIsInactive] = useState(false);

    const handleApplyFilter = () => {
        console.log("Filter applied", { isActive, isInactive });
        // Aksi untuk menerapkan filter sesuai dengan status yang dipilih.
    };

    const handleClearFilter = () => {
        setIsActive(false);
        setIsInactive(false);
        console.log("Filters cleared");
        // Aksi untuk membersihkan filter.
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-64 p-4">
                {/* Checkbox untuk status Active dan Inactive */}
                <div className="flex flex-col gap-2 mb-4">
                    <label className="flex items-center">
                        <Checkbox checked={isActive} onCheckedChange={() => setIsActive(!isActive)} />
                        <span className="ml-2">Active</span>
                    </label>

                    <label className="flex items-center">
                        <Checkbox checked={isInactive} onCheckedChange={() => setIsInactive(!isInactive)} />
                        <span className="ml-2">Inactive</span>
                    </label>
                </div>

                {/* Button Filter */}
                <Button
                    className="w-full bg-indigo-600 text-white"
                    onClick={handleApplyFilter}
                >
                    Apply Filter
                </Button>

                {/* Button Clear */}
                <Button
                    className="w-full bg-gray-300 text-gray-700 mt-2"
                    onClick={handleClearFilter}
                >
                    Clear
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};