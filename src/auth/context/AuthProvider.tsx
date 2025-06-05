import { createContext, ReactNode, useContext, useState } from "react";
import { LoginData } from "../response/loginResponseSchema";

type AuthContextType = {
    user: LoginData | null;
    login: (userData: LoginData, token: string) => void;
    relogin: (userData?: LoginData, token?: string) => void;
    logout: () => void;
    hasRole: (role: string) => boolean;
    hasPermission: (permission: string) => boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<LoginData | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData: LoginData, token: string) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authToken', token);
    };

    const relogin = (userData?: LoginData, token?: string) => {
        if (userData) {
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        }
    
        if (token) {
            localStorage.setItem('authToken', token);
        }
    };
    

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
    };

    const hasRole = (role: string): boolean => {
        return user?.roles.some(r => r.name === role) ?? false;
    };

    const hasPermission = (permission: string): boolean => {
        return user?.permissions.some(p => p.name === permission) ?? false;
    };

    return (
        <AuthContext.Provider value={{ user, login, relogin, logout, hasRole, hasPermission }}>
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