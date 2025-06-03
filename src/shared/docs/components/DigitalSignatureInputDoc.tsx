// DigitalSignatureInputDoc.tsx
import { useState } from 'react';
import { DigitalSignatureInput, DigitalSignatureInputProps } from '@/shared/components/form/DigitalSignatureInput'; // Sesuaikan path
import { PreviewBlock } from './PreviewBlock'; // Reuse komponen preview
import { Label } from '@/components/ui/label'; // Asumsi ada komponen Label
import { Button } from '@/components/ui/button'; // Asumsi ada komponen Button
import { Textarea } from '@/components/ui/textarea'; // Untuk menampilkan data URL
import { base64DigitalSignature } from './base64DigitalSignature';

// --- CONTOH 1: PENGGUNAAN DASAR ---
function ExampleSignatureBasic() {
    const [signatureData, setSignatureData] = useState<string>('');

    const preview = (
        <div className="p-6 max-w-lg mx-auto space-y-4">
            <Label htmlFor="signatureBasic">Tanda Tangan Anda:</Label>
            <DigitalSignatureInput
                onChange={setSignatureData}
                value={signatureData}
            />
            {signatureData && (
                <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">Data Tanda Tangan (PNG Data URL):</p>
                    <Textarea
                        readOnly
                        value={signatureData}
                        className="text-xs h-20"
                        aria-label="Signature Data URL"
                    />
                    <p className="text-sm text-gray-600">Preview:</p>
                    <img src={signatureData} alt="Preview Tanda Tangan" className="border max-w-xs mx-auto h-auto" style={{ maxHeight: '100px' }} />
                </div>
            )}
        </div>
    );

    const code = `
import React, { useState } from 'react';
import { DigitalSignatureInput } from '@/shared/components/form/DigitalSignatureInput'; // Sesuaikan path
import { Label } from '@/components/ui/label'; // Sesuaikan path

function BasicSignatureForm() {
    const [signature, setSignature] = useState<string>('');

    return (
        <div className="space-y-2">
            <Label htmlFor="userSignature">Silakan Tanda Tangan:</Label>
            <DigitalSignatureInput
                id="userSignature"
                value={signature}
                onChange={setSignature}
            />
            {signature && (
                <div className="mt-2">
                    <p className="text-xs text-gray-500">Preview:</p>
                    <img src={signature} alt="Tanda Tangan" className="border h-16" />
                </div>
            )}
        </div>
    );
}
    `;
    return { preview, code };
}

// --- CONTOH 2: DENGAN NILAI AWAL ---
const sampleSignatureDataUrl = base64DigitalSignature.signature; // Ganti dengan data URL contoh tanda tangan yang valid

function ExampleSignatureWithValue() {
    const [signatureData, setSignatureData] = useState<string>(sampleSignatureDataUrl);

    const handleLoadSample = () => {
        // Pastikan loe punya data URL yang valid di sampleSignatureDataUrl
        if (sampleSignatureDataUrl && sampleSignatureDataUrl !== "kosongin saja") {
            setSignatureData(sampleSignatureDataUrl);
        } else {
            alert("Data URL contoh tanda tangan belum diisi!");
        }
    };

    const handleClearAndReset = () => {
        setSignatureData(''); // Membersihkan state
    };


    const preview = (
        <div className="p-6 max-w-lg mx-auto space-y-4">
            <Label htmlFor="signatureWithValue">Tanda Tangan Tersimpan:</Label>
            <DigitalSignatureInput
                value={signatureData}
                onChange={setSignatureData}
            />
            <div className="flex space-x-2 mt-2">
                <Button variant="secondary" size="sm" onClick={handleLoadSample} disabled={!sampleSignatureDataUrl || sampleSignatureDataUrl === "kosongin saja"}>
                    Load Contoh TTD
                </Button>
                <Button variant="destructive" size="sm" onClick={handleClearAndReset}>
                    Kosongkan Input
                </Button>
            </div>
            {signatureData && signatureData !== "kosongin saja" && (
                <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">Preview Tanda Tangan Awal:</p>
                    <img src={signatureData} alt="Preview Tanda Tangan Awal" className="border max-w-xs mx-auto h-auto" style={{ maxHeight: '100px' }} />
                </div>
            )}
        </div>
    );

    const code = `
import React, { useState } from 'react';
import { DigitalSignatureInput } from '@/shared/components/form/DigitalSignatureInput'; // Sesuaikan path
import { Label } from '@/components/ui/label'; // Sesuaikan path

// const initialSignature = "DATA_URL_TANDA_TANGAN_SEBELUMNYA"; // Ganti dengan data URL asli
const initialSignature = ""; // Atau biarkan kosong jika tidak ada nilai awal

function SignatureFormWithInitialValue() {
    const [signature, setSignature] = useState<string>(initialSignature);

    return (
        <div className="space-y-2">
            <Label htmlFor="agreementSignature">Tanda Tangan Perjanjian:</Label>
            <DigitalSignatureInput
                id="agreementSignature"
                value={signature} // Memberikan nilai awal dari state
                onChange={setSignature}
            />
            {signature && (
                <div className="mt-2">
                    <p className="text-xs text-gray-500">Preview:</p>
                    <img src={signature} alt="Tanda Tangan" className="border h-16" />
                </div>
            )}
        </div>
    );
}
    `;
    return { preview, code };
}

// --- CONTOH 3: KUSTOMISASI TAMPILAN ---
function ExampleSignatureCustomized() {
    const [signatureData, setSignatureData] = useState<string>('');

    const preview = (
        <div className="p-6 max-w-lg mx-auto space-y-4">
            <Label htmlFor="signatureCustom">Tanda Tangan (Biru, Tinggi 150px, Tanpa Clear):</Label>
            <DigitalSignatureInput
                value={signatureData}
                onChange={setSignatureData}
                height={150}
                strokeColor="blue"
                supportClear={false} // Tombol clear tidak ditampilkan
                className="border-blue-500" // Kustomisasi border wrapper
            />
            {signatureData && (
                <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">Preview:</p>
                    <img src={signatureData} alt="Preview Tanda Tangan Kustom" className="border max-w-xs mx-auto h-auto" style={{ maxHeight: '100px' }} />
                </div>
            )}
        </div>
    );
    const code = `
import React, { useState } from 'react';
import { DigitalSignatureInput } from '@/shared/components/form/DigitalSignatureInput'; // Sesuaikan path
import { Label } from '@/components/ui/label'; // Sesuaikan path

function CustomizedSignatureForm() {
    const [customSignature, setCustomSignature] = useState<string>('');

    return (
        <div className="space-y-2">
            <Label htmlFor="customSig">Area Tanda Tangan Kustom:</Label>
            <DigitalSignatureInput
                id="customSig"
                value={customSignature}
                onChange={setCustomSignature}
                height={150}              // Tinggi canvas 150px
                strokeColor="green"       // Warna tinta hijau
                supportClear={false}      // Sembunyikan tombol Clear
                className="shadow-lg"     // Kelas CSS kustom untuk wrapper
            />
            {/* ... preview opsional ... */}
        </div>
    );
}
    `;
    return { preview, code };
}

// --- CONTOH 4: DISABLED STATE ---
function ExampleSignatureDisabled() {
    // Gunakan sampleSignatureDataUrl untuk menampilkan sesuatu di state disabled
    const [signatureData,] = useState<string>(sampleSignatureDataUrl !== "kosongin saja" ? sampleSignatureDataUrl : '');


    const preview = (
        <div className="p-6 max-w-lg mx-auto space-y-4">
            <Label htmlFor="signatureDisabled">Tanda Tangan (Non-Aktif):</Label>
            <DigitalSignatureInput
                value={signatureData} // Bisa ada nilai awal atau kosong
                onChange={() => { }} // onChange tidak akan terpicu
                disabled={true}
            />
            {signatureData && signatureData !== "kosongin saja" && (
                <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">Preview Tanda Tangan (Disabled):</p>
                    <img src={signatureData} alt="Preview Tanda Tangan Disabled" className="border max-w-xs mx-auto h-auto opacity-70" style={{ maxHeight: '100px' }} />
                </div>
            )}
            {!signatureData || signatureData === "kosongin saja" && (
                <p className="text-sm text-gray-500 mt-2">Input tanda tangan dinonaktifkan dan kosong.</p>
            )}
        </div>
    );
    const code = `
import React, { useState } from 'react';
import { DigitalSignatureInput } from '@/shared/components/form/DigitalSignatureInput'; // Sesuaikan path
import { Label } from '@/components/ui/label'; // Sesuaikan path

// const readOnlySignature = "DATA_URL_TANDA_TANGAN_YANG_ADA"; // Jika ingin menampilkan ttd yang sudah ada
const readOnlySignature = ""; 

function DisabledSignatureField() {
    // State 'onChange' tidak diperlukan karena input disabled
    return (
        <div className="space-y-2">
            <Label htmlFor="finalSignature">Tanda Tangan Final (Read-Only):</Label>
            <DigitalSignatureInput
                id="finalSignature"
                value={readOnlySignature}
                disabled={true} // Nonaktifkan input
            />
             {readOnlySignature && (
                <div className="mt-2">
                    <p className="text-xs text-gray-500">Preview:</p>
                    <img src={readOnlySignature} alt="Tanda Tangan" className="border h-16 opacity-70" />
                </div>
            )}
        </div>
    );
}
    `;
    return { preview, code };
}

// --- Komponen Utama Dokumentasi ---
export function DigitalSignatureInputDoc() {
    const { preview: basicPreview, code: basicCode } = ExampleSignatureBasic();
    const { preview: valuePreview, code: valueCode } = ExampleSignatureWithValue();
    const { preview: customPreview, code: customCode } = ExampleSignatureCustomized();
    const { preview: disabledPreview, code: disabledCode } = ExampleSignatureDisabled();

    const propsData: Array<Omit<DigitalSignatureInputProps, 'onChange'> & { name: keyof DigitalSignatureInputProps, type: string, defaultVal: string, description: string, onChange?: string }> = [
        { name: 'value', type: 'string (Data URL)', defaultVal: 'undefined', description: 'Data URL (base64 PNG) tanda tangan yang sudah ada untuk ditampilkan.' },
        { name: 'onChange', type: '(value: string) => void', defaultVal: 'undefined', description: 'Callback yang dipanggil dengan data URL tanda tangan (string kosong jika dibersihkan).' },
        { name: 'disabled', type: 'boolean', defaultVal: 'false', description: 'Nonaktifkan canvas dan tombol clear.' },
        { name: 'className', type: 'string', defaultVal: 'undefined', description: 'Kelas CSS tambahan untuk div pembungkus utama.' },
        { name: 'height', type: 'number', defaultVal: '200', description: 'Tinggi area canvas tanda tangan dalam pixel.' },
        { name: 'strokeColor', type: 'string', defaultVal: '"#000"', description: 'Warna goresan/tinta tanda tangan (format warna CSS).' },
        { name: 'supportClear', type: 'boolean', defaultVal: 'true', description: 'Tampilkan atau sembunyikan tombol "Clear".' },
    ];

    return (
        <div className="space-y-8 p-4 md:p-6 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Panduan Komponen DigitalSignatureInput</h1>
                <p className="text-lg text-gray-600">
                    <code>DigitalSignatureInput</code> adalah komponen React untuk menangkap input tanda tangan digital dari pengguna.
                    Hasilnya berupa data URL gambar PNG yang bisa disimpan atau digunakan lebih lanjut.
                </p>
            </header>

            <PreviewBlock
                title="1. Penggunaan Dasar"
                description={
                    <>
                        <p>Implementasi standar <code>DigitalSignatureInput</code>. Pengguna dapat menggambar tanda tangan pada area yang disediakan.</p>
                        <p className="mt-2">Setiap kali pengguna selesai membuat goresan (<code>onEnd</code>), callback <code>onChange</code> akan dipanggil dengan data URL terbaru dari tanda tangan. Tombol "Clear" juga akan memanggil <code>onChange</code> dengan string kosong.</p>
                        <p className="mt-2"><strong>Penting:</strong> Komponen ini idealnya digunakan sebagai <em>controlled component</em> dengan menyediakan prop <code>value</code> dan <code>onChange</code> yang terhubung ke state React Anda.</p>
                    </>
                }
                preview={basicPreview}
                code={basicCode}
            />

            <PreviewBlock
                title="2. Menampilkan Tanda Tangan Awal (dari `value`)"
                description={
                    <>
                        <p>Jika Anda memiliki data URL tanda tangan yang sudah tersimpan, Anda dapat menampilkannya sebagai nilai awal pada canvas.</p>
                        <p className="mt-2">Komponen akan otomatis memuat gambar dari prop <code>value</code> ke dalam canvas saat pertama kali render atau jika <code>value</code> berubah (dan canvas sedang kosong).</p>
                        <p className="mt-2"><strong>Prop Kunci:</strong> <code>value="DATA_URL_GAMBAR_PNG"</code></p>
                        <p className="mt-1 text-xs text-amber-700">Catatan: Untuk demo ini, klik tombol "Load Contoh TTD" (pastikan Anda sudah mengisi <code>sampleSignatureDataUrl</code> dengan data URL valid di kode sumber demo).</p>
                    </>
                }
                preview={valuePreview}
                code={valueCode}
            />

            <PreviewBlock
                title="3. Kustomisasi Tampilan Canvas"
                description={
                    <>
                        <p>Anda dapat menyesuaikan beberapa aspek visual dari area tanda tangan:</p>
                        <ul className="list-disc list-inside ml-4 mt-1">
                            <li><strong><code>height</code></strong>: Mengatur tinggi canvas (dalam pixel). Lebar canvas akan selalu mengisi kontainer pembungkusnya.</li>
                            <li><strong><code>strokeColor</code></strong>: Mengubah warna tinta tanda tangan. Gunakan format warna CSS yang valid (misalnya, "blue", "#FF0000").</li>
                            <li><strong><code>supportClear</code></strong>: Setel ke <code>false</code> untuk menyembunyikan tombol "Clear".</li>
                            <li><strong><code>className</code></strong>: Tambahkan kelas CSS kustom ke elemen pembungkus utama untuk styling lebih lanjut.</li>
                        </ul>
                    </>
                }
                preview={customPreview}
                code={customCode}
            />

            <PreviewBlock
                title="4. Mode Non-Aktif (Disabled)"
                description={
                    <>
                        <p>Setel prop <code>disabled</code> menjadi <code>true</code> untuk mencegah pengguna berinteraksi dengan canvas tanda tangan dan tombol "Clear".</p>
                        <p className="mt-2">Ini berguna untuk menampilkan tanda tangan dalam mode baca-saja atau saat form sedang dalam kondisi tertentu.</p>
                        <p className="mt-2"><strong>Prop Kunci:</strong> <code>disabled={true}</code></p>
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
            </section>

            <section className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Poin Penting & Cara Kerja</h2>
                <div className="space-y-3 text-gray-600">
                    <p><strong>Controlled Component:</strong> Sangat disarankan untuk menggunakan <code>DigitalSignatureInput</code> sebagai <em>controlled component</em>. Sediakan prop <code>value</code> (string data URL) dari state React Anda dan perbarui state tersebut melalui callback <code>onChange</code>.</p>
                    <p><strong>Data URL Output:</strong> Hasil tanda tangan yang diberikan melalui <code>onChange</code> adalah sebuah <strong>string data URL format PNG</strong> (<code>data:image/png;base64,...</code>). String ini bisa langsung digunakan sebagai <code>src</code> pada tag <code><img /></code> atau disimpan di database.</p>
                    <p><strong>Memuat Tanda Tangan Awal:</strong> Jika prop <code>value</code> berisi data URL yang valid dan canvas sedang kosong, komponen akan otomatis menggambar tanda tangan tersebut ke canvas. Ini berguna untuk mengedit tanda tangan yang sudah ada atau menampilkannya kembali.</p>
                    <p><strong>Trimming Canvas:</strong> Saat mengambil data URL (<code>onEnd</code>), komponen menggunakan <code>getTrimmedCanvas().toDataURL()</code> dari library <code>react-signature-canvas</code>. Ini memastikan bahwa hanya area yang berisi goresan yang diekspor, mengoptimalkan ukuran data gambar.</p>
                    <p><strong>Ketergantungan:</strong> Komponen ini bergantung pada library <code>react-signature-canvas</code>. Pastikan library tersebut sudah terinstal di proyek Anda.</p>
                    <p><strong>Styling:</strong> Komponen menyediakan prop <code>className</code> untuk styling pembungkus utama. Untuk styling canvas lebih lanjut, Anda bisa menargetkan kelas internal atau menyesuaikan <code>canvasProps</code> jika diperlukan, meskipun styling default (<code>w-full h-full</code>) sudah cukup untuk responsivitas dasar.</p>
                </div>
            </section>
        </div>
    );
}