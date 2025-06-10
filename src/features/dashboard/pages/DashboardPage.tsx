import React from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import DashboardMainContent from '../components/DashboardMainContent'
import { useChat } from '@/shared/components/facebook-style-chat/context/ChatContext';
import FacebookStyleChat from '@/shared/components/facebook-style-chat/components/FacebookStyleChat';
import LoginScreen from '@/features/livechat/components/LoginScreen';

const DashboardPage: React.FC = () => {
    const { user } = useChat();

    // return (
    //     <AdminLayout>
    //         <DashboardMainContent />
    //     </AdminLayout>
    // )

    return user ? (
        <>
            {/* INI ADALAH KONTEN UTAMA WEBSITE ANDA */}
            {/* Komponen ini bisa apa saja, dashboard, halaman produk, dll */}
            {/* INI KOMPONEN CHAT BARU KITA */}
            <AdminLayout>
                <DashboardMainContent />
                <FacebookStyleChat />
            </AdminLayout>
        </>
    ) : (
        // Jika belum login, tampilkan layar login seperti biasa
        <div className="flex justify-center items-center w-full h-full">
            <LoginScreen />
        </div>
    );
}

export default DashboardPage