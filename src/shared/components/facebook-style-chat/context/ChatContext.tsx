// src/context/ChatContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User } from '../types';

interface ChatContextType {
    user: User | null;
    login: (name: string, companyId: string) => void;
    logout: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};

interface ChatProviderProps {
    children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('chat_username');
        const storedCompanyId = localStorage.getItem('chat_company_id');
        if (storedUsername && storedCompanyId) {
            setUser({ name: storedUsername, companyId: storedCompanyId });
        }
    }, []);

    const login = (name: string, companyId: string) => {
        const newUser = { name, companyId };
        localStorage.setItem('chat_username', name);
        localStorage.setItem('chat_company_id', companyId);
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem('chat_username');
        localStorage.removeItem('chat_company_id');
        setUser(null);
        window.location.reload();
    };

    const value = { user, login, logout };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};