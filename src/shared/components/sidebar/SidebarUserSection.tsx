import { useAuth } from '@/auth/context/AuthProvider'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { truncateText } from '@/lib/utils'
import { ROUTES } from '@/router/AppRouter'
import { ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router'

interface SidebarUserSectionProps {
    collapsed: boolean
    setCollapsed: (value: boolean) => void
}

export const SidebarUserSection: React.FC<SidebarUserSectionProps> = ({ collapsed, setCollapsed }) => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    return (
        <div className={`${collapsed ? 'absolute w-full' : 'w-full'} bottom-0 p-4 border-t`}>
            {collapsed ? (
                <Button
                    variant="ghost"
                    className="w-full px-2 py-1.5 flex items-center justify-between"
                    onClick={() => setCollapsed(false)}
                >
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                            <img src="/profile.jpg" alt="User" className="w-full h-full object-cover" />
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
                                    <p className="text-sm font-medium leading-none">{truncateText(user?.name ?? '', 30, '...')}</p>
                                    <p className="text-xs text-gray-500">{truncateText(user?.email ?? '', 30, '...')}</p>
                                </div>
                            </div>
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem onClick={() => navigate(ROUTES.PROFILE.path)}>Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Change password clicked')}>Change Password</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Settings clicked')}>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}