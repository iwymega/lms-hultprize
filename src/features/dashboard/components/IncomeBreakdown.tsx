import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ArrowRight, ChevronDown, MoreHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { incomeBreakdownData } from '@/features/dashboard/data/dashboard'
import { cn } from '@/lib/utils'

// Helper untuk membuat pie chart dari border
const PieSlice: React.FC<{ percentage: number; color: string; size: number; rotation: number }> = ({ percentage, color, size, rotation }) => {
    const circumference = 2 * Math.PI * (size / 2 - 2); // -2 untuk ketebalan border
    const dasharray = `${(percentage / 100) * circumference} ${circumference}`;
    return (
        <svg className="absolute w-full h-full" style={{ transform: `rotate(${rotation}deg)` }}>
            <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} fill="transparent" strokeWidth="4"
                className={cn('transition-all duration-500', color)}
                strokeDasharray={dasharray}
                strokeDashoffset="0"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
        </svg>
    )
}

const IncomeBreakdown: React.FC = () => {
    const { t } = useTranslation()
    const [month, setMonth] = useState("December")

    let cumulativeRotation = 0;

    return (
        <div className="bg-white p-6 rounded-lg border h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">{t('dashboard.income_breakdown.title')}</h2>
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

            <div className="flex justify-center items-center my-4 h-32">
                <div className="relative w-32 h-32">
                    <div className="w-full h-full rounded-full bg-gray-100"></div>
                    {incomeBreakdownData.map(item => {
                        const rotation = cumulativeRotation;
                        cumulativeRotation += (item.percentage / 100) * 360;
                        return <PieSlice key={item.category} percentage={item.percentage} color={item.borderColor} size={128} rotation={rotation} />
                    })}
                </div>
            </div>

            <div className="space-y-4 flex-grow">
                {incomeBreakdownData.map(item => (
                    <div key={item.category} className="flex items-center">
                        <div className={cn("w-3 h-3 rounded-full mr-3", item.color)}></div>
                        <span className="text-sm font-medium">{item.percentage}% {item.category}</span>
                        <span className="ml-auto text-sm font-medium">${item.amount.toLocaleString('en-US')}</span>
                        <Button variant="ghost" size="sm" className="ml-2 h-6 px-2 text-gray-500 hover:text-gray-800">
                            <span>{t('common.see-detail')}</span>
                            <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default IncomeBreakdown