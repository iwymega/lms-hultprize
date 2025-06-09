import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

// Kita bisa gunakan tipe LogItem dari tugas sebelumnya atau buat yang baru
interface NotificationItem {
    id: string;
    timestamp: string;
    type: string;
    room_id: string;
    payload: any;
}

interface NotificationContextType {
    notifications: NotificationItem[];
    unreadCount: number;
    clearUnread: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};

const SOCKET_SERVER_URL = "https://realtime-data.gotrasoft.com/";
// Bergabung ke room yang relevan untuk notifikasi
const NOTIFICATION_ROOM_ID = "my_test_room"; // Ganti dengan room ID Anda

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);

    useEffect(() => {
        const socket: Socket = io(SOCKET_SERVER_URL);

        socket.on('connect', () => {
            console.log('[NOTIF_SOCKET] Terhubung, bergabung ke room:', NOTIFICATION_ROOM_ID);
            socket.emit('join_room', { room_id: NOTIFICATION_ROOM_ID });
        });

        // Dapatkan riwayat awal saat bergabung
        socket.on('data_history', (response: { history: NotificationItem[] }) => {
            console.log('[NOTIF_SOCKET] Menerima riwayat notifikasi:', response.history);
            setNotifications(response.history.slice().reverse()); // Tampilkan yang terbaru di atas
        });

        // Dapatkan data/notifikasi baru
        socket.on('new_data', (data: NotificationItem) => {
            console.log('[NOTIF_SOCKET] Notifikasi baru diterima:', data);
            // Tambahkan notifikasi baru ke paling atas daftar
            setNotifications(prev => [data, ...prev]);
            // Tambah jumlah yang belum dibaca
            setUnreadCount(prev => prev + 1);
        });

        return () => {
            console.log('[NOTIF_SOCKET] Membersihkan koneksi socket notifikasi.');
            socket.disconnect();
        };
    }, []);

    const clearUnread = useCallback(() => {
        setUnreadCount(0);
    }, []);

    const value = { notifications, unreadCount, clearUnread };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};