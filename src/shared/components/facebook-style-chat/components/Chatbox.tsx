// src/components/FacebookStyleChat/Chatbox.tsx
import React, { useState, useEffect, useRef } from 'react';
// Path import Anda sudah benar, saya sesuaikan dengan yang Anda berikan
import { User, Message } from '@/shared/components/facebook-style-chat/types';
import { X, Minus, Send, Check, CheckCheck } from 'lucide-react';

interface ChatboxProps {
    currentUser: User;
    targetUser: string;
    messages: Message[];
    onSendMessage: (recipientUser: string, messageText: string) => void;
    onClose: () => void;
    onFocus: () => void;
}

const Chatbox: React.FC<ChatboxProps> = ({ currentUser, targetUser, messages, onSendMessage, onClose, onFocus }) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [text, setText] = useState('');
    const feedRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (feedRef.current) {
            feedRef.current.scrollTop = feedRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (!isMinimized) {
            inputRef.current?.focus();
            onFocus();
        }
    }, [isMinimized, onFocus]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onSendMessage(targetUser, text);
            setText('');
        }
    };

    const handleHeaderClick = () => {
        setIsMinimized(!isMinimized);
        if (isMinimized) {
            onFocus();
        }
    };

    return (
        <div
            // --- INI PERUBAHANNYA ---
            // Tinggi div utama sekarang dinamis berdasarkan state `isMinimized`
            className={`w-80 bg-white rounded-t-lg shadow-2xl flex flex-col transition-all duration-300 ${isMinimized ? 'h-auto' : 'h-[450px]'}`}
            onClick={onFocus}
        >
            <div
                className="p-3 bg-blue-600 text-white rounded-t-lg flex justify-between items-center cursor-pointer"
                onClick={handleHeaderClick}
            >
                <h3 className="font-semibold">{targetUser}</h3>
                <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); handleHeaderClick(); }} className="p-1 hover:bg-blue-700 rounded-full"><Minus size={18} /></button>
                    <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-1 hover:bg-blue-700 rounded-full"><X size={18} /></button>
                </div>
            </div>

            {/* Konten chatbox tetap sama, disembunyikan dengan `hidden` saat terminimize */}
            <div className={`flex-grow flex flex-col min-h-0 transition-all duration-300 ${isMinimized ? 'hidden' : 'flex'}`}>
                <div ref={feedRef} className="flex-grow p-3 overflow-y-auto">
                    <ul className="flex flex-col gap-1">
                        {messages.map((msg) => {
                            const isOutgoing = msg.user === currentUser.name;
                            return (
                                <li key={msg.id} className={`flex flex-col ${isOutgoing ? 'items-end' : 'items-start'}`}>
                                    <div className={`max-w-[80%] p-2 rounded-lg text-sm ${isOutgoing ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                        {msg.message}
                                    </div>
                                    {isOutgoing && (
                                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                                            {msg.is_read ? (
                                                <CheckCheck size={16} className="text-sky-400" />
                                            ) : (
                                                <Check size={16} />
                                            )}
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <form onSubmit={handleSubmit} className="p-2 border-t flex items-center gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onFocus={onFocus}
                        placeholder="Ketik pesan..."
                        className="w-full p-2 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <button type="submit" disabled={!text.trim()} className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 disabled:bg-blue-300">
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbox;