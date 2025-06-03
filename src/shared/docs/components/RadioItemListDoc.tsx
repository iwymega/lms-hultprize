// RadioItemListDoc.tsx
import { useState } from 'react';
import { RadioItemList } from '@/shared/components/form/RadioItemList'; // Sesuaikan path
import { PreviewBlock } from './PreviewBlock'; // Asumsi komponen ini ada
import { Label } from '@/components/ui/label';   // Asumsi komponen Label

// --- Tipe Data Contoh ---
type ShippingOption = {
    id: string;
    name: string;
    price: number;
    estimatedDelivery: string;
};

type UserRole = {
    roleId: string;
    displayName: string;
    permissions: string[];
};

// --- Data Contoh ---
const sampleShippingOptions: ShippingOption[] = [
    { id: 'std', name: 'Standard Shipping', price: 5000, estimatedDelivery: '3-5 hari kerja' },
    { id: 'exp', name: 'Express Shipping', price: 15000, estimatedDelivery: '1-2 hari kerja' },
    { id: 'smd', name: 'Same Day Delivery', price: 25000, estimatedDelivery: 'Hari ini' },
];

const sampleUserRoles: UserRole[] = [
    { roleId: 'admin', displayName: 'Administrator', permissions: ['create', 'read', 'update', 'delete'] },
    { roleId: 'editor', displayName: 'Editor', permissions: ['create', 'read', 'update'] },
    { roleId: 'viewer', displayName: 'Viewer', permissions: ['read'] },
];


// --- CONTOH 1: PENGGUNAAN DASAR DENGAN DATA OBJEK ---
function ExampleRadioItemListBasic() {
    const [selectedShipping, setSelectedShipping] = useState<string>('std');

    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <Label className="font-semibold">Pilih Metode Pengiriman:</Label>
            <RadioItemList<ShippingOption>
                data={sampleShippingOptions}
                selectedKey={selectedShipping}
                onChange={setSelectedShipping}
                keySelector={(item) => item.id}
                labelSelector={(item) => `${item.name} (+Rp${item.price.toLocaleString('id-ID')})`}
            />
            <div className="mt-2 text-sm text-gray-600">
                Metode Terpilih: <span className="font-semibold">{selectedShipping}</span>
                {selectedShipping && <p className="text-xs">Estimasi: {sampleShippingOptions.find(o => o.id === selectedShipping)?.estimatedDelivery}</p>}
            </div>
        </div>
    );

    const code = `
import React, { useState } from 'react';
import { RadioItemList } from '@/shared/components/form/RadioItemList'; // Asumsi

type ShippingOption = { id: string; name: string; price: number; /* ... */ };
const shippingMethods: ShippingOption[] = [ /* ... data ... */ ];

function ShippingForm() {
    const [chosenShipping, setChosenShipping] = useState<string>('std');

    return (
        <div>
            <p>Metode Pengiriman:</p>
            <RadioItemList<ShippingOption>
                data={shippingMethods}
                selectedKey={chosenShipping}
                onChange={setChosenShipping}
                keySelector={(item) => item.id}
                labelSelector={(item) => \`\${item.name} - Rp\${item.price}\`}
                // radioItemClassName="my-custom-radio-item" (opsional)
                // labelClassName="my-custom-label" (opsional)
            />
            <p>Pilihan Anda: {chosenShipping}</p>
        </div>
    );
}
    `;
    return { preview, code };
}

// --- CONTOH 2: DENGAN RENDER ITEM KUSTOM ---
function ExampleRadioItemListCustomRender() {
    const [selectedRole, setSelectedRole] = useState<string>('editor');

    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <Label className="font-semibold">Pilih Peran Pengguna:</Label>
            <RadioItemList<UserRole>
                data={sampleUserRoles}
                selectedKey={selectedRole}
                onChange={setSelectedRole}
                keySelector={(item) => item.roleId}
                className="space-y-3" // Styling untuk group
                renderItem={(item, { key, checked, onChange }) => (
                    <div
                        key={key}
                        onClick={onChange}
                        className={`p-4 border rounded-lg cursor-pointer transition-all
                                    ${checked ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500' : 'bg-white hover:border-gray-400'}`}
                    >
                        <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-800">{item.displayName}</h4>
                            {/* Simulasikan input radio tersembunyi atau indikator visual */}
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                            ${checked ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                                {checked && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Izin: {item.permissions.join(', ')}
                        </p>
                    </div>
                )}
            />
            <div className="mt-2 text-sm text-gray-600">
                Peran Terpilih: <span className="font-semibold">{selectedRole}</span>
            </div>
        </div>
    );

    const code = `
import React, { useState } from 'react';
import { RadioItemList } from '@/shared/components/form/RadioItemList';

type UserRole = { roleId: string; displayName: string; permissions: string[]; };
const roles: UserRole[] = [ /* ... data ... */ ];

function UserRoleForm() {
    const [userRole, setUserRole] = useState<string>('editor');

    return (
        <div>
            <p>Peran Pengguna:</p>
            <RadioItemList<UserRole>
                data={roles}
                selectedKey={userRole}
                onChange={setUserRole}
                keySelector={(item) => item.roleId}
                renderItem={(item, { key, checked, onChange }) => (
                    <div
                        key={key}
                        onClick={onChange} // Penting untuk memicu perubahan
                        className={\`my-custom-item \${checked ? 'selected' : ''}\`}
                    >
                        <h4>{item.displayName}</h4>
                        <p>Permissions: {item.permissions.length}</p>
                        {/* Anda bertanggung jawab untuk menampilkan state 'checked' */}
                    </div>
                )}
            />
        </div>
    );
}
    `;
    return { preview, code };
}

// --- CONTOH 3: STYLING KUSTOM PADA ITEM DEFAULT ---
function ExampleRadioItemListCustomStyling() {
    const [theme, setTheme] = useState<string>('light');
    const themes = [
        { id: 'light', name: 'Light Mode' },
        { id: 'dark', name: 'Dark Mode' },
        { id: 'system', name: 'System Default' },
    ];

    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <Label className="font-semibold">Pilih Tema Aplikasi:</Label>
            <RadioItemList<{id: string, name: string}>
                data={themes}
                selectedKey={theme}
                onChange={setTheme}
                keySelector={(item) => item.id}
                labelSelector={(item) => item.name}
                className="grid grid-cols-1 md:grid-cols-3 gap-2" // Styling group
                radioItemClassName="w-4 h-4 rounded-full border-2 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                labelClassName="text-sm font-medium ml-1"
            />
            <div className="mt-2 text-sm text-gray-600">
                Tema: <span className="font-semibold">{theme}</span>
            </div>
        </div>
    );
    const code = `
import React, { useState } from 'react';
import { RadioItemList } from '@/shared/components/form/RadioItemList';

const appThemes = [ { id: 'light', name: 'Terang' }, /* ... */ ];

function ThemeSelector() {
    const [currentTheme, setCurrentTheme] = useState<string>('light');

    return (
        <div>
            <p>Tema:</p>
            <RadioItemList
                data={appThemes}
                selectedKey={currentTheme}
                onChange={setCurrentTheme}
                keySelector={(item) => item.id}
                labelSelector={(item) => item.name}
                // Kustomisasi styling untuk RadioGroup, RadioGroupItem, dan Label
                className="flex flex-col space-y-1"
                radioItemClassName="w-4 h-4 text-purple-600 border-gray-400 focus:ring-purple-500"
                labelClassName="text-base text-gray-800"
            />
        </div>
    );
}
    `;
    return { preview, code };
}


// --- Komponen Utama Dokumentasi ---
export function RadioItemListDoc() {
    const { preview: basicPreview, code: basicCode } = ExampleRadioItemListBasic();
    const { preview: customRenderPreview, code: customRenderCode } = ExampleRadioItemListCustomRender();
    const { preview: customStylingPreview, code: customStylingCode } = ExampleRadioItemListCustomStyling();


    const propsData = [
        { name: 'data', type: 'T[]', defaultVal: '-', description: 'Array objek data (tipe T) yang akan dirender.' },
        { name: 'selectedKey', type: 'string', defaultVal: '-', description: 'Kunci (string) dari item yang saat ini terpilih.' },
        { name: 'onChange', type: '(key: string) => void', defaultVal: '-', description: 'Callback yang dipanggil saat pilihan berubah, menerima kunci item baru.' },
        { name: 'keySelector', type: '(item: T) => string', defaultVal: '-', description: 'Fungsi untuk mengekstrak kunci unik (string) dari setiap item T.' },
        { name: 'labelSelector', type: '(item: T) => string', defaultVal: 'keySelector(item)', description: 'Fungsi untuk mengekstrak label (string) dari setiap item T. Default menggunakan hasil `keySelector`.' },
        { name: 'renderItem', type: '(item: T, options) => ReactNode', defaultVal: '-', description: 'Fungsi untuk merender UI kustom untuk setiap item. `options` berisi `{ key, checked, onChange }`.' },
        { name: 'className', type: 'string', defaultVal: '-', description: 'Kelas CSS untuk komponen `RadioGroup` pembungkus.' },
        { name: 'radioItemClassName', type: 'string', defaultVal: 'CSS default kompleks', description: 'Kelas CSS untuk elemen `RadioGroupItem` (jika UI default digunakan).' },
        { name: 'labelClassName', type: 'string', defaultVal: '"text-sm"', description: 'Kelas CSS untuk elemen `label` (jika UI default digunakan).' },
    ];

    return (
        <div className="space-y-8 p-4 md:p-6 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Panduan Komponen RadioItemList</h1>
                <p className="text-lg text-gray-600">
                    <code>RadioItemList</code> adalah komponen generik yang fleksibel untuk merender daftar pilihan radio dari array data,
                    dengan dukungan untuk kustomisasi tampilan item.
                </p>
            </header>

            <PreviewBlock
                title="1. Penggunaan Dasar"
                description={
                    <>
                        <p>Contoh penggunaan <code>RadioItemList</code> dengan data objek. Komponen akan menggunakan UI default untuk item radio dan label.</p>
                        <p className="mt-2">Props <code>keySelector</code> wajib untuk menentukan nilai unik setiap item, dan <code>labelSelector</code> untuk teks yang ditampilkan.</p>
                        <p className="mt-2"><strong>Props Kunci:</strong> <code>data</code>, <code>selectedKey</code>, <code>onChange</code>, <code>keySelector</code>, <code>labelSelector</code>.</p>
                    </>
                }
                preview={basicPreview}
                code={basicCode}
            />

            <PreviewBlock
                title="2. Kustomisasi Tampilan dengan `renderItem`"
                description={
                    <>
                        <p>Gunakan prop <code>renderItem</code> untuk mengambil alih sepenuhnya bagaimana setiap item radio dirender. Ini memberikan fleksibilitas maksimal untuk UI yang kompleks.</p>
                        <p className="mt-2">Fungsi <code>renderItem</code> menerima objek data <code>item</code> dan sebuah objek <code>options</code> yang berisi <code>key</code>, <code>checked</code> (boolean), dan fungsi <code>onChange</code>. Anda bertanggung jawab untuk memanggil <code>options.onChange()</code> saat item kustom Anda diklik dan menampilkan status <code>checked</code>.</p>
                        <p className="mt-2"><strong>Prop Kunci:</strong> <code>renderItem</code>.</p>
                    </>
                }
                preview={customRenderPreview}
                code={customRenderCode}
            />

            <PreviewBlock
                title="3. Kustomisasi Styling Item Default"
                description={
                    <>
                        <p>Jika Anda masih ingin menggunakan struktur UI default (<code>RadioGroupItem</code> dan <code>label</code>) tetapi ingin mengubah tampilannya, Anda dapat menggunakan props <code>className</code> (untuk grup), <code>radioItemClassName</code> (untuk tombol radio), dan <code>labelClassName</code> (untuk teks label).</p>
                        <p className="mt-2"><code>radioItemClassName</code> memiliki styling default yang cukup detail untuk menangani berbagai state (checked, unchecked, hover, focus). Menggantinya akan menimpa semua styling default tersebut.</p>
                        <p className="mt-2"><strong>Props Kunci:</strong> <code>className</code>, <code>radioItemClassName</code>, <code>labelClassName</code>.</p>
                    </>
                }
                preview={customStylingPreview}
                code={customStylingCode}
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prop.defaultVal === 'CSS default kompleks' ? <span title={defaultRadioItemClassName}>Lihat Kode</span> : prop.defaultVal}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{prop.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 <p className="mt-4 text-sm text-gray-600"><strong>Tipe <code>options</code> untuk <code>renderItem</code>:</strong> <code>{`{ key: string; checked: boolean; onChange: () => void; }`}</code></p>
            </section>

            <section className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Poin Penting & Cara Kerja</h2>
                <div className="space-y-3 text-gray-600">
                    <p><strong>Generics <code></code>:</strong> Komponen ini menggunakan generics TypeScript, memungkinkan Anda memberikan array data dengan tipe objek apa pun (<code>T</code>) dan mendefinisikan cara mengakses propertinya melalui <code>keySelector</code> dan <code>labelSelector</code>.</p>
                    <p><strong>Controlled Component:</strong> State pilihan (<code>selectedKey</code>) dan logikanya (<code>onChange</code>) dikelola oleh komponen induk.</p>
                    <p><strong>Selektor Kunci & Label:</strong> <code>keySelector</code> sangat penting untuk memberikan nilai unik bagi setiap item radio. <code>labelSelector</code> menyediakan teks yang mudah dibaca.</p>
                    <p><strong>Kustomisasi Render Fleksibel:</strong> Prop <code>renderItem</code> adalah fitur kuat yang memungkinkan Anda mendesain tampilan setiap item radio sesuai kebutuhan spesifik, termasuk layout, styling, dan elemen tambahan.</p>
                    <p><strong>Styling Default yang Kuat:</strong> <code>radioItemClassName</code> menyediakan styling bawaan yang komprehensif untuk <code>RadioGroupItem</code> (jika menggunakan UI default), mencakup berbagai state interaksi. Hati-hati saat menimpanya jika Anda hanya ingin melakukan modifikasi kecil.</p>
                    <p><strong>Integrasi dengan Library UI:</strong> Komponen ini tampaknya dirancang untuk bekerja dengan komponen <code>RadioGroup</code> dan <code>RadioGroupItem</code> dari library UI seperti Shadcn/UI, yang menangani fungsionalitas inti grup radio.</p>
                </div>
            </section>
        </div>
    );
}

// Untuk tooltip pada nilai default radioItemClassName
const defaultRadioItemClassName = "w-5 h-5 rounded-full border cursor-pointer data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white data-[state=unchecked]:bg-white data-[state=unchecked]:border-gray-300 data-[state=unchecked]:text-gray-700 hover:data-[state=unchecked]:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";