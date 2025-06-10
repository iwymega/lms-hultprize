import React, { useState } from 'react';
import { useChat } from '@/shared/components/facebook-style-chat/context/ChatContext';

const LoginScreen: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [companyId, setCompanyId] = useState<string>('');
    const { login, logout } = useChat();

    const handleLogin = () => {
        if (name.trim() && companyId.trim()) {
            login(name.trim(), companyId.trim());
        } else {
            alert('Nama dan ID Ruangan/Perusahaan tidak boleh kosong!');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    const handleClearSession = () => {
        logout();
        setName('');
        setCompanyId('');
    };

    return (
        <div className="p-6 sm:p-8 bg-white rounded-xl shadow-xl max-w-md w-[90%] sm:w-full mx-auto">
            <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Selamat Datang di Live Chat</h1>
            <label htmlFor="name-input" className="block mb-1 text-sm font-medium text-gray-700">Nama Anda:</label>
            <input
                type="text"
                id="name-input"
                placeholder="Ketik nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                autoComplete="off"
                className="w-full p-2.5 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
            />

            <label htmlFor="company-id-input" className="block mb-1 text-sm font-medium text-gray-700">ID Ruangan/Perusahaan:</label>
            <input
                type="text"
                id="company-id-input"
                placeholder="Contoh: marketing, support"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                onKeyPress={handleKeyPress}
                autoComplete="off"
                className="w-full p-2.5 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
            />

            <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={handleLogin} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-150 text-sm">
                    Mulai Ngobrol
                </button>
                <button onClick={handleClearSession} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-150 text-sm">
                    Hapus Sesi & Keluar
                </button>
            </div>
        </div>
    );
};

export default LoginScreen;