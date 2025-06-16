import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown, MoreHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cashflowData } from '@/features/dashboard/data/dashboard'

const CashflowChart: React.FC = () => {
    const { t } = useTranslation();
    const [timeframe, setTimeframe] = useState("Last 8 Months")

    const totalIncome = cashflowData.reduce((sum, item) => sum + item.income, 0) * 1000;
    const totalExpense = cashflowData.reduce((sum, item) => sum + item.expense, 0) * 1000;

    return (
        <div className="bg-white p-6 rounded-lg border h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">{t('dashboard.cashflow.title')}</h2>
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

            <div className="h-64 flex-grow">
                <div className="relative h-full w-full">
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
                        {['$100k', '$80k', '$60k', '$40k', '$20k', '$0k'].map(label => <div key={label}>{label}</div>)}
                    </div>

                    {/* Chart grid and bars */}
                    <div className="absolute left-8 right-0 top-0 h-full">
                        <div className="h-full w-full border-b border-l border-dashed border-gray-200">
                            <div className="grid grid-cols-8 h-full">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="border-r border-dashed border-gray-200 h-full"></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="absolute left-8 right-4 bottom-6 h-[calc(100%-24px)]">
                        <div className="grid grid-cols-8 h-full gap-4">
                            {cashflowData.map((data) => (
                                <div key={data.month} className="flex items-end justify-center gap-1">
                                    <div className="w-6 bg-gray-800" style={{ height: `${data.expense}%` }}></div>
                                    <div className="w-6 bg-indigo-500" style={{ height: `${data.income}%` }}></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* X-axis labels */}
                    <div className="absolute left-8 right-4 bottom-0 h-6">
                        <div className="grid grid-cols-8 h-full">
                            {cashflowData.map((data) => (
                                <div key={data.month} className="flex items-center justify-center text-xs text-gray-500">{data.month}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-8 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="text-sm">{t('dashboard.cashflow.income')}: ${totalIncome.toLocaleString('en-US')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                    <span className="text-sm">{t('dashboard.cashflow.expense')}: ${totalExpense.toLocaleString('en-US')}</span>
                </div>
            </div>
        </div>
    )
}

export default CashflowChart