// docs/layout/Sidebar.tsx
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
    activeId: string;
    onSelect: (id: string) => void;
}

const items = [
    { id: "overview", title: "Overview" },
    { id: "install", title: "Install" },
    { id: "button", title: "Button" },
    { id: "layout", title: "Layout" },
];

export function Sidebar({ activeId, onSelect }: SidebarProps) {
    return (
        <aside className="w-64 border-r p-4">
            <h2 className="text-lg font-semibold mb-4">Docs</h2>
            <ScrollArea className="h-[calc(100vh-80px)]">
                <nav className="space-y-2">
                    {items.map((item) => (
                        <Button
                            key={item.id}
                            variant={activeId === item.id ? "default" : "ghost"}
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => onSelect(item.id)}
                        >
                            {item.title}
                        </Button>
                    ))}
                </nav>
            </ScrollArea>
        </aside>
    );
}
