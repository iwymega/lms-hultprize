import React, { useState, useEffect } from 'react';
import FullPageLoader from './shared/components/loader/FullPageLoader';

interface AppLoaderProps {
    children: React.ReactNode;
}

const AppLoader: React.FC<AppLoaderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate app initialization time
        // In a real app, this could be checking for auth, loading config, etc.
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Show loading for 2 seconds

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <FullPageLoader text="Memuat SMATCH..." />;
    }

    return <>{children}</>;
};

export default AppLoader;