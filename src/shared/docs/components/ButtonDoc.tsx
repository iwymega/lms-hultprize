// docs/components/ButtonDoc.tsx

export function ButtonDoc() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Penggunaan Button</h1>
            <p className="mb-4">
                Komponen <code>&lt;Button /&gt;</code> di base template ini berasal dari <code>shadcn/ui</code>, dan sudah dikustomisasi untuk kebutuhan umum.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Import</h2>
            <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto">
                <code>{`import { Button } from "@/components/ui/button";`}</code>
            </pre>

            <h2 className="text-xl font-semibold mt-6 mb-2">Contoh Penggunaan</h2>
            <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto">
                <code>{`<Button variant="default">Tombol Default</Button>
  <Button variant="outline">Tombol Outline</Button>
  <Button variant="ghost">Tombol Ghost</Button>
  <Button variant="destructive">Tombol Destructive</Button>`}</code>
            </pre>

            <p className="mt-4">Setiap variant punya styling berbeda yang bisa kamu sesuaikan di file komponen `button.tsx`.</p>
        </div>
    );
}
