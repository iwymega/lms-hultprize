import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import React from 'react'
import { useLocation } from 'react-router'
import LanguageDropdown from './LanguageDropdown'
import { useTranslation } from 'react-i18next'

const TopBar: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation()

    // Ambil bagian terakhir dari path dan formatnya
    const dynamicPageTitle = location.pathname === '/'
        ? 'Dashboard'  // Jika path-nya '/' setel ke Dashboard
        : location.pathname
            .split('/')
            .pop() // Ambil bagian terakhir (misal sales-transactions)
            ?.replace(/-/g, ' ') // Ganti hyphen dengan spasi
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize setiap kata

    return (
        <header className="flex items-center justify-between p-4 border-b bg-white">
            <h1 className="text-xl font-semibold">{dynamicPageTitle}</h1>
            <span className="text-sm text-gray-500">
                {t('welcome', { name: 'Komang Gede' })}
            </span>
            <div className="flex items-center gap-2">
                {/* Button Refresh Data */}
                <Button variant="outline" size="sm" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Refresh Data
                </Button>

                {/* Dropdown Select Language */}
                <LanguageDropdown />
            </div>
        </header>
    )
}

export default TopBar