// src/components/ChatInterface.tsx

// Import useMemo
import React, { useState, useCallback, useRef, useMemo } from 'react';
import { useChat } from '../context/ChatContext';
import { useSocket } from '../hooks/useSocket';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import { Message, UnreadCounts } from '../types';

const SOCKET_SERVER_URL = "https://livechat.gotrasoft.com/";

const ChatInterface: React.FC = () => {
    const { user, logout } = useChat();
    const notificationSoundRef = useRef<HTMLAudioElement>(null);

    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [messages, setMessages] = useState<{ [target: string]: Message[] }>({});
    const [unreadCounts, setUnreadCounts] = useState<UnreadCounts>({ 'public': 0 });
    const [currentChatTarget, setCurrentChatTarget] = useState<string>('public');
    const [replyingTo, setReplyingTo] = useState<Message | null>(null);

    const playNotificationSound = useCallback(() => {
        notificationSoundRef.current?.play().catch(e => console.warn(e));
    }, []);

    // REVISI: Menggunakan useMemo untuk me-memoize objek eventHandlers
    const eventHandlers = useMemo(() => ({
        'online users': (users: string[]) => {
            setOnlineUsers(users.sort((a, b) => a.localeCompare(b)));
        },
        'chat message': (data: Message) => {
            if (!user) return;
            const isOwnMessage = data.user === user.name;
            const target = data.type === 'public' ? 'public' : (isOwnMessage ? data.recipient_username! : data.user);

            setMessages(prev => ({ ...prev, [target]: [...(prev[target] || []), data] }));

            if (!isOwnMessage && target !== currentChatTarget) {
                setUnreadCounts(prev => ({ ...prev, [target]: (prev[target] || 0) + 1 }));
                playNotificationSound();
            }
        },
        'public chat history': (history: Message[]) => {
            setMessages(prev => ({ ...prev, 'public': history.slice().reverse() }));
        },
        'private chat history': (data: { recipient: string; messages: Message[] }) => {
            setMessages(prev => ({ ...prev, [data.recipient]: data.messages.slice().reverse() }));
        },
        'message read confirmation': (data: { messageId: string }) => {
            setMessages(prev => {
                const newMessages = { ...prev };
                for (const target in newMessages) {
                    const msgIndex = newMessages[target].findIndex(m => m.id === data.messageId);
                    if (msgIndex > -1) {
                        newMessages[target][msgIndex] = { ...newMessages[target][msgIndex], is_read: true };
                        break;
                    }
                }
                return newMessages;
            });
        },
    }), [user, currentChatTarget, playNotificationSound]); // Array dependensi tetap sama

    const { emitEvent } = useSocket({
        url: SOCKET_SERVER_URL,
        user,
        eventHandlers,
    });

    const handleSetTarget = (target: string) => {
        setCurrentChatTarget(target);
        setUnreadCounts(prev => ({ ...prev, [target]: 0 }));
        setReplyingTo(null);

        if (!messages[target]) {
            if (target === 'public') {
                emitEvent('request public chat history', user?.companyId);
            } else {
                emitEvent('request private chat history', {
                    currentUser: user?.name,
                    recipientUser: target
                });
            }
        }
    };

    const handleSendMessage = (messageText: string) => {
        if (!user || !messageText.trim()) return;

        let payload: { message: string;[key: string]: any } = { message: messageText };

        if (replyingTo && currentChatTarget === 'public') {
            payload.repliedToMessageId = replyingTo.id;
            payload.repliedToMessageUser = replyingTo.user;
            payload.repliedToMessageText = replyingTo.message;
        }

        if (currentChatTarget === 'public') {
            emitEvent('chat message', payload);
        } else {
            emitEvent('private chat message', {
                recipientUser: currentChatTarget,
                message: messageText
            });
        }
        setReplyingTo(null);
    };

    if (!user) return null;

    return (
        <>
            <audio ref={notificationSoundRef} src="/mixkit-positive-notification-951.mp3" preload="auto"></audio>
            <div className="flex flex-col md:flex-row w-full md:w-[95%] max-w-[1100px] h-screen md:h-[90vh] md:min-h-[550px] bg-white rounded-none md:rounded-xl shadow-2xl overflow-hidden md:mx-auto">
                <Sidebar
                    currentUser={user}
                    onlineUsers={onlineUsers}
                    currentChatTarget={currentChatTarget}
                    unreadCounts={unreadCounts}
                    onSetTarget={handleSetTarget}
                    onLogout={logout}
                />
                <ChatWindow
                    currentUser={user}
                    target={currentChatTarget}
                    messages={messages[currentChatTarget] || []}
                    replyingTo={replyingTo}
                    onSetReplyingTo={setReplyingTo}
                    onCancelReply={() => setReplyingTo(null)}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </>
    );
};

export default ChatInterface;