import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ArrowRight, ChevronDown, Clock, CreditCard, Filter, MoreHorizontal, PieChart } from 'lucide-react'
import React from 'react'

const LatestTransactions: React.FC = () => {
    return (
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
    )
}

export default LatestTransactions