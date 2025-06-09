import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import { Message, User } from '../types';

interface MessageFeedProps {
    messages: Message[];
    currentUser: User;
    onSetReplyingTo: (message: Message) => void;
}

const MessageFeed: React.FC<MessageFeedProps> = ({ messages, currentUser, onSetReplyingTo }) => {
    const feedRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (feedRef.current) {
            feedRef.current.scrollTop = feedRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <ul ref={feedRef} className="flex-grow overflow-y-auto p-3 sm:p-5 list-none m-0 flex flex-col space-y-2.5">
            {messages.map((msg, index) => (
                <MessageItem
                    key={msg.id || `${msg.user}-${index}`}
                    message={msg}
                    currentUser={currentUser}
                    onSetReplyingTo={onSetReplyingTo}
                />
            ))}
        </ul>
    );
};

export default MessageFeed;