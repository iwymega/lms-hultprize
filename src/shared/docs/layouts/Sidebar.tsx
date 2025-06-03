import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SidebarProps {
    activeId: string;
    onSelect: (id: string) => void;
}

const items = [
    { id: "overview", title: "Overview" },
    {
        id: "form", title: "Form", children: [
            { id: "text-input", title: "Text Input" },
            { id: "checkbox", title: "Checkbox" },
        ]
    },
    { id: "install", title: "Install" },
    {
        id: "button",
        title: "Button",
        children: [
            { id: "button-variants", title: "Variants" },
            { id: "button-icon", title: "With Icon" },
        ],
    },
    { id: "layout", title: "Layout" },
];

export function Sidebar({ activeId, onSelect }: SidebarProps) {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleToggle = (id: string) => {
        setOpenDropdown((prev) => (prev === id ? null : id));
    };

    return (
        <aside className="w-64 border-r p-4">
            <h2 className="text-lg font-semibold mb-4">Docs</h2>
            <ScrollArea className="h-[calc(100vh-80px)]">
                <nav className="space-y-1">
                    {items.map((item) =>
                        item.children ? (
                            <div key={item.id}>
                                <Button
                                    variant={activeId.startsWith(item.id) ? "default" : "ghost"}
                                    size="sm"
                                    className="w-full justify-between"
                                    onClick={() => handleToggle(item.id)}
                                >
                                    <span className="justify-start">{item.title}</span>
                                    {openDropdown === item.id ? (
                                        <ChevronDown className="h-4 w-4" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4" />
                                    )}
                                </Button>
                                {openDropdown === item.id && (
                                    <div className="pl-4 mt-1 space-y-1">
                                        {item.children.map((child) => (
                                            <Button
                                                key={child.id}
                                                variant={activeId === child.id ? "default" : "ghost"}
                                                size="sm"
                                                className="w-full justify-start"
                                                onClick={() => onSelect(child.id)}
                                            >
                                                {child.title}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Button
                                key={item.id}
                                variant={activeId === item.id ? "default" : "ghost"}
                                size="sm"
                                className="w-full justify-start"
                                onClick={() => onSelect(item.id)}
                            >
                                {item.title}
                            </Button>
                        )
                    )}
                </nav>
            </ScrollArea>
        </aside>
    );
}
