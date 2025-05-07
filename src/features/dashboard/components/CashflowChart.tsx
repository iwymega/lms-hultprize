import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown, MoreHorizontal } from 'lucide-react'
import React, { useState } from 'react'

const CashflowChart: React.FC = () => {
    const [timeframe, setTimeframe] = useState("Last 8 Months")
    return (
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
    )
}

export default CashflowChart