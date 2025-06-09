import React from 'react';
import { Message } from '../types';

interface ReplyPreviewProps {
    replyingTo: Message;
    onCancel: () => void;
}

const ReplyPreview: React.FC<ReplyPreviewProps> = ({ replyingTo, onCancel }) => {
    const snippet = replyingTo.message.substring(0, 70) + (replyingTo.message.length > 70 ? '...' : '');

    return (
        <div className="p-2.5 px-5 bg-slate-200 border-b border-gray-300 text-sm text-gray-800 flex justify-between items-center shrink-0">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap pr-2">
                Membalas <strong className="text-blue-600">{replyingTo.user}</strong>: <span className="text-gray-600">{snippet}</span>
            </div>
            <button onClick={onCancel} title="Cancel Reply" className="bg-none border-none text-2xl font-bold cursor-pointer text-gray-500 hover:text-gray-800 p-0 leading-none">×</button>
        </div>
    );
};

export default ReplyPreview;