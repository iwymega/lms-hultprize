// SearchableSelectDoc.tsx
import { useState } from 'react';
import { SearchableSelect, SelectOption } from '@/shared/components/form/SearchableSelect'; // Sesuaikan path
import { PreviewBlock } from './PreviewBlock'; // Asumsi komponen ini ada
import { Label } from '@/components/ui/label'; // Asumsi komponen Label dari UI library Anda

// --- Data Opsi Contoh ---
const sampleOptions: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'grapes', label: 'Grapes' },
    { value: 'pineapple', label: 'Pineapple' },
    { value: 'orange', label: 'Orange' },
    { value: 'mango', label: 'Mango' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'watermelon', label: 'Watermelon' },
];

// --- CONTOH 1: SINGLE SELECT DASAR ---
function ExampleSearchableSelectSingle() {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <Label htmlFor="fruitSelectBasic">Pilih Buah (Single)</Label>
            <SearchableSelect
                options={sampleOptions}
                value={selectedValue}
                onChange={(val) => setSelectedValue(val as string)}
                placeholder="Cari atau pilih buah..."
            />
            <div className="mt-2 text-sm text-gray-600">
                Nilai Terpilih: <span className="font-semibold">{selectedValue || 'Belum ada'}</span>
            </div>
        </div>
    );

    const code = `
import React, { useState } from 'react';
import { SearchableSelect, SelectOption } from '@/shared/components/form/SearchableSelect';
import { Label } from '@/components/ui/label';

const fruitOptions: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    // ... (opsi lainnya)
];

function SingleSelectForm() {
    const [selectedFruit, setSelectedFruit] = useState<string | undefined>(undefined);

    return (
        <div className="space-y-2">
            <Label htmlFor="fruit">Pilih Buah</Label>
            <SearchableSelect
                id="fruit"
                options={fruitOptions}
                value={selectedFruit}
                onChange={(val) => setSelectedFruit(val as string)}
                placeholder="Cari buah..."
            />
            <p className="text-xs text-gray-500">Pilihan: {selectedFruit || 'N/A'}</p>
        </div>
    );
}
    `;
    return { preview, code };
}

// --- CONTOH 2: MULTI SELECT ---
function ExampleSearchableSelectMulti() {
    const [selectedValues, setSelectedValues] = useState<string[]>(['apple', 'blueberry']);

    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <Label htmlFor="fruitSelectMulti">Pilih Buah (Multi)</Label>
            <SearchableSelect
                options={sampleOptions}
                value={selectedValues}
                onChange={(vals) => setSelectedValues(vals as string[])}
                isMulti={true}
                placeholder="Pilih beberapa buah..."
            />
            <div className="mt-2 text-sm text-gray-600">
                Nilai Terpilih: <span className="font-semibold">{selectedValues.join(', ') || 'Belum ada'}</span>
            </div>
        </div>
    );
    const code = `
import React, { useState } from 'react';
import { SearchableSelect, SelectOption } from '@/shared/components/form/SearchableSelect';
import { Label } from '@/components/ui/label';

const fruitOptions: SelectOption[] = [ /* ... opsi ... */ ];

function MultiSelectForm() {
    const [favoriteFruits, setFavoriteFruits] = useState<string[]>(['apple']);

    return (
        <div className="space-y-2">
            <Label htmlFor="favFruits">Buah Favorit (Bisa Lebih Dari Satu)</Label>
            <SearchableSelect
                id="favFruits"
                options={fruitOptions}
                value={favoriteFruits}
                onChange={(vals) => setFavoriteFruits(vals as string[])}
                isMulti={true}
                placeholder="Pilih buah favoritmu..."
            />
            <p className="text-xs text-gray-500">Pilihan: {favoriteFruits.join(', ') || 'N/A'}</p>
        </div>
    );
}
    `;
    return { preview, code };
}

// --- CONTOH 3: DENGAN INITIAL VALUE & PLACEHOLDER BERBEDA ---
function ExampleSearchableSelectInitial() {
    const [category, setCategory] = useState<string>('electronics');
    const categoryOptions: SelectOption[] = [
        { value: 'electronics', label: 'Elektronik & Gadget' },
        { value: 'fashion', label: 'Fashion & Pakaian' },
        { value: 'home', label: 'Rumah Tangga' },
        { value: 'books', label: 'Buku & Majalah' },
    ];

    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <Label htmlFor="categorySelect">Pilih Kategori Produk</Label>
            <SearchableSelect
                options={categoryOptions}
                value={category}
                onChange={(val) => setCategory(val as string)}
                placeholder="-- Pilih Kategori --"
            />
            <div className="mt-2 text-sm text-gray-600">
                Kategori Terpilih: <span className="font-semibold">{category}</span>
            </div>
        </div>
    );
    const code = `
import React, { useState } from 'react';
import { SearchableSelect, SelectOption } from '@/shared/components/form/SearchableSelect';
import { Label } from '@/components/ui/label';

const categories: SelectOption[] = [ /* ... opsi kategori ... */ ];

function CategoryForm() {
    const [productCategory, setProductCategory] = useState<string>('electronics'); // Nilai awal

    return (
        <div className="space-y-2">
            <Label htmlFor="productCat">Kategori</Label>
            <SearchableSelect
                id="productCat"
                options={categories}
                value={productCategory}
                onChange={(val) => setProductCategory(val as string)}
                placeholder="-- Pilih Kategori --"
            />
            <p className="text-xs text-gray-500">Kategori: {productCategory}</p>
        </div>
    );
}
    `;
    return { preview, code };
}


// --- CONTOH 4: DISABLED STATE ---
function ExampleSearchableSelectDisabled() {
    const [status, setStatus] = useState<string>('active');
    const statusOptions: SelectOption[] = [
        { value: 'active', label: 'Aktif' },
        { value: 'inactive', label: 'Non-Aktif' },
        { value: 'pending', label: 'Menunggu Persetujuan' },
    ];

    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <Label htmlFor="statusSelect">Status (Non-Aktif)</Label>
            <SearchableSelect
                options={statusOptions}
                value={status}
                onChange={(val) => setStatus(val as string)} // onChange mungkin tidak begitu relevan jika disabled
                disabled={true}
            />
            <div className="mt-2 text-sm text-gray-600">
                Status Saat Ini: <span className="font-semibold">{status}</span>
            </div>
        </div>
    );
    const code = `
import React, { useState } from 'react';
import { SearchableSelect, SelectOption } from '@/shared/components/form/SearchableSelect';
import { Label } from '@/components/ui/label';

const statuses: SelectOption[] = [ /* ... opsi status ... */ ];

function StatusDisplayForm() {
    const currentStatus = 'active'; // Nilai tidak akan berubah

    return (
        <div className="space-y-2">
            <Label htmlFor="userStatus">Status Pengguna</Label>
            <SearchableSelect
                id="userStatus"
                options={statuses}
                value={currentStatus}
                onChange={() => {}} // Tidak ada perubahan yang diizinkan
                disabled={true}
            />
            <p className="text-xs text-gray-500">Status: {currentStatus} (Read-only)</p>
        </div>
    );
}
    `;
    return { preview, code };
}


// --- Komponen Utama Dokumentasi ---
export function SearchableSelectDoc() {
    const { preview: singlePreview, code: singleCode } = ExampleSearchableSelectSingle();
    const { preview: multiPreview, code: multiCode } = ExampleSearchableSelectMulti();
    const { preview: initialPreview, code: initialCode } = ExampleSearchableSelectInitial();
    const { preview: disabledPreview, code: disabledCode } = ExampleSearchableSelectDisabled();

    const propsData = [
        { name: 'options', type: 'SelectOption[]', defaultVal: '-', description: 'Array objek opsi yang akan ditampilkan. Setiap objek harus memiliki `label` (string) dan `value` (string).' },
        { name: 'value', type: 'string | string[]', defaultVal: 'undefined', description: 'Nilai (atau array nilai jika `isMulti`) yang sedang terpilih.' },
        { name: 'placeholder', type: 'string', defaultVal: '"Select..."', description: 'Teks yang ditampilkan saat tidak ada nilai terpilih.' },
        { name: 'onChange', type: '(value: string | string[]) => void', defaultVal: '-', description: 'Callback yang dipanggil saat pilihan berubah. Mengembalikan string tunggal atau array string (jika `isMulti`).' },
        { name: 'isMulti', type: 'boolean', defaultVal: 'false', description: 'Jika `true`, memungkinkan pemilihan beberapa opsi.' },
        { name: 'className', type: 'string', defaultVal: '-', description: 'Kelas CSS tambahan untuk `div` pembungkus utama.' },
        { name: 'disabled', type: 'boolean', defaultVal: 'false', description: 'Jika `true`, menonaktifkan interaksi dengan komponen.' },
    ];

    return (
        <div className="space-y-8 p-4 md:p-6 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Panduan Komponen SearchableSelect</h1>
                <p className="text-lg text-gray-600">
                    <code>SearchableSelect</code> adalah komponen input select/combobox yang memungkinkan pengguna
                    mencari dari daftar opsi dan mendukung mode pemilihan tunggal maupun ganda.
                </p>
            </header>

            <PreviewBlock
                title="1. Penggunaan Dasar (Single Select)"
                description={
                    <>
                        <p>Contoh paling dasar penggunaan <code>SearchableSelect</code> untuk memilih satu item dari daftar.</p>
                        <p className="mt-2">Pengguna dapat mengetik untuk memfilter opsi. Ketika sebuah opsi dipilih, dropdown akan menutup (untuk mode single-select).</p>
                        <p className="mt-2"><strong>Props Kunci:</strong> <code>options</code>, <code>value</code>, <code>onChange</code>. Prop <code>isMulti</code> default ke <code>false</code>.</p>
                    </>
                }
                preview={singlePreview}
                code={singleCode}
            />

            <PreviewBlock
                title="2. Mode Multi-Select"
                description={
                    <>
                        <p>Aktifkan kemampuan memilih beberapa item dengan menyetel prop <code>isMulti</code> menjadi <code>true</code>.</p>
                        <p className="mt-2">Ketika <code>isMulti</code> aktif, prop <code>value</code> diharapkan berupa array string, dan <code>onChange</code> akan mengembalikan array string baru. Pengguna dapat memilih atau membatalkan pilihan item tanpa menutup dropdown secara otomatis.</p>
                        <p className="mt-2"><strong>Prop Kunci:</strong> <code>isMulti={true}</code>. Pastikan <code>value</code> dan handler <code>onChange</code> sesuai untuk array.</p>
                    </>
                }
                preview={multiPreview}
                code={multiCode}
            />

            <PreviewBlock
                title="3. Nilai Awal dan Placeholder Kustom"
                description={
                    <>
                        <p>Anda dapat mengatur nilai awal untuk komponen dengan memberikan prop <code>value</code> saat inisialisasi.</p>
                        <p className="mt-2">Prop <code>placeholder</code> juga dapat dikustomisasi untuk memberikan instruksi yang lebih spesifik kepada pengguna saat tidak ada item yang terpilih.</p>
                        <p className="mt-2"><strong>Props Kunci:</strong> <code>value</code> (diinisialisasi), <code>placeholder</code>.</p>
                    </>
                }
                preview={initialPreview}
                code={initialCode}
            />

            <PreviewBlock
                title="4. Keadaan Non-Aktif (Disabled)"
                description={
                    <>
                        <p>Komponen dapat dinonaktifkan menggunakan prop <code>disabled={true}</code>.</p>
                        <p className="mt-2">Saat non-aktif, pengguna tidak akan bisa membuka dropdown atau mengubah pilihan. Ini berguna untuk menampilkan data yang read-only.</p>
                        <p className="mt-2"><strong>Prop Kunci:</strong> <code>disabled={true}</code>.</p>
                    </>
                }
                preview={disabledPreview}
                code={disabledCode}
            />

            <section className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detail Props Komponen</h2>
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
                <p className="mt-4 text-sm text-gray-600"><strong>Tipe <code>SelectOption</code>:</strong> <code>{`{ label: string; value: string; }`}</code></p>
            </section>

            <section className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Poin Penting & Cara Kerja</h2>
                <div className="space-y-3 text-gray-600">
                    <p><strong>Controlled Component:</strong> <code>SearchableSelect</code> adalah <em>controlled component</em>. Anda harus menyediakan prop <code>value</code> dan menangani perubahannya melalui callback <code>onChange</code>.</p>
                    <p><strong>Struktur Opsi (<code>SelectOption</code>):</strong> Setiap item dalam prop <code>options</code> harus berupa objek dengan properti <code>label</code> (yang ditampilkan ke pengguna) dan <code>value</code> (nilai unik internal).</p>
                    <p><strong>Pencarian Internal:</strong> Komponen <code>Command</code> (dari Shadcn/UI atau serupa) menangani logika pencarian. Secara default, ia mencari berdasarkan nilai yang diberikan ke prop <code>value</code> dari <code>CommandItem</code>, yang dalam kasus ini adalah <code>option.label</code> untuk pengalaman pengguna yang intuitif. Namun, yang disimpan dan dikelola sebagai state adalah <code>option.value</code>.</p>
                    <p><strong>Single vs. Multi-Select Logic:</strong>
                        <ul className="list-disc list-inside ml-4 mt-1">
                            <li><strong>Single:</strong> Memilih item akan memanggil <code>onChange</code> dengan nilai string item tersebut dan menutup popover.</li>
                            <li><strong>Multi:</strong> Memilih item akan menambah/menghapus nilai string item dari array <code>value</code>, memanggil <code>onChange</code> dengan array baru, dan popover tetap terbuka.</li>
                        </ul>
                    </p>
                    <p><strong>Tampilan Nilai Terpilih:</strong> Fungsi internal <code>displayValue()</code> menentukan teks yang ditampilkan pada tombol trigger, baik itu label tunggal, daftar label yang digabung (untuk multi-select), atau placeholder jika tidak ada yang terpilih.</p>
                    <p><strong>Komposisi Komponen UI:</strong> <code>SearchableSelect</code> dibangun menggunakan beberapa komponen UI dasar seperti <code>Popover</code>, <code>Button</code>, dan <code>Command</code> (umumnya dari library seperti Shadcn/UI). Ini memungkinkan kustomisasi dan konsistensi tampilan dengan sisa aplikasi Anda.</p>
                    <p><strong>Styling dengan <code>cn</code>:</strong> Fungsi utilitas <code>cn</code> (atau <code>clsx</code>) digunakan untuk menggabungkan kelas CSS secara kondisional, umum digunakan dengan Tailwind CSS.</p>
                </div>
            </section>
        </div>
    );
}