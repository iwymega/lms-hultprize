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
    className?: string;
    renderBody?: (data: T[]) => React.ReactNode;
}

export function BaseTable<T extends { id?: string | number }>({ columns, data, isLoading, skeletonRows = 5, tableName, renderHeader, className, renderBody, }: BaseTableProps<T>) {
    return (
        <>
            <div className={cn("bg-white rounded-lg border", className)}>
                {(renderHeader || tableName) && (
                    <div className="flex items-center justify-between p-6 border-b">
                        {renderHeader ? renderHeader() : <h2 className="text-lg font-medium">{tableName}</h2>}
                    </div>
                )}
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
                            {isLoading ? (
                                // Skeleton logic tetap sama
                                Array.from({ length: skeletonRows }).map((_, i) => (
                                    <TableRow key={`skeleton-${i}`}>
                                        {columns.map((_col, j) => (
                                            <TableCell key={`skeleton-cell-${j}`} className="px-6 py-4 whitespace-nowrap">
                                                <Skeleton className="h-4 w-full" />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : data.length === 0 ? (
                                // "Data Not Found" logic tetap sama
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                                        Data Not Found
                                    </TableCell>
                                </TableRow>
                            ) : // --- START: Perubahan Logika Rendering ---
                                // Jika renderBody ada, gunakan itu.
                                // Jika tidak, gunakan logika lama untuk kompatibilitas ke belakang.
                                renderBody ? (
                                    renderBody(data)
                                ) : (
                                    data.map((item, index) => (
                                        <TableRow key={item.id || index}>
                                            {columns.map((col, colIndex) => (
                                                <TableCell key={(col.key as string) || colIndex} className={cn("px-6 py-4 whitespace-nowrap text-sm text-gray-900", col.className)}>
                                                    {col.render ? col.render(item, index) : (item[col.key as keyof T] as React.ReactNode)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                    // --- END: Perubahan Logika Rendering ---
                                )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}