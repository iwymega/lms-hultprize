import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import React from 'react'

const TopBar: React.FC = () => {
    return (
        <header className="flex items-center justify-between p-4 border-b bg-white">
            <h1 className="text-xl font-semibold">Dashboard</h1>
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