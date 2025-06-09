import React from 'react'
import { ChatProvider, useChat } from '../context/ChatContext';
import ChatInterface from '../components/ChatInterface';
import LoginScreen from '../components/LoginScreen';

const AppGate = () => {
    const { user } = useChat();
    return user ? <ChatInterface /> : <LoginScreen />;
};

const LivechatPage: React.FC = () => {
    return (
        <ChatProvider>
            <div className="m-0 flex justify-center items-center min-h-screen bg-slate-100 antialiased">
                <AppGate />
            </div>
        </ChatProvider>
    )
}

export default LivechatPage