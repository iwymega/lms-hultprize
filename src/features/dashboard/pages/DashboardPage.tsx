import React from 'react'
import { useAuth } from '../../../auth/context/AuthProvider'

const DashboardPage: React.FC = () => {
    const { logout } = useAuth()
    
    return (
        <div>
            <span>DashboardPage</span>
            <button onClick={() => logout()}>Logout</button>
        </div>
    )
}

export default DashboardPage