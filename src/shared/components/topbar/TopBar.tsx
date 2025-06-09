import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import React from 'react'
import { useLocation } from 'react-router'
import LanguageDropdown from './LanguageDropdown'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { NotificationBell } from '../notification/components/NotificationBell'

const TopBar: React.FC = () => {
    const location = useLocation()

    // Ambil bagian terakhir dari path dan formatnya
    const dynamicPageTitle = location.pathname === '/'
        ? 'Dashboard'  // Jika path-nya '/' setel ke Dashboard
        : location.pathname
            .split('/')
            .pop() // Ambil bagian terakhir (misal sales-transactions)
            ?.replace(/-/g, ' ') // Ganti hyphen dengan spasi
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize setiap kata

    const queryClient = useQueryClient();

    const handleRefreshData = async () => {
        await queryClient.invalidateQueries();
        toast.success('Data refreshed successfully!');
    };


    return (
        <header className="hidden md:flex items-center justify-between p-4 border-b bg-white">
            <h1 className="text-xl font-semibold">{dynamicPageTitle}</h1>
            <div className="flex items-center gap-2">
                <NotificationBell />
                {/* Button Refresh Data */}
                <Button variant="outline" size="sm" className="gap-2" onClick={handleRefreshData}>
                    <RefreshCw className="h-4 w-4" />
                </Button>

                {/* Dropdown Select Language */}
                <LanguageDropdown />
            </div>
        </header>
    )
}

export default TopBar