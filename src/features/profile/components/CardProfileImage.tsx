import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Edit, MapPin } from 'lucide-react'
import React from 'react'

const CardProfileImage = () => {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="/profile.jpg" alt="User" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </div>
                    <h2 className="mt-4 text-xl font-bold">Jane Doe</h2>
                    <p className="text-muted-foreground">Product Designer</p>
                    <div className="mt-2 flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>San Francisco, CA</span>
                    </div>
                    <div className="mt-6 flex w-full justify-between">
                        <div className="text-center">
                            <p className="font-bold">142</p>
                            <p className="text-xs text-muted-foreground">Posts</p>
                        </div>
                        <div className="text-center">
                            <p className="font-bold">2.8K</p>
                            <p className="text-xs text-muted-foreground">Followers</p>
                        </div>
                        <div className="text-center">
                            <p className="font-bold">268</p>
                            <p className="text-xs text-muted-foreground">Following</p>
                        </div>
                    </div>
                    <div className="mt-6 grid w-full grid-cols-2 gap-2">
                        <Button className="w-full">Follow</Button>
                        <Button variant="outline" className="w-full">
                            Message
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CardProfileImage