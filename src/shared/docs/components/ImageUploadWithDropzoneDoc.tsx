// ImageUploadWithDropzoneDoc.tsx
import React from 'react';
// Hapus FileRejection dari sini:
// import { useForm, Controller, SubmitHandler, FileRejection } from 'react-hook-form';
import { useForm, Controller, SubmitHandler } from 'react-hook-form'; // Benar
import { FileRejection, Accept } from 'react-dropzone'; // Tambahkan impor ini
import ImageUploadWithDropzone from '@/shared/components/form/ImageUploadWithDropzone'; // SESUAIKAN PATH INI

// ... (sisa kode komponen UI pendukung seperti Button, Label, PreviewBlock tetap sama) ...

// --- CONTOH 1: INTEGRASI DENGAN REACT-HOOK-FORM ---
interface MyFormValues {
    profilePicture: File | null;
    coverImage: File | null;
    document: File | null;
}

function ExampleRHFIntegration() {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        reset,
        setError,
    } = useForm<MyFormValues>({
        defaultValues: {
            profilePicture: null,
            coverImage: null,
            document: null,
        },
    });

    // onSubmit tetap sama

    // Fungsi handleFileReject sekarang akan menggunakan FileRejection dari react-dropzone
    const handleFileReject = (rejections: FileRejection[], fieldName: keyof MyFormValues, friendlyName: string) => {
        console.warn(`File ditolak untuk field ${friendlyName}:`, rejections);
        if (rejections.length > 0) {
            const firstError = rejections[0].errors[0];
            let message = `File untuk ${friendlyName} ditolak.`;
            if (firstError.code === 'file-too-large') {
                message = `${friendlyName}: Ukuran file terlalu besar.`;
            } else if (firstError.code === 'file-invalid-type') {
                message = `${friendlyName}: Tipe file tidak valid.`;
            } else {
                message = `${friendlyName}: ${firstError.message}`;
            }
            setError(fieldName, { type: 'manual', message });
        }
    };

    // ... (sisa kode render ExampleRHFIntegration tetap sama, penggunaan handleFileReject sudah benar) ...
    const onSubmit: SubmitHandler<MyFormValues> = (data) => {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log("Form Data (RHF):", data);
                if (data.profilePicture) {
                    console.log("Profile Picture:", data.profilePicture.name, data.profilePicture.size);
                }
                if (data.coverImage) {
                    console.log("Cover Image:", data.coverImage.name, data.coverImage.size);
                }
                if (data.document) {
                    console.log("Document:", data.document.name, data.document.size);
                }
                alert("Form disubmit! Cek console untuk detail file.");
                resolve(true);
            }, 1000);
        });
    };

    const currentProfilePic = watch("profilePicture");
    React.useEffect(() => {
        if (currentProfilePic) {
            // console.log("RHF - Profile Picture changed:", currentProfilePic.name);
        } else {
            // console.log("RHF - Profile Picture cleared");
        }
    }, [currentProfilePic]);


    const preview = (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-1 sm:p-4 max-w-2xl mx-auto">
            {/* Field Profile Picture */}
            <div>
                <Label htmlFor="profilePicture">
                    Gambar Profil (Max 2MB, JPG/PNG)
                </Label>
                <Controller
                    name="profilePicture"
                    control={control}
                    rules={{
                        validate: (value) => {
                            if (value && value.size > 2 * 1024 * 1024) {
                                return "Ukuran file tidak boleh lebih dari 2MB (Validasi RHF).";
                            }
                            return true;
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <>
                            <ImageUploadWithDropzone
                                value={field.value}
                                onChange={(file) => {
                                    field.onChange(file);
                                    if (errors.profilePicture) {
                                        setError("profilePicture", { type: 'manual', message: '' });
                                    }
                                }}
                                accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] } as Accept} // Cast to Accept if needed
                                maxSize={2 * 1024 * 1024} // 2MB
                                onFileReject={(rejections) => handleFileReject(rejections, "profilePicture", "Gambar Profil")}
                                disabled={isSubmitting}
                            />
                            {fieldState.error && (
                                <p className="mt-1 text-xs text-red-600">{fieldState.error.message}</p>
                            )}
                        </>
                    )}
                />
            </div>

            {/* Field Cover Image (Disabled) */}
            <div>
                <Label htmlFor="coverImage">
                    Gambar Sampul (Contoh Disabled)
                </Label>
                <Controller
                    name="coverImage"
                    control={control}
                    render={({ field }) => (
                        <ImageUploadWithDropzone
                            value={field.value}
                            onChange={field.onChange}
                            disabled={true}
                        />
                    )}
                />
                {errors.coverImage && (
                    <p className="mt-1 text-xs text-red-600">{errors.coverImage.message}</p>
                )}
            </div>

            {/* Field Document (Non-Image) */}
            <div>
                <Label htmlFor="document">
                    Dokumen (PDF/DOCX, Max 1MB)
                </Label>
                <Controller
                    name="document"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <ImageUploadWithDropzone
                                value={field.value}
                                onChange={(file) => {
                                    field.onChange(file);
                                    if (errors.document) {
                                        setError("document", { type: 'manual', message: '' });
                                    }
                                }}
                                accept={{
                                    'application/pdf': ['.pdf'],
                                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                                } as Accept} // Cast to Accept if needed
                                maxSize={1 * 1024 * 1024} // 1MB
                                onFileReject={(rejections) => handleFileReject(rejections, "document", "Dokumen")}
                                disabled={isSubmitting}
                            />
                            {fieldState.error && (
                                <p className="mt-1 text-xs text-red-600">{fieldState.error.message}</p>
                            )}
                        </>
                    )}
                />
            </div>


            <div className="flex space-x-3 pt-2">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Mengirim..." : "Simpan Perubahan"}
                </Button>
                <Button type="button" variant="outline" onClick={() => reset()} disabled={isSubmitting}>
                    Reset Form
                </Button>
            </div>
        </form>
    );

    // ... (sisa kode untuk const code = `...` tetap sama)
    const code = `
import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { FileRejection, Accept } from 'react-dropzone'; // Impor dari react-dropzone
import ImageUploadWithDropzone from '@/shared/components/form/ImageUploadWithDropzone'; // Sesuaikan path
// import { Button, Label } from '@/components/ui'; // Jika pakai komponen UI kustom

interface MyFormValues {
    profilePicture: File | null;
    documentFile: File | null;
}

function MyFormWithUpload() {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError,
    } = useForm<MyFormValues>({
        defaultValues: {
            profilePicture: null,
            documentFile: null,
        },
    });

    const onSubmit: SubmitHandler<MyFormValues> = (data) => {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log("Form Data:", data);
                alert("Form disubmit! Cek console.");
                resolve(true);
            }, 1000);
        });
    };

    const handleFileReject = (rejections: FileRejection[], fieldName: keyof MyFormValues, friendlyName: string) => {
        console.warn(\`File ditolak untuk \${friendlyName}:\`, rejections);
        if (rejections.length > 0) {
            const firstError = rejections[0].errors[0];
            let message = \`\${friendlyName}: File ditolak.\`;
            if (firstError.code === 'file-too-large') {
                message = \`\${friendlyName}: Ukuran file terlalu besar.\`;
            } else if (firstError.code === 'file-invalid-type') {
                message = \`\${friendlyName}: Tipe file tidak valid.\`;
            } else {
                message = \`\${friendlyName}: \${firstError.message}\`;
            }
            setError(fieldName, { type: 'manual', message });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label htmlFor="profilePicture">Gambar Profil (Max 2MB, JPG/PNG)</label>
                <Controller
                    name="profilePicture"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <ImageUploadWithDropzone
                                value={field.value}
                                onChange={(file) => {
                                    field.onChange(file);
                                    if (errors.profilePicture) setError("profilePicture", { type: 'manual', message: '' });
                                }}
                                accept={{ 'image/jpeg': [], 'image/png': [] } as Accept}
                                maxSize={2 * 1024 * 1024} // 2MB
                                onFileReject={(rejections) => handleFileReject(rejections, "profilePicture", "Gambar Profil")}
                                disabled={isSubmitting}
                            />
                            {fieldState.error && <p className="text-red-500 text-xs">{fieldState.error.message}</p>}
                        </>
                    )}
                />
            </div>

            <div>
                <label htmlFor="documentFile">Dokumen (PDF/DOCX, Max 1MB)</label>
                <Controller
                    name="documentFile"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <ImageUploadWithDropzone
                                value={field.value}
                                onChange={(file) => {
                                    field.onChange(file);
                                    if (errors.documentFile) setError("documentFile", { type: 'manual', message: '' });
                                }}
                                accept={{
                                    'application/pdf': ['.pdf'],
                                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                                } as Accept}
                                maxSize={1 * 1024 * 1024} // 1MB
                                onFileReject={(rejections) => handleFileReject(rejections, "documentFile", "Dokumen")}
                                disabled={isSubmitting}
                            />
                            {fieldState.error && <p className="text-red-500 text-xs">{fieldState.error.message}</p>}
                        </>
                    )}
                />
            </div>

            <div className="flex space-x-2">
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Mengirim..." : "Simpan"}
                </button>
                <button type="button" onClick={() => reset()} disabled={isSubmitting}>
                    Reset
                </button>
            </div>
        </form>
    );
}

export default MyFormWithUpload;
    `;
    return { preview, code };
}


// --- CONTOH 2: KUSTOMISASI DAN FITUR (NON-RHF) ---
// Fungsi ExampleCustomization dan kode di dalamnya yang menggunakan FileRejection juga sudah benar
// karena FileRejection diimpor dari react-dropzone di awal file.
function ExampleCustomization() {
    const [customFile, setCustomFile] = React.useState<File | null>(null);
    const [customFileError, setCustomFileError] = React.useState<string | null>(null);

    const handleCustomFileChange = (file: File | null) => {
        setCustomFile(file);
        setCustomFileError(null);
    };

    const handleCustomFileReject = (rejections: FileRejection[]) => { // Tipe FileRejection sudah benar di sini
        console.warn("File ditolak (Kustom):", rejections);
        if (rejections.length > 0) {
            const firstRejection = rejections[0];
            let message = `File '${firstRejection.file.name}' ditolak.`;
            if (firstRejection.errors.some(e => e.code === 'file-too-large')) {
                message += ` Ukuran file melebihi batas.`;
            }
            if (firstRejection.errors.some(e => e.code === 'file-invalid-type')) {
                message += ` Tipe file tidak valid.`;
            }
            setCustomFileError(message);
        }
    };

    // ... sisa kode render ExampleCustomization tetap sama ...
    const preview = (
        <div className="p-1 sm:p-4 max-w-lg mx-auto space-y-4">
            <p className="text-sm text-gray-700 mb-1">
                Contoh dengan konfigurasi <code>accept</code> (hanya PNG/JPG, maks 1MB)
                dan penanganan <code>onFileReject</code> manual.
            </p>
            <ImageUploadWithDropzone
                value={customFile}
                onChange={handleCustomFileChange}
                accept={{
                    'image/png': ['.png'],
                    'image/jpeg': ['.jpg', '.jpeg'],
                } as Accept} // Cast to Accept if needed
                maxSize={1 * 1024 * 1024} // 1MB
                onFileReject={handleCustomFileReject}
            />
            {customFileError && (
                <p className="mt-1 text-xs text-red-600">{customFileError}</p>
            )}
            {customFile && !customFileError && (
                <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded">
                    <p className="text-sm text-green-700">File Terpilih: {customFile.name} ({(customFile.size / 1024).toFixed(2)} KB)</p>
                </div>
            )}
        </div>
    );
    const code = `
import React, { useState } from 'react';
import ImageUploadWithDropzone from '@/components/upload/ImageUploadWithDropzone'; // Sesuaikan path
import { FileRejection, Accept } from 'react-dropzone'; // Impor dari react-dropzone

function MyCustomUploader() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const handleFileChange = (file: File | null) => {
        setImageFile(file);
        setUploadError(null);
    };

    const handleFileReject = (rejections: FileRejection[]) => {
        if (rejections.length > 0) {
            const firstRejection = rejections[0];
            let errorMsg = \`File '\${firstRejection.file.name}' ditolak.\`;
            firstRejection.errors.forEach(err => {
                if (err.code === 'file-too-large') {
                    errorMsg += " Ukuran file terlalu besar.";
                } else if (err.code === 'file-invalid-type') {
                    errorMsg += " Tipe file tidak valid.";
                } else {
                    errorMsg += \` (\${err.message})\`;
                }
            });
            setUploadError(errorMsg);
            console.warn("File rejection:", rejections);
        }
    };

    return (
        <div className="my-uploader-container space-y-2">
            <ImageUploadWithDropzone
                value={imageFile}
                onChange={handleFileChange}
                accept={{
                    'image/png': ['.png'],
                    'image/jpeg': ['.jpg', '.jpeg'],
                } as Accept}
                maxSize={1 * 1024 * 1024} // Maksimal 1MB
                onFileReject={handleFileReject}
            />
            {uploadError && <p className="text-red-500 text-xs">{uploadError}</p>}
            {imageFile && !uploadError && (
                <p className="text-green-600 text-sm">File terpilih: {imageFile.name}</p>
            )}
        </div>
    );
}
    `;
    return { preview, code };
}

// ... (Komponen UI pendukung, Komponen Utama Dokumentasi ImageUploadWithDropzoneDoc, propsData, dll tetap sama)

// --- Komponen UI Pendukung Sederhana (Ganti dengan komponen UI Anda jika ada) ---
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'destructive' | 'outline' | 'default' }> =
    ({ children, className, variant, ...props }) => {
        let baseStyle = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
        if (variant === 'destructive') {
            baseStyle += " bg-red-500 text-white hover:bg-red-600 focus:ring-red-400";
        } else if (variant === 'outline') {
            baseStyle += " border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500";
        } else { // default
            baseStyle += " bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500";
        }
        return (
            <button className={`${baseStyle} ${className || ''} disabled:opacity-50 disabled:cursor-not-allowed`} {...props}>
                {children}
            </button>
        );
    };

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = (props) => {
    return (
        <label
            {...props}
            className={`block text-sm font-medium text-gray-700 mb-1 ${props.className || ''}`}
        />
    );
};

const PreviewBlock: React.FC<{ title: string; description: React.ReactNode; preview: React.ReactNode; code: string; }> =
    ({ title, description, preview, code }) => (
        <section className="bg-white p-4 sm:p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">{title}</h2>
            <div className="text-gray-600 mb-4 prose prose-sm max-w-none">{description}</div>
            <div className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                {preview}
            </div>
            <details className="text-sm">
                <summary className="cursor-pointer text-indigo-600 hover:text-indigo-800 font-medium">Tampilkan Kode</summary>
                <pre className="mt-2 p-3 sm:p-4 bg-gray-800 text-white rounded-md overflow-x-auto text-xs sm:text-sm">
                    <code className="language-tsx">{code.trim()}</code>
                </pre>
            </details>
        </section>
    );
// --- Akhir Komponen UI Pendukung ---

// --- Komponen Utama Dokumentasi ---
export function ImageUploadWithDropzoneDoc() {
    const { preview: rhfPreview, code: rhfCode } = ExampleRHFIntegration();
    const { preview: customizationPreview, code: customizationCode } = ExampleCustomization();

    const propsData = [
        { name: 'value', type: 'File | null', defaultVal: 'null', description: 'File yang sedang dipilih. Disediakan oleh React Hook Form (field.value) atau state manual.' },
        { name: 'onChange', type: '(file: File | null) => void', defaultVal: 'REQUIRED', description: 'Callback ketika file dipilih atau dihapus. Disediakan oleh React Hook Form (field.onChange) atau setter state manual.' },
        { name: 'accept', type: 'Accept (dari react-dropzone)', defaultVal: "{ 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] }", description: 'Objek konfigurasi untuk tipe file yang diterima. Bisa juga untuk file non-gambar.' },
        { name: 'maxSize', type: 'number', defaultVal: '5242880 (5MB)', description: 'Ukuran file maksimum yang diizinkan dalam bytes.' },
        { name: 'disabled', type: 'boolean', defaultVal: 'false', description: 'Menonaktifkan interaksi dropzone jika true.' },
        { name: 'onFileReject', type: '(rejections: FileRejection[]) => void', defaultVal: 'Internal alert (jika tidak di-override)', description: 'Callback yang dipanggil ketika file ditolak karena tidak memenuhi kriteria `accept` atau `maxSize`.' },
    ];

    return (
        <div className="space-y-8 p-2 sm:p-4 md:p-6 bg-gray-100 min-h-screen">
            <header className="mb-8 sm:mb-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">Panduan Komponen ImageUploadWithDropzone</h1>
                <p className="text-base sm:text-lg text-gray-600">
                    <code>ImageUploadWithDropzone</code> adalah komponen React terkontrol yang menyediakan fungsionalitas drag-and-drop
                    untuk unggah file (gambar atau tipe lain), lengkap dengan preview untuk gambar dan opsi untuk menghapus file.
                    Dirancang untuk integrasi mudah dengan <code>react-hook-form</code>.
                </p>
            </header>

            <PreviewBlock
                title="1. Integrasi dengan React Hook Form"
                description={
                    <>
                        <p>Contoh ini menunjukkan cara mengintegrasikan <code>ImageUploadWithDropzone</code> dengan <code>react-hook-form</code> menggunakan komponen <code>Controller</code>.</p>
                        <p className="mt-2"><code>value</code> dan <code>onChange</code> dari prop <code>field</code> yang disediakan oleh <code>Controller</code> dihubungkan langsung ke props komponen. Penanganan error dari <code>onFileReject</code> juga dapat diintegrasikan dengan sistem error RHF menggunakan <code>setError</code>.</p>
                        <p className="mt-2">Validasi tipe file dan ukuran maksimum ditangani oleh <code>react-dropzone</code>. Validasi tambahan bisa melalui <code>rules</code> pada <code>Controller</code>.</p>
                    </>
                }
                preview={rhfPreview}
                code={rhfCode}
            />

            <PreviewBlock
                title="2. Kustomisasi dan Fitur Tambahan (Non-RHF)"
                description={
                    <>
                        <p>Komponen ini juga bisa digunakan dengan state React standar. Contoh ini menunjukkan konfigurasi <code>accept</code> (PNG/JPG, maks 1MB) dan <code>maxSize</code>, serta penanganan <code>onFileReject</code> untuk menampilkan pesan error.</p>
                        <p className="mt-2">Prop <code>disabled</code> dapat digunakan untuk menonaktifkan komponen.</p>
                        <p className="mt-2">Styling internal komponen (seperti warna border saat drag) bersifat dinamis. Untuk styling wadah luar, gunakan div biasa. Modifikasi komponen internal diperlukan jika ingin menerapkan <code>className</code> atau <code>style</code> langsung ke elemen root dropzone dari luar.</p>
                    </>
                }
                preview={customizationPreview}
                code={customizationCode}
            />

            <section className="bg-white p-4 sm:p-6 rounded-lg shadow">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Detail Props Komponen</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Nama Prop</th>
                                <th className="px-3 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                                <th className="px-3 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Default</th>
                                <th className="px-3 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {propsData.map((prop) => (
                                <tr key={prop.name}>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap font-medium text-gray-900"><code>{prop.name}</code></td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-gray-500"><code>{prop.type}</code></td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-gray-500">{prop.defaultVal}</td>
                                    <td className="px-3 sm:px-6 py-4 text-gray-500">{prop.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="bg-white p-4 sm:p-6 rounded-lg shadow">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Poin Penting & Cara Kerja</h2>
                <div className="space-y-3 text-gray-600 text-sm sm:text-base">
                    <p><strong>Komponen Terkontrol:</strong> Nilai file (<code>value</code>) dan fungsi pengubahnya (<code>onChange</code>) harus disediakan dari parent, idealnya via <code>react-hook-form</code> atau state React manual.</p>
                    <p><strong><code>react-dropzone</code>:</strong> Menggunakan hook <code>useDropzone</code> untuk drag-and-drop, klik-untuk-pilih, validasi tipe (<code>accept</code>), dan ukuran (<code>maxSize</code>).</p>
                    <p><strong><code>ImageUploadWithPreview</code>:</strong> Preview gambar (jika file adalah gambar) dan tombol hapus ditampilkan menggunakan komponen <code>ImageUploadWithPreview</code> yang dikonfigurasi secara internal (input & trigger bawaannya nonaktif).</p>
                    <p><strong>File Non-Gambar:</strong> Komponen dapat menangani file non-gambar. Preview hanya akan ditampilkan jika <code>ImageUploadWithPreview</code> bisa membuat URL objek (biasanya untuk tipe <code>image/*</code>). Untuk file lain, hanya nama file atau ikon generik yang mungkin ditampilkan tergantung implementasi <code>renderPreview</code>.</p>
                    <p><strong>Feedback Visual Dinamis:</strong> Warna border dan teks berubah berdasarkan status (<code>isDragActive</code>, <code>isDragReject</code>, <code>disabled</code>).</p>
                    <p><strong>Penanganan File Ditolak:</strong> Prop <code>onFileReject</code> memungkinkan penanganan kustom saat file ditolak, memberikan detail alasan penolakan. Ini bisa diintegrasikan dengan sistem notifikasi atau error form.</p>
                </div>
            </section>

            <footer className="text-center mt-10 sm:mt-12 py-4 sm:py-6 border-t border-gray-300">
                <p className="text-xs sm:text-sm text-gray-500">Dokumentasi untuk <code>ImageUploadWithDropzone</code>.</p>
            </footer>
        </div>
    );
}