// src/components/FacebookStyleChat/Chatbox.tsx
import React, { useState, useEffect, useRef } from 'react';
import { User, Message } from '../types'
import { X, Minus, Send } from 'lucide-react';

interface ChatboxProps {
    currentUser: User;
    targetUser: string;
    messages: Message[];
    onSendMessage: (recipientUser: string, messageText: string) => void;
    onClose: () => void;
}

const Chatbox: React.FC<ChatboxProps> = ({ currentUser, targetUser, messages, onSendMessage, onClose }) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [text, setText] = useState('');
    const feedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Auto scroll to bottom
        if (feedRef.current) {
            feedRef.current.scrollTop = feedRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onSendMessage(targetUser, text);
            setText('');
        }
    };

    return (
        <div className="w-80 h-[450px] bg-white rounded-t-lg shadow-2xl flex flex-col transition-all duration-300">
            <div
                className="p-3 bg-blue-600 text-white rounded-t-lg flex justify-between items-center cursor-pointer"
                onClick={() => setIsMinimized(!isMinimized)}
            >
                <h3 className="font-semibold">{targetUser}</h3>
                <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="p-1 hover:bg-blue-700 rounded-full"><Minus size={18} /></button>
                    <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-1 hover:bg-blue-700 rounded-full"><X size={18} /></button>
                </div>
            </div>

            <div className={`flex-grow flex flex-col min-h-0 transition-all duration-300 ${isMinimized ? 'h-0 hidden' : 'h-full'}`}>
                {/* Message Feed */}
                <div ref={feedRef} className="flex-grow p-3 overflow-y-auto">
                    <ul className="flex flex-col gap-2">
                        {messages.map((msg, index) => {
                            const isOutgoing = msg.user === currentUser.name;
                            return (
                                <li key={msg.id || index} className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-[80%] p-2 rounded-lg text-sm ${isOutgoing ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                                    >
                                        {msg.message}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Message Input */}
                <form onSubmit={handleSubmit} className="p-2 border-t flex items-center gap-2">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
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