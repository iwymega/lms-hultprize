import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SidebarProps {
    activeId: string;
    onSelect: (id: string) => void;
}

// Definisikan tipe untuk item navigasi individual dan item kategori
type NavigationItem = {
    id: string;
    title: string;
    children?: NavigationItem[]; // Anak bisa memiliki struktur yang sama
};

type SidebarCategory = {
    categoryId: string; // Bisa juga id unik atau gabungan judul
    categoryTitle?: string; // Judul kategori, opsional jika hanya ingin pemisah
    items: NavigationItem[];
};

// Struktur data sidebar baru dengan kategori
const sidebarStructure: SidebarCategory[] = [
    {
        categoryId: "getting-started",
        categoryTitle: "Panduan Dasar",
        items: [
            { id: "overview", title: "Overview Dokumentasi" }, // Ganti ID sesuai kebutuhan
            { id: "folder-structure", title: "Struktur Folder" },
        ],
    },
    {
        categoryId: "components",
        categoryTitle: "Komponen",
        items: [
            // { id: "overview-components", title: "Overview Komponen" }, // Bisa jadi bagian dari "Overview Dokumentasi" atau di sini
            {
                id: "form-components", // ID untuk item induk dropdown form
                title: "Form",
                children: [
                    { id: "text-input", title: "Text Input" },
                    { id: "checkbox", title: "Checkbox" },
                    { id: "currency-input", title: "Currency Input" },
                    { id: "image-upload-dropzone", title: "Image Upload with Dropzone" },
                    { id: "image-upload-preview", title: "Image Upload with Preview" },
                    { id: "radio-item-list", title: "Radio Item List" },
                    { id: "searchable-select", title: "Searchable Select" },
                    { id: "digital-signature", title: "Digital Signature" }
                ],
            },
            { id: "table", title: "Table" }, // ID unik
            { id: "pagination", title: "Pagination" }, // ID unik
            { id: "loading", title: "Loading" }, // ID unik
        ],
    },
    // Anda bisa menambahkan kategori lain di sini
    // {
    //     categoryId: "utilities",
    //     categoryTitle: "Utilitas",
    //     items: [
    //         { id: "helper-functions", title: "Helper Functions" },
    //     ]
    // }
];

export function Sidebar({ activeId, onSelect }: SidebarProps) {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleToggle = (id: string) => {
        setOpenDropdown((prev) => (prev === id ? null : id));
    };

    // Fungsi untuk mengecek apakah item induk atau salah satu anaknya aktif
    const isParentOrChildActive = (parentId: string, children?: NavigationItem[]): boolean => {
        if (activeId === parentId) return true;
        if (children) {
            return children.some(child => activeId === child.id || isParentOrChildActive(child.id, child.children));
        }
        return false;
    };


    return (
        <aside className="w-64 border-r p-4 bg-background text-foreground">
            <h2 className="text-lg font-semibold mb-4 px-2">Dokumentasi</h2>
            <ScrollArea className="h-[calc(100vh-7rem)] pr-2"> {/* Sesuaikan tinggi jika perlu, tambahkan pr-2 untuk scrollbar */}
                <nav className="space-y-1">
                    {sidebarStructure.map((category, categoryIndex) => (
                        <div key={category.categoryId} className={categoryIndex > 0 ? "mt-4 pt-4 border-t border-border" : ""}>
                            {category.categoryTitle && (
                                <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider px-3 py-1 mb-1">
                                    {category.categoryTitle}
                                </h3>
                            )}
                            {category.items.map((item) =>
                                item.children ? (
                                    <div key={item.id}>
                                        <Button
                                            variant={isParentOrChildActive(item.id, item.children) ? "secondary" : "ghost"}
                                            size="sm"
                                            className="w-full justify-between px-3"
                                            onClick={() => handleToggle(item.id)}
                                            aria-expanded={openDropdown === item.id}
                                            aria-controls={`dropdown-${item.id}`}
                                        >
                                            <span className="truncate">{item.title}</span>
                                            {openDropdown === item.id ? (
                                                <ChevronDown className="h-4 w-4 flex-shrink-0" />
                                            ) : (
                                                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                                            )}
                                        </Button>
                                        {openDropdown === item.id && (
                                            <div id={`dropdown-${item.id}`} className="pl-5 mt-1 space-y-1 border-l-2 border-muted-foreground/20 ml-3">
                                                {item.children.map((child) => (
                                                    <Button
                                                        key={child.id}
                                                        variant={activeId === child.id ? "secondary" : "ghost"}
                                                        size="sm"
                                                        className="w-full justify-start px-3 text-sm"
                                                        onClick={() => onSelect(child.id)}
                                                    >
                                                        <span className="truncate">{child.title}</span>
                                                    </Button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Button
                                        key={item.id}
                                        variant={activeId === item.id ? "secondary" : "ghost"}
                                        size="sm"
                                        className="w-full justify-start px-3"
                                        onClick={() => onSelect(item.id)}
                                    >
                                        <span className="truncate">{item.title}</span>
                                    </Button>
                                )
                            )}
                        </div>
                    ))}
                </nav>
            </ScrollArea>
        </aside>
    );
}
