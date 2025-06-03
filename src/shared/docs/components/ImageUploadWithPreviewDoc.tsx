// ImageUploadWithPreviewDoc.tsx
import { useState } from 'react';
import { ImageUploadWithPreview } from '@/shared/components/form/ImageUploadWithPreview'; // Sesuaikan path
import { PreviewBlock } from './PreviewBlock'; // Asumsi komponen ini ada
import { Label } from '@/components/ui/label';   // Asumsi komponen Label
import { Button } from '@/components/ui/button'; // Asumsi komponen Button

// --- CONTOH 1: PENGGUNAAN DASAR ---
function ExampleImageUploadBasic() {
    const [imageFile, setImageFile] = useState<File | null>(null);

    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <ImageUploadWithPreview
                value={imageFile}
                onChange={setImageFile}
                label="Unggah Foto Profil"
            />
            <div className="mt-2 text-sm text-gray-600">
                File Terpilih: <span className="font-semibold">{imageFile?.name || 'Belum ada'}</span>
            </div>
        </div>
    );

    const code = `
import React, { useState } from 'react';
import { ImageUploadWithPreview } from '@/shared/components/form/ImageUploadWithPreview';

function ProfilePhotoForm() {
    const [profilePic, setProfilePic] = useState<File | null>(null);

    return (
        <div>
            <ImageUploadWithPreview
                value={profilePic}
                onChange={setProfilePic}
                label="Unggah Foto Profil Anda"
            />
            {/* Anda bisa menambahkan logic untuk upload file ke server di sini */}
            {profilePic && <p>File yang akan diunggah: {profilePic.name}</p>}
        </div>
    );
}
    `;
    return { preview, code };
}

// --- CONTOH 2: DENGAN RENDER PROPS KUSTOM ---
function ExampleImageUploadCustomRender() {
    const [coverImage, setCoverImage] = useState<File | null>(null);

    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <Label>Unggah Sampul Artikel</Label>
            <ImageUploadWithPreview
                value={coverImage}
                onChange={setCoverImage}
                label="Pilih Sampul" // Label ini mungkin tidak terlihat jika renderTrigger menimpanya
                renderTrigger={(onClick) => (
                    <Button variant="outline" onClick={onClick} className="w-full">
                        {coverImage ? 'Ganti Sampul Artikel' : 'Pilih Sampul Artikel'}
                    </Button>
                )}
                renderPreview={(file, url, onRemove) => (
                    <div className="border border-dashed border-gray-300 p-4 rounded-md text-center">
                        <img src={url} alt={file.name} className="max-h-48 mx-auto mb-2 rounded" />
                        <p className="text-xs text-gray-500">{file.name} ({(file.size / 1024).toFixed(1)} KB)</p>
                        <Button variant="destructive" size="sm" onClick={onRemove} className="mt-2">
                            Hapus Sampul
                        </Button>
                    </div>
                )}
            />
            <div className="mt-2 text-sm text-gray-600">
                File Sampul: <span className="font-semibold">{coverImage?.name || 'Belum ada'}</span>
            </div>
        </div>
    );

    const code = `
import React, { useState } from 'react';
import { ImageUploadWithPreview } from '@/shared/components/form/ImageUploadWithPreview';
import { Button } from '@/components/ui/button'; // Asumsi

function ArticleCoverForm() {
    const [articleCover, setArticleCover] = useState<File | null>(null);

    return (
        <div>
            <ImageUploadWithPreview
                value={articleCover}
                onChange={setArticleCover}
                renderTrigger={(onClick) => (
                    <Button variant="secondary" onClick={onClick}>
                        {articleCover ? 'Ubah Gambar Sampul' : 'Pilih Gambar Sampul'}
                    </Button>
                )}
                renderPreview={(file, url, onRemove) => (
                    <div className="my-custom-preview-wrapper">
                        <img src={url} alt="Preview" className="my-custom-image-style" />
                        <p>Nama file: {file.name}</p>
                        <Button onClick={onRemove}>Hapus</Button>
                    </div>
                )}
            />
        </div>
    );
}
    `;
    return { preview, code };
}

// --- CONTOH 3: DISABLE INPUT (HANYA TAMPILKAN PREVIEW) ---
function ExampleImageUploadDisabledInput() {
    // Simulasikan file yang sudah ada, misalnya dari data API
    const existingFile = new File(["dummy content"], "existing-image.jpg", { type: "image/jpeg" });
    const [displayFile, setDisplayFile] = useState<File | null>(existingFile);


    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <Label>Pratinjau Gambar (Tidak Bisa Diubah)</Label>
            <ImageUploadWithPreview
                value={displayFile}
                onChange={(file) => {
                    // onChange tidak akan terpicu jika disableInput=true
                    // tapi kita tetap perlu untuk handleRemove
                    if (!file) setDisplayFile(null);
                }}
                disableInput={true}
                renderPreview={(_file, url, _onRemove) => (
                    <div className="relative w-48 h-48 border rounded-md overflow-hidden">
                        <img src={url} alt="Preview" className="object-cover w-full h-full" />
                        {/* Opsional: Sembunyikan tombol remove jika tidak boleh dihapus */}
                        {/* <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-1 right-1 bg-white/70 hover:bg-white p-1"
                            onClick={onRemove}
                        >
                            ✕
                        </Button> */}
                        <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                            Read-only
                        </p>
                    </div>
                )}
            />
            <div className="mt-2 text-sm text-gray-600">
                File Ditampilkan: <span className="font-semibold">{displayFile?.name || 'Tidak ada'}</span>
            </div>
        </div>
    );

    const code = `
import React, { useState } from 'react';
import { ImageUploadWithPreview } from '@/shared/components/form/ImageUploadWithPreview';

// Misal, file ini datang dari server atau sumber lain
const initialFile = new File(["content"], "banner.png", { type: "image/png" });

function DisplayOnlyImage() {
    const [image, setImage] = useState<File | null>(initialFile);

    return (
        <div>
            <p>Gambar Banner Saat Ini:</p>
            <ImageUploadWithPreview
                value={image}
                onChange={(file) => { if(!file) setImage(null); }} // Hanya untuk menghapus
                disableInput={true} // Input dinonaktifkan
                // Anda bisa menggunakan renderPreview kustom jika perlu
            />
        </div>
    );
}
    `;
    return { preview, code };
}

// --- CONTOH 4: SEMBUNYIKAN TRIGGER SAAT KOSONG (SHOWTRIGGER=FALSE) ---
function ExampleImageUploadHiddenTrigger() {
    const [optionalImage, setOptionalImage] = useState<File | null>(null);

    const preview = (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <Label>Gambar Opsional (Trigger disembunyikan jika kosong)</Label>
            <div className="flex items-center space-x-2">
                {optionalImage && (
                    <ImageUploadWithPreview
                        value={optionalImage}
                        onChange={setOptionalImage}
                        showTrigger={false} // Trigger tidak akan tampil jika value null
                        renderPreview={(_file, url, onRemove) => (
                            <div className="relative w-24 h-24">
                                <img src={url} alt="Optional" className="w-full h-full object-cover rounded" />
                                <button
                                    type="button"
                                    className="absolute -top-2 -right-2 p-0.5 bg-red-500 text-white rounded-full text-xs leading-none"
                                    onClick={onRemove}
                                    aria-label="Remove image"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    />
                )}
                <Button onClick={() => document.getElementById('hidden-optional-uploader')?.click()}>
                    {optionalImage ? "Ganti Gambar Opsional" : "Tambah Gambar Opsional"}
                </Button>
            </div>
            {/* Input file tersembunyi yang dikontrol oleh tombol di atas */}
            <input
                id="hidden-optional-uploader"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setOptionalImage(e.target.files?.[0] ?? null)}
            />
            <div className="mt-2 text-sm text-gray-600">
                File Opsional: <span className="font-semibold">{optionalImage?.name || 'Tidak ada'}</span>
            </div>
        </div>
    );

    const code = `
import React, { useState, useRef } from 'react';
import { ImageUploadWithPreview } from '@/shared/components/form/ImageUploadWithPreview';
import { Button } from '@/components/ui/button';

function OptionalImageField() {
    const [img, setImg] = useState<File | null>(null);
    const hiddenInputRef = useRef<HTMLInputElement>(null);

    const handleTriggerClick = () => hiddenInputRef.current?.click();

    return (
        <div>
            <p>Logo Perusahaan (Opsional):</p>
            {img && (
                <ImageUploadWithPreview
                    value={img}
                    onChange={setImg}
                    showTrigger={false} // Penting: trigger internal disembunyikan
                />
            )}
            <Button onClick={handleTriggerClick}>
                {img ? 'Ganti Logo' : 'Unggah Logo'}
            </Button>
            <input
                type="file"
                accept="image/*"
                ref={hiddenInputRef}
                onChange={(e) => setImg(e.target.files?.[0] ?? null)}
                className="hidden"
            />
        </div>
    );
}
    `;
    return { preview, code };
}


// --- Komponen Utama Dokumentasi ---
export function ImageUploadWithPreviewDoc() {
    const { preview: basicPreview, code: basicCode } = ExampleImageUploadBasic();
    const { preview: customPreview, code: customCode } = ExampleImageUploadCustomRender();
    const { preview: disabledPreview, code: disabledCode } = ExampleImageUploadDisabledInput();
    const { preview: hiddenTriggerPreview, code: hiddenTriggerCode } = ExampleImageUploadHiddenTrigger();


    const propsData = [
        { name: 'value', type: 'File | null', defaultVal: 'undefined', description: 'Objek File gambar yang sedang dipilih atau `null`.' },
        { name: 'onChange', type: '(file: File | null) => void', defaultVal: '-', description: 'Callback yang dipanggil saat file dipilih atau dihapus.' },
        { name: 'className', type: 'string', defaultVal: '-', description: 'Kelas CSS tambahan untuk div pembungkus utama.' },
        { name: 'label', type: 'string', defaultVal: '"Upload Image"', description: 'Teks label dan teks default untuk tombol trigger.' },
        { name: 'renderPreview', type: '(file, url, onRemove) => ReactNode', defaultVal: '-', description: 'Fungsi untuk merender pratinjau kustom. Menerima `file`, `url` pratinjau, dan callback `onRemove`.' },
        { name: 'renderTrigger', type: '(onClick) => ReactNode', defaultVal: '-', description: 'Fungsi untuk merender tombol/trigger kustom. Menerima callback `onClick` untuk memicu dialog file.' },
        { name: 'disableInput', type: 'boolean', defaultVal: 'false', description: 'Jika `true`, input file aktual dinonaktifkan, mencegah pemilihan file baru. Berguna untuk mode read-only pratinjau.' },
        { name: 'showTrigger', type: 'boolean', defaultVal: 'true', description: 'Jika `false`, trigger (default atau kustom) tidak akan ditampilkan saat tidak ada `value` (gambar tidak dipilih).' },
    ];

    return (
        <div className="space-y-8 p-4 md:p-6 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Panduan Komponen ImageUploadWithPreview</h1>
                <p className="text-lg text-gray-600">
                    <code>ImageUploadWithPreview</code> adalah komponen untuk memudahkan proses unggah file gambar,
                    lengkap dengan pratinjau instan dan opsi kustomisasi UI.
                </p>
            </header>

            <PreviewBlock
                title="1. Penggunaan Dasar"
                description={
                    <>
                        <p>Contoh standar penggunaan <code>ImageUploadWithPreview</code>. Komponen akan menampilkan label,
                            tombol trigger default, dan pratinjau default saat gambar dipilih.</p>
                        <p className="mt-2"><strong>Props Kunci:</strong> <code>value</code>, <code>onChange</code>, <code>label</code>.</p>
                    </>
                }
                preview={basicPreview}
                code={basicCode}
            />

            <PreviewBlock
                title="2. Kustomisasi dengan Render Props"
                description={
                    <>
                        <p>Anda dapat sepenuhnya mengontrol tampilan trigger dan pratinjau menggunakan props <code>renderTrigger</code> dan <code>renderPreview</code>.</p>
                        <p className="mt-2"><code>renderTrigger</code> menerima fungsi <code>onClick</code> yang harus Anda panggil untuk membuka dialog file. <code>renderPreview</code> menerima <code>file</code>, <code>url</code> pratinjau, dan fungsi <code>onRemove</code>.</p>
                        <p className="mt-2"><strong>Props Kunci:</strong> <code>renderTrigger</code>, <code>renderPreview</code>.</p>
                    </>
                }
                preview={customPreview}
                code={customCode}
            />

            <PreviewBlock
                title="3. Mode Input Non-Aktif (Read-Only Preview)"
                description={
                    <>
                        <p>Gunakan <code>disableInput={true}</code> untuk mencegah pengguna memilih file baru. Ini berguna jika Anda hanya ingin menampilkan gambar yang sudah ada tanpa memperbolehkan perubahan melalui komponen ini.</p>
                        <p className="mt-2">Dalam mode ini, fungsi <code>onChange</code> pada komponen ini hanya akan relevan jika pratinjau (default atau kustom) masih menyediakan cara untuk memanggil <code>handleRemove</code> (misalnya, untuk menghapus tampilan pratinjau).</p>
                        <p className="mt-2"><strong>Prop Kunci:</strong> <code>disableInput={true}</code>.</p>
                    </>
                }
                preview={disabledPreview}
                code={disabledCode}
            />

            <PreviewBlock
                title="4. Sembunyikan Trigger Saat Kosong"
                description={
                    <>
                        <p>Dengan <code>showTrigger={false}</code>, komponen tidak akan merender tombol trigger (baik default maupun kustom dari <code>renderTrigger</code>) jika tidak ada gambar yang sedang dipilih (<code>value</code> adalah <code>null</code>).</p>
                        <p className="mt-2">Ini berguna jika Anda ingin mengontrol pemicu dialog file dari elemen UI eksternal dan hanya menggunakan komponen ini untuk menampilkan pratinjau (jika ada file) dan mengelola state file.</p>
                        <p className="mt-2"><strong>Prop Kunci:</strong> <code>showTrigger={false}</code>. Anda mungkin perlu membuat input file tersembunyi sendiri dan memicunya secara manual jika ini digunakan bersama <code>disableInput={true}</code>.</p>
                    </>
                }
                preview={hiddenTriggerPreview}
                code={hiddenTriggerCode}
            />


            <section className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detail Props Komponen</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        {/* ... (Struktur tabel seperti sebelumnya, isi dengan propsData) ... */}
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
                    <p><strong>Controlled Component:</strong> Komponen ini adalah <em>controlled component</em>. State file (<code>value</code>) dan perubahannya (<code>onChange</code>) dikelola oleh komponen induk.</p>
                    <p><strong>URL Objek & Manajemen Memori:</strong> <code>URL.createObjectURL()</code> digunakan untuk membuat URL pratinjau. Penting bahwa <code>URL.revokeObjectURL()</code> dipanggil dalam fungsi cleanup <code>useEffect</code> untuk mencegah kebocoran memori.</p>
                    <p><strong>Input File Tersembunyi:</strong> Dialog pemilihan file dipicu dengan mengklik input <code><input type="file" /></code> yang tersembunyi secara programatik.</p>
                    <p><strong>Render Props untuk Kustomisasi:</strong> <code>renderPreview</code> dan <code>renderTrigger</code> memberikan fleksibilitas tinggi untuk menyesuaikan tampilan dan nuansa komponen agar sesuai dengan desain aplikasi Anda.</p>
                    <p><strong>Reset Input Value:</strong> Setelah menghapus file (<code>handleRemove</code>), nilai dari input file (<code>inputRef.current.value = ""</code>) direset. Ini memastikan pengguna dapat memilih file yang sama lagi jika mereka mau.</p>
                    <p><strong>Fleksibilitas Tampilan Kondisional:</strong>
                        <ul className="list-disc list-inside ml-4 mt-1">
                            <li><code>disableInput</code>: Memungkinkan komponen berfungsi sebagai penampil pratinjau saja, tanpa kemampuan unggah.</li>
                            <li><code>showTrigger</code>: Mengontrol visibilitas trigger saat tidak ada gambar, berguna untuk skenario UI yang lebih kompleks.</li>
                        </ul>
                    </p>
                </div>
            </section>
        </div>
    );
}