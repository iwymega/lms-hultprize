import React, { useState, useEffect } from 'react';
import { User, UnreadCounts } from '../types';
// REVISI: Mengganti heroicons dengan lucide-react
import { LogOut, Menu, X } from 'lucide-react';

interface SidebarProps {
    currentUser: User;
    onlineUsers: string[];
    currentChatTarget: string;
    unreadCounts: UnreadCounts;
    onSetTarget: (target: string) => void;
    onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser, onlineUsers, currentChatTarget, unreadCounts, onSetTarget, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => setIsMenuOpen(window.innerWidth >= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // const handleTargetClick = (target: string) => {
    //     onSetTarget(target);
    //     if (window.innerWidth < 768) setIsMenuOpen(false);
    // };

    console.log(`[SIDEBAR] Menerima prop 'onSetTarget'. Tipenya adalah: ${typeof onSetTarget}`);

    // PASANG LOG DI SINI
    const handleTargetClick = (target: string) => {
        console.log(`[SIDEBAR] handleTargetClick dipanggil dengan target: '${target}'`);

        // PERIKSA LAGI TEPAT SEBELUM MEMANGGIL
        if (typeof onSetTarget === 'function') {
            onSetTarget(target);
        } else {
            console.error("[SIDEBAR] GAGAL! onSetTarget bukan sebuah fungsi!");
        }

        if (window.innerWidth < 768) setIsMenuOpen(false);
    };

    const SidebarItem: React.FC<{ name: string; target: string; unreadCount: number }> = ({ name, target, unreadCount }) => (
        <li
            className={`p-3 sm:p-4 border-b border-slate-100 hover:border-slate-200 cursor-pointer flex items-center justify-between transition duration-150 hover:bg-blue-50/50 ${currentChatTarget === target ? 'bg-blue-100' : ''}`}
            onClick={() => handleTargetClick(target)}
        >
            <span className={`font-medium overflow-hidden text-ellipsis whitespace-nowrap text-sm ${currentChatTarget === target ? 'text-blue-700' : 'text-gray-700'}`}>{name}</span>
            {unreadCount > 0 && (
                <span className="bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs font-bold ml-2">{unreadCount}</span>
            )}
        </li>
    );

    return (
        <div className="w-full shrink-0 md:w-[35%] min-w-0 md:min-w-[280px] border-r border-slate-200 flex flex-col bg-slate-50 h-auto md:h-full">
            <h3 className="p-4 bg-blue-500 text-white text-base font-semibold border-b border-blue-600 flex justify-between items-center shrink-0 relative">
                <span>Chat <span className="font-bold text-sm opacity-90">{currentUser.companyId}</span></span>
                <div className="flex items-center space-x-2 md:hidden">
                    <button onClick={onLogout} type="button" className="p-1 text-white hover:bg-blue-700 rounded" title="Logout">
                        {/* REVISI: Menggunakan ikon Lucide */}
                        <LogOut className="h-5 w-5" />
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="p-1 text-white hover:bg-blue-700 rounded">
                        {/* REVISI: Menggunakan ikon Lucide */}
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </h3>

            <ul className={`flex-grow overflow-y-auto list-none p-0 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                <SidebarItem name="Diskusi Global" target="public" unreadCount={unreadCounts['public'] || 0} />
                {onlineUsers.filter(u => u !== currentUser.name).map(user => (
                    <SidebarItem key={user} name={user} target={user} unreadCount={unreadCounts[user] || 0} />
                ))}
            </ul>

            <div className="hidden md:flex mt-auto p-3 border-t border-slate-200 bg-slate-50 items-center justify-center">
                <button onClick={onLogout} type="button" className="w-full flex items-center justify-center space-x-2 p-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                    {/* REVISI: Menggunakan ikon Lucide */}
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;