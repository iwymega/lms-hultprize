import React, { useState } from 'react';
import { Message } from '../types';

interface MessageInputProps {
    target: string;
    companyId: string;
    replyingTo: Message | null;
    onSendMessage: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ target, companyId, replyingTo, onSendMessage }) => {
    const [text, setText] = useState('');

    let placeholder = 'Ketik pesan Anda...';
    if (replyingTo && target === 'public') {
        placeholder = `Balas ke ${replyingTo.user}: Ketik pesan Anda...`;
    } else if (target === 'public') {
        placeholder = `Pesan ke semua di room ${companyId || 'publik'}...`;
    } else if (target) {
        placeholder = `Pesan pribadi ke ${target}...`;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onSendMessage(text);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-slate-200 flex bg-slate-100 gap-2 sm:gap-3 items-center shrink-0">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                autoComplete="off"
                placeholder={placeholder}
                className="flex-grow p-3 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            />
            <button
                type="submit"
                className="py-3 px-5 sm:px-6 bg-blue-500 text-white border-none rounded-full cursor-pointer text-sm font-semibold transition duration-150 hover:bg-blue-600 disabled:bg-blue-300"
                disabled={!text.trim()}
            >
                Kirim
            </button>
        </form>
    );
};

export default MessageInput;