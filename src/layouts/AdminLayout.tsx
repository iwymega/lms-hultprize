import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BarChart3, Bell, ChevronDown, Clock, CreditCard, FileText, Lock, Puzzle, Search, Settings, Users } from 'lucide-react'
import React from 'react'

interface Props {
    children?: React.ReactNode
}

const AdminLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 border-r bg-white">
                <div className="flex items-center gap-2 p-4 border-b">
                    <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-md">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-600" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4 12H20M4 8H20M4 16H12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <span className="text-xl font-bold">Wiper</span>
                    <div className="ml-auto">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </Button>
                    </div>
                </div>

                <div className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search" className="pl-9 h-9 bg-gray-50 border-gray-200" />
                        <div className="absolute right-3 top-2.5 flex gap-1">
                            <span className="text-xs text-gray-400">⌘</span>
                            <span className="text-xs text-gray-400">K</span>
                        </div>
                    </div>
                </div>

                <div className="px-3 py-2">
                    <p className="px-3 text-xs font-medium text-gray-500 uppercase">General</p>
                    <div className="mt-2 space-y-1">
                        <Button variant="ghost" className="w-full justify-start bg-gray-100 text-gray-900">
                            <Clock className="mr-2 h-4 w-4" />
                            Dashboard
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-gray-700">
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Analytics
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-gray-700">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Transaction
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-gray-700">
                            <Users className="mr-2 h-4 w-4" />
                            Customers
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-gray-700">
                            <FileText className="mr-2 h-4 w-4" />
                            Reports
                        </Button>
                    </div>
                </div>

                <div className="px-3 py-2">
                    <p className="px-3 text-xs font-medium text-gray-500 uppercase">Account</p>
                    <div className="mt-2 space-y-1">
                        <Button variant="ghost" className="w-full justify-start text-gray-700">
                            <Bell className="mr-2 h-4 w-4" />
                            Notification
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-gray-700">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-gray-700">
                            <Lock className="mr-2 h-4 w-4" />
                            Security
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-gray-700">
                            <Puzzle className="mr-2 h-4 w-4" />
                            Integrations
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-gray-700">
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18 6L12 12M12 12L6 18M12 12L6 6M12 12L18 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Support
                        </Button>
                    </div>
                </div>

                <div className="absolute bottom-0 w-64 p-4 border-t">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                            <img src="/placeholder-user.jpg" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div className="ml-2">
                            <p className="text-sm font-medium">Bayu Sasmita</p>
                            <p className="text-xs text-gray-500">bayuhomet@xmail.com</p>
                        </div>
                        <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div>
    )
}

export default AdminLayout