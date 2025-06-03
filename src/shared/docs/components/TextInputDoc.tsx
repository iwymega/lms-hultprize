// FormFieldDoc.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// Komponen yang didokumentasikan
import { FormField, FormFieldProps } from '@/shared/components/form/FormField'; // Sesuaikan path impor sesuai struktur proyek Anda

// Komponen UI pendukung (asumsi ada atau bisa dibuat sederhana)
import { Input } from "@/components/ui/input"; // Digunakan FormField secara internal
import { Label } from "@/components/ui/label"; // Digunakan FormField secara internal
import { Button } from "@/components/ui/button"; // Asumsi ada komponen Button
import { PreviewBlock } from './PreviewBlock'; // Reuse dari CurrencyInputDoc
import { Textarea } from '@/components/ui/textarea';
// import { Textarea } from "@/components/ui/textarea"; // Jika ingin contoh customComponent dengan Textarea

// --- Tipe untuk Form Contoh ---
interface MyFormValues {
    username: string;
    email: string;
    description: string;
    password?: string; // Opsional untuk contoh lain
    profileBio?: string; // Untuk contoh custom component
    age?: number; // Untuk contoh type number
}

// --- CONTOH 1: PENGGUNAAN DASAR ---
function ExampleFormFieldBasic() {
    const { register, handleSubmit, formState: { errors } } = useForm<MyFormValues>();
    const [submittedData, setSubmittedData] = useState<MyFormValues | null>(null);

    const onSubmit: SubmitHandler<MyFormValues> = data => {
        console.log("Basic Form Submitted:", data);
        setSubmittedData(data);
    };

    const preview = (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto space-y-4">
            <FormField
                name="username"
                label="Nama Pengguna"
                register={register}
                errors={errors}
                placeholder="Masukkan nama pengguna Anda"
            />
            {submittedData && (
                <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded">
                    <p className="text-sm text-green-700">Data Terkirim:</p>
                    <pre className="text-xs">{JSON.stringify(submittedData, null, 2)}</pre>
                </div>
            )}
            <Button type="submit">Kirim</Button>
        </form>
    );

    const code = `
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormField } from '@/components/form/FormField'; // Sesuaikan path
import { Button } from '@/components/ui/button'; // Sesuaikan path

interface MyFormValues {
    username: string;
}

function BasicForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<MyFormValues>();

    const onSubmit: SubmitHandler<MyFormValues> = data => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                name="username"
                label="Nama Pengguna"
                register={register}
                errors={errors}
                placeholder="Masukkan nama pengguna"
            />
            <Button type="submit">Kirim</Button>
        </form>
    );
}
    `;
    return { preview, code };
}

// --- CONTOH 2: DENGAN VALIDASI & ERROR ---
function ExampleFormFieldWithError() {
    const { register, handleSubmit, formState: { errors } } = useForm<MyFormValues>();
    const [submittedData, setSubmittedData] = useState<MyFormValues | null>(null);


    const onSubmit: SubmitHandler<MyFormValues> = data => {
        console.log("Error Form Submitted:", data);
        setSubmittedData(data);
    };

    const preview = (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto space-y-4">
            <FormField
                name="email"
                label="Alamat Email"
                type="email"
                register={register}
                errors={errors}
                // Aturan validasi dari react-hook-form
                // register={register("email", {
                //     required: "Alamat email tidak boleh kosong.",
                //     pattern: {
                //         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
                //         message: "Format email tidak valid."
                //     }
                // })}
                // Untuk keperluan demo, kita akan hardcode errornya di register di 'code' section
                // Di sini kita pass register standar, dan error akan muncul jika rule di-apply
            />
             {/* Inputan di atas akan dapat error jika register-nya seperti ini:
                register("email", {
                    required: "Alamat email tidak boleh kosong.",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
                        message: "Format email tidak valid."
                    }
                })}
             */}
            {submittedData && (
                <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded">
                    <p className="text-sm text-green-700">Data Terkirim:</p>
                    <pre className="text-xs">{JSON.stringify(submittedData, null, 2)}</pre>
                </div>
            )}
            <Button type="submit">Coba Kirim</Button>
            <p className="text-xs text-gray-500">Coba kirim tanpa mengisi atau dengan format email salah untuk melihat error.</p>
        </form>
    );

    // Untuk mensimulasikan error di preview tanpa logic submit yang rumit,
    // kita bisa langsung register dengan validasi di preview
    // ATAU kita bisa set defaultValues dan mencoba submit.
    // Untuk kejelasan, 'code' akan menunjukkan bagaimana validasi diterapkan.

    const code = `
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormField } from '@/components/form/FormField'; // Sesuaikan path
import { Button } from '@/components/ui/button'; // Sesuaikan path

interface MyFormValues {
    email: string;
}

function ValidationForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<MyFormValues>();

    const onSubmit: SubmitHandler<MyFormValues> = data => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                name="email"
                label="Alamat Email"
                type="email"
                // Penting: register di sini dengan aturan validasi
                register={register("email", {
                    required: "Alamat email wajib diisi.",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
                        message: "Format email tidak valid."
                    }
                })}
                errors={errors}
                placeholder="contoh@email.com"
            />
            <Button type="submit">Kirim</Button>
        </form>
    );
}
    `;
    return { preview, code };
}

// --- CONTOH 3: DENGAN TIPE INPUT BERBEDA & STYLING ---
function ExampleFormFieldTypesAndStyles() {
    const { register, handleSubmit, formState: { errors } } = useForm<MyFormValues>();
    const onSubmit: SubmitHandler<MyFormValues> = data => console.log("Types Form:", data);

    const preview = (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto space-y-4">
            <FormField
                name="password"
                label="Kata Sandi"
                type="password" // Tipe input password
                register={register}
                errors={errors}
                placeholder="Masukkan kata sandi"
                inputClassName="border-blue-500 focus:ring-blue-300" // Custom styling
            />
            <FormField
                name="age"
                label="Usia"
                type="number" // Tipe input number
                register={register}
                errors={errors}
                placeholder="Usia Anda"
                inputClassName="selection:bg-pink-300"
            />
            <Button type="submit">Kirim</Button>
        </form>
    );

    const code = `
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormField } from '@/components/form/FormField'; // Sesuaikan path
import { Button } from '@/components/ui/button'; // Sesuaikan path

interface MyFormValues {
    password?: string;
    age?: number;
}

function TypesAndStylesForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<MyFormValues>();

    const onSubmit: SubmitHandler<MyFormValues> = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                name="password"
                label="Kata Sandi"
                type="password"
                register={register}
                errors={errors}
                placeholder="Rahasia"
                inputClassName="border-2 border-dashed border-purple-400"
            />
            <FormField
                name="age"
                label="Usia (Tahun)"
                type="number"
                register={register}
                errors={errors}
                placeholder="e.g. 25"
            />
            <Button type="submit">Simpan</Button>
        </form>
    );
}
    `;
    return { preview, code };
}


// --- CONTOH 4: DENGAN CUSTOM COMPONENT ---
// Asumsi ada komponen Textarea sederhana
const MyTextarea = React.forwardRef<HTMLTextAreaElement, any>((props, ref) => (
    <textarea
        ref={ref}
        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 selection:bg-blue-300 selection:text-white"
        {...props}
    />
));
MyTextarea.displayName = "MyTextarea";


function ExampleFormFieldCustomComponent() {
    const { register, handleSubmit, formState: { errors } } = useForm<MyFormValues>();
    const onSubmit: SubmitHandler<MyFormValues> = data => console.log("Custom Comp Form:", data);

    const preview = (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto space-y-4">
            <FormField
                name="profileBio"
                label="Bio Profil"
                register={register}
                errors={errors}
                customComponent={
                    <MyTextarea
                        id="profileBio" // Penting: id harus sama dengan 'name'
                        placeholder="Ceritakan tentang diri Anda..."
                        // {...register("profileBio")} // Ini akan ditangani oleh FormField internal
                    />
                }
            />
            <Button type="submit">Update Bio</Button>
        </form>
    );

    const code = `
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormField } from '@/components/form/FormField'; // Sesuaikan path
import { Button } from '@/components/ui/button'; // Sesuaikan path
// import { Textarea } from '@/components/ui/textarea'; // Atau komponen textarea Anda

// Contoh komponen Textarea sederhana jika belum ada
const MySimpleTextarea = React.forwardRef<HTMLTextAreaElement, any>((props, ref) => (
    <textarea
        ref={ref}
        className="w-full p-2 border rounded" // Styling dasar
        rows={3}
        {...props} // Pastikan props dari register di-spread
    />
));
MySimpleTextarea.displayName = "MySimpleTextarea";


interface MyFormValues {
    profileBio?: string;
}

function CustomComponentForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<MyFormValues>();

    const onSubmit: SubmitHandler<MyFormValues> = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                name="profileBio"
                label="Bio Profil Anda"
                register={register} // Tetap berikan register
                errors={errors}
                customComponent={
                    // Komponen custom harus bisa menerima props yang di-spread dari register(name)
                    // seperti id, name, onChange, onBlur, ref.
                    // FormField akan menangani penyebaran {...register("profileBio")} ke customComponent ini.
                    <MySimpleTextarea
                        id="profileBio" // Berikan id agar label berfungsi
                        placeholder="Tulis bio singkat di sini..."
                    />
                }
            />
            <Button type="submit">Simpan Bio</Button>
        </form>
    );
}
    `;
    return { preview, code };
}


// --- Komponen Utama Dokumentasi ---
export function TextInputDoc() {
    const { preview: basicPreview, code: basicCode } = ExampleFormFieldBasic();
    const { preview: errorPreview, code: errorCode } = ExampleFormFieldWithError();
    const { preview: typesPreview, code: typesCode } = ExampleFormFieldTypesAndStyles();
    const { preview: customPreview, code: customCode } = ExampleFormFieldCustomComponent();

    const propsData: Array<Omit<FormFieldProps, 'register' | 'errors'> & { name: keyof FormFieldProps, type: string, defaultVal?: string, description: string }> = [
        { name: 'name', label: 'name', type: 'string', description: 'Nama unik untuk field, digunakan oleh react-hook-form dan sebagai `id` internal.' },
        { name: 'label', label: 'label', type: 'string', description: 'Teks label yang akan ditampilkan di atas input.' },
        { name: 'placeholder', label: 'placeholder', type: 'string', defaultVal: '-', description: 'Teks placeholder opsional untuk input.' },
        { name: 'type', label: 'type', type: 'string', defaultVal: '"text"', description: 'Tipe input HTML standar (e.g., "text", "password", "email", "number").' },
        { name: 'register', label: 'register', type: 'UseFormRegister<any>', description: 'Fungsi `register` dari `react-hook-form`.' },
        { name: 'errors', label: 'errors', type: 'FieldErrors', description: 'Objek `errors` dari `formState` `react-hook-form`.' },
        { name: 'inputClassName', label: 'inputClassName', type: 'string', defaultVal: '-', description: 'Kelas CSS tambahan untuk elemen `<Input>` internal.' },
        { name: 'customComponent', label: 'customComponent', type: 'React.ReactNode', defaultVal: '-', description: 'Ganti input standar dengan komponen React kustom. Komponen ini akan menerima props dari `register(name)`.' },
    ];

    return (
        <div className="space-y-8 p-4 md:p-6 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Panduan Komponen FormField</h1>
                <p className="text-lg text-gray-600">
                    <code>FormField</code> adalah komponen pembungkus (wrapper) yang fleksibel untuk membuat input form dengan integrasi mudah ke <code>react-hook-form</code>,
                    menangani tampilan label, input, dan pesan error secara konsisten.
                </p>
            </header>

            <PreviewBlock
                title="1. Penggunaan Dasar"
                description={
                    <>
                        <p>Contoh paling sederhana menggunakan <code>FormField</code> untuk input teks standar.</p>
                        <p className="mt-2">Anda hanya perlu menyediakan <code>name</code>, <code>label</code>, fungsi <code>register</code>, dan objek <code>errors</code> dari <code>react-hook-form</code>.</p>
                        <p className="mt-2"><strong>Props Kunci:</strong> <code>name</code>, <code>label</code>, <code>register</code>, <code>errors</code>.</p>
                    </>
                }
                preview={basicPreview}
                code={basicCode}
            />

            <PreviewBlock
                title="2. Dengan Validasi dan Penanganan Error"
                description={
                    <>
                        <p><code>FormField</code> secara otomatis menampilkan pesan error jika ada validasi yang gagal dari <code>react-hook-form</code>.</p>
                        <p className="mt-2">Border input juga akan berubah menjadi merah untuk indikasi visual. Pastikan Anda meneruskan objek <code>errors</code> dan aturan validasi pada fungsi <code>register</code>.</p>
                        <p className="mt-2"><strong>Props Kunci:</strong> <code>errors</code>, dan aturan validasi pada <code>register</code> (e.g., <code>{`register("namaField", { required: "Wajib diisi" })`}</code>).</p>
                    </>
                }
                preview={errorPreview}
                code={errorCode}
            />

            <PreviewBlock
                title="3. Berbagai Tipe Input dan Styling Tambahan"
                description={
                    <>
                        <p>Anda dapat menentukan <code>type</code> input (seperti "password", "email", "number") dan menambahkan styling kustom pada elemen input melalui prop <code>inputClassName</code>.</p>
                        <p className="mt-2"><code>FormField</code> akan meneruskan <code>type</code> ke elemen <code><Input /></code> internal dan menggabungkan <code>inputClassName</code> dengan kelas default.</p>
                        <p className="mt-2"><strong>Props Kunci:</strong> <code>type</code>, <code>inputClassName</code>.</p>
                    </>
                }
                preview={typesPreview}
                code={typesCode}
            />

            <PreviewBlock
                title="4. Menggunakan Komponen Input Kustom"
                description={
                    <>
                        <p>Untuk kasus di mana input standar tidak cukup (misalnya, Anda ingin menggunakan <code><Textarea /></code>, date picker, atau select kustom), Anda dapat menggunakan prop <code>customComponent</code>.</p>
                        <p className="mt-2"><code>FormField</code> akan merender komponen yang Anda berikan dan secara otomatis menyebarkan (spread) props yang dihasilkan oleh <code>register(name)</code> (seperti <code>id</code>, <code>name</code>, <code>onChange</code>, <code>onBlur</code>, <code>ref</code>) ke komponen kustom tersebut.</p>
                        <p className="mt-2"><strong>Pastikan komponen kustom Anda bisa menerima dan menggunakan props ini, terutama <code>ref</code> jika diperlukan oleh <code>react-hook-form</code>.</strong> Jika komponen kustom adalah functional component, gunakan <code>React.forwardRef</code>.</p>
                        <p className="mt-2"><strong>PENTING:</strong> Saat menggunakan <code>customComponent</code>, pastikan untuk memberikan <code>id</code> pada komponen kustom Anda yang sama dengan prop <code>name</code> pada <code>FormField</code> agar label tetap terhubung dengan benar untuk aksesibilitas.</p>
                        <p className="mt-2"><strong>Props Kunci:</strong> <code>customComponent</code>.</p>
                    </>
                }
                preview={customPreview}
                code={customCode}
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
                            {propsData.map((prop, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><code>{String(prop.name)}</code></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><code>{prop.type}</code></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prop.defaultVal || '-'}</td>
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
                    <p><strong>Integrasi <code>react-hook-form</code>:</strong> Komponen ini dirancang untuk bekerja mulus dengan <code>react-hook-form</code>. Anda wajib menyediakan fungsi <code>register</code> dan objek <code>errors</code>.</p>
                    <p><strong>Struktur Otomatis:</strong> <code>FormField</code> mengurus rendering <code><Label /></code>, <code><Input /></code> (atau <code>customComponent</code>), dan pesan error, sehingga Anda tidak perlu menatanya manual setiap kali.</p>
                    <p><strong>Penanganan Error Visual:</strong> Selain menampilkan pesan teks, input akan memiliki border merah (default) jika ada error terkait, memberikan feedback visual instan kepada pengguna.</p>
                    <p><strong>Aksesibilitas (<code>htmlFor</code>):</strong> <code><Label /></code> secara otomatis terhubung dengan input melalui atribut <code>htmlFor</code> yang nilainya diambil dari prop <code>name</code>.</p>
                    <p><strong>Fleksibilitas dengan <code>customComponent</code>:</strong> Ini adalah fitur kuat yang memungkinkan Anda menggunakan <code>FormField</code> sebagai wrapper konsisten bahkan untuk elemen form yang tidak standar, sambil tetap mendapatkan manfaat dari integrasi <code>react-hook-form</code> dan tampilan error.</p>
                    <p><strong>Styling:</strong> Gunakan <code>inputClassName</code> untuk kustomisasi tampilan input standar. Untuk <code>customComponent</code>, styling dilakukan di komponen itu sendiri.</p>
                </div>
            </section>
        </div>
    );
}