// src/components/FacebookStyleChat/FacebookStyleChat.tsx

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useChat } from '@/shared/components/facebook-style-chat/context/ChatContext';
import { useSocket } from '@/shared/components/facebook-style-chat/hooks/useSocket';
import { Message } from '@/shared/components/facebook-style-chat/types';
import ChatTrigger from './ChatTrigger';
import UserListDrawer from './UserListDrawer';
import ChatboxContainer from './ChatboxContainer';

const NOTIFICATION_SOUND_URL = `${import.meta.env.VITE_BASE_APP_URL}/livechat/mixkit-positive-notification-951.mp3` || "/assets/audio/notification.mp3";
const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL || "https://livechat.gotrasoft.com/";

const FacebookStyleChat: React.FC = () => {
    const { user } = useChat();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [messages, setMessages] = useState<{ [target: string]: Message[] }>({});
    const [openChats, setOpenChats] = useState<string[]>([]);
    const [activeChat, setActiveChat] = useState<string | null>(null);

    const notificationSoundRef = useRef<HTMLAudioElement | null>(null);
    const openChatsRef = useRef(openChats);
    const activeChatRef = useRef(activeChat);

    useEffect(() => {
        openChatsRef.current = openChats;
    }, [openChats]);

    useEffect(() => {
        activeChatRef.current = activeChat;
    }, [activeChat]);

    const playNotificationSound = useCallback(() => {
        notificationSoundRef.current?.play().catch(e => console.warn("Gagal memutar audio notifikasi:", e));
    }, []);

    const eventHandlers = useMemo(() => ({
        'online users': (users: string[]) => {
            setOnlineUsers(users.sort((a, b) => a.localeCompare(b)));
        },
        // <<< INI KUNCINYA: Handler baru ditambahkan untuk meniru kode lama yang berfungsi >>>
        'chat message': (data: Message) => {
            if (!user || data.type === 'public') return; // Abaikan pesan publik di UI ini

            const isOwnMessage = data.user === user.name;
            const target = isOwnMessage ? data.recipient_username! : data.user;

            setMessages(prev => ({ ...prev, [target]: [...(prev[target] || []), data] }));

            if (!isOwnMessage) {
                if (!openChatsRef.current.includes(target)) {
                    setOpenChats(prevChats => [...prevChats, target].slice(-3));
                }
                if (target !== activeChatRef.current) {
                    playNotificationSound();
                }
            }
        },
        'private chat history': (data: { recipient: string; messages: Message[] }) => {
            setMessages(prev => ({ ...prev, [data.recipient]: data.messages.slice().reverse() }));
        },
        'message read confirmation': (data: { reader: string, target: string }) => {
            const chatPartner = data.reader;
            setMessages(prev => {
                const partnerMessages = prev[chatPartner];
                if (!partnerMessages) return prev;
                const newPartnerMessages = partnerMessages.map(msg =>
                    msg.user === user?.name && !msg.is_read ? { ...msg, is_read: true } : msg
                );
                return { ...prev, [chatPartner]: newPartnerMessages };
            });
        },
    }), [user, playNotificationSound]);

    const { emitEvent } = useSocket({
        url: SOCKET_SERVER_URL,
        user,
        eventHandlers,
    });

    const markMessagesAsRead = useCallback((targetUser: string) => {
        const targetMessages = messages[targetUser] || [];
        const unreadMessageIds = targetMessages
            .filter(msg => msg.user === targetUser && !msg.is_read)
            .map(msg => msg.id);

        if (unreadMessageIds.length > 0) {
            emitEvent('mark messages as read', { reader: user?.name, target: targetUser });
            setMessages(prev => {
                const newTargetMessages = (prev[targetUser] || []).map(msg =>
                    unreadMessageIds.includes(msg.id) ? { ...msg, is_read: true } : msg
                );
                return { ...prev, [targetUser]: newTargetMessages };
            });
        }
    }, [messages, user, emitEvent]);

    const handleOpenChat = useCallback((targetUser: string) => {
        if (!openChats.includes(targetUser)) {
            setOpenChats(prev => [...prev.filter(c => c !== targetUser), targetUser].slice(-3));
            emitEvent('request private chat history', {
                currentUser: user?.name,
                recipientUser: targetUser
            });
        }
        setIsDrawerOpen(false);
        setActiveChat(targetUser);
        markMessagesAsRead(targetUser);
    }, [openChats, user, emitEvent, markMessagesAsRead]);

    const handleChatboxFocus = useCallback((targetUser: string) => {
        setActiveChat(targetUser);
        markMessagesAsRead(targetUser);
    }, [markMessagesAsRead]);

    const handleCloseChat = useCallback((targetUser: string) => {
        setOpenChats(prev => prev.filter(u => u !== targetUser));
        if (activeChat === targetUser) {
            setActiveChat(null);
        }
    }, [activeChat]);

    const handleSendMessage = useCallback((recipientUser: string, messageText: string) => {
        if (!user || !messageText.trim()) return;
        // Event yang dikirim tetap 'private chat message', sesuai dengan kode lama.
        emitEvent('private chat message', {
            recipientUser,
            message: messageText,
        });
    }, [user, emitEvent]);


    if (!user) {
        return null;
    }

    return (
        <>
            <audio ref={notificationSoundRef} src={NOTIFICATION_SOUND_URL} preload="auto"></audio>
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
                    onFocusChat={handleChatboxFocus}
                />
            </div>
        </>
    );
};

export default FacebookStyleChat;