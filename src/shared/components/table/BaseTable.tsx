import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Column<T> {
    title: string;
    key: keyof T | string;
    render?: (item: T, index: number) => React.ReactNode;
    className?: string;
}

interface BaseTableProps<T> {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    skeletonRows?: number;
    tableName?: string;
    renderHeader?: () => React.ReactNode;
}

export function BaseTable<T>({ columns, data, isLoading, skeletonRows = 5, tableName, renderHeader }: BaseTableProps<T>) {
    return (
        <>
            <div className="bg-white rounded-lg border">
                <div className="flex items-center justify-between p-6 border-b">
                    {renderHeader ? renderHeader() : <h2 className="text-lg font-medium">{tableName}</h2>}
                </div>
                <div className="overflow-x-auto">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow className="border-b">
                                {columns.map((col) => (
                                    <TableHead key={col.key as string} className={cn("px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", col.className)}>
                                        {col.title}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading
                                ? Array.from({ length: skeletonRows }).map((_, i) => (
                                    <TableRow key={i} className="border-b">
                                        {columns.map((col) => (
                                            <TableCell key={col.key as string} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <Skeleton className="h-4 w-full" />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                                : data.length === 0
                                    ? (
                                        <TableRow className="border-b">
                                            <TableCell colSpan={columns.length} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                                                Data Not Found
                                            </TableCell>
                                        </TableRow>
                                    )
                                    : data.map((item, index) => (
                                        <TableRow key={index} className="border-b">
                                            {columns.map((col) => (
                                                <TableCell key={col.key as string} className={cn("px-6 py-4 whitespace-nowrap text-sm text-gray-900", col.className)}>
                                                    {col.render ? col.render(item, index) : (item[col.key as keyof T] as React.ReactNode)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}