import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DashboardCard } from '@/shared/components/card/DashboardCard';
import { Download, Filter, Search, UserRoundCheck, UserRoundPlus, UserRoundX, Users } from 'lucide-react';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import UserManagementTable from './UserManagementTable';
import { Checkbox } from '@/components/ui/checkbox';
import PaginationWithShow from '@/shared/components/pagination/PaginationWithShow';
import useIndexUser from '@/services/user/hooks/useIndexUser';
import DebouncedSearchInput from '@/shared/components/search/DebouncedSearchInput';
import SectionLoader from '@/shared/components/loader/SectionLoader';
import AddUserModal from './AddUserModal';

const UserManagementContent: React.FC = () => {
    const { t } = useTranslation();
    const dashboardCards = [
        {
            title: t("user-management.card.total-users"),
            icon: <Users className="h-4 w-4 text-blue-600" />,
            iconBg: "bg-blue-100",
            value: "0",
            changeType: "up" as "up",
        },
        {
            title: t("user-management.card.active-users"),
            icon: <UserRoundCheck className="h-4 w-4 text-blue-600" />,
            iconBg: "bg-blue-100",
            value: "0",
            changeType: "up" as "up",
        },
        {
            title: t("user-management.card.inactive-users"),
            icon: <UserRoundX className="h-4 w-4 text-blue-600" />,
            iconBg: "bg-blue-100",
            value: "0",
            changeType: "down" as "down",
        },
        {
            title: t("user-management.card.recently-added"),
            icon: <UserRoundPlus className="h-4 w-4 text-blue-600" />,
            iconBg: "bg-blue-100",
            value: "0",
            changeType: "up" as "up",
        },
    ]

    const [search, setSearch] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const { data: users, isFetching, isSuccess } = useIndexUser({
        search: search,
        paginate: entriesPerPage,
        page: currentPage,
        include: "roles,permissions"
    });

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
                <AddUserModal />

                {/* Right - Search, Filter, Download */}
                <div className="flex items-center gap-2">
                    <DebouncedSearchInput
                        value={search}
                        onChange={setSearch}
                        debounceTime={400}
                        icon={<Search className="h-4 w-4" />}
                        className="my-4"
                        inputClassName="text-sm"
                        placeholder="Search here..."
                    />

                    {/* Filter Dropdown */}
                    <FilterDropdown />

                    {/* Download Button */}
                    <Button className="bg-emerald-600 hover:bg-emerald-300 flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download
                    </Button>
                </div>
            </div>

            {isFetching ? (
                <SectionLoader text="Please wait..." time={1200} className="bg-gray-50" />
            ) : isSuccess && (
                <>
                    {/* Table User Management */}
                    <UserManagementTable users={users} />
                    {/* Pagination */}
                    {users.pagination && (
                        <PaginationWithShow
                            totalItems={users.pagination.total}
                            itemsPerPage={entriesPerPage}
                            currentPage={currentPage}
                            onPageChange={(page) => setCurrentPage(page)}
                            onItemsPerPageChange={(items) => setEntriesPerPage(items)}
                        />
                    )}
                </>
            )}
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