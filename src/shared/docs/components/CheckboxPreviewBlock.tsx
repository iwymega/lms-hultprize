import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardCopy } from "lucide-react";
import { useState } from "react";

type CheckboxPreviewBlockProps = {
    title: string;
    description?: React.ReactNode;
    preview: React.ReactNode;
    code: string;
};

export function CheckboxPreviewBlock({ title, description, preview, code }: CheckboxPreviewBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    return (
        <div className="mb-10 border rounded-xl p-4 bg-muted/20">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
                {description}
            </p>

            <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="mt-4">
                    <div className="p-4 rounded bg-white border">{preview}</div>
                </TabsContent>

                <TabsContent value="code" className="mt-4 relative">
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 text-xs bg-muted px-2 py-1 rounded hover:bg-muted/70"
                    >
                        {copied ? "Copied!" : <ClipboardCopy size={14} />}
                    </button>
                    <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto text-sm">
                        <code>{code}</code>
                    </pre>
                </TabsContent>
            </Tabs>
        </div>
    );
}
