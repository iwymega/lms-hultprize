// src/components/FacebookStyleChat/ChatboxContainer.tsx
import React from 'react';
import { User, Message } from '@/shared/components/facebook-style-chat/types'; // <-- Import tipe data
import Chatbox from './Chatbox';

interface ChatboxContainerProps {
    currentUser: User;
    openChats: string[];
    messages: { [target: string]: Message[] };
    onSendMessage: (recipientUser: string, messageText: string) => void;
    onCloseChat: (targetUser: string) => void;
    onFocusChat: (targetUser: string) => void; // <-- Prop baru
}

const ChatboxContainer: React.FC<ChatboxContainerProps> = ({ currentUser, openChats, messages, onSendMessage, onCloseChat, onFocusChat }) => {
    return (
        <div className="fixed bottom-0 right-4 sm:right-[5%] flex items-end gap-4 pointer-events-auto">
            {openChats.map(targetUser => (
                <Chatbox
                    key={targetUser}
                    currentUser={currentUser}
                    targetUser={targetUser}
                    messages={messages[targetUser] || []}
                    onSendMessage={onSendMessage}
                    onClose={() => onCloseChat(targetUser)}
                    onFocus={() => onFocusChat(targetUser)} // <-- Teruskan prop
                />
            ))}
        </div>
    );
};

export default ChatboxContainer;