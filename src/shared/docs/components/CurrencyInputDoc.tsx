import { useState } from 'react';
import { CurrencyInput } from '@/shared/components/form/CurrencyInput'; // Sesuaikan path
import { PreviewBlock } from './PreviewBlock'; // Kita reuse komponen ini
import { Label } from '@/components/ui/label'; // Asumsi ada komponen Label

// --- CONTOH 1: PENGGUNAAN DASAR ---
function ExampleCurrencyInputBasic() {
    const [amount, setAmount] = useState<number>(1500000);

    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <Label htmlFor="priceBasic">Harga Produk (IDR)</Label>
            <CurrencyInput
                value={amount}
                onChange={setAmount}
                placeholder="Masukkan harga"
            />
            <div className="mt-2 text-sm text-gray-600">
                Nilai Angka: <span className="font-semibold">{amount}</span>
            </div>
            <div className="mt-1 text-sm text-gray-600">
                Tampilan Input: <span className="font-semibold">Rp{new Intl.NumberFormat('id-ID').format(amount)}</span>
            </div>
        </div>
    );

    const code = `
import React, { useState } from 'react';
import { CurrencyInput } from '@/shared/components/form/CurrencyInput';
import { Label } from '@/components/ui/label';

function BasicCurrencyForm() {
    const [price, setPrice] = useState<number>(1500000);

    return (
        <div className="space-y-2">
            <Label htmlFor="productPrice">Harga Produk (IDR)</Label>
            <CurrencyInput
                id="productPrice"
                value={price}
                onChange={setPrice}
                locale="id-ID" // Default, bisa di-omit
                currency="IDR"  // Default, bisa di-omit
                placeholder="Contoh: 100000"
            />
            <p className="text-xs text-gray-500">Nilai angka: {price}</p>
        </div>
    );
}
    `;
    return { preview, code };
}

// --- CONTOH 2: DENGAN OPSI DESIMAL ---
function ExampleCurrencyInputDecimal() {
    const [detailedAmount, setDetailedAmount] = useState<number>(12345.67);

    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <Label htmlFor="priceDecimal">Harga Presisi (IDR, Desimal)</Label>
            <CurrencyInput
                value={detailedAmount}
                onChange={setDetailedAmount}
                allowDecimal={true}
                placeholder="Masukkan harga dengan desimal"
            />
            <div className="mt-2 text-sm text-gray-600">
                Nilai Angka: <span className="font-semibold">{detailedAmount}</span>
            </div>
             <div className="mt-1 text-sm text-gray-600">
                Tampilan Input (on blur): <span className="font-semibold">Rp{new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(detailedAmount)}</span>
            </div>
        </div>
    );
    const code = `
import React, { useState } from 'react';
import { CurrencyInput } from '@/shared/components/form/CurrencyInput';
import { Label } from '@/components/ui/label';

function DecimalCurrencyForm() {
    const [precisePrice, setPrecisePrice] = useState<number>(12345.67);

    return (
        <div className="space-y-2">
            <Label htmlFor="itemPrice">Harga Item (IDR, Desimal)</Label>
            <CurrencyInput
                id="itemPrice"
                value={precisePrice}
                onChange={setPrecisePrice}
                allowDecimal={true} // Aktifkan input desimal
                locale="id-ID"
                currency="IDR"
                placeholder="Contoh: 123.45"
            />
            <p className="text-xs text-gray-500">Nilai angka: {precisePrice}</p>
        </div>
    );
}
    `;
    return { preview, code };
}

// --- CONTOH 3: LOCALE & MATA UANG BERBEDA ---
function ExampleCurrencyInputInternational() {
    const [usdAmount, setUsdAmount] = useState<number>(99.99);

    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <Label htmlFor="priceUSD">Price (USD)</Label>
            <CurrencyInput
                value={usdAmount}
                onChange={setUsdAmount}
                locale="en-US"
                currency="USD"
                allowDecimal={true}
                placeholder="Enter price in USD"
            />
            <div className="mt-2 text-sm text-gray-600">
                Numerical Value: <span className="font-semibold">{usdAmount}</span>
            </div>
             <div className="mt-1 text-sm text-gray-600">
                Input Display (on blur): <span className="font-semibold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(usdAmount)}</span>
            </div>
        </div>
    );
    const code = `
import React, { useState } from 'react';
import { CurrencyInput } from '@/shared/components/form/CurrencyInput';
import { Label } from '@/components/ui/label';

function InternationalCurrencyForm() {
    const [productCost, setProductCost] = useState<number>(99.99);

    return (
        <div className="space-y-2">
            <Label htmlFor="costUSD">Product Cost (USD)</Label>
            <CurrencyInput
                id="costUSD"
                value={productCost}
                onChange={setProductCost}
                locale="en-US"      // Atur locale ke US English
                currency="USD"      // Atur mata uang ke US Dollar
                allowDecimal={true} // Izinkan desimal untuk cent
                placeholder="Example: 99.99"
            />
            <p className="text-xs text-gray-500">Numerical value: {productCost}</p>
        </div>
    );
}
    `;
    return { preview, code };
}

// --- CONTOH 4: PLACEHOLDER & DISABLED ---
function ExampleCurrencyInputStates() {
    const [fixedAmount, setFixedAmount] = useState<number>(50000);

    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <div>
                <Label htmlFor="pricePlaceholder">Harga dengan Placeholder</Label>
                <CurrencyInput
                    value={0} // Biasanya value 0 atau undefined untuk placeholder terlihat
                    onChange={() => {}}
                    placeholder="Masukkan jumlah donasi"
                />
            </div>
            <div>
                <Label htmlFor="priceDisabled">Harga Non-Aktif</Label>
                <CurrencyInput
                    value={fixedAmount}
                    onChange={setFixedAmount}
                    disabled={true}
                />
            </div>
        </div>
    );
    const code = `
import React, { useState } from 'react';
import { CurrencyInput } from '@/shared/components/form/CurrencyInput';
import { Label } from '@/components/ui/label';

function OtherStatesCurrencyForm() {
    const [donation, setDonation] = useState<number>(0);
    const readOnlyAmount = 75000;

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="donationAmount">Jumlah Donasi</Label>
                <CurrencyInput
                    id="donationAmount"
                    value={donation || undefined} // Kirim undefined agar placeholder muncul jika 0
                    onChange={setDonation}
                    placeholder="Rp0 atau masukkan jumlah"
                />
            </div>
            <div>
                <Label htmlFor="fixedPrice">Harga Tetap (Disabled)</Label>
                <CurrencyInput
                    id="fixedPrice"
                    value={readOnlyAmount}
                    onChange={() => {}} // onChange mungkin tidak relevan jika disabled
                    disabled={true}
                />
            </div>
        </div>
    );
}
    `;
    return { preview, code };
}


// --- Komponen Utama Dokumentasi ---
export function CurrencyInputDoc() {
    const { preview: basicPreview, code: basicCode } = ExampleCurrencyInputBasic();
    const { preview: decimalPreview, code: decimalCode } = ExampleCurrencyInputDecimal();
    const { preview: intlPreview, code: intlCode } = ExampleCurrencyInputInternational();
    const { preview: statesPreview, code: statesCode } = ExampleCurrencyInputStates();

    // Data untuk tabel props (bisa dibuat lebih dinamis jika perlu)
    const propsData = [
        { name: 'value', type: 'number', defaultVal: '-', description: 'Nilai numerik mata uang.' },
        { name: 'onChange', type: '(val: number) => void', defaultVal: '-', description: 'Callback saat nilai numerik berubah.' },
        { name: 'locale', type: 'string', defaultVal: '"id-ID"', description: 'Kode locale (e.g., "en-US", "ja-JP").' },
        { name: 'currency', type: 'string', defaultVal: '"IDR"', description: 'Kode mata uang (e.g., "USD", "JPY").' },
        { name: 'allowDecimal', type: 'boolean', defaultVal: 'false', description: 'Izinkan input angka desimal.' },
        { name: 'placeholder', type: 'string', defaultVal: '-', description: 'Teks placeholder untuk input.' },
        { name: 'className', type: 'string', defaultVal: '-', description: 'Kelas CSS tambahan.' },
        { name: 'disabled', type: 'boolean', defaultVal: 'false', description: 'Nonaktifkan input.' },
    ];

    return (
        <div className="space-y-8 p-4 md:p-6 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Panduan Komponen CurrencyInput</h1>
                <p className="text-lg text-gray-600">
                    <code>CurrencyInput</code> adalah komponen input yang dirancang khusus untuk memudahkan pengguna memasukkan nilai mata uang
                    dengan format yang dilokalisasi dan parsing otomatis ke nilai numerik.
                </p>
            </header>

            <PreviewBlock
                title="1. Penggunaan Dasar (Rupiah, Tanpa Desimal)"
                description={
                    <>
                        <p>Contoh paling umum penggunaan <code>CurrencyInput</code> untuk mata uang Rupiah (IDR) tanpa desimal.</p>
                        <p className="mt-2">Komponen akan secara otomatis memformat angka yang dimasukkan dengan pemisah ribuan (titik untuk <code>id-ID</code>) dan simbol mata uang "Rp".
                        Saat input kehilangan fokus (onBlur), format akan dirapikan. Saat fokus, format akan disederhanakan untuk kemudahan edit.</p>
                        <p className="mt-2"><strong>Props Kunci:</strong> <code>value</code>, <code>onChange</code>. Props <code>locale</code> dan <code>currency</code> menggunakan nilai default ("id-ID" dan "IDR").</p>
                    </>
                }
                preview={basicPreview}
                code={basicCode}
            />

            <PreviewBlock
                title="2. Input dengan Angka Desimal"
                description={
                    <>
                        <p>Aktifkan input desimal dengan menyetel prop <code>allowDecimal</code> menjadi <code>true</code>.</p>
                        <p className="mt-2">Komponen akan mengenali pemisah desimal sesuai dengan <code>locale</code> yang digunakan (koma untuk "id-ID", titik untuk "en-US").
                        Pengguna dapat memasukkan angka dengan bagian pecahan, dan nilai numerik yang di-<code>onChange</code> akan menyertakan desimal tersebut.</p>
                        <p className="mt-2"><strong>Prop Kunci:</strong> <code>allowDecimal={true}</code></p>
                    </>
                }
                preview={decimalPreview}
                code={decimalCode}
            />

            <PreviewBlock
                title="3. Format Internasional (Contoh: USD)"
                description={
                    <>
                        <p><code>CurrencyInput</code> sangat fleksibel untuk berbagai format mata uang internasional.</p>
                        <p className="mt-2">Cukup ubah props <code>locale</code> dan <code>currency</code>. Pada contoh ini, kita menggunakan <code>locale="en-US"</code> dan <code>currency="USD"</code>.
                        Pemisah ribuan akan menjadi koma, pemisah desimal menjadi titik, dan simbol mata uang adalah "$".</p>
                        <p className="mt-2"><strong>Props Kunci:</strong> <code>locale="en-US"</code>, <code>currency="USD"</code>, <code>allowDecimal={true}</code> (biasanya mata uang asing menggunakan sen/desimal).</p>
                    </>
                }
                preview={intlPreview}
                code={intlCode}
            />

            <PreviewBlock
                title="4. State Umum: Placeholder dan Disabled"
                description={
                    <>
                        <p>Seperti komponen input pada umumnya, <code>CurrencyInput</code> juga mendukung prop <code>placeholder</code> dan <code>disabled</code>.</p>
                        <ul className="list-disc list-inside ml-4 mt-1">
                            <li><code>placeholder</code>: Menampilkan teks bantuan saat input kosong.</li>
                            <li><code>disabled</code>: Menonaktifkan input sehingga pengguna tidak dapat mengubah nilainya.</li>
                        </ul>
                    </>
                }
                preview={statesPreview}
                code={statesCode}
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
                    <p><strong>Controlled Component:</strong> <code>CurrencyInput</code> dirancang sebagai <em>controlled component</em>. Anda perlu menyediakan prop <code>value</code> (angka) dan menangani perubahan melalui callback <code>onChange</code> yang juga mengembalikan angka.</p>
                    <p><strong>State Internal <code>rawInput</code>:</strong> Komponen menggunakan state internal <code>rawInput</code> (string) untuk mengelola apa yang ditampilkan di input field. Ini memungkinkan format yang berbeda saat fokus dan blur.</p>
                    <p><strong>Format Saat Fokus & Blur:</strong>
                        <ul className="list-disc list-inside ml-4 mt-1">
                            <li><strong>On Focus:</strong> Tampilan input disederhanakan (misalnya, "1000000" atau "10000.50") untuk memudahkan pengeditan oleh pengguna. Karakter non-numerik dan non-pemisah desimal umumnya dihilangkan.</li>
                            <li><strong>On Blur:</strong> Nilai input diformat ulang sepenuhnya sesuai <code>locale</code> dan <code>currency</code> (misalnya, "Rp1.000.000" atau "$10,000.50").</li>
                        </ul>
                    </p>
                    <p><strong>Parsing Cerdas:</strong> Logika <code>parseToNumber</code> secara cerdas membersihkan input pengguna, menghapus simbol mata uang dan pemisah ribuan, serta menangani pemisah desimal yang berbeda antar locale (misalnya koma untuk "id-ID" menjadi titik untuk <code>parseFloat</code>).</p>
                    <p><strong>Pemanfaatan <code>Intl.NumberFormat</code>:</strong> Untuk formatting dan bahkan untuk mendeteksi pemisah desimal lokal, komponen ini mengandalkan API <code>Intl.NumberFormat</code> bawaan browser, memastikan dukungan lokalisasi yang luas dan akurat.</p>
                    <p><strong>Input Mode:</strong> Prop <code>inputMode</code> pada elemen <code><input /></code> diatur ke <code>"decimal"</code> atau <code>"numeric"</code> tergantung pada <code>allowDecimal</code>, yang dapat meningkatkan pengalaman pengguna di perangkat mobile dengan menampilkan keypad yang sesuai.</p>
                </div>
            </section>
        </div>
    );
}
// CurrencyInputDoc.tsx