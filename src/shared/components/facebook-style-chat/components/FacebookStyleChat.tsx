// src/components/FacebookStyleChat/FacebookStyleChat.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { useChat } from '../context/ChatContext';
import { useSocket } from '../hooks/useSocket';
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

    const eventHandlers = useMemo(() => ({
        'online users': (users: string[]) => {
            setOnlineUsers(users.sort((a, b) => a.localeCompare(b)));
        },
        'chat message': (data: Message) => {
            // Ini untuk pesan publik, yang tidak kita gunakan di UI ini
            // Tapi tetap kita handle agar state konsisten
            if (data.type === 'public') {
                setMessages(prev => ({ ...prev, 'public': [...(prev['public'] || []), data] }));
            }
        },
        'private chat message': (data: Message) => {
            if (!user) return;
            const isOwnMessage = data.user === user.name;
            const target = isOwnMessage ? data.recipient_username! : data.user;

            setMessages(prev => ({ ...prev, [target]: [...(prev[target] || []), data] }));

            // Otomatis buka chat jika belum terbuka saat menerima pesan
            if (!isOwnMessage && !openChats.includes(target)) {
                setOpenChats(prev => [...prev, target].slice(-3)); // Batasi 3 chatbox
            }
        },
        'private chat history': (data: { recipient: string; messages: Message[] }) => {
            setMessages(prev => ({ ...prev, [data.recipient]: data.messages.slice().reverse() }));
        },
    }), [user, openChats]);

    const { emitEvent } = useSocket({
        url: SOCKET_SERVER_URL,
        user,
        eventHandlers,
    });

    const handleOpenChat = useCallback((targetUser: string) => {
        if (!openChats.includes(targetUser)) {
            // Batasi maksimal 3 chatbox agar tidak menumpuk
            setOpenChats(prev => [...prev, targetUser].slice(-3));
            emitEvent('request private chat history', {
                currentUser: user?.name,
                recipientUser: targetUser
            });
        }
        setIsDrawerOpen(false);
    }, [openChats, user, emitEvent]);

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
        return null; // Jangan render apapun jika user belum login
    }

    return (
        // Pointer events none agar tidak menghalangi interaksi page di belakangnya
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