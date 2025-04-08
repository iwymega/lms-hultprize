"use client"

import { useState } from "react"
import {
    ArrowRight,
    ArrowUpRight,
    BarChart3,
    Bell,
    ChevronDown,
    Clock,
    CreditCard,
    DollarSign,
    ExternalLink,
    FileText,
    Filter,
    Lock,
    MoreHorizontal,
    PieChart,
    Puzzle,
    RefreshCw,
    Search,
    Settings,
    Share2,
    ShoppingBag,
    Users,
    Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Dashboard() {
    const [timeframe, setTimeframe] = useState("Last 8 Months")
    const [month, setMonth] = useState("December")

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
                <header className="flex items-center justify-between p-4 border-b bg-white">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Share2 className="h-4 w-4" />
                            Share
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Refresh Data
                        </Button>
                        <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                            Export
                        </Button>
                    </div>
                </header>

                <main className="p-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-4 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg border">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center">
                                        <Wallet className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="font-medium">Balance</span>
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <ExternalLink className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold">$321.010,18</span>
                                <div className="flex items-center text-green-600 text-sm">
                                    <ArrowUpRight className="h-3 w-3" />
                                    <span>25% vs last month</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg border">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center">
                                        <DollarSign className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="font-medium">Income</span>
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <ExternalLink className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold">$78.301,15</span>
                                <div className="flex items-center text-green-600 text-sm">
                                    <ArrowUpRight className="h-3 w-3" />
                                    <span>12% vs last month</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg border">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center">
                                        <ShoppingBag className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="font-medium">Expense</span>
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <ExternalLink className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold">$25.502,23</span>
                                <div className="flex items-center text-red-600 text-sm">
                                    <ArrowUpRight className="h-3 w-3" />
                                    <span>8% vs last month</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg border">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center">
                                        <FileText className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="font-medium">Bill</span>
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <ExternalLink className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold">$779,72</span>
                                <div className="flex items-center text-green-600 text-sm">
                                    <ArrowUpRight className="h-3 w-3" />
                                    <span>5% vs last month</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        {/* Cashflow Chart */}
                        <div className="bg-white p-6 rounded-lg border">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-medium">Cashflow</h2>
                                <div className="flex items-center gap-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm" className="gap-2">
                                                {timeframe}
                                                <ChevronDown className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => setTimeframe("Last 8 Months")}>Last 8 Months</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setTimeframe("Last 6 Months")}>Last 6 Months</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setTimeframe("Last 3 Months")}>Last 3 Months</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="h-64">
                                <CashflowChart />
                            </div>

                            <div className="flex items-center justify-center gap-8 mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                                    <span className="text-sm">Income : $75.871,57</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                                    <span className="text-sm">Expense : $23.130,08</span>
                                </div>
                            </div>
                        </div>

                        {/* Income Breakdown */}
                        <div className="bg-white p-6 rounded-lg border">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-medium">Incomes Breakdown</h2>
                                <div className="flex items-center gap-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm" className="gap-2">
                                                {month}
                                                <ChevronDown className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => setMonth("December")}>December</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setMonth("November")}>November</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setMonth("October")}>October</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-4 mb-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full border-4 border-indigo-500 border-r-transparent"></div>
                                    <span className="mt-2 text-sm">UI UX</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full border-4 border-blue-400 border-r-transparent border-t-transparent"></div>
                                    <span className="mt-2 text-sm">Branding</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full border-4 border-teal-500 border-r-transparent border-t-transparent border-l-transparent"></div>
                                    <span className="mt-2 text-sm">Illustration</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full border-4 border-orange-400 border-r-transparent border-t-transparent border-l-transparent border-b-transparent"></div>
                                    <span className="mt-2 text-sm">Web Dev</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                                    <span className="text-sm font-medium">52% UI UX</span>
                                    <span className="ml-auto text-sm font-medium">$39.419,76</span>
                                    <Button variant="ghost" size="sm" className="ml-2 h-6 px-2">
                                        <span className="text-sm text-gray-500">See Detail</span>
                                        <ArrowRight className="h-3 w-3 ml-1" />
                                    </Button>
                                </div>

                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                                    <span className="text-sm font-medium">20% Branding</span>
                                    <span className="ml-auto text-sm font-medium">$7.883,95</span>
                                    <Button variant="ghost" size="sm" className="ml-2 h-6 px-2">
                                        <span className="text-sm text-gray-500">See Detail</span>
                                        <ArrowRight className="h-3 w-3 ml-1" />
                                    </Button>
                                </div>

                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-teal-500 mr-2"></div>
                                    <span className="text-sm font-medium">15% Illustration</span>
                                    <span className="ml-auto text-sm font-medium">$5.912,96</span>
                                    <Button variant="ghost" size="sm" className="ml-2 h-6 px-2">
                                        <span className="text-sm text-gray-500">See Detail</span>
                                        <ArrowRight className="h-3 w-3 ml-1" />
                                    </Button>
                                </div>

                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-orange-400 mr-2"></div>
                                    <span className="text-sm font-medium">13% Web Dev</span>
                                    <span className="ml-auto text-sm font-medium">$5.129,76</span>
                                    <Button variant="ghost" size="sm" className="ml-2 h-6 px-2">
                                        <span className="text-sm text-gray-500">See Detail</span>
                                        <ArrowRight className="h-3 w-3 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="bg-white rounded-lg border">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-lg font-medium">Transaction History</h2>
                            <div className="flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <CreditCard className="h-4 w-4" />
                                            Transaction
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>All Transactions</DropdownMenuItem>
                                        <DropdownMenuItem>Income</DropdownMenuItem>
                                        <DropdownMenuItem>Expense</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <Clock className="h-4 w-4" />
                                            Timeframe
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                                        <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                                        <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <Filter className="h-4 w-4" />
                                            Status
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>All Status</DropdownMenuItem>
                                        <DropdownMenuItem>Completed</DropdownMenuItem>
                                        <DropdownMenuItem>Pending</DropdownMenuItem>
                                        <DropdownMenuItem>Canceled</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Transaction Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Time
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                                                    <CreditCard className="h-4 w-4 text-gray-600" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">Project Payment</div>
                                                    <div className="text-xs text-gray-500">INV_002024001</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Shin Tae Yong</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1 Jan 2024, 10.00</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$974,65</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-indigo-100 text-indigo-800">
                                                On Progress
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <Button variant="ghost" size="sm" className="h-6 px-2">
                                                <span className="text-sm text-gray-500">See Detail</span>
                                                <ArrowRight className="h-3 w-3 ml-1" />
                                            </Button>
                                        </td>
                                    </tr>

                                    <tr className="border-b">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                                                    <CreditCard className="h-4 w-4 text-gray-600" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">Salary Payment</div>
                                                    <div className="text-xs text-gray-500">INV_002024002</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Fridolina F Ferina</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1 Jan 2024, 12.30</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$617,28</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-yellow-100 text-yellow-800">
                                                Pending
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <Button variant="ghost" size="sm" className="h-6 px-2">
                                                <span className="text-sm text-gray-500">See Detail</span>
                                                <ArrowRight className="h-3 w-3 ml-1" />
                                            </Button>
                                        </td>
                                    </tr>

                                    <tr className="border-b">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                                                    <PieChart className="h-4 w-4 text-gray-600" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">Figma Subscribe</div>
                                                    <div className="text-xs text-gray-500">INV_002024003</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Figma</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">30 Dec 2023, 16.15</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$148,01</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-green-100 text-green-800">
                                                Completed
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <Button variant="ghost" size="sm" className="h-6 px-2">
                                                <span className="text-sm text-gray-500">See Detail</span>
                                                <ArrowRight className="h-3 w-3 ml-1" />
                                            </Button>
                                        </td>
                                    </tr>

                                    <tr className="border-b">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                                                    <CreditCard className="h-4 w-4 text-gray-600" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">Salary Payment</div>
                                                    <div className="text-xs text-gray-500">INV_002024004</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Daffa Toldo</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">27 Dec 2023, 21.45</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$422,35</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-green-100 text-green-800">
                                                Completed
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <Button variant="ghost" size="sm" className="h-6 px-2">
                                                <span className="text-sm text-gray-500">See Detail</span>
                                                <ArrowRight className="h-3 w-3 ml-1" />
                                            </Button>
                                        </td>
                                    </tr>

                                    <tr className="border-b">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                                                    <CreditCard className="h-4 w-4 text-gray-600" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">Project Payment</div>
                                                    <div className="text-xs text-gray-500">INV_002024005</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Carlo Ancelloti</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">25 Dec 2023, 23.25</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$812,21</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-red-100 text-red-800">
                                                Canceled
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <Button variant="ghost" size="sm" className="h-6 px-2">
                                                <span className="text-sm text-gray-500">See Detail</span>
                                                <ArrowRight className="h-3 w-3 ml-1" />
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

// Cashflow Chart Component
function CashflowChart() {
    return (
        <div className="relative h-full w-full">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
                <div>$100k</div>
                <div>$80k</div>
                <div>$60k</div>
                <div>$40k</div>
                <div>$20k</div>
                <div>$0k</div>
            </div>

            {/* Chart grid */}
            <div className="absolute left-8 right-0 top-0 h-full">
                <div className="h-full w-full border-b border-l border-dashed border-gray-200">
                    <div className="grid grid-cols-8 h-full">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="border-r border-dashed border-gray-200 h-full relative">
                                <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-gray-50"></div>
                                <div className="absolute bottom-1/5 left-0 right-0 h-1/5 bg-gray-50"></div>
                                <div className="absolute bottom-2/5 left-0 right-0 h-1/5 bg-gray-50"></div>
                                <div className="absolute bottom-3/5 left-0 right-0 h-1/5 bg-gray-50"></div>
                                <div className="absolute bottom-4/5 left-0 right-0 h-1/5 bg-gray-50"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chart bars */}
            <div className="absolute left-8 right-4 bottom-6 h-[calc(100%-24px)]">
                <div className="grid grid-cols-8 h-full gap-4">
                    {/* May */}
                    <div className="flex items-end justify-center gap-1">
                        <div className="w-6 bg-gray-800 h-[30%]"></div>
                        <div className="w-6 bg-indigo-500 h-[60%]"></div>
                    </div>

                    {/* Jun */}
                    <div className="flex items-end justify-center gap-1">
                        <div className="w-6 bg-gray-800 h-[25%]"></div>
                        <div className="w-6 bg-indigo-500 h-[50%]"></div>
                    </div>

                    {/* Jul */}
                    <div className="flex items-end justify-center gap-1">
                        <div className="w-6 bg-gray-800 h-[15%]"></div>
                        <div className="w-6 bg-indigo-500 h-[40%]"></div>
                    </div>

                    {/* Aug */}
                    <div className="flex items-end justify-center gap-1">
                        <div className="w-6 bg-gray-800 h-[45%]"></div>
                        <div className="w-6 bg-indigo-500 h-[25%]"></div>
                    </div>

                    {/* Sep */}
                    <div className="flex items-end justify-center gap-1">
                        <div className="w-6 bg-gray-800 h-[30%]"></div>
                        <div className="w-6 bg-indigo-500 h-[45%]"></div>
                    </div>

                    {/* Oct */}
                    <div className="flex items-end justify-center gap-1">
                        <div className="w-6 bg-gray-800 h-[20%]"></div>
                        <div className="w-6 bg-indigo-500 h-[65%]"></div>
                    </div>

                    {/* Nov */}
                    <div className="flex items-end justify-center gap-1">
                        <div className="w-6 bg-gray-800 h-[35%]"></div>
                        <div className="w-6 bg-indigo-500 h-[55%]"></div>
                    </div>

                    {/* Dec */}
                    <div className="flex items-end justify-center gap-1">
                        <div className="w-6 bg-gray-800 h-[25%]"></div>
                        <div className="w-6 bg-indigo-500 h-[60%]"></div>
                    </div>
                </div>
            </div>

            {/* X-axis labels */}
            <div className="absolute left-8 right-4 bottom-0 h-6">
                <div className="grid grid-cols-8 h-full">
                    <div className="flex items-center justify-center text-xs text-gray-500">May</div>
                    <div className="flex items-center justify-center text-xs text-gray-500">Jun</div>
                    <div className="flex items-center justify-center text-xs text-gray-500">Jul</div>
                    <div className="flex items-center justify-center text-xs text-gray-500">Aug</div>
                    <div className="flex items-center justify-center text-xs text-gray-500">Sep</div>
                    <div className="flex items-center justify-center text-xs text-gray-500">Oct</div>
                    <div className="flex items-center justify-center text-xs text-gray-500">Nov</div>
                    <div className="flex items-center justify-center text-xs text-gray-500">Dec</div>
                </div>
            </div>
        </div>
    )
}