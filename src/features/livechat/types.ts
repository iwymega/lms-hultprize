// src/types.ts
export interface User {
    name: string;
    companyId: string;
}

export interface Message {
    id: string;
    user: string;
    message: string;
    timestamp: string;
    type: 'public' | 'private' | 'notification';
    is_read?: boolean;
    replied_to_message_id?: string;
    replied_to_message_user?: string;
    replied_to_message_text?: string;
    recipient_username?: string;
}

export interface UnreadCounts {
    [target: string]: number;
}