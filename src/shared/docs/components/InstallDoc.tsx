// docs/components/InstallDoc.tsx
export function InstallDoc() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Cara Install</h1>
            <p>1. Clone repository:</p>
            <pre className="bg-gray-900 text-white p-4 rounded-md">
                <code>git clone https://github.com/youruser/basetemplate.git</code>
            </pre>
            <p>2. Jalankan:</p>
            <pre className="bg-gray-900 text-white p-4 rounded-md">
                <code>npm install</code>
            </pre>
        </div>
    );
}
