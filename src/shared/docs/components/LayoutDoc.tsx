// docs/components/LayoutDoc.tsx

export function LayoutDoc() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Menggunakan Layout</h1>
            <p className="mb-4">
                Base template ini menyediakan layout standar bernama <code>&lt;AppLayout /&gt;</code> yang bisa digunakan untuk membungkus halaman dengan header dan sidebar bawaan.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Struktur Dasar</h2>
            <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto">
                <code>{`import { AppLayout } from "@/components/layout/app-layout";
  
  export default function DashboardPage() {
    return (
      <AppLayout>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p>Selamat datang di dashboard!</p>
      </AppLayout>
    );
  }`}</code>
            </pre>

            <h2 className="text-xl font-semibold mt-6 mb-2">Slot & Children</h2>
            <p>
                Layout ini menerima prop <code>children</code> yang akan dirender di bagian utama halaman, di bawah header dan di samping sidebar.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Customisasi</h2>
            <p>
                Kamu bisa mengedit layout di <code>@/components/layout/app-layout.tsx</code> untuk menyesuaikan struktur dan navigasi sesuai kebutuhan project.
            </p>
        </div>
    );
}
