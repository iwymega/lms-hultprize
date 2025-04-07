import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../types/User";

type AuthContextType = {
    user: User | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
    hasRole: (role: string) => boolean;
    hasPermission: (permission: string) => boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData: User, token: string) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authToken', token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
    };

    const hasRole = (role: string): boolean => {
        return user?.role.includes(role) ?? false;
    };

    const hasPermission = (permission: string): boolean => {
        return user?.permissions.includes(permission) ?? false;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, hasRole, hasPermission }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}