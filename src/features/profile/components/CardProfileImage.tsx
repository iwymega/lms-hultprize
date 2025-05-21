import { useAuth } from '@/auth/context/AuthProvider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { getInitials } from '@/lib/utils'
import { Mail } from 'lucide-react'
import React from 'react'

const CardProfileImage: React.FC = () => {
    const { user } = useAuth()
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="/profile.jpg" alt="User" />
                            <AvatarFallback>{getInitials(user?.name || '')}</AvatarFallback>
                        </Avatar>
                    </div>
                    <h2 className="mt-4 text-xl font-bold">{user?.name ?? ''}</h2>
                    <p className="text-muted-foreground">{user?.roles?.[0].display_name}</p>
                    <div className="mt-2 flex items-center text-sm text-muted-foreground">
                        <Mail className="mr-1 h-4 w-4" />
                        <span>{user?.email}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CardProfileImage