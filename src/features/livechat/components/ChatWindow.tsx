import React from 'react';
import MessageFeed from './MessageFeed';
import MessageInput from './MessageInput';
import ReplyPreview from './ReplyPreview';
import { User, Message } from '../types';

interface ChatWindowProps {
    currentUser: User;
    target: string;
    messages: Message[];
    replyingTo: Message | null;
    onSetReplyingTo: (message: Message) => void;
    onCancelReply: () => void;
    onSendMessage: (text: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ currentUser, target, messages, replyingTo, onSetReplyingTo, onCancelReply, onSendMessage }) => {
    const headerText = target === 'public' ? `Diskusi Global Room: ${currentUser.companyId}` : `Chat Pribadi: ${target}`;

    return (
        <div className="flex-grow w-full md:w-[65%] flex flex-col min-h-0 min-w-0 md:h-full bg-stone-100">
            <div className="p-4 bg-slate-50 border-b border-slate-200 text-base sm:text-lg font-medium text-gray-700 shrink-0">
                {headerText}
            </div>

            {replyingTo && (
                <ReplyPreview replyingTo={replyingTo} onCancel={onCancelReply} />
            )}

            <MessageFeed
                messages={messages}
                currentUser={currentUser}
                onSetReplyingTo={onSetReplyingTo}
            />

            <MessageInput
                target={target}
                companyId={currentUser.companyId}
                replyingTo={replyingTo}
                onSendMessage={onSendMessage}
            />
        </div>
    );
};

export default ChatWindow;