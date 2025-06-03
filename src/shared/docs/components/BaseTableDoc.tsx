// BaseTableDoc.tsx
import React, { useState, useEffect } from 'react';
import { BaseTable } // Pastikan BaseTableProps juga diekspor jika dibutuhkan di sini, atau definisikan kolom secara lokal
    from '@/shared/components/table/BaseTable'; // Sesuaikan path
import { PreviewBlock } from './PreviewBlock'; // Asumsi komponen ini ada
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
// import { Label } from '@/components/ui/label'; // Label mungkin tidak banyak digunakan di doc tabel

// --- Tipe Data Contoh ---
type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: 'active' | 'inactive' | 'archived';
};

type User = {
    userId: string;
    fullName: string;
    email: string;
    role: 'admin' | 'editor' | 'viewer';
    lastLogin: Date;
};

// --- Data Contoh ---
const sampleProducts: Product[] = [
    { id: 1, name: 'Laptop Pro X1', category: 'Electronics', price: 15000000, stock: 25, status: 'active' },
    { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 250000, stock: 150, status: 'active' },
    { id: 3, name: 'Mechanical Keyboard', category: 'Accessories', price: 750000, stock: 0, status: 'inactive' },
    { id: 4, name: '4K Monitor 27"', category: 'Electronics', price: 4500000, stock: 10, status: 'active' },
    { id: 5, name: 'Desk Chair Ergonomic', category: 'Furniture', price: 2200000, stock: 5, status: 'archived' },
];

const sampleUsers: User[] = [
    { userId: 'usr_001', fullName: 'Alice Wonderland', email: 'alice@example.com', role: 'admin', lastLogin: new Date(Date.now() - 86400000 * 2) },
    { userId: 'usr_002', fullName: 'Bob The Builder', email: 'bob@example.com', role: 'editor', lastLogin: new Date(Date.now() - 86400000 * 5) },
    { userId: 'usr_003', fullName: 'Charlie Brown', email: 'charlie@example.com', role: 'viewer', lastLogin: new Date() },
];

// Definisikan tipe Column secara lokal jika tidak diekspor bersama BaseTable
// atau impor jika BaseTableProps dan Column diekspor dari file BaseTable.tsx
interface ColumnDefinition<T> {
    title: string;
    key: keyof T | string;
    render?: (item: T, index: number) => React.ReactNode;
    className?: string;
}


// --- CONTOH 1: PENGGUNAAN DASAR ---
function ExampleBaseTableBasic() {
    const productColumns: ColumnDefinition<Product>[] = [
        { title: 'ID', key: 'id', className: 'w-16' },
        { title: 'Product Name', key: 'name' },
        { title: 'Category', key: 'category' },
        { title: 'Price', key: 'price', render: (item) => `Rp${item.price.toLocaleString('id-ID')}` },
        { title: 'Stock', key: 'stock', className: 'text-center' },
    ];

    const preview = (
        <div className="p-6 space-y-4">
            <BaseTable<Product>
                columns={productColumns}
                data={sampleProducts}
                tableName="Daftar Produk"
            />
        </div>
    );

    const code = `
import React from 'react';
import { BaseTable } from '@/shared/components/table/BaseTable'; // Sesuaikan path

// Definisikan tipe ColumnDefinition<T> jika tidak diekspor
interface ColumnDefinition<T> {
    title: string;
    key: keyof T | string;
    render?: (item: T, index: number) => React.ReactNode;
    className?: string;
}

type Product = { id: number; name: string; category: string; price: number; stock: number; };
const products: Product[] = [ /* ... data produk Anda ... */ ];

const productTableColumns: ColumnDefinition<Product>[] = [
    { title: 'ID', key: 'id', className: 'w-16' },
    { title: 'Nama Produk', key: 'name' },
    { title: 'Kategori', key: 'category' },
    { title: 'Harga (Rp)', key: 'price', render: (item) => \`Rp\${item.price.toLocaleString('id-ID')}\` },
    { title: 'Stok', key: 'stock', className: 'text-center' },
];

function ProductList() {
    return (
        <BaseTable<Product>
            columns={productTableColumns}
            data={products}
            tableName="Manajemen Produk"
        />
    );
}
export default ProductList;
    `;
    return { preview, code };
}

// --- CONTOH 2: DENGAN LOADING STATE & DATA KOSONG ---
function ExampleBaseTableLoadingEmpty() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Product[]>([]);

    useEffect(() => {
        setIsLoading(true); // Set loading true di awal
        const timer = setTimeout(() => {
            setData(Math.random() > 0.5 ? sampleProducts.slice(0, 2) : []);
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []); // Hanya jalankan sekali saat mount

    const productColumns: ColumnDefinition<Product>[] = [
        { title: 'ID', key: 'id' },
        { title: 'Product Name', key: 'name' },
        { title: 'Price', key: 'price', render: (item) => `Rp${item.price.toLocaleString('id-ID')}` },
    ];

    const preview = (
        <div className="p-6 space-y-4">
            <Button onClick={() => {
                setIsLoading(true);
                setData([]); // Kosongkan data dulu
                setTimeout(() => {
                    setData(Math.random() > 0.5 ? sampleProducts.slice(0, 3) : []);
                    setIsLoading(false);
                }, 1500);
            }}>Reload Data</Button>
            <BaseTable<Product>
                columns={productColumns}
                data={data}
                isLoading={isLoading}
                skeletonRows={3}
                tableName="Produk Terbatas (Loading/Kosong)"
            />
        </div>
    );

    const code = `
import React, { useState, useEffect } from 'react';
import { BaseTable } from '@/shared/components/table/BaseTable'; // Sesuaikan path
import { Button } from '@/components/ui/button'; // Asumsi

// Definisikan tipe ColumnDefinition<T>
interface ColumnDefinition<T> { /* ... seperti di atas ... */ }
type Product = { id: number; name: string; price: number; };
const sampleProductsData: Product[] = [ /* ... data produk sampel ... */ ];

const productTableColumns: ColumnDefinition<Product>[] = [
    { title: 'ID', key: 'id' },
    { title: 'Nama Produk', key: 'name' },
    { title: 'Harga (Rp)', key: 'price', render: (item) => \`Rp\${item.price.toLocaleString('id-ID')}\` },
];

function ProductListWithLoading() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        setLoading(true);
        setProducts([]); // Kosongkan dulu untuk efek loading yang jelas
        // Simulasi fetch data
        setTimeout(() => {
            // Ganti ini dengan fetch API sungguhan
            const fetchedData = Math.random() > 0.3 ? sampleProductsData.slice(0, Math.floor(Math.random() * sampleProductsData.length) + 1) : [];
            setProducts(fetchedData);
            setLoading(false);
        }, 1500);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Button onClick={fetchData} className="mb-4">Reload Data</Button>
            <BaseTable<Product>
                columns={productTableColumns}
                data={products}
                isLoading={loading}
                skeletonRows={3}
                tableName="Daftar Produk (Dinamis)"
            />
        </div>
    );
}
export default ProductListWithLoading;
    `;
    return { preview, code };
}


// --- CONTOH 3: DENGAN RENDER KOLOM KUSTOM & RENDER HEADER KUSTOM ---
function ExampleBaseTableCustomRender() {
    const userColumns: ColumnDefinition<User>[] = [
        { title: 'User ID', key: 'userId', className: 'text-xs w-24' },
        { title: 'Full Name', key: 'fullName' },
        { title: 'Email', key: 'email' },
        {
            title: 'Role',
            key: 'role',
            className: 'text-center',
            render: (item) => {
                let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "secondary";
                if (item.role === 'admin') badgeVariant = 'destructive';
                if (item.role === 'editor') badgeVariant = 'default';
                return <Badge variant={badgeVariant} className="capitalize">{item.role}</Badge>;
            }
        },
        {
            title: 'Last Login',
            key: 'lastLogin',
            render: (item) => item.lastLogin.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        },
        {
            title: 'Actions',
            key: 'actions',
            className: 'text-right w-28',
            render: (item) => (
                <Button variant="outline" size="sm" onClick={() => alert(`Edit user ${item.userId}`)}>
                    Edit
                </Button>
            )
        }
    ];

    const preview = (
        <div className="p-6 space-y-4">
            <BaseTable<User>
                columns={userColumns}
                data={sampleUsers}
                renderHeader={() => (
                    <div className="flex items-center justify-between w-full">
                        <h2 className="text-xl font-semibold">Manajemen Pengguna</h2>
                        <div className="flex items-center space-x-2">
                            <Input placeholder="Cari pengguna..." className="w-64 h-9" />
                            <Button>Tambah Pengguna</Button>
                        </div>
                    </div>
                )}
            />
        </div>
    );

    const code = `
import React from 'react';
import { BaseTable } from '@/shared/components/table/BaseTable'; // Sesuaikan path
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

// Definisikan tipe ColumnDefinition<T>
interface ColumnDefinition<T> { /* ... seperti di atas ... */ }
type User = { userId: string; fullName: string; email: string; role: 'admin' | 'editor' | 'viewer'; lastLogin: Date; };
const users: User[] = [ /* ... data pengguna Anda ... */ ];

const userTableColumns: ColumnDefinition<User>[] = [
    { title: 'User ID', key: 'userId', className: 'text-xs w-24' },
    { title: 'Nama Lengkap', key: 'fullName' },
    { title: 'Email', key: 'email' },
    {
        title: 'Role',
        key: 'role',
        className: 'text-center',
        render: (item) => {
            let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "secondary";
            if (item.role === 'admin') badgeVariant = 'destructive';
            if (item.role === 'editor') badgeVariant = 'default';
            return <Badge variant={badgeVariant} className="capitalize">{item.role}</Badge>;
        }
    },
    {
        title: 'Login Terakhir',
        key: 'lastLogin',
        render: (item) => item.lastLogin.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour:'2-digit', minute:'2-digit'})
    },
    {
        title: 'Aksi',
        key: 'actions', // Key bisa string apa saja jika hanya untuk render
        className: 'text-right w-28',
        render: (item) => (
            <Button variant="outline" size="sm" onClick={() => alert(\`Detail user \${item.userId}\`)}>
                Detail
            </Button>
        )
    }
];

function UserManagementTable() {
    return (
        <BaseTable<User>
            columns={userTableColumns}
            data={users}
            renderHeader={() => (
                <div className="flex items-center justify-between w-full">
                    <h2 className="text-xl font-semibold">Manajemen Pengguna Aplikasi</h2>
                    <div className="flex items-center space-x-2">
                        <Input placeholder="Cari berdasarkan nama atau email..." className="w-72 h-9" />
                        <Button>Tambah Pengguna Baru</Button>
                    </div>
                </div>
            )}
        />
    );
}
export default UserManagementTable;
    `;
    return { preview, code };
}


// --- Komponen Utama Dokumentasi ---
export function BaseTableDoc() {
    const { preview: basicPreview, code: basicCode } = ExampleBaseTableBasic();
    const { preview: loadingEmptyPreview, code: loadingEmptyCode } = ExampleBaseTableLoadingEmpty();
    const { preview: customRenderPreview, code: customRenderCode } = ExampleBaseTableCustomRender();

    return (
        <div className="space-y-8 p-4 md:p-6 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Panduan Komponen BaseTable</h1>
                <p className="text-lg text-gray-600">
                    <code>BaseTable</code> adalah komponen generik yang fleksibel untuk merender data tabular,
                    dengan dukungan untuk loading state, data kosong, kustomisasi kolom, dan header.
                </p>
            </header>

            <PreviewBlock
                title="1. Penggunaan Dasar"
                description={
                    <>
                        <p>Contoh paling sederhana penggunaan <code>BaseTable</code> untuk menampilkan daftar data.</p>
                        <p className="mt-2">Definisikan <code>columns</code> dengan <code>title</code> (header) dan <code>key</code> (properti data).
                            Anda juga bisa menggunakan <code>render</code> pada kolom untuk format data sederhana.</p>
                        <p className="mt-2"><strong>Props Kunci:</strong> <code>columns</code>, <code>data</code>, <code>tableName</code>.</p>
                    </>
                }
                preview={basicPreview}
                code={basicCode}
            />

            <PreviewBlock
                title="2. Penanganan Loading State dan Data Kosong"
                description={
                    <>
                        <p>Gunakan prop <code>isLoading</code> untuk menampilkan UI skeleton saat data sedang diambil. Prop <code>skeletonRows</code> mengontrol jumlah baris skeleton.</p>
                        <p className="mt-2">Jika <code>data</code> kosong (dan <code>isLoading</code> adalah false), tabel akan menampilkan pesan "Data Not Found".</p>
                        <p className="mt-2"><strong>Props Kunci:</strong> <code>isLoading</code>, <code>skeletonRows</code>, <code>data</code>.</p>
                    </>
                }
                preview={loadingEmptyPreview}
                code={loadingEmptyCode}
            />

            <PreviewBlock
                title="3. Kustomisasi Render Kolom dan Header Tabel"
                description={
                    <>
                        <p>Manfaatkan fungsi <code>render</code> dalam definisi kolom untuk menampilkan konten sel yang lebih kompleks, seperti badge, tombol, atau format tanggal kustom.</p>
                        <p className="mt-2">Gunakan prop <code>renderHeader</code> untuk mengganti judul tabel default dengan elemen UI kustom, misalnya untuk menambahkan tombol aksi atau field pencarian di atas tabel.</p>
                        <p className="mt-2"><strong>Props Kunci:</strong> <code>columns</code> (dengan <code>render</code>), <code>renderHeader</code>.</p>
                    </>
                }
                preview={customRenderPreview}
                code={customRenderCode}
            />

            <section className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detail Props Komponen</h2>
                <PropsTable />
            </section>

            <section className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Poin Penting & Cara Kerja</h2>
                <div className="space-y-3 text-gray-600">
                    <p><strong>Generics <code></code>:</strong> Komponen ini menggunakan generics TypeScript, memungkinkan Anda memberikan array data dengan tipe objek apa pun (<code>T</code>).</p>
                    <p><strong>Definisi Kolom (<code>ColumnDefinition</code>):</strong>
                        <ul className="list-disc list-inside ml-4 mt-1">
                            <li><code>title</code>: Teks header kolom.</li>
                            <li><code>key</code>: Mengakses properti objek data <code>T</code> atau sebagai string unik jika <code>render</code> digunakan tanpa akses langsung.</li>
                            <li><code>render</code>: Fungsi untuk kustomisasi tampilan sel, menerima <code>item: T</code> dan <code>index: number</code>.</li>
                            <li><code>className</code>: Kelas CSS untuk styling <code>TableHead</code> dan <code>TableCell</code>.</li>
                        </ul>
                    </p>
                    <p><strong>Penanganan State:</strong> Komponen secara internal menangani tampilan untuk state <code>isLoading</code> (dengan skeleton) dan saat <code>data</code> kosong.</p>
                    <p><strong>Kustomisasi Tampilan:</strong> Selain <code>render</code> pada kolom, <code>renderHeader</code> memungkinkan kustomisasi area judul tabel.</p>
                    <p><strong>Overflow:</strong> Tabel dibungkus dengan <code>div</code> yang memiliki <code>overflow-x-auto</code> untuk menangani tabel yang lebar.</p>
                    <p><strong>Integrasi dengan UI Library:</strong> Menggunakan komponen <code>Table</code>, <code>Skeleton</code>, dll., dari library UI (seperti Shadcn/UI) untuk konsistensi visual.</p>
                </div>
            </section>
        </div>
    );
}

// Komponen untuk menampilkan tabel props
const PropsTable = () => {
    const propsData = [
        { name: 'columns', type: 'ColumnDefinition<T>[]', defaultVal: '-', description: 'Array definisi kolom untuk tabel.' },
        { name: 'data', type: 'T[]', defaultVal: '-', description: 'Array objek data (tipe T) yang akan ditampilkan.' },
        { name: 'isLoading', type: 'boolean', defaultVal: 'false', description: 'Menampilkan skeleton loader jika true.' },
        { name: 'skeletonRows', type: 'number', defaultVal: '5', description: 'Jumlah baris skeleton yang ditampilkan saat isLoading.' },
        { name: 'tableName', type: 'string', defaultVal: '-', description: 'Judul tabel (jika renderHeader tidak digunakan).' },
        { name: 'renderHeader', type: '() => ReactNode', defaultVal: '-', description: 'Fungsi untuk merender header kustom di atas tabel.' },
    ];
    const columnPropsData = [
        { name: 'title', type: 'string', defaultVal: '-', description: 'Teks yang ditampilkan di header kolom.' },
        { name: 'key', type: 'keyof T | string', defaultVal: '-', description: 'Kunci untuk mengakses data atau string unik.' },
        { name: 'render', type: '(item: T, index: number) => ReactNode', defaultVal: '-', description: 'Fungsi kustom untuk merender sel.' },
        { name: 'className', type: 'string', defaultVal: '-', description: 'Kelas CSS untuk TableHead & TableCell kolom ini.' },
    ];

    return (
        <>
            <h3 className="text-xl font-medium text-gray-700 mb-3">Props untuk <code>BaseTable</code>:</h3>
            <div className="overflow-x-auto mb-6">
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

            <h3 className="text-xl font-medium text-gray-700 mb-3">Properti untuk objek <code>ColumnDefinition</code> (dalam prop <code>columns</code>):</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Properti</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {columnPropsData.map((prop) => (
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
        </>
    );
};