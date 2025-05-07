import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ArrowRight, ChevronDown, MoreHorizontal } from 'lucide-react'
import React, { useState } from 'react'

const IncomeBreakdown: React.FC = () => {
    const [month, setMonth] = useState("December")
    return (
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
    )
}

export default IncomeBreakdown