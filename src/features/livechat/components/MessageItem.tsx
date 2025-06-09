import React from 'react';
import { User, Message } from '../types';

interface MessageItemProps {
    message: Message;
    currentUser: User;
    onSetReplyingTo: (message: Message) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, currentUser, onSetReplyingTo }) => {
    if (message.type === 'notification') {
        return (
            <li className="notification italic text-center text-xs text-gray-700 bg-sky-100/70 shadow-none px-2.5 py-1.5 rounded-md self-center max-w-max my-2">
                {message.message}
            </li>
        );
    }

    const isOutgoing = message.user === currentUser.name;
    const date = new Date(message.timestamp || Date.now());
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleReplyClick = () => {
        onSetReplyingTo(message);
    };

    return (
        <li className={`group shadow-sm rounded-lg max-w-[75%] sm:max-w-[70%] flex flex-col relative pt-1.5 ${isOutgoing ? 'bg-emerald-100 rounded-br-none self-end' : 'bg-white rounded-bl-none self-start'}`}>
            {message.replied_to_message_id && (
                <div className={`bg-black/5 p-1.5 sm:p-2 rounded-t-md text-xs border-l-4 mx-2 mb-1 sm:mb-1.5 ${isOutgoing ? 'border-green-500' : 'border-blue-500'}`}>
                    <span className={`font-bold block mb-0.5 ${isOutgoing ? 'text-green-600' : 'text-blue-600'}`}>{message.replied_to_message_user}</span>
                    <p className="whitespace-pre-wrap break-words max-h-[3.9em] overflow-hidden text-ellipsis m-0 p-0 text-gray-600 leading-tight">{message.replied_to_message_text}</p>
                </div>
            )}

            {!isOutgoing && message.type === 'public' && (
                <span className="message-sender text-xs font-bold mb-0.5 px-2.5 block text-blue-500">{message.user}</span>
            )}

            <span className="message-content text-sm text-gray-800 px-2.5 whitespace-pre-wrap break-words">{message.message}</span>

            <div className={`message-time text-xs self-end flex items-center gap-1 mt-1 mr-2 mb-1.5 ${isOutgoing ? 'text-green-700' : 'text-gray-500'}`}>
                {timeString}
                {isOutgoing && message.id && (
                    <span className={`read-status ${message.is_read ? 'read text-sky-500' : 'sent text-green-700/80'}`} data-message-id={message.id}></span>
                )}
            </div>

            {message.type === 'public' && message.id && (
                <button
                    onClick={handleReplyClick}
                    title="Balas pesan ini"
                    className={`reply-btn bg-transparent border-none cursor-pointer text-xl p-0.5 opacity-0 group-hover:opacity-70 hover:!opacity-100 focus:opacity-70 absolute top-0.5 right-0.5 transition-all z-10 ${isOutgoing ? 'text-green-600' : 'text-blue-500'}`}
                >
                    ↩
                </button>
            )}
        </li>
    );
};

export default MessageItem;