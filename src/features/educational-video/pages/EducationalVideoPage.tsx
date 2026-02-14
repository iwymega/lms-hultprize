import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Video,
  Search,
  Bookmark,
  // Star,
  Home,
  User,
  Users,
  // MessageSquare,
  Plus,
  // CheckCircle,
  // Crown,
  // Mail,
  // Phone,
  Award,
  FileText,
  HelpCircle,
  // Calendar,
} from "lucide-react";
import { VideoFeed } from "../components/VideoFeed";
import { VideoUpload } from "../components/VideoUpload";
import { StudentProfileForm } from "../../matching/components/StudentProfileForm";
import { TeachersTab } from "../components/TeachersTab";
import { SearchTab } from "../components/SearchTab";
import { BookmarksTab } from "../components/BookmarksTab";
import { ProfileTab } from "../components/ProfileTab";
import { QuizTab } from "../components/QuizTab";
import {
  EducationalVideo,
  VideoFeedItem,
  VideoUploadData,
  GradeLevel,
  DifficultyLevel,
  UserProgress,
} from "../types";

// Mock data for demonstration - using local videos only
const mockVideos: EducationalVideo[] = [
  {
    video_id: "1",
    title: "Educational Video 1",
    description:
      "First educational video content for learning and development.",
    video_url: "/video1.mp4",
    thumbnail_url: "/thumbnails/video1.jpg",
    duration: 180,
    subject: "General Education",
    topic: "Learning Content",
    grade_level: GradeLevel.HIGH,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ["education", "learning", "tutorial"],
    creator_id: "teacher_1",
    creator_type: "teacher",
    views: 1250,
    likes: 89,
    shares: 23,
    comments_count: 12,
    is_featured: true,
    is_private: false,
    created_at: new Date("2024-01-15"),
    updated_at: new Date("2024-01-15"),
  },
  {
    video_id: "2",
    title: "Educational Video 2",
    description:
      "Second educational video content for comprehensive learning experience.",
    video_url: "/video2.mp4",
    thumbnail_url: "/thumbnails/video2.jpg",
    duration: 240,
    subject: "General Education",
    topic: "Advanced Learning",
    grade_level: GradeLevel.HIGH,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ["education", "learning", "advanced"],
    creator_id: "teacher_2",
    creator_type: "teacher",
    views: 2100,
    likes: 156,
    shares: 45,
    comments_count: 28,
    is_featured: false,
    is_private: false,
    created_at: new Date("2024-01-14"),
    updated_at: new Date("2024-01-14"),
  },
];

const mockCreators = {
  teacher_1: {
    id: "teacher_1",
    name: "Naoto Masunaga",
    avatar: "/avatars/naoto.jpg",
    type: "teacher" as const,
    rating: 4.8,
  },
  teacher_2: {
    id: "teacher_2",
    name: "Gung Mahendra",
    avatar: "/avatars/gung.jpg",
    type: "teacher" as const,
    rating: 4.9,
  },
  teacher_3: {
    id: "teacher_3",
    name: "Rohit Jagan",
    avatar: "/avatars/rohit.jpg",
    type: "teacher" as const,
    rating: 4.7,
  },
  teacher_4: {
    id: "teacher_4",
    name: "Ku Kasen",
    avatar: "/avatars/ku.jpg",
    type: "teacher" as const,
    rating: 4.6,
  },
  teacher_5: {
    id: "teacher_5",
    name: "Sami Rajjal",
    avatar: "/avatars/sami.jpg",
    type: "teacher" as const,
    rating: 4.5,
  },
  student_1: {
    id: "student_1",
    name: "Alex Rivera",
    avatar: "/avatars/alex.jpg",
    type: "student" as const,
    rating: undefined,
  },
};

const mockUserProgress: UserProgress = {
  user_id: "current_user",
  total_points: 1250,
  level: 3,
  badges: [
    {
      badge_id: "first_video",
      name: "First Video",
      description: "Uploaded your first educational video",
      icon_url: "/badges/first-video.png",
      earned_at: new Date("2024-01-10"),
      category: "achievement",
    },
    {
      badge_id: "helpful_teacher",
      name: "Helpful Teacher",
      description: "Received 50+ likes on your videos",
      icon_url: "/badges/helpful-teacher.png",
      earned_at: new Date("2024-01-12"),
      category: "engagement",
    },
  ],
  completed_challenges: ["math_challenge_1", "biology_quiz_1"],
  streak_days: 7,
  weekly_goal_progress: 85,
};

export function EducationalVideoPage() {
  const [activeTab, setActiveTab] = useState("home");
  const [showUpload, setShowUpload] = useState(false);
  const [showStudentProfile, setShowStudentProfile] = useState(false);
  const [showTeacherProfile, setShowTeacherProfile] = useState<string | null>(
    null
  );
  const [videos, setVideos] = useState<VideoFeedItem[]>([]);
  const [bookmarkedVideos, setBookmarkedVideos] = useState<VideoFeedItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVideos, setFilteredVideos] = useState<VideoFeedItem[]>([]);

  // const { currentStudent, setCurrentStudent } = useMatchingStore(); // Not used in this component

  // Initialize videos with mock data
  useEffect(() => {
    const videoFeedItems: VideoFeedItem[] = mockVideos.map((video) => ({
      video,
      creator: mockCreators[video.creator_id as keyof typeof mockCreators] || {
        id: video.creator_id,
        name: "Unknown Creator",
        type: video.creator_type,
        rating: undefined,
      },
      isLiked: Math.random() > 0.7, // Mock user interactions
      isBookmarked: Math.random() > 0.8,
      userInteraction: {
        liked: Math.random() > 0.7,
        bookmarked: Math.random() > 0.8,
        watched: Math.random() > 0.5,
      },
    }));

    setVideos(videoFeedItems);
    setFilteredVideos(videoFeedItems); // Initialize filtered videos
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter((item) =>
        item.video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.video.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.video.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.creator.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVideos(filtered);
    }
  }, [searchQuery, videos]);

  const handleVideoLike = async (videoId: string) => {
    setVideos((prev) =>
      prev.map((item) => {
        if (item.video.video_id === videoId) {
          const newLiked = !item.userInteraction.liked;
          return {
            ...item,
            video: {
              ...item.video,
              likes: newLiked ? item.video.likes + 1 : item.video.likes - 1,
            },
            userInteraction: {
              ...item.userInteraction,
              liked: newLiked,
            },
          };
        }
        return item;
      })
    );
  };

  const handleVideoBookmark = async (videoId: string) => {
    setVideos((prev) =>
      prev.map((item) => {
        if (item.video.video_id === videoId) {
          return {
            ...item,
            userInteraction: {
              ...item.userInteraction,
              bookmarked: !item.userInteraction.bookmarked,
            },
          };
        }
        return item;
      })
    );
  };

  const handleVideoShare = async (videoId: string) => {
    // Mock share functionality
    navigator.clipboard.writeText(
      `Check out this educational video: ${window.location.origin}/video/${videoId}`
    );
    alert("Video link copied to clipboard!");
  };

  const handleVideoComment = async (videoId: string, _comment: string) => {
    setVideos((prev) =>
      prev.map((item) => {
        if (item.video.video_id === videoId) {
          return {
            ...item,
            video: {
              ...item.video,
              comments_count: item.video.comments_count + 1,
            },
          };
        }
        return item;
      })
    );
  };

  const handleVideoUpload = async (uploadData: VideoUploadData) => {
    // Mock upload - in real app, this would upload to server
    console.log("Uploading video:", uploadData);

    // Simulate successful upload
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Add new video to feed
    const newVideo: EducationalVideo = {
      video_id: `video_${Date.now()}`,
      title: uploadData.title,
      description: uploadData.description,
      video_url: URL.createObjectURL(uploadData.video_file),
      thumbnail_url: uploadData.thumbnail_file
        ? URL.createObjectURL(uploadData.thumbnail_file)
        : "/thumbnails/default.jpg",
      duration: 180, // Mock duration
      subject: uploadData.subject,
      topic: uploadData.topic,
      grade_level: uploadData.grade_level,
      difficulty: uploadData.difficulty,
      tags: uploadData.tags,
      creator_id: "current_user",
      creator_type: "student",
      views: 0,
      likes: 0,
      shares: 0,
      comments_count: 0,
      is_featured: false,
      is_private: uploadData.is_private,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const newVideoItem: VideoFeedItem = {
      video: newVideo,
      creator: {
        id: "current_user",
        name: "You",
        avatar: undefined,
        type: "student",
        rating: undefined,
      },
      isLiked: false,
      isBookmarked: false,
      userInteraction: {
        liked: false,
        bookmarked: false,
        watched: false,
      },
    };

    setVideos((prev) => [newVideoItem, ...prev]);
    setShowUpload(false);
  };

  const handleLoadMore = async () => {
    // Mock loading more videos
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Add more mock videos
    const additionalVideos = mockVideos.map((video) => ({
      ...video,
      video_id: `${video.video_id}_extra_${Date.now()}`,
    }));

    const additionalVideoItems: VideoFeedItem[] = additionalVideos.map(
      (video) => ({
        video,
        creator: mockCreators[
          video.creator_id as keyof typeof mockCreators
        ] || {
          id: video.creator_id,
          name: "Unknown Creator",
          type: video.creator_type,
          rating: undefined,
        },
        isLiked: false,
        isBookmarked: false,
        userInteraction: {
          liked: false,
          bookmarked: false,
          watched: false,
        },
      })
    );

    setVideos((prev) => [...prev, ...additionalVideoItems]);
  };

  if (showStudentProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b px-4 py-3">
          <Button
            variant="ghost"
            onClick={() => setShowStudentProfile(false)}
            className="mb-2"
          >
            ← Back to Videos
          </Button>
        </div>
        <StudentProfileForm onComplete={() => setShowStudentProfile(false)} />
      </div>
    );
  }

  if (showUpload) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b px-4 py-3">
          <Button
            variant="ghost"
            onClick={() => setShowUpload(false)}
            className="mb-2"
          >
            ← Back to Videos
          </Button>
        </div>
        <VideoUpload
          onUpload={handleVideoUpload}
          onCancel={() => setShowUpload(false)}
        />
      </div>
    );
  }

  // Mock teachers data (extended for educational video context)
  const mockTeachers = [
    {
      teacher_id: "teacher_1",
      name: "Naoto Masunaga",
      email: "naoto.masunaga@example.com",
      expertise_areas: ["Mathematics", "Physics", "Calculus"],
      qualifications: ["PhD Mathematics", "10 years teaching experience"],
      availability: [
        { day_of_week: 1, start_time: "09:00", end_time: "17:00" },
        { day_of_week: 3, start_time: "10:00", end_time: "16:00" },
        { day_of_week: 5, start_time: "14:00", end_time: "20:00" }
      ] as any,
      teaching_style: "DIRECT_INSTRUCTION" as any,
      rating: 4.8,
      total_sessions: 150,
      status: "AVAILABLE" as any,
      created_at: new Date("2020-01-15"),
      updated_at: new Date("2024-01-15"),
      // Extended properties for educational video
      profile_image: "/avatars/naoto.jpg",
      bio: "Passionate mathematics educator specializing in making complex concepts accessible to all students.",
      languages: ["English", "Japanese"],
      certifications: ["Certified Math Teacher", "STEM Education Specialist"],
      is_verified: true,
      hourly_rate: 50,
      total_reviews: 89,
      total_students: 150,
    },
    {
      teacher_id: "teacher_2",
      name: "Gung Mahendra",
      email: "gung.mahendra@example.com",
      expertise_areas: ["Computer Science", "Programming", "Data Structures"],
      qualifications: ["MS Computer Science", "Software Engineer at Google"],
      availability: [
        { day_of_week: 2, start_time: "13:00", end_time: "19:00" },
        { day_of_week: 4, start_time: "15:00", end_time: "21:00" },
        { day_of_week: 6, start_time: "10:00", end_time: "16:00" }
      ] as any,
      teaching_style: "EXPERIENTIAL" as any,
      rating: 4.9,
      total_sessions: 200,
      status: "AVAILABLE" as any,
      created_at: new Date("2019-08-20"),
      updated_at: new Date("2024-01-14"),
      // Extended properties for educational video
      profile_image: "/avatars/gung.jpg",
      bio: "Award-winning computer science educator passionate about making programming accessible and exciting.",
      languages: ["English", "Indonesian"],
      certifications: ["AP Computer Science Teacher", "Google Certified Developer"],
      is_verified: true,
      hourly_rate: 60,
      total_reviews: 120,
      total_students: 200,
    },
    {
      teacher_id: "teacher_3",
      name: "Rohit Jagan",
      email: "rohit.jagan@example.com",
      expertise_areas: ["English Literature", "Writing", "Grammar"],
      qualifications: ["MA English Literature", "Published Author"],
      availability: [
        { day_of_week: 1, start_time: "08:00", end_time: "12:00" },
        { day_of_week: 2, start_time: "18:00", end_time: "22:00" },
        { day_of_week: 3, start_time: "09:00", end_time: "15:00" }
      ] as any,
      teaching_style: "INQUIRY_BASED" as any,
      rating: 4.7,
      total_sessions: 120,
      status: "AVAILABLE" as any,
      created_at: new Date("2021-03-10"),
      updated_at: new Date("2024-01-13"),
      // Extended properties for educational video
      profile_image: "/avatars/rohit.jpg",
      bio: "Published author and literature educator helping students discover the beauty of language and storytelling.",
      languages: ["English", "Hindi"],
      certifications: ["Certified English Teacher", "Creative Writing Instructor"],
      is_verified: true,
      hourly_rate: 45,
      total_reviews: 95,
      total_students: 120,
    },
    {
      teacher_id: "teacher_4",
      name: "Ku Kasen",
      email: "ku.kasen@example.com",
      expertise_areas: ["History", "Geography", "Economics"],
      qualifications: ["PhD History", "Researcher at National University"],
      availability: [
        { day_of_week: 1, start_time: "10:00", end_time: "16:00" },
        { day_of_week: 4, start_time: "14:00", end_time: "20:00" },
        { day_of_week: 6, start_time: "09:00", end_time: "15:00" }
      ] as any,
      teaching_style: "DIRECT_INSTRUCTION" as any,
      rating: 4.6,
      total_sessions: 180,
      status: "AVAILABLE" as any,
      created_at: new Date("2018-11-05"),
      updated_at: new Date("2024-01-12"),
      // Extended properties for educational video
      profile_image: "/avatars/ku.jpg",
      bio: "History researcher and educator bringing the past to life through engaging storytelling and critical analysis.",
      languages: ["English", "Thai"],
      certifications: ["AP History Teacher", "Research Historian"],
      is_verified: true,
      hourly_rate: 40,
      total_reviews: 110,
      total_students: 180,
    },
    {
      teacher_id: "teacher_5",
      name: "Sami Rajjal",
      email: "sami.rajjal@example.com",
      expertise_areas: ["Art", "Music", "Languages"],
      qualifications: ["MFA Fine Arts", "Professional Artist"],
      availability: [
        { day_of_week: 2, start_time: "11:00", end_time: "17:00" },
        { day_of_week: 3, start_time: "16:00", end_time: "22:00" },
        { day_of_week: 5, start_time: "12:00", end_time: "18:00" }
      ] as any,
      teaching_style: "EXPERIENTIAL" as any,
      rating: 4.5,
      total_sessions: 90,
      status: "AVAILABLE" as any,
      created_at: new Date("2022-07-15"),
      updated_at: new Date("2024-01-11"),
      // Extended properties for educational video
      profile_image: "/avatars/sami.jpg",
      bio: "Professional artist and creative educator inspiring students to express themselves through various art forms.",
      languages: ["English", "Arabic"],
      certifications: ["Certified Art Teacher", "Professional Artist Certification"],
      is_verified: true,
      hourly_rate: 55,
      total_reviews: 75,
      total_students: 90,
    },
  ];

  const renderTeacherProfile = (teacherId: string) => {
    const teacher = mockTeachers.find((t) => t.teacher_id === teacherId);
    if (!teacher) return null;

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTeacherProfile(null)}
          >
            ← Back
          </Button>
          <h1 className="font-semibold">Teacher Profile</h1>
        </div>

        <div className="p-4 space-y-6">
          {/* Teacher Header */}
          <div className="text-center">
            <Avatar className="h-20 w-20 mx-auto mb-4">
              <AvatarImage src={teacher.profile_image} />
              <AvatarFallback className="text-lg">
                {teacher.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold mb-1">{teacher.name}</h2>
            <p className="text-lg text-gray-600 mb-2">{teacher.expertise_areas[0]}</p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">{teacher.rating}</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{(teacher.total_students * 10).toLocaleString()}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{Math.floor(teacher.total_sessions / 3)}</div>
                <div className="text-sm text-gray-600">Videos</div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-700 mb-6 max-w-md mx-auto">{teacher.bio}</p>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center mb-6">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                Subscribe for Updates
              </Button>
              <Button variant="outline" className="px-6">
                Contact Teacher
              </Button>
            </div>
          </div>

          {/* Tabs for Materials & Quizzes and Tutoring Schedule */}
          <Tabs defaultValue="materials" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="materials">Materials & Quizzes</TabsTrigger>
              <TabsTrigger value="schedule">Tutoring Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="materials" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <h4 className="font-medium">Practice Worksheets</h4>
                          <p className="text-sm text-gray-600">15 downloadable worksheets</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Download All
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <HelpCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <h4 className="font-medium">Basic Concepts Quiz</h4>
                          <p className="text-sm text-gray-600">20 questions • 15 minutes</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Start Quiz
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="h-5 w-5 text-purple-500" />
                        <div>
                          <h4 className="font-medium">Reference Guides</h4>
                          <p className="text-sm text-gray-600">8 comprehensive guides</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        View Guides
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <HelpCircle className="h-5 w-5 text-orange-500" />
                        <div>
                          <h4 className="font-medium">Advanced Problem Solving</h4>
                          <p className="text-sm text-gray-600">25 questions • 25 minutes</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Start Quiz
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  {/* One-on-One Sessions */}
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <User className="h-5 w-5" />
                      One-on-One Sessions
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Monday</h4>
                          <p className="text-sm text-gray-600">14:00 - 15:00</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">¥8,000</p>
                          <p className="text-sm text-gray-600">per session</p>
                        </div>
                        <Button size="sm">Book Session</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Wednesday</h4>
                          <p className="text-sm text-gray-600">16:00 - 17:00</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">¥8,000</p>
                          <p className="text-sm text-gray-600">per session</p>
                        </div>
                        <Button size="sm">Book Session</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                        <div>
                          <h4 className="font-medium">Friday</h4>
                          <p className="text-sm text-gray-600">10:00 - 11:00</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-500">Fully Booked</p>
                        </div>
                        <Button size="sm" disabled>Fully Booked</Button>
                      </div>
                    </div>
                  </div>

                  {/* Group Sessions */}
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Group Sessions
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Tuesday</h4>
                          <p className="text-sm text-gray-600">18:00 - 19:30</p>
                          <p className="text-xs text-gray-500">Max 8 students</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">¥3,000</p>
                          <p className="text-sm text-gray-600">per session</p>
                        </div>
                        <Button size="sm">Join Group</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Thursday</h4>
                          <p className="text-sm text-gray-600">18:00 - 19:30</p>
                          <p className="text-xs text-gray-500">Max 8 students</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">¥3,000</p>
                          <p className="text-sm text-gray-600">per session</p>
                        </div>
                        <Button size="sm">Join Group</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                        <div>
                          <h4 className="font-medium">Saturday</h4>
                          <p className="text-sm text-gray-600">13:00 - 14:30</p>
                          <p className="text-xs text-gray-500">Max 8 students</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-500">Fully Booked</p>
                        </div>
                        <Button size="sm" disabled>Fully Booked</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Qualifications */}
          <Card>
            <CardHeader>
              <CardTitle>Qualifications & Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium mb-1">Education</h4>
                <p className="text-sm text-gray-600">
                  {teacher.qualifications}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {teacher.certifications.map((cert) => (
                    <Badge key={cert} variant="secondary" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Languages</h4>
                <div className="flex gap-2">
                  {teacher.languages.map((lang) => (
                    <Badge key={lang} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  if (showTeacherProfile) {
    return renderTeacherProfile(showTeacherProfile);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B263B] via-[#415A77] to-[#1B263B] text-white">
      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6 text-[#E0E1DD]" />
            <span className="font-bold text-lg sm:text-xl">SMATCH</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 min-h-[44px] sm:min-h-[36px]"
              onClick={() => setShowUpload(true)}
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 min-h-[44px] sm:min-h-[36px]"
              onClick={() => setActiveTab("search")}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-screen">
        {activeTab === "home" && (
          <VideoFeed
            videos={videos}
            onVideoLike={handleVideoLike}
            onVideoBookmark={(videoId) => {
              handleVideoBookmark(videoId);
              // Add to bookmarked videos
              const video = videos.find((v) => v.video.video_id === videoId);
              if (
                video &&
                !bookmarkedVideos.find((bv) => bv.video.video_id === videoId)
              ) {
                setBookmarkedVideos((prev) => [...prev, video]);
              }
            }}
            onVideoShare={handleVideoShare}
            onVideoComment={handleVideoComment}
            onViewTeacherProfile={setShowTeacherProfile}
            onLoadMore={handleLoadMore}
            hasMore={videos.length < 20}
            isLoading={false}
          />
        )}

        {activeTab === "search" && (
          <SearchTab
            searchQuery={searchQuery}
            filteredVideos={filteredVideos}
            onSearchChange={setSearchQuery}
            onClearSearch={() => setSearchQuery("")}
            onVideoLike={handleVideoLike}
            onVideoBookmark={(videoId) => {
              handleVideoBookmark(videoId);
              const video = videos.find((v) => v.video.video_id === videoId);
              if (
                video &&
                !bookmarkedVideos.find((bv) => bv.video.video_id === videoId)
              ) {
                setBookmarkedVideos((prev) => [...prev, video]);
              }
            }}
            onVideoShare={handleVideoShare}
            onVideoComment={handleVideoComment}
            onLoadMore={handleLoadMore}
            hasMore={false}
            isLoading={false}
          />
        )}

        {activeTab === "teachers" && (
          <TeachersTab
            teachers={mockTeachers}
            onViewTeacherProfile={setShowTeacherProfile}
            onLoadMore={() => console.log("Load more teachers")}
            hasMore={true}
          />
        )}

        {activeTab === "bookmarks" && (
          <BookmarksTab bookmarkedVideos={bookmarkedVideos} />
        )}

        {activeTab === "profile" && (
          <ProfileTab
            userProgress={mockUserProgress}
            onUploadVideo={() => setShowUpload(true)}
            onCompleteProfile={() => setShowStudentProfile(true)}
          />
        )}

        {activeTab === "quiz" && (
          <QuizTab />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-800">
        <div className="flex items-center justify-around py-2 px-1 sm:px-2">
          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 p-2 sm:p-3 min-h-[60px] w-full max-w-[70px] sm:max-w-[80px] ${
              activeTab === "home" ? "text-[#E0E1DD]" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("home")}
          >
            <Home className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-xs hidden sm:inline">Home</span>
            <span className="text-xs sm:hidden">Home</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 p-2 sm:p-3 min-h-[60px] w-full max-w-[70px] sm:max-w-[80px] ${
              activeTab === "teachers" ? "text-[#E0E1DD]" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("teachers")}
          >
            <Users className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-xs hidden sm:inline">Teachers</span>
            <span className="text-xs sm:hidden">Teachers</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 p-2 sm:p-3 min-h-[60px] w-full max-w-[70px] sm:max-w-[80px] ${
              activeTab === "quiz" ? "text-[#E0E1DD]" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("quiz")}
          >
            <Award className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-xs hidden sm:inline">Quiz</span>
            <span className="text-xs sm:hidden">Quiz</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 p-2 sm:p-3 min-h-[60px] w-full max-w-[70px] sm:max-w-[80px] ${
              activeTab === "bookmarks" ? "text-[#E0E1DD]" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("bookmarks")}
          >
            <Bookmark className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-xs hidden sm:inline">Saved</span>
            <span className="text-xs sm:hidden">Saved</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 p-2 sm:p-3 min-h-[60px] w-full max-w-[70px] sm:max-w-[80px] ${
              activeTab === "profile" ? "text-[#E0E1DD]" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-xs hidden sm:inline">Profile</span>
            <span className="text-xs sm:hidden">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
