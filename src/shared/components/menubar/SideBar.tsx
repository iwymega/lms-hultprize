import { Button } from '@/components/ui/button'
import { AlignJustify, BarChart3, Bell, ChevronDown, Clock, Computer, CreditCard, FileText, Lock, MessageCircleQuestion, Puzzle, Settings, Users } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import React, { useState } from 'react'
import SearchBar from './SearchBar'

const SideBar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)

    const toggleSidebar = () => {
        setCollapsed(prev => !prev)
    }

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
        return labelMap[label] || label.slice(0, 3);  // Default to first 3 letters if no match
    };


    return (
        <div className={`transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'} border-r bg-white`}>
            <div className="flex items-center gap-2 p-4 border-b">
                {!collapsed && (
                    <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-md">
                        <Computer className="w-5 h-5 text-indigo-600" />
                    </div>
                )}
                {!collapsed && <span className="text-xl font-bold">POS</span>}
                <div className={`${collapsed ? 'ml-auto mr-auto' : 'ml-auto'}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleSidebar}>
                        <AlignJustify className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <SearchBar isCollapsed={collapsed} />

            <div className="px-3 py-2">
                <p
                    className={`
                        text-xs font-medium uppercase text-gray-500
                        transition-all duration-200
                        h-10
                        ${collapsed ? 'flex justify-center items-center px-0' : 'px-3'}
                    `}
                >
                    {collapsed ? shortenLabel('General') : 'General'}
                </p>
                <div className="mt-2 space-y-1">
                    <Button
                        variant="ghost"
                        className={`w-full justify-start bg-gray-100 text-gray-900 ${collapsed ? 'flex justify-center' : ''}`}
                    >
                        <Clock className={`${collapsed ? '' : 'mr-2'} h-4 w-4`} />
                        {!collapsed && 'Dashboard'}
                    </Button>
                    <Button
                        variant="ghost"
                        className={`w-full justify-start text-gray-700 ${collapsed ? 'flex justify-center' : ''}`}
                    >
                        <BarChart3 className={`${collapsed ? '' : 'mr-2'} h-4 w-4`} />
                        {!collapsed && 'Analytics'}
                    </Button>
                    <Button
                        variant="ghost"
                        className={`w-full justify-start text-gray-700 ${collapsed ? 'flex justify-center' : ''}`}
                    >
                        <CreditCard className={`${collapsed ? '' : 'mr-2'} h-4 w-4`} />
                        {!collapsed && 'Transaction'}
                    </Button>
                    <Button
                        variant="ghost"
                        className={`w-full justify-start text-gray-700 ${collapsed ? 'flex justify-center' : ''}`}
                    >
                        <Users className={`${collapsed ? '' : 'mr-2'} h-4 w-4`} />
                        {!collapsed && 'Customers'}
                    </Button>
                    <Button
                        variant="ghost"
                        className={`w-full justify-start text-gray-700 ${collapsed ? 'flex justify-center' : ''}`}
                    >
                        <FileText className={`${collapsed ? '' : 'mr-2'} h-4 w-4`} />
                        {!collapsed && 'Reports'}
                    </Button>
                </div>
            </div>

            <div className="px-3 py-2">
                <p
                    className={`
            text-xs font-medium uppercase text-gray-500
            transition-all duration-200
            h-10
            ${collapsed ? 'flex justify-center items-center px-0' : 'px-3'}
        `}
                >
                    {collapsed ? shortenLabel('Account') : 'Account'}
                </p>
                <div className="mt-2 space-y-1">
                    <Button
                        variant="ghost"
                        className={`w-full justify-start text-gray-700 ${collapsed ? 'flex justify-center' : ''}`}
                    >
                        <Bell className={`${collapsed ? '' : 'mr-2'} h-4 w-4`} />
                        {!collapsed && 'Notification'}
                    </Button>
                    <Button
                        variant="ghost"
                        className={`w-full justify-start text-gray-700 ${collapsed ? 'flex justify-center' : ''}`}
                    >
                        <Settings className={`${collapsed ? '' : 'mr-2'} h-4 w-4`} />
                        {!collapsed && 'Settings'}
                    </Button>
                    <Button
                        variant="ghost"
                        className={`w-full justify-start text-gray-700 ${collapsed ? 'flex justify-center' : ''}`}
                    >
                        <Lock className={`${collapsed ? '' : 'mr-2'} h-4 w-4`} />
                        {!collapsed && 'Security'}
                    </Button>
                    <Button
                        variant="ghost"
                        className={`w-full justify-start text-gray-700 ${collapsed ? 'flex justify-center' : ''}`}
                    >
                        <Puzzle className={`${collapsed ? '' : 'mr-2'} h-4 w-4`} />
                        {!collapsed && 'Integrations'}
                    </Button>
                    <Button
                        variant="ghost"
                        className={`w-full justify-start text-gray-700 ${collapsed ? 'flex justify-center' : ''}`}
                    >
                        <MessageCircleQuestion className={`${collapsed ? '' : 'mr-2'} h-4 w-4`} />
                        {!collapsed && 'Support'}
                    </Button>
                </div>
            </div>

            <div className={collapsed ? 'absolute bottom-0 p-4 border-t' : 'absolute bottom-0 w-64 p-4 border-t'}>
                {collapsed && (
                    <Button variant="ghost" className="w-full px-2 py-1.5 flex items-center justify-between" onClick={() => setCollapsed(false)}>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                                <img src="/placeholder-user.jpg" alt="User" className="w-full h-full object-cover" />
                            </div>
                            {!collapsed && (
                                <div className="text-left">
                                    <p className="text-sm font-medium leading-none">Komang Gede</p>
                                    <p className="text-xs text-gray-500">komanggede@gmail.com</p>
                                </div>
                            )}
                        </div>
                    </Button>
                )}
                {!collapsed && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-full px-2 py-1.5 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                                        <img src="/profile.jpg" alt="User" className="w-full h-full object-cover" />
                                    </div>
                                    {!collapsed && (
                                        <div className="text-left">
                                            <p className="text-sm font-medium leading-none">Komang Gede</p>
                                            <p className="text-xs text-gray-500">komanggede@gmail.com</p>
                                        </div>
                                    )}
                                </div>
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem onClick={() => console.log('Profile clicked')}>Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Change password clicked')}>Change Password</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Settings clicked')}>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => console.log('Logout clicked')}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    )
}

export default SideBar
