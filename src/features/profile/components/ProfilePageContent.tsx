import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardProfileImage from "./CardProfileImage";
import CardProfileAbout from "./CardProfileAbout";
import CardProfileSetting from "./CardProfileSetting";
import ChangePasswordCard from "./ChangePasswordCard";
import TeacherMaterialsCard from "./TeacherMaterialsCard";
import { useAuth } from "@/auth/context/AuthProvider";
import { useLocation } from "react-router";
import { MaterialType } from "@/features/matching/types";

const ProfilePageContent: React.FC = () => {
    const location = useLocation();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("setting");

    // Mock teacher data - in real app this would come from API
    const mockTeacherData = {
        materials: [
            {
                material_id: 'mat_1',
                teacher_id: user?.id || '',
                title: 'Physics Fundamentals PDF',
                description: 'Complete guide to basic physics concepts including mechanics and thermodynamics',
                type: MaterialType.PDF,
                subject: 'Physics',
                grade_level: 'High School',
                file_url: '/materials/physics_fundamentals.pdf',
                price: 15,
                is_active: true,
                downloads_count: 45,
                rating: 4.5,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                material_id: 'mat_2',
                teacher_id: user?.id || '',
                title: 'TIPS JADI PERINGKAT 1 DIKELAS 💯📖',
                description: 'Tips praktis bagi pelajar untuk meningkatkan prestasi akademik di sekolah',
                type: MaterialType.VIDEO,
                subject: 'Study Skills',
                grade_level: 'All Levels',
                youtube_url: 'http://www.youtube.com/watch?v=IgfnJRTYJJE',
                price: 0, // Free educational content
                is_active: true,
                downloads_count: 128,
                rating: 4.9,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                material_id: 'mat_3',
                teacher_id: user?.id || '',
                title: 'Cara Belajar ala Albert Einstein',
                description: 'Metode pembelajaran yang digunakan oleh ilmuwan ternama dunia untuk memahami konsep sulit',
                type: MaterialType.VIDEO,
                subject: 'Study Methods',
                grade_level: 'All Levels',
                youtube_url: 'http://www.youtube.com/watch?v=-JrHThwxoeY',
                price: 0,
                is_active: true,
                downloads_count: 95,
                rating: 4.7,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                material_id: 'mat_4',
                teacher_id: user?.id || '',
                title: 'FISIKA DAN MATEMATIKA, MANA YANG LEBIH UNGGUL?',
                description: 'Video edukasi singkat yang membahas perbandingan menarik antara dua bidang sains utama',
                type: MaterialType.VIDEO,
                subject: 'Physics & Mathematics',
                grade_level: 'High School',
                youtube_url: 'http://www.youtube.com/watch?v=3U0J1ZjlqQQ',
                price: 10,
                is_active: true,
                downloads_count: 67,
                rating: 4.6,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                material_id: 'mat_5',
                teacher_id: user?.id || '',
                title: 'TIPS BELAJAR PERSIAPAN OSN!!',
                description: 'Sangat berguna bagi siswa yang ingin mempersiapkan diri menghadapi Olimpiade Sains Nasional',
                type: MaterialType.VIDEO,
                subject: 'Science Olympiad',
                grade_level: 'High School',
                youtube_url: 'http://www.youtube.com/watch?v=zXJ5WMFU_ok',
                price: 20,
                is_active: true,
                downloads_count: 43,
                rating: 4.8,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                material_id: 'mat_6',
                teacher_id: user?.id || '',
                title: 'TRIK MATEMATIKA CEPAT',
                description: 'Membahas pengalaman dan tips belajar mendalam untuk menguasai kompetisi sains',
                type: MaterialType.VIDEO,
                subject: 'Mathematics',
                grade_level: 'High School',
                youtube_url: 'http://www.youtube.com/watch?v=8_ZEkpivXCw',
                price: 15,
                is_active: true,
                downloads_count: 78,
                rating: 4.5,
                created_at: new Date(),
                updated_at: new Date()
            }
        ],
        session_pricing: {
            one_on_one_price: 50,
            group_price: 30,
            max_group_size: 5,
            currency: 'USD',
            discount_packages: [
                {
                    package_id: 'pkg_1',
                    name: '5-Session Package',
                    session_count: 5,
                    total_price: 225,
                    discount_percentage: 10,
                    description: 'Save 10% on 5 one-on-one sessions'
                }
            ]
        }
    };

    const isTeacher = user?.permissions?.some(p => p.name?.includes('teacher')) || false;

    useEffect(() => {
        const pathSegments = location.pathname.split("/").filter(Boolean);
        const lastSegment = pathSegments[pathSegments.length - 1];
        if (lastSegment === "change-password") {
            setActiveTab("change-password");
        } else {
            setActiveTab("setting");
        }
    }, [location.pathname]);

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <CardProfileImage />
                    <CardProfileAbout />
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className={`grid w-full ${isTeacher ? 'grid-cols-3' : 'grid-cols-2'}`}>
                            <TabsTrigger value="setting">Setting</TabsTrigger>
                            <TabsTrigger value="change-password">Change Password</TabsTrigger>
                            {isTeacher && <TabsTrigger value="materials">Materials & Pricing</TabsTrigger>}
                        </TabsList>

                        <TabsContent value="setting" className="mt-6">
                            <CardProfileSetting />
                        </TabsContent>

                        <TabsContent value="change-password" className="mt-6">
                            <ChangePasswordCard />
                        </TabsContent>

                        {isTeacher && (
                            <TabsContent value="materials" className="mt-6">
            <TeacherMaterialsCard
              materials={mockTeacherData.materials}
              sessionPricing={mockTeacherData.session_pricing}
            />
                            </TabsContent>
                        )}
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default ProfilePageContent;
