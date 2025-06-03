// ImageUploadWithDropzoneDoc.tsx
// Komponen yang didokumentasikan
import ImageUploadWithDropzone from '@/shared/components/form/ImageUploadWithDropzone';
// Kita juga butuh ImageUploadWithPreview karena ImageUploadWithDropzone menggunakannya
// dan beberapa propsnya (seperti renderPreview) sangat relevan.
// Namun, dokumentasi ini fokus pada ImageUploadWithDropzone sebagai entitas utama.

// Komponen UI pendukung (asumsi ada atau bisa dibuat sederhana)
import { PreviewBlock } from './PreviewBlock'; // Reuse dari dokumentasi sebelumnya
import { File } from 'lucide-react';

// --- CONTOH 1: PENGGUNAAN DASAR ---
function ExampleDropzoneBasic() {
    // Di dalam komponen dokumentasi, kita tidak benar-benar mengupload,
    // jadi kita bisa menyimulasikan state file saja.
    // Komponen ImageUploadWithDropzone sendiri sudah punya state internal untuk file.
    // Kita hanya perlu merendernya.

    // Fungsi ini hanya untuk demo di dokumentasi, agar kita bisa melihat file yang "diupload"
    // ImageUploadWithDropzone sendiri tidak memiliki prop onSubmit.

    const preview = (
        <div className="p-6 max-w-lg mx-auto space-y-4">
            <p className="text-sm text-gray-700 mb-2">
                Coba drag & drop gambar ke area di bawah, atau klik untuk memilih gambar.
                Preview akan muncul dengan tombol hapus.
            </p>
            <ImageUploadWithDropzone />
            {/*
                Untuk benar-benar mendapatkan file dari ImageUploadWithDropzone,
                Anda perlu mengangkat state 'file' ke parent atau menggunakan callback.
                Karena ImageUploadWithDropzone saat ini tidak expose file-nya via props,
                kita akan modifikasi contohnya untuk menunjukkan bagaimana ini bisa dilakukan.
                Mari asumsikan ImageUploadWithDropzone dimodifikasi untuk menerima onChangeFile.
            */}
             {/* <Button onClick={() => handleSimulatedSubmit(null)} className="mt-4">
                Simulasikan Submit (cek console)
            </Button>
            {submittedFile && (
                <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded">
                    <p className="text-sm text-green-700">File "Terkirim": {submittedFile.name}</p>
                </div>
            )} */}
            <p className="mt-4 text-xs text-gray-500">
                Catatan: Komponen <code>ImageUploadWithDropzone</code> di atas adalah versi standar.
                Untuk mendapatkan file yang diupload di parent component, Anda perlu
                menambahkan prop callback seperti <code>onFileChange</code> ke <code>ImageUploadWithDropzone</code>
                atau mengangkat state file-nya.
            </p>
        </div>
    );

    const code = `
// Komponen Parent
import React, { useState } from 'react';
import ImageUploadWithDropzone from '@/components/upload/ImageUploadWithDropzone'; // Sesuaikan path
// import { Button } from '@/components/ui/button';

// --- Modifikasi ImageUploadWithDropzone (Contoh) ---
// Anda perlu menambahkan prop callback ini ke definisi ImageUploadWithDropzone
// interface ImageUploadWithDropzoneProps {
//   onFileChange?: (file: File | null) => void;
// }
// Dan di dalam ImageUploadWithDropzone, panggil onFileChange saat file berubah:
// const onDrop = React.useCallback((acceptedFiles: File[]) => {
//     if (acceptedFiles.length > 0) {
//         const newFile = acceptedFiles[0];
//         setFile(newFile);
//         if (props.onFileChange) props.onFileChange(newFile); // Panggil callback
//     }
// }, [props.onFileChange]);
// Saat menghapus file di ImageUploadWithPreview -> onChange(setFile) ->
// Anda juga perlu memanggil props.onFileChange(null) di sana.


// --- Penggunaan di Parent ---
function MyFormWithImageUpload() {
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);

    const handleFileChange = (file: File | null) => {
        setUploadedImage(file);
        if (file) {
            console.log("File dipilih:", file.name);
        } else {
            console.log("File dihapus.");
        }
    };

    const handleSubmit = () => {
        if (uploadedImage) {
            // Logika submit form dengan uploadedImage
            console.log("Submitting form with image:", uploadedImage.name);
            alert("Form submitted dengan: " + uploadedImage.name);
        } else {
            alert("Pilih gambar terlebih dahulu.");
        }
    };

    return (
        <div className="space-y-4">
            <ImageUploadWithDropzone /* onFileChange={handleFileChange} */ />
            {/* Uncomment onFileChange jika ImageUploadWithDropzone sudah dimodifikasi */}
            {uploadedImage && (
                <p className="text-sm">File terpilih: {uploadedImage.name}</p>
            )}
            {/* <Button onClick={handleSubmit}>Submit Form</Button> */}
            <p className="text-xs text-gray-500 mt-2">
                (Untuk contoh ini, modifikasi <code>ImageUploadWithDropzone</code>
                agar memiliki prop <code>onFileChange</code> untuk mendapatkan file di parent)
            </p>
        </div>
    );
}
    `;
    return { preview, code };
}

// --- CONTOH 2: STYLING AREA DROPZONE ---
function ExampleDropzoneStyled() {
    const preview = (
        <div className="p-6 max-w-lg mx-auto space-y-4">
            <p className="text-sm text-gray-700 mb-2">
                Area dropzone di bawah ini memiliki styling kustom melalui props <code>style</code> pada
                elemen root yang dikembalikan oleh <code>getRootProps()</code> di dalam <code>ImageUploadWithDropzone</code>.
            </p>
            {/*
                Untuk mengizinkan styling dari luar, ImageUploadWithDropzone perlu
                menerima prop seperti `className` atau `style` dan menerapkannya ke root div.
                Untuk saat ini, kita asumsikan styling dilakukan di dalam komponen.
                Contoh di bawah hanya menyoroti styling internal yang sudah ada.
            */}
            <div
                style={{
                    border: "3px dashed #22c55e", // Green dashed border
                    padding: 30,
                    cursor: "pointer",
                    borderRadius: "12px",
                    backgroundColor: "#f0fdf4", // Light green background
                    textAlign: "center",
                    color: "#166534" // Dark green text
                }}
                // Ini hanya visualisasi, komponen ImageUploadWithDropzone yang sebenarnya
                // yang akan memiliki getRootProps dan logic-nya.
                // Kita bisa merender komponennya langsung di sini.
            >
                <p>Ini adalah area dropzone dengan styling kustom.</p>
                <p className="text-xs">(Styling ini didefinisikan di dalam komponen ImageUploadWithDropzone)</p>
                {/* <ImageUploadWithDropzone />  // Ini akan menggunakan styling defaultnya */}
            </div>
             <p className="mt-4 text-xs text-gray-500">
                Jika Anda ingin styling dari luar, modifikasi <code>ImageUploadWithDropzone</code>
                untuk menerima props <code>className</code> atau <code>style</code> dan menerapkannya ke elemen root.
            </p>
        </div>
    );

    const code = `
// Di dalam ImageUploadWithDropzone.tsx

// const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

// return (
//     <div
//         {...getRootProps()}
//         style={{ // Styling bisa di-hardcode atau dari props
//             border: "3px dashed #22c55e",
//             padding: 30,
//             borderRadius: "12px",
//             backgroundColor: "#f0fdf4",
//             textAlign: "center",
//             color: "#166534",
//             cursor: "pointer"
//         }}
//         // className={cn("custom-dropzone-class", props.className)} // Jika ingin via className
//     >
//         <input {...getInputProps()} />
//         {isDragActive ? (
//             <p>Yup, drop di sini!</p>
//         ) : (
//             <p>Seret & lepas gambar, atau klik.</p>
//         )}
//         <ImageUploadWithPreview
//             value={file}
//             onChange={setFile}
//             // ... sisa props ImageUploadWithPreview
//         />
//     </div>
// );

// Atau jika ingin mengontrol dari luar via props:
// interface ImageUploadWithDropzoneProps {
//   className?: string;
//   style?: React.CSSProperties;
//   onFileChange?: (file: File | null) => void;
// }
//
// <div {...getRootProps()} className={props.className} style={props.style}>
// ...
// </div>
    `;
    return { preview, code };
}

// --- Komponen Utama Dokumentasi ---
export function ImageUploadWithDropzoneDoc() {
    const { preview: basicPreview, code: basicCode } = ExampleDropzoneBasic();
    const { preview: styledPreview, code: styledCode } = ExampleDropzoneStyled();

    // Props untuk ImageUploadWithDropzone (saat ini tidak ada props custom)
    // Props yang relevan lebih banyak di ImageUploadWithPreview yang digunakan secara internal
    // Namun, kita bisa mendokumentasikan bagaimana ia bisa diperluas.
    const propsData = [
        { name: '(Tidak ada props custom)', type: '-', defaultVal: '-', description: 'Komponen saat ini tidak menerima props spesifik dari luar, namun behaviornya dikontrol secara internal dan melalui komposisi dengan ImageUploadWithPreview.' },
        { name: 'onFileChange (Saran)', type: '(file: File | null) => void', defaultVal: '-', description: 'Callback yang disarankan untuk ditambahkan agar parent component bisa menerima file yang dipilih/dihapus.' },
        { name: 'className (Saran)', type: 'string', defaultVal: '-', description: 'Prop yang disarankan untuk ditambahkan agar styling area dropzone bisa dikustomisasi dari luar menggunakan kelas CSS.' },
        { name: 'style (Saran)', type: 'React.CSSProperties', defaultVal: '-', description: 'Prop yang disarankan untuk ditambahkan agar styling area dropzone bisa dikustomisasi dari luar menggunakan inline style.' },
    ];

    return (
        <div className="space-y-8 p-4 md:p-6 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Panduan Komponen ImageUploadWithDropzone</h1>
                <p className="text-lg text-gray-600">
                    <code>ImageUploadWithDropzone</code> adalah komponen React yang menyediakan fungsionalitas drag-and-drop
                    untuk unggah gambar, lengkap dengan preview dan opsi untuk menghapus gambar yang dipilih.
                    Komponen ini memanfaatkan <code>react-dropzone</code> untuk interaksi drop dan <code>ImageUploadWithPreview</code>
                    untuk menampilkan gambar.
                </p>
            </header>

            <PreviewBlock
                title="1. Penggunaan Dasar"
                description={
                    <>
                        <p>Contoh ini menunjukkan cara dasar menggunakan <code>ImageUploadWithDropzone</code>. Pengguna dapat menyeret file gambar ke area yang ditentukan atau mengklik area tersebut untuk membuka dialog pemilihan file.</p>
                        <p className="mt-2">Setelah gambar dipilih, preview akan ditampilkan bersama dengan tombol hapus. Interaksi ini dikelola secara internal.</p>
                        <p className="mt-2"><strong>Penting:</strong> Versi saat ini dari <code>ImageUploadWithDropzone</code> mengelola state file secara internal. Untuk mendapatkan file yang diupload di komponen parent (misalnya, untuk dikirim ke server), Anda perlu memodifikasi komponen untuk mengekspos file tersebut, misalnya melalui prop callback seperti <code>onFileChange</code> (lihat contoh kode).</p>
                    </>
                }
                preview={basicPreview}
                code={basicCode}
            />

            <PreviewBlock
                title="2. Kustomisasi Tampilan Area Dropzone"
                description={
                    <>
                        <p>Tampilan area dropzone (elemen root yang mendapatkan props dari <code>getRootProps()</code>) dapat di-styling.</p>
                        <p className="mt-2">Dalam implementasi saat ini, styling dilakukan secara inline di dalam komponen <code>ImageUploadWithDropzone</code>. Untuk fleksibilitas lebih, komponen dapat dimodifikasi untuk menerima props <code>className</code> atau <code>style</code> dari parent, yang kemudian dapat diterapkan ke elemen root dropzone.</p>
                        <p className="mt-2">Teks yang ditampilkan saat file di-drag (<code>isDragActive</code>) juga dapat dikustomisasi di dalam komponen.</p>
                    </>
                }
                preview={styledPreview}
                code={styledCode}
            />

            <section className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detail Props Komponen (Termasuk Saran Pengembangan)</h2>
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
                <p className="mt-4 text-sm text-gray-600">
                    Props dari <code>ImageUploadWithPreview</code> (seperti <code>renderPreview</code>, <code>disableInput</code>, <code>showTrigger</code>) digunakan secara internal oleh <code>ImageUploadWithDropzone</code> dan nilainya sudah di-set secara spesifik untuk mendukung fungsionalitas dropzone.
                </p>
            </section>

            <section className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Poin Penting & Cara Kerja</h2>
                <div className="space-y-3 text-gray-600">
                    <p><strong>Integrasi <code>react-dropzone</code>:</strong> Komponen menggunakan hook <code>useDropzone</code> untuk menyediakan area interaktif yang merespons aksi drag-and-drop dan klik.</p>
                    <p><strong>Komposisi dengan <code>ImageUploadWithPreview</code>:</strong> Logika untuk menampilkan preview gambar, menghasilkan URL preview, dan menangani aksi penghapusan gambar didelegasikan ke komponen <code>ImageUploadWithPreview</code>. <code>ImageUploadWithDropzone</code> mengkonfigurasi <code>ImageUploadWithPreview</code> agar input dan trigger bawaannya nonaktif, karena fungsionalitas tersebut sudah ditangani oleh dropzone.</p>
                    <p><strong>State File Internal:</strong> Saat ini, file yang dipilih dikelola dalam state internal (<code>useState<File /></code>) di dalam <code>ImageUploadWithDropzone</code>. Untuk penggunaan praktis dalam form, state ini perlu "diangkat" atau diekspos ke komponen parent melalui callback.</p>
                    <p><strong>Render Prop untuk Preview:</strong> <code>ImageUploadWithPreview</code> (yang digunakan oleh dropzone ini) menggunakan pola render prop (<code>renderPreview</code>) yang kuat, memungkinkan kustomisasi penuh atas bagaimana preview gambar dan tombol hapusnya ditampilkan. <code>ImageUploadWithDropzone</code> sudah menyediakan implementasi default untuk ini.</p>
                    <p><strong>Feedback Visual <code>isDragActive</code>:</strong> Teks di dalam area dropzone berubah secara dinamis untuk memberi tahu pengguna apakah mereka sedang aktif menyeret file di atas area tersebut.</p>
                    <p><strong>Pencegahan Propagasi Event:</strong> Pada tombol hapus di dalam preview, <code>e.stopPropagation()</code> digunakan untuk mencegah event klik memicu pembukaan dialog file dari dropzone.</p>
                </div>
            </section>
        </div>
    );
}