// PaginationWithShowDoc.tsx
import { useState } from 'react';
import PaginationWithShow from '@/shared/components/pagination/PaginationWithShow'; // Sesuaikan path
import { PreviewBlock } from './PreviewBlock'; // Asumsi komponen ini ada
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // Untuk demo list

// --- Data Contoh untuk Demo ---
const allItems = Array.from({ length: 125 }, (_, i) => ({
    id: i + 1,
    name: `Item ${(i + 1).toString().padStart(3, '0')}`,
    category: ['Electronics', 'Books', 'Clothing', 'Home Goods', 'Toys'][i % 5],
    price: (Math.random() * 100000 + 50000).toFixed(0)
}));


// --- CONTOH 1: PENGGUNAAN DASAR ---
function ExamplePaginationBasic() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="p-6 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Daftar Item (Total: {allItems.length})</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {currentItems.map(item => (
                        <div key={item.id} className="p-3 border rounded-md shadow-sm">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.category}</p>
                            <p className="text-sm">Rp{parseInt(item.price).toLocaleString('id-ID')}</p>
                        </div>
                    ))}
                    {currentItems.length === 0 && <p>Tidak ada item untuk ditampilkan.</p>}
                </CardContent>
                <CardFooter>
                    <PaginationWithShow
                        totalItems={allItems.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={(newSize) => {
                            setItemsPerPage(newSize);
                            setCurrentPage(1); // Reset ke halaman 1 saat itemsPerPage berubah
                        }}
                    />
                </CardFooter>
            </Card>
        </div>
    );
}

const codeExamplePaginationBasic = `
import React, { useState } from 'react';
import PaginationWithShow from '@/shared/components/pagination/PaginationWithShow'; // Sesuaikan path
// Asumsikan Anda memiliki data 'allItems' (array of objects)

function PaginatedList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Logika untuk mendapatkan item pada halaman saat ini
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentDisplayItems = allItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Lakukan fetch data baru untuk halaman 'page' jika data dari server
    };

    const handleItemsPerPageChange = (newSize: number) => {
        setItemsPerPage(newSize);
        setCurrentPage(1); // Selalu kembali ke halaman pertama
        // Lakukan fetch data baru dengan ukuran 'newSize' jika data dari server
    };

    return (
        <div>
            {/* Tampilkan currentDisplayItems di sini */}
            {/* <p>Menampilkan item {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, allItems.length)} dari {allItems.length}</p> */}

            <PaginationWithShow
                totalItems={allItems.length} // Total semua item
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                // maxButtonsToShow={7} // Opsional
            />
        </div>
    );
}
export default PaginatedList;
`;

// --- CONTOH 2: DENGAN MAXBUTTONSTOSHOW BERBEDA ---
function ExamplePaginationMaxButtons() {
    const [currentPage, setCurrentPage] = useState(8); // Mulai dari halaman tengah untuk demo
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <div className="p-6 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Daftar Item (maxButtonsToShow=3)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                        Menampilkan {currentItems.length} item di halaman {currentPage}.
                        (Item {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, allItems.length)})
                    </p>
                </CardContent>
                <CardFooter>
                    <PaginationWithShow
                        totalItems={allItems.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={(newSize) => {
                            setItemsPerPage(newSize);
                            setCurrentPage(1);
                        }}
                        maxButtonsToShow={3} // Hanya tampilkan 3 tombol nomor halaman
                    />
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Daftar Item (maxButtonsToShow=7)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                        Menampilkan {currentItems.length} item di halaman {currentPage}.
                        (Item {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, allItems.length)})
                    </p>
                </CardContent>
                <CardFooter>
                    <PaginationWithShow
                        totalItems={allItems.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={(newSize) => {
                            setItemsPerPage(newSize);
                            setCurrentPage(1);
                        }}
                        maxButtonsToShow={7} // Tampilkan 7 tombol nomor halaman
                    />
                </CardFooter>
            </Card>
        </div>
    );
}

const codeExamplePaginationMaxButtons = `
import React, { useState } from 'react';
import PaginationWithShow from '@/shared/components/pagination/PaginationWithShow'; // Sesuaikan path

function AnotherPaginatedList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalItemsCount = 150; // Contoh total item

    return (
        <div>
            {/* Tampilkan item Anda di sini */}

            <PaginationWithShow
                totalItems={totalItemsCount}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(newSize) => {
                    setItemsPerPage(newSize);
                    setCurrentPage(1);
                }}
                maxButtonsToShow={3} // Ubah nilai ini untuk melihat perbedaan
            />
        </div>
    );
}
export default AnotherPaginatedList;
`;


// --- Komponen Utama Dokumentasi ---
export function PaginationWithShowDoc() {
    return (
        <div className="space-y-8 p-4 md:p-6 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Panduan Komponen PaginationWithShow</h1>
                <p className="text-lg text-gray-600">
                    <code>PaginationWithShow</code> adalah komponen untuk navigasi halaman yang lengkap,
                    termasuk pilihan untuk mengubah jumlah item per halaman dan tampilan nomor halaman yang dinamis.
                </p>
            </header>

            <PreviewBlock
                title="1. Penggunaan Dasar"
                description={
                    <>
                        <p>Contoh implementasi dasar <code>PaginationWithShow</code>. Komponen ini memerlukan state untuk <code>currentPage</code> dan <code>itemsPerPage</code> yang dikelola oleh komponen induk.</p>
                        <p className="mt-2">Saat jumlah item per halaman (<code>itemsPerPage</code>) diubah, disarankan untuk mereset <code>currentPage</code> ke 1.</p>
                        <p className="mt-2"><strong>Props Kunci:</strong> <code>totalItems</code>, <code>itemsPerPage</code>, <code>currentPage</code>, <code>onPageChange</code>, <code>onItemsPerPageChange</code>.</p>
                    </>
                }
                preview={<ExamplePaginationBasic />}
                code={codeExamplePaginationBasic}
            />

            <PreviewBlock
                title="2. Mengatur Jumlah Tombol Halaman (maxButtonsToShow)"
                description={
                    <>
                        <p>Gunakan prop opsional <code>maxButtonsToShow</code> untuk mengontrol berapa banyak tombol nomor halaman yang ditampilkan di sekitar halaman saat ini.</p>
                        <p className="mt-2">Jika tidak disetel, defaultnya adalah 5 tombol. Ini membantu menjaga UI tetap ringkas jika terdapat banyak halaman.</p>
                        <p className="mt-2"><strong>Prop Kunci:</strong> <code>maxButtonsToShow</code>.</p>
                        <p className="mt-2 text-sm text-orange-600"><strong>Catatan:</strong> Logika elipsis (<code>...</code>) saat ini masih sederhana dan hanya muncul jika total halaman lebih dari 5, belum sepenuhnya terintegrasi dengan <code>maxButtonsToShow</code> untuk menampilkan elipsis di awal atau akhir rentang tombol yang terlihat.</p>
                    </>
                }
                preview={<ExamplePaginationMaxButtons />}
                code={codeExamplePaginationMaxButtons}
            />

            <section className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detail Props Komponen</h2>
                <PropsTable />
            </section>

            <section className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Poin Penting & Cara Kerja</h2>
                <div className="space-y-3 text-gray-600">
                    <p><strong>Controlled Component:</strong> <code>PaginationWithShow</code> adalah <em>controlled component</em>. State untuk <code>currentPage</code>, <code>itemsPerPage</code>, dan logikanya (<code>onPageChange</code>, <code>onItemsPerPageChange</code>) harus dikelola oleh komponen induk.</p>
                    <p><strong>Kalkulasi Halaman:</strong> Jumlah total halaman dihitung secara otomatis berdasarkan <code>totalItems</code> dan <code>itemsPerPage</code>.</p>
                    <p><strong>Tampilan Nomor Halaman Dinamis (<code>getVisiblePages</code>):</strong> Logika internal mencoba menampilkan sejumlah nomor halaman (ditentukan oleh <code>maxButtonsToShow</code> atau default 5) yang berpusat di sekitar halaman aktif.</p>
                    <p><strong>Pilihan Item Per Halaman:</strong> Komponen menyediakan dropdown <code><select /></code> agar pengguna dapat memilih jumlah item yang ingin ditampilkan per halaman (10, 20, atau 30).</p>
                    <p><strong>Integrasi dengan Shadcn/UI Pagination:</strong> Memanfaatkan sub-komponen <code>Pagination</code>, <code>PaginationContent</code>, <code>PaginationItem</code>, dll., dari library UI (seperti Shadcn/UI) untuk tampilan dan nuansa yang konsisten.</p>
                    <p><strong>Responsif:</strong> Layout komponen menyesuaikan untuk layar kecil (item per halaman di bawah tombol navigasi) dan layar besar (berdampingan).</p>
                </div>
            </section>
        </div>
    );
}

// Komponen untuk menampilkan tabel props
const PropsTable = () => {
    const propsData = [
        { name: 'totalItems', type: 'number', defaultVal: '-', description: 'Jumlah total semua item yang akan dipaginasi.' },
        { name: 'itemsPerPage', type: 'number', defaultVal: '-', description: 'Jumlah item yang ditampilkan per halaman saat ini.' },
        { name: 'currentPage', type: 'number', defaultVal: '-', description: 'Nomor halaman yang sedang aktif.' },
        { name: 'onPageChange', type: '(page: number) => void', defaultVal: '-', description: 'Callback saat halaman diubah, menerima nomor halaman baru.' },
        { name: 'onItemsPerPageChange', type: '(itemsPerPage: number) => void', defaultVal: '-', description: 'Callback saat jumlah item per halaman diubah, menerima nilai baru.' },
        { name: 'maxButtonsToShow', type: 'number', defaultVal: '5 (internal)', description: 'Jumlah maksimum tombol nomor halaman yang ditampilkan. Default ke 5 jika tidak disetel.' },
    ];

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
                    {propsData.map((prop) => (
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