// file: src/components/ui/breadcrumb.tsx

import React from "react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import {
    Breadcrumb as ShadBreadcrumb,
    BreadcrumbItem as ShadBreadcrumbItem,
    BreadcrumbLink as ShadBreadcrumbLink,
    BreadcrumbList as ShadBreadcrumbList,
    BreadcrumbSeparator as ShadBreadcrumbSeparator,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";

// --- BAGIAN 1: DEFINISI KOMPONEN DASAR (BUILDING BLOCKS) ---
// Ini adalah bagian-bagian "Lego" yang bisa kita susun.

const BreadcrumbRoot = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex flex-col gap-2 md:flex-row md:items-center md:justify-between",
            className
        )}
        {...props}
    />
));
BreadcrumbRoot.displayName = "BreadcrumbRoot";

const BreadcrumbTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h2
        ref={ref}
        className={cn("text-lg font-semibold text-gray-800 dark:text-gray-200", className)}
        {...props}
    />
));
BreadcrumbTitle.displayName = "BreadcrumbTitle";

// --- BAGIAN 2: INTERFACE UNTUK PENGGUNAAN DEFAULT ---

interface BreadcrumbPath {
    label: string;
    path: string;
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    items?: BreadcrumbPath[];
    // 'children' secara implisit ada di React.FC atau saat menggunakan React.PropsWithChildren
}

// --- BAGIAN 3: KOMPONEN UTAMA YANG "PINTAR" ---

const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>(
    ({ className, title, items, children, ...props }, ref) => {
        // Cek apakah pengguna memberikan children secara eksplisit.
        // Jika ya, kita masuk ke mode kustom.
        const isCustom = React.Children.count(children) > 0;

        if (isCustom) {
            return (
                <BreadcrumbRoot ref={ref} className={className} {...props}>
                    {children}
                </BreadcrumbRoot>
            );
        }

        // Jika tidak ada children, kita masuk ke mode default menggunakan 'title' dan 'items'.
        return (
            <BreadcrumbRoot ref={ref} className={className} {...props}>
                {title && <BreadcrumbTitle>{title}</BreadcrumbTitle>}

                {items && items.length > 0 && (
                    <ShadBreadcrumb>
                        <BreadcrumbList>
                            {items.map((item, index) => {
                                const isLast = index === items.length - 1;
                                return (
                                    <React.Fragment key={item.path}>
                                        <ShadBreadcrumbItem>
                                            {isLast ? (
                                                <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                            ) : (
                                                <ShadBreadcrumbLink asChild>
                                                    <Link to={item.path}>{item.label}</Link>
                                                </ShadBreadcrumbLink>
                                            )}
                                        </ShadBreadcrumbItem>
                                        {!isLast && <ShadBreadcrumbSeparator />}
                                    </React.Fragment>
                                );
                            })}
                        </BreadcrumbList>
                    </ShadBreadcrumb>
                )}
            </BreadcrumbRoot>
        );
    }
);
Breadcrumb.displayName = "Breadcrumb";

// --- BAGIAN 4: MENYATUKAN SEMUANYA ---
// Kita "menempelkan" komponen dasar ke komponen utama sebagai properti.
// Ini memungkinkan kita menggunakan API seperti: <Breadcrumb.Title>

export default Object.assign(Breadcrumb, {
    Title: BreadcrumbTitle,
    Nav: ShadBreadcrumb,
    List: ShadBreadcrumbList,
    Item: ShadBreadcrumbItem,
    Link: ShadBreadcrumbLink,
    Separator: ShadBreadcrumbSeparator,
    Page: BreadcrumbPage,
});