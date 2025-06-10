// src/components/FacebookStyleChat/UserListDrawer.tsx
import React from 'react';
import { User } from '../types';
import { X, User as UserIcon } from 'lucide-react';

interface UserListDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    currentUser: User;
    onlineUsers: string[];
    onUserSelect: (username: string) => void;
}

const UserListDrawer: React.FC<UserListDrawerProps> = ({ isOpen, onClose, currentUser, onlineUsers, onUserSelect }) => {
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/30 transition-opacity z-40 pointer-events-auto ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 pointer-events-auto flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Online Users</h2>
                    <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-800 rounded-full">
                        <X size={24} />
                    </button>
                </div>
                <ul className="flex-grow overflow-y-auto">
                    {onlineUsers.filter(u => u !== currentUser.name).map(username => (
                        <li key={username}>
                            <button
                                onClick={() => onUserSelect(username)}
                                className="w-full text-left p-4 flex items-center gap-3 hover:bg-gray-100 transition-colors"
                            >
                                <div className="relative">
                                    <UserIcon className="h-8 w-8 text-gray-400" />
                                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
                                </div>
                                <span className="font-medium text-gray-700">{username}</span>
                            </button>
                        </li>
                    ))}
                    {onlineUsers.length <= 1 && (
                        <li className="p-4 text-center text-gray-500 italic">Tidak ada pengguna lain yang online.</li>
                    )}
                </ul>
            </div>
        </>
    );
};

export default UserListDrawer;