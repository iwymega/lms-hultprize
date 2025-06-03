// LoadersDoc.tsx
import React, { useState, useEffect } from 'react';
import FullPageLoader from '@/shared/components/loader/FullPageLoader'; // Sesuaikan path
import SectionLoader from '@/shared/components/loader/SectionLoader';   // Sesuaikan path
import { PreviewBlock } from './PreviewBlock'; // Asumsi komponen ini ada
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// --- CONTOH 1: FULL PAGE LOADER ---
function ExampleFullPageLoader() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => setIsLoading(false), 3000); // Matikan setelah 3 detik
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    const preview = (
        <div className="p-6 space-y-4 text-center">
            <Button onClick={() => setIsLoading(true)} disabled={isLoading}>
                Tampilkan Full Page Loader (3 detik)
            </Button>
            {isLoading && <FullPageLoader text="Memuat Aplikasi..." time={1200} />}
            <p className="text-sm text-gray-500 mt-2">
                Jika loader aktif, ia akan menutupi seluruh halaman ini.
            </p>
        </div>
    );

    const code = `
import React, { useState, useEffect } from 'react';
import FullPageLoader from '@/shared/components/loader/FullPageLoader'; // Sesuaikan path
import { Button } from '@/components/ui/button';

function AppLoadingDemo() {
    const [isAppLoading, setIsAppLoading] = useState(false);

    // Contoh: Aktifkan loader saat fetching data awal atau navigasi rute
    const handleSomeAction = () => {
        setIsAppLoading(true);
        // Simulasi proses panjang
        setTimeout(() => {
            setIsAppLoading(false);
        }, 3000);
    };

    return (
        <div>
            <Button onClick={handleSomeAction} disabled={isAppLoading}>
                Mulai Proses Panjang
            </Button>
            {isAppLoading && <FullPageLoader text="Sedang Memproses..." time={1000} />}
            {/* Konten aplikasi lainnya */}
        </div>
    );
}
export default AppLoadingDemo;
`;
    return { preview, code };
}

// --- CONTOH 2: SECTION LOADER ---
function ExampleSectionLoader() {
    const [isSectionLoading, setIsSectionLoading] = useState(true);
    const [content, setContent] = useState<string | null>(null);

    useEffect(() => {
        setIsSectionLoading(true);
        setContent(null);
        const timer = setTimeout(() => {
            setContent("Data bagian ini telah berhasil dimuat!");
            setIsSectionLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);


    const preview = (
        <div className="p-6 space-y-4">
            <Button onClick={() => {
                setIsSectionLoading(true);
                setContent(null);
                setTimeout(() => {
                    setContent(Math.random() > 0.5 ? "Konten berhasil diperbarui!" : "Data baru sudah siap.");
                    setIsSectionLoading(false);
                }, 2000);
            }}>
                Muat Ulang Bagian Ini
            </Button>
            <Card className="mt-4">
                <CardContent className="pt-6"> {/* pt-6 agar ada padding atas di CardContent */}
                    {isSectionLoading ? (
                        <SectionLoader text="Memuat Data Bagian..." time={800} className="bg-gray-50 rounded-md" />
                    ) : (
                        <p className="text-green-600 font-semibold">{content}</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );

    const code = `
import React, { useState, useEffect } from 'react';
import SectionLoader from '@/shared/components/loader/SectionLoader'; // Sesuaikan path
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'; // Asumsi

function DataSection() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<string | null>(null);

    const fetchDataForSection = () => {
        setIsLoading(true);
        setData(null);
        // Simulasi fetch data untuk bagian ini
        setTimeout(() => {
            setData("Ini adalah data yang baru dimuat untuk bagian ini.");
            setIsLoading(false);
        }, 2000);
    };

    useEffect(() => {
        fetchDataForSection();
    }, []);

    return (
        <Card>
            <CardContent className="pt-6">
                 <Button onClick={fetchDataForSection} className="mb-4">Refresh Data Bagian</Button>
                {isLoading ? (
                    <SectionLoader text="Tunggu Sebentar..." className="bg-slate-100" />
                ) : (
                    <div>
                        <h3>Data Berhasil Dimuat:</h3>
                        <p>{data}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
export default DataSection;
`;
    return { preview, code };
}


// --- Komponen Utama Dokumentasi ---
export function LoadersDoc() {
    const { preview: fullPagePreview, code: fullPageCode } = ExampleFullPageLoader();
    const { preview: sectionPreview, code: sectionCode } = ExampleSectionLoader();

    const fullPageLoaderProps = [
        { name: 'text', type: 'string', defaultVal: '"Loading..."', description: 'Teks yang ditampilkan dan dianimasikan.' },
        { name: 'time', type: 'number', defaultVal: '1000', description: 'Durasi animasi per siklus (ms) untuk setiap huruf.' },
    ];

    const sectionLoaderProps = [
        { name: 'text', type: 'string', defaultVal: '"Loading..."', description: 'Teks yang ditampilkan dan dianimasikan.' },
        { name: 'time', type: 'number', defaultVal: '1000', description: 'Durasi animasi per siklus (ms) untuk setiap huruf.' },
        { name: 'className', type: 'string', defaultVal: '""', description: 'Kelas CSS tambahan untuk elemen `<section>` pembungkus.' },
    ];

    return (
        <div className="space-y-8 p-4 md:p-6 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Panduan Komponen Loader</h1>
                <p className="text-lg text-gray-600">
                    Dokumentasi ini mencakup dua jenis komponen loader: <code>FullPageLoader</code> untuk loading seluruh halaman,
                    dan <code>SectionLoader</code> untuk loading pada bagian spesifik. Keduanya menggunakan animasi teks "melambung".
                </p>
            </header>

            {/* FullPageLoader Section */}
            <section id="full-page-loader" className="scroll-mt-20">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3 border-b pb-2">FullPageLoader</h2>
                <p className="mb-4 text-gray-600">
                    <code>FullPageLoader</code> dirancang untuk menampilkan indikator loading yang menutupi seluruh viewport.
                    Ideal digunakan saat transisi halaman, submit form global, atau memuat data awal aplikasi.
                </p>
                <PreviewBlock
                    title="Contoh FullPageLoader"
                    description="Klik tombol untuk menampilkan loader yang aktif selama 3 detik."
                    preview={fullPagePreview}
                    code={fullPageCode}
                />
                <div className="mt-6 bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">Props FullPageLoader</h3>
                    <PropsTable data={fullPageLoaderProps} />
                </div>
            </section>

            {/* SectionLoader Section */}
            <section id="section-loader" className="scroll-mt-20 mt-12">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3 border-b pb-2">SectionLoader</h2>
                <p className="mb-4 text-gray-600">
                    <code>SectionLoader</code> digunakan untuk menampilkan indikator loading di dalam kontainer atau bagian tertentu
                    dari halaman. Cocok untuk memuat data pada komponen, panel, atau area spesifik tanpa memblokir seluruh UI.
                </p>
                <PreviewBlock
                    title="Contoh SectionLoader"
                    description="Loader akan tampil di dalam card di bawah ini saat data sedang dimuat atau dimuat ulang."
                    preview={sectionPreview}
                    code={sectionCode}
                />
                <div className="mt-6 bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">Props SectionLoader</h3>
                    <PropsTable data={sectionLoaderProps} />
                </div>
            </section>

            {/* Perbandingan Section */}
            <section id="perbandingan" className="scroll-mt-20 mt-12 bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Perbandingan: FullPageLoader vs. SectionLoader</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fitur</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FullPageLoader</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SectionLoader</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">Cakupan</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Seluruh halaman (overlay)</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Bagian/kontainer spesifik</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">Elemen Tambahan</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Menampilkan gambar GIF loader</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Hanya teks animasi</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">Styling Utama</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Inline styles untuk overlay</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Tailwind CSS classes + prop <code>className</code></td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">Aksesibilitas (ARIA)</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Dasar (hanya alt text pada gambar)</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Lebih baik (<code>role="alert"</code>, <code>aria-live="polite"</code>)</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">Dependensi <code>useEffect</code></td>
                                <td className="px-6 py-4 text-sm text-gray-500"><code>[]</code> (setup animasi sekali)</td>
                                <td className="px-6 py-4 text-sm text-gray-500"><code>[time, text]</code> (re-setup jika prop berubah)</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">Kasus Penggunaan Tipikal</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Loading data awal aplikasi, transisi rute, submit form global.</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Memuat data di dalam card, panel, modal, atau bagian spesifik halaman.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow mt-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Poin Penting & Cara Kerja Animasi</h2>
                <div className="space-y-3 text-gray-600">
                    <p><strong>Animasi Teks Melambung:</strong> Kedua komponen menggunakan Web Animations API untuk menganimasikan setiap huruf dari teks yang diberikan. Setiap huruf bergerak ke atas dan kembali ke bawah dengan efek *overshoot*, menciptakan ilusi teks yang "melambung" atau "menari".</p>
                    <p><strong>Delay Berjenjang:</strong> Setiap huruf memiliki sedikit penundaan (delay) animasi berdasarkan posisinya dalam teks. Ini menghasilkan efek gelombang yang menyebar melalui teks.</p>
                    <p><strong>Pembersihan Animasi:</strong> Fungsi cleanup dalam <code>useEffect</code> memastikan semua animasi Web Animations API dibatalkan (<code>anim.cancel()</code>) saat komponen di-unmount. Ini penting untuk mencegah kebocoran memori dan perilaku animasi yang tidak diinginkan jika komponen sering mount/unmount.</p>
                    <p><strong>Kustomisasi:</strong> Anda dapat mengubah teks loading dan durasi dasar animasi melalui props <code>text</code> dan <code>time</code>.</p>
                    <p><strong>Tips untuk <code>FullPageLoader</code>:</strong> Karena <code>FullPageLoader</code> menggunakan array dependensi kosong `[]` di `useEffect`-nya, perubahan pada `text` atau `time` setelah mount pertama tidak akan memicu setup ulang animasi. Jika Anda memerlukan perilaku dinamis ini, pertimbangkan untuk menambahkan `text` dan `time` ke array dependensi tersebut (mirip dengan `SectionLoader`).</p>
                </div>
            </section>
        </div>
    );
}

// Komponen untuk menampilkan tabel props
interface PropDetail {
    name: string;
    type: string;
    defaultVal: string;
    description: string;
}

const PropsTable: React.FC<{ data: PropDetail[] }> = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Prop</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((prop) => (
                        <tr key={prop.name}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><code>{prop.name}</code></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><code>{prop.type}</code></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prop.defaultVal}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{prop.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};