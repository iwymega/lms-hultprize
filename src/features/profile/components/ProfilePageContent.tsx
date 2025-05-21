import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, MessageSquare, Share2, ThumbsUp, Users } from "lucide-react"
import CardProfileImage from './CardProfileImage'

const ProfilePageContent: React.FC = () => {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Profile Sidebar */}
                <div className="lg:col-span-1">
                    <CardProfileImage />

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>About</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Product designer with 5+ years of experience creating user-centered digital experiences. Passionate
                                about solving complex problems through design thinking.
                            </p>

                            <div className="mt-4">
                                <h3 className="mb-2 text-sm font-medium">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">UI Design</Badge>
                                    <Badge variant="secondary">UX Research</Badge>
                                    <Badge variant="secondary">Prototyping</Badge>
                                    <Badge variant="secondary">Figma</Badge>
                                    <Badge variant="secondary">Design Systems</Badge>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center text-sm">
                                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Joined March 2019</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2">
                    <Tabs defaultValue="information">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="information">Information</TabsTrigger>
                            <TabsTrigger value="setting">Setting</TabsTrigger>
                            <TabsTrigger value="change-password">Change Password</TabsTrigger>
                        </TabsList>

                        <TabsContent value="information" className="mt-6">
                            {[1, 2, 3].map((post) => (
                                <Card key={post} className="mb-4">
                                    <CardHeader>
                                        <div className="flex items-center">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                                <AvatarFallback>JD</AvatarFallback>
                                            </Avatar>
                                            <div className="ml-2">
                                                <CardTitle className="text-base">Jane Doe</CardTitle>
                                                <CardDescription>2 days ago</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm">
                                            Just finished working on a new design system for our mobile app. Really excited about how it
                                            turned out! Check out some of the components below.
                                        </p>
                                        <div className="mt-4 grid grid-cols-2 gap-2">
                                            <img
                                                src="/placeholder.svg?height=200&width=300"
                                                alt="Design preview"
                                                className="rounded-md object-cover"
                                            />
                                            <img
                                                src="/placeholder.svg?height=200&width=300"
                                                alt="Design preview"
                                                className="rounded-md object-cover"
                                            />
                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                                    <ThumbsUp className="h-4 w-4" />
                                                    <span>124</span>
                                                </Button>
                                                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                                    <MessageSquare className="h-4 w-4" />
                                                    <span>32</span>
                                                </Button>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                <Share2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>

                        <TabsContent value="setting" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Settings</CardTitle>
                                    <CardDescription>Update your profile information and preferences.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <label htmlFor="name" className="text-sm font-medium">
                                            Name
                                        </label>
                                        <input
                                            id="name"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            defaultValue="Jane Doe"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="bio" className="text-sm font-medium">
                                            Bio
                                        </label>
                                        <textarea
                                            id="bio"
                                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            defaultValue="Product designer with 5+ years of experience creating user-centered digital experiences. Passionate about solving complex problems through design thinking."
                                        />
                                    </div>
                                    <Button>Save Changes</Button>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="change-password" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Activity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-8">
                                        {[
                                            { icon: ThumbsUp, text: "Liked a post from Alex Johnson", time: "2 hours ago" },
                                            { icon: MessageSquare, text: "Commented on Sarah's design project", time: "Yesterday" },
                                            { icon: Users, text: "Started following Design Team", time: "3 days ago" },
                                            { icon: Share2, text: "Shared an article about UX research", time: "1 week ago" },
                                        ].map((activity, index) => (
                                            <div key={index} className="flex">
                                                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                                    <activity.icon className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="text-sm">{activity.text}</p>
                                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default ProfilePageContent