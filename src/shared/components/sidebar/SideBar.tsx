import { Button } from '@/components/ui/button'
import { AlignJustify, Computer } from 'lucide-react'
import React, { useState } from 'react'
import SearchBar from './SearchBar'
import { menuSections } from './menuSections'
import SidebarItem from './SidebarItem'
import { SidebarUserSection } from './SidebarUserSection'

const SideBar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)

    const toggleSidebar = () => {
        setCollapsed(prev => !prev)
    }

    return (
        <div className={`flex flex-col transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'} border-r bg-white relative h-screen`}>
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

            <div className="flex-1 overflow-y-auto">
                <SidebarItem collapsed={collapsed} sections={menuSections} />
            </div>

            {/* <div className={`${collapsed ? 'absolute w-full' : 'w-full'} bottom-0 p-4 border-t`}>
                {collapsed ? (
                    <Button
                        variant="ghost"
                        className="w-full px-2 py-1.5 flex items-center justify-between"
                        onClick={() => setCollapsed(false)}
                    >
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                                <img src="/placeholder-user.jpg" alt="User" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </Button>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-full px-2 py-1.5 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                                        <img src="/profile.jpg" alt="User" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium leading-none">Komang Gede</p>
                                        <p className="text-xs text-gray-500">komanggede@gmail.com</p>
                                    </div>
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
            </div> */}
            <SidebarUserSection collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
    )
}

export default SideBar