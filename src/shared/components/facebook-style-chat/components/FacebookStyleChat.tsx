// src/components/FacebookStyleChat/FacebookStyleChat.tsx

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'; // 1. Tambahkan useRef
import { useChat } from '../context/ChatContext';
import { useSocket } from '../hooks/useSocket'
import { Message } from '../types';
import ChatTrigger from './ChatTrigger';
import UserListDrawer from './UserListDrawer';
import ChatboxContainer from './ChatboxContainer';

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL || "https://livechat.gotrasoft.com/";

const FacebookStyleChat: React.FC = () => {
    const { user } = useChat();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [messages, setMessages] = useState<{ [target: string]: Message[] }>({});
    const [openChats, setOpenChats] = useState<string[]>([]);

    // --- SOLUSI DIMULAI DI SINI ---
    // 2. Buat sebuah ref untuk menyimpan state openChats
    const openChatsRef = useRef(openChats);

    // 3. Update ref setiap kali state openChats berubah
    useEffect(() => {
        openChatsRef.current = openChats;
    }, [openChats]);
    // --- AKHIR DARI BAGIAN SOLUSI ---

    const eventHandlers = useMemo(() => ({
        'online users': (users: string[]) => {
            setOnlineUsers(users.sort((a, b) => a.localeCompare(b)));
        },
        'private chat message': (data: Message) => {
            if (!user) return;
            const isOwnMessage = data.user === user.name;
            const target = isOwnMessage ? data.recipient_username! : data.user;

            setMessages(prev => ({ ...prev, [target]: [...(prev[target] || []), data] }));

            // 4. Gunakan nilai dari ref, bukan dari state langsung
            if (!isOwnMessage && !openChatsRef.current.includes(target)) {
                // Jangan gunakan setOpenChats(prev => ...) di sini karena akan memicu loop
                // Cukup update ref saja, karena state akan diupdate di tempat lain jika perlu
                setOpenChats(prevChats => [...prevChats, target].slice(-3));
            }
        },
        'private chat history': (data: { recipient: string; messages: Message[] }) => {
            console.log(`[DEBUG-2] Menerima 'private chat history' untuk: ${data.recipient}. Jumlah: ${data.messages.length}`);
            setMessages(prev => ({ ...prev, [data.recipient]: data.messages.slice().reverse() }));
        },
        // 'public' events bisa ditambahkan kembali jika perlu
    }), [user]); // 5. HAPUS `openChats` dari array dependensi ini

    const { emitEvent } = useSocket({
        url: SOCKET_SERVER_URL,
        user,
        eventHandlers, // Sekarang eventHandlers sudah stabil dan tidak berubah-ubah
    });

    const handleOpenChat = useCallback((targetUser: string) => {
        console.log(`[DEBUG-1] handleOpenChat dipanggil untuk: ${targetUser}`);
        if (!openChats.includes(targetUser)) {
            // Batasi maksimal 3 chatbox agar tidak menumpuk
            setOpenChats(prev => [...prev.filter(c => c !== targetUser), targetUser].slice(-3));

            console.log(`[DEBUG-1.1] Mengirim event 'request private chat history' ke server...`);
            emitEvent('request private chat history', {
                currentUser: user?.name,
                recipientUser: targetUser
            });
        }
        setIsDrawerOpen(false);
    }, [openChats, user, emitEvent]); // openChats boleh ada di sini karena ini adalah useCallback biasa, bukan yang mempengaruhi socket.

    const handleCloseChat = useCallback((targetUser: string) => {
        setOpenChats(prev => prev.filter(u => u !== targetUser));
    }, []);

    const handleSendMessage = useCallback((recipientUser: string, messageText: string) => {
        if (!user || !messageText.trim()) return;
        emitEvent('private chat message', {
            recipientUser,
            message: messageText,
        });
    }, [user, emitEvent]);


    if (!user) {
        return null;
    }

    return (
        <div className="fixed inset-0 pointer-events-none z-40">
            <ChatTrigger onClick={() => setIsDrawerOpen(prev => !prev)} />

            <UserListDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                currentUser={user}
                onlineUsers={onlineUsers}
                onUserSelect={handleOpenChat}
            />

            <ChatboxContainer
                currentUser={user}
                openChats={openChats}
                messages={messages}
                onSendMessage={handleSendMessage}
                onCloseChat={handleCloseChat}
            />
        </div>
    );
};

export default FacebookStyleChat;