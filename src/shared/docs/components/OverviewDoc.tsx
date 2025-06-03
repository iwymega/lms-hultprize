export function OverviewDoc() {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold mb-4">Selamat Datang di Dokumentasi</h1>

            <p className="text-muted-foreground">
                Hai dev! 👋 Selamat datang di dokumentasi base template yang sudah disiapkan untuk memudahkan kamu membangun aplikasi frontend modern.
            </p>

            <p>
                Di sini kamu akan menemukan berbagai panduan, contoh, dan dokumentasi teknis seputar penggunaan komponen, struktur folder, hingga tips pengembangan dengan stack yang sudah disediakan.
            </p>

            <p>
                Dokumentasi ini masih terus dikembangkan, jadi jangan ragu untuk menambahkan, menyempurnakan, atau menyesuaikan dengan kebutuhan project kamu sendiri.
            </p>

            <h2 className="text-2xl font-semibold mt-8">Navigasi Cepat</h2>
            <ul className="list-disc pl-5">
                <li>Lihat halaman <strong>Install</strong> untuk langkah awal setup</li>
                <li>Pelajari <strong>komponen UI</strong> seperti Button dan Layout</li>
                <li>Gunakan layout dan struktur folder yang sudah disiapkan</li>
            </ul>

            <p className="mt-8 italic text-sm text-muted-foreground">
                Semoga template ini bermanfaat dan mempercepat workflow kamu. Happy coding! 🚀
            </p>

            <hr className="my-6" />

            <p className="text-xs text-muted-foreground italic">
                ⚠️ Developer sangat malas, jadi teks ini di-generate oleh A.I. Jangan terlalu serius ya 😅
            </p>
        </div>
    );
}
