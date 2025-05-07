import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import React from 'react'
import { useLocation } from 'react-router'

const TopBar: React.FC = () => {
    const location = useLocation()

    // Ambil bagian terakhir dari path dan formatnya
    const pageTitle = location.pathname
        .split('/')
        .pop() // Ambil bagian terakhir (misal sales-transactions)
        ?.replace(/-/g, ' ') // Ganti hyphen dengan spasi
        .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize setiap kata

    return (
        <header className="flex items-center justify-between p-4 border-b bg-white">
            <h1 className="text-xl font-semibold">{pageTitle}</h1>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Refresh Data
                </Button>
                {/* <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                    Export
                </Button> */}
            </div>
        </header>
    )
}

export default TopBar