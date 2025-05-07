import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatter } from '@/lib/utils';
import { ChevronDown, MoreHorizontal } from 'lucide-react'
import React, { useMemo, useState } from 'react'

type SalesData = { total: number };

function generateYAxisLabels(
    data1: SalesData[],
    data2: SalesData[],
    steps = 5,
    marginRatio = 0.1
): { labels: string[]; max: number } {
    const combined = [...data1, ...data2];

    const rawMax = Math.max(...combined.map((d) => d.total));
    const maxWithMargin = rawMax + rawMax * marginRatio;
    const roundedMax = Math.ceil(maxWithMargin / 1_000_000) * 1_000_000;

    const stepValue = Math.ceil(roundedMax / steps);
    const labels: string[] = [];

    for (let i = 0; i <= steps; i++) {
        const value = stepValue * i;
        labels.push(`Rp${(value / 1_000_000).toFixed(0)}jt`);
    }

    return {
        labels: labels.reverse(),
        max: roundedMax,
    };
}

export const salesDataThisMonth = [
    { date: '2025-04-01', total: 3000000 },
    { date: '2025-04-02', total: 4500000 },
    { date: '2025-04-03', total: 5000000 },
    { date: '2025-04-04', total: 4000000 },
    { date: '2025-04-05', total: 6200000 },
    { date: '2025-04-06', total: 4800000 },
    { date: '2025-04-07', total: 7000000 },
    { date: '2025-04-08', total: 3500000 },
    { date: '2025-04-09', total: 6700000 },
    { date: '2025-04-10', total: 5100000 },
    { date: '2025-04-11', total: 5800000 },
    { date: '2025-04-12', total: 4200000 },
    { date: '2025-04-13', total: 6000000 },
    { date: '2025-04-14', total: 4500000 },
    { date: '2025-04-15', total: 7500000 },
    { date: '2025-04-16', total: 5200000 },
    { date: '2025-04-17', total: 3900000 },
    { date: '2025-04-18', total: 6300000 },
    { date: '2025-04-19', total: 4800000 },
    { date: '2025-04-20', total: 5600000 },
    { date: '2025-04-21', total: 7100000 },
    { date: '2025-04-22', total: 5300000 },
    { date: '2025-04-23', total: 4700000 },
    { date: '2025-04-24', total: 6800000 },
    { date: '2025-04-25', total: 5900000 },
    { date: '2025-04-26', total: 6100000 },
    { date: '2025-04-27', total: 4600000 },
    { date: '2025-04-28', total: 5800000 },
    { date: '2025-04-29', total: 5400000 },
    { date: '2025-04-30', total: 6200000 },
];

export const salesDataLastMonth = [
    { date: '2025-03-01', total: 2500000 },
    { date: '2025-03-02', total: 3000000 },
    { date: '2025-03-03', total: 4200000 },
    { date: '2025-03-04', total: 3800000 },
    { date: '2025-03-05', total: 5000000 },
    { date: '2025-03-06', total: 4000000 },
    { date: '2025-03-07', total: 6000000 },
    { date: '2025-03-08', total: 3200000 },
    { date: '2025-03-09', total: 5800000 },
    { date: '2025-03-10', total: 4500000 },
    { date: '2025-03-11', total: 5000000 },
    { date: '2025-03-12', total: 3800000 },
    { date: '2025-03-13', total: 5200000 },
    { date: '2025-03-14', total: 4100000 },
    { date: '2025-03-15', total: 6800000 },
    { date: '2025-03-16', total: 4800000 },
    { date: '2025-03-17', total: 3600000 },
    { date: '2025-03-18', total: 5700000 },
    { date: '2025-03-19', total: 4400000 },
    { date: '2025-03-20', total: 5300000 },
    { date: '2025-03-21', total: 6600000 },
    { date: '2025-03-22', total: 4800000 },
    { date: '2025-03-23', total: 4300000 },
    { date: '2025-03-24', total: 6000000 },
    { date: '2025-03-25', total: 5300000 },
    { date: '2025-03-26', total: 5600000 },
    { date: '2025-03-27', total: 4200000 },
    { date: '2025-03-28', total: 5000000 },
    { date: '2025-03-29', total: 4800000 },
    { date: '2025-03-30', total: 5500000 },
];

const SalesChart: React.FC = () => {
    const [timeframe, setTimeframe] = useState("This Months")

    const { labels: yLabels, max } = generateYAxisLabels(salesDataThisMonth, salesDataLastMonth, 5);

    const totalThisMonth = useMemo(() => {
        return salesDataThisMonth.reduce((sum, item) => sum + item.total, 0);
    }, [salesDataThisMonth]);

    const totalLastMonth = useMemo(() => {
        return salesDataLastMonth.reduce((sum, item) => sum + item.total, 0);
    }, [salesDataLastMonth]);

    return (
        <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Sales</h2>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                                {timeframe}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setTimeframe("This Months")}>This Months</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTimeframe("This Weeks")}>This Weeks</DropdownMenuItem>
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
                        {yLabels.map((label, i) => (
                            <div key={i}>{label}</div>
                        ))}
                    </div>

                    {/* Chart grid */}
                    <div className="absolute left-12 right-0 top-0 h-full">
                        <div className="h-full w-full border-b border-l border-dashed border-gray-200">
                            <div className="grid h-full" style={{ gridTemplateColumns: 'repeat(30, minmax(0, 1fr))' }}>
                                {Array.from({ length: 30 }).map((_, i) => (
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
                    <div className="absolute left-12 right-4 bottom-6 h-[calc(100%-24px)]">
                        <div className="grid h-full gap-4" style={{ gridTemplateColumns: 'repeat(30, minmax(0, 1fr))' }}>
                            <TooltipProvider>
                                {salesDataThisMonth.map((curr, i) => {
                                    const last = salesDataLastMonth[i];
                                    const currHeight = (curr.total / max) * 100;
                                    const lastHeight = (last.total / max) * 100;

                                    return (
                                        <div key={i} className="flex items-end justify-center gap-1">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div
                                                        className="w-2 bg-gray-800 cursor-pointer"
                                                        style={{ height: `${lastHeight}%` }}
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent side="top">
                                                    <p>Last Month: Rp{(last.total / 1_000_000).toFixed(1)}jt</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div
                                                        className="w-2 bg-indigo-500 cursor-pointer"
                                                        style={{ height: `${currHeight}%` }}
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent side="top">
                                                    <p>This Month: Rp{(curr.total / 1_000_000).toFixed(1)}jt</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    );
                                })}
                            </TooltipProvider>
                        </div>
                    </div>

                    {/* X-axis labels */}
                    <div className="absolute left-8 right-4 bottom-0 h-6">
                        <div className="grid h-full" style={{ gridTemplateColumns: 'repeat(30, minmax(0, 1fr))' }}>
                            {salesDataThisMonth.map((item) => (
                                <div
                                    key={item.date}
                                    className="flex items-center justify-center text-xs text-gray-500"
                                >
                                    {new Date(item.date).getDate()}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-8 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="text-sm">This Month : {formatter.format(totalThisMonth)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                    <span className="text-sm">Last Month : {formatter.format(totalLastMonth)}</span>
                </div>
            </div>
        </div>
    )
}

export default SalesChart