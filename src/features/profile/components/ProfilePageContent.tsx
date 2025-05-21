import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CardProfileImage from './CardProfileImage'
import CardProfileAbout from './CardProfileAbout'
import CardProfileSetting from './CardProfileSetting'
import ChangePassword from './ChangePassword'

const ProfilePageContent: React.FC = () => {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Profile Sidebar */}
                <div className="lg:col-span-1">
                    <CardProfileImage />

                    <CardProfileAbout />
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2">
                    <Tabs defaultValue="setting">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="setting">Setting</TabsTrigger>
                            <TabsTrigger value="change-password">Change Password</TabsTrigger>
                        </TabsList>

                        <TabsContent value="setting" className="mt-6">
                            <CardProfileSetting />
                        </TabsContent>

                        <TabsContent value="change-password" className="mt-6">
                            <ChangePassword />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default ProfilePageContent