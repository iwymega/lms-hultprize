// docs/layout/DocsLayout.tsx
import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";

interface DocsLayoutProps {
    children: (activeId: string) => ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
    const [activeId, setActiveId] = useState("overview");

    return (
        <div className="flex h-screen">
            <Sidebar activeId={activeId} onSelect={setActiveId} />
            <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
                {children(activeId)}
            </main>
        </div>
    );
}
