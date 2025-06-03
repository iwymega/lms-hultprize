// OverviewDoc.tsx (Revisi dengan ide baru)
export function OverviewDoc() {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold mb-4">Selamat Datang di Dokumentasi Base Project</h1>

            <p className="text-muted-foreground">
                Hai Frontend Developer! 👋 Selamat datang di dokumentasi <strong>Base Project</strong>.
                Template ini dirancang dari developer untuk developer, dengan tujuan utama
                mempercepat dan mempermudah proses pembuatan antarmuka pengguna (UI) modern yang
                fleksibel dan scalable.
            </p>

            <p>
                {/* Pesan Kunci dari Anda */}
                <strong>
                    "Base ini gw ciptakan untuk membantu pembuatan web apps secara cepat dan tepat,
                    sebisa mungkin membantu bukan menyusahkan bagi developer, berusaha selalu clean dan reusable custom."
                </strong>
            </p>

            <hr className="my-6" />

            <h2 className="text-2xl font-semibold mt-6 mb-3">Mengapa Base Project Ini?</h2>
            <p>
                Kami percaya bahwa fondasi yang solid adalah kunci untuk pengembangan aplikasi yang efisien.
                Base Project ini hadir untuk:
            </p>
            <ul>
                <li>
                    <strong>Mempercepat Pengembangan UI:</strong> Menyediakan komponen siap pakai dan struktur yang
                    jelas agar Anda bisa fokus pada fitur, bukan boilerplate.
                </li>
                <li>
                    <strong>Meningkatkan Skalabilitas:</strong> Dengan struktur folder yang terorganisir dan
                    modular, penambahan konten dan komponen baru menjadi lebih mudah, baik untuk proyek
                    kecil maupun skala besar.
                </li>
                <li>
                    <strong>Mendorong Fleksibilitas:</strong> Komponen dirancang agar dapat digunakan kembali dan
                    dikustomisasi sesuai kebutuhan spesifik proyek Anda.
                </li>
                <li>
                    <strong>Meningkatkan Produktivitas Tim:</strong> Standarisasi melalui base ini dapat
                    memudahkan kolaborasi antar developer di tim Anda.
                </li>
            </ul>


            <h2 className="text-2xl font-semibold mt-6 mb-3">Dibangun Dengan Teknologi Pilihan</h2>
            <p>
                Base Project ini mengintegrasikan serangkaian teknologi modern yang telah teruji untuk
                mendukung pengembangan aplikasi web yang handal dan berperforma tinggi:
            </p>
            <ul>
                <li><strong>React & TypeScript:</strong> Untuk UI yang interaktif dan kode yang terstruktur.</li>
                <li><strong>Shadcn/UI & Tailwind CSS:</strong> Untuk komponen UI yang modern, aksesibel, dan mudah dikustomisasi.</li>
                <li><strong>TanStack Query (React Query):</strong> Untuk manajemen data server-side yang efisien, caching, dan sinkronisasi.</li>
                <li><strong>React Hook Form & Zod:</strong> Untuk validasi form yang kuat dan deklaratif.</li>
                <li><strong>Axios:</strong> Untuk melakukan HTTP request ke API dengan mudah.</li>
                <li><strong>i18next (atau library i18n lainnya):</strong> Untuk dukungan multibahasa pada aplikasi Anda.</li>
                {/* Tambahkan jika ada teknologi kunci lain */}
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-3">Fitur Unggulan</h2>
            <ul>
                <li>
                    <strong>Struktur Folder Scalable:</strong> Dirancang untuk memudahkan navigasi, pemeliharaan,
                    dan pertumbuhan proyek. (Detail lebih lanjut akan ada di bagian <a href="#struktur-folder-placeholder">[Struktur Folder]</a>).
                </li>
                <li>
                    <strong>Manajemen API Terstruktur:</strong> Dilengkapi dengan `services` folder yang berisi
                    definisi schema (Zod), tipe respons, dan custom hooks (TanStack Query) untuk interaksi
                    dengan API yang rapi dan type-safe.
                </li>
                <li>
                    <strong>Koleksi Komponen Reusable:</strong> Termasuk komponen seperti `CurrencyInput`, `SearchableSelect`,
                    `ImageUploadWithPreview`, dan `RadioItemList` yang siap digunakan dan dikustomisasi.
                    Lihat detailnya di bagian <a href="/docs/components">[Komponen]</a>.
                </li>
                {/* Tambahkan fitur unggulan lain jika ada */}
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-3">Menjelajahi Dokumentasi</h2>
            <p>
                Dokumentasi ini akan terus berkembang. Saat ini, Anda dapat menemukan:
            </p>
            <ul>
                <li><strong>Panduan Komponen:</strong> Detail penggunaan dan contoh untuk setiap komponen UI yang tersedia.</li>
                <li><strong>(Segera Hadir) Struktur Folder:</strong> Penjelasan mendalam mengenai organisasi folder dan alasannya.</li>
                {/* Tambahkan bagian lain yang direncanakan */}
            </ul>
            <p>
                Gunakan navigasi di samping untuk menjelajahi topik yang tersedia.
            </p>

            <p className="mt-8 italic text-sm text-muted-foreground">
                Semoga Base Project ini bermanfaat dan mempercepat workflow pengembangan Anda. Happy coding! 🚀
            </p>

            <hr className="my-6" />

            <p className="text-xs text-muted-foreground italic">
                ⚠️ Developer sangat malas, jadi teks ini di-generate oleh A.I. Jangan terlalu serius ya 😅
                (Tapi inputnya dari developer sungguhan kok!)
            </p>
        </div>
    );
}