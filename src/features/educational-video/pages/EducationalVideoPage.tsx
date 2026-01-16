import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Video,
  Upload,
  Search,
  Bookmark,
  Star,
  Home,
  User,
  Users,
  MessageSquare,
  Plus,
  CheckCircle,
  Crown,
  Mail,
  Phone,
  PlayCircle,
  Award
} from 'lucide-react';
import { VideoFeed } from '../components/VideoFeed';
import { VideoUpload } from '../components/VideoUpload';
import { StudentProfileForm } from '../../matching/components/StudentProfileForm';
import {
  EducationalVideo,
  VideoFeedItem,
  VideoUploadData,
  GradeLevel,
  DifficultyLevel,
  UserProgress
} from '../types';

// Mock data for demonstration
const mockVideos: EducationalVideo[] = [
  {
    video_id: '1',
    title: 'Introduction to Quadratic Equations',
    description: 'Learn how to solve quadratic equations using the quadratic formula. Perfect for algebra students!',
    video_url: '/videos/quadratic-equations.mp4',
    thumbnail_url: '/thumbnails/quadratic.jpg',
    duration: 180,
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    grade_level: GradeLevel.HIGH,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['algebra', 'equations', 'math', 'tutorial'],
    creator_id: 'teacher_1',
    creator_type: 'teacher',
    views: 1250,
    likes: 89,
    shares: 23,
    comments_count: 12,
    is_featured: true,
    is_private: false,
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-01-15')
  },
  {
    video_id: '2',
    title: 'Photosynthesis Explained Simply',
    description: 'A clear explanation of how plants make food through photosynthesis. Great for biology beginners.',
    video_url: '/videos/photosynthesis.mp4',
    thumbnail_url: '/thumbnails/photosynthesis.jpg',
    duration: 240,
    subject: 'Biology',
    topic: 'Photosynthesis',
    grade_level: GradeLevel.MIDDLE,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['biology', 'plants', 'science', 'explanation'],
    creator_id: 'teacher_2',
    creator_type: 'teacher',
    views: 2100,
    likes: 156,
    shares: 45,
    comments_count: 28,
    is_featured: false,
    is_private: false,
    created_at: new Date('2024-01-14'),
    updated_at: new Date('2024-01-14')
  },
  {
    video_id: '3',
    title: 'My Journey Learning Python',
    description: 'A student shares their experience learning Python programming from scratch.',
    video_url: '/videos/python-journey.mp4',
    thumbnail_url: '/thumbnails/python.jpg',
    duration: 320,
    subject: 'Computer Science',
    topic: 'Python Programming',
    grade_level: GradeLevel.HIGH,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['python', 'programming', 'coding', 'student-project'],
    creator_id: 'student_1',
    creator_type: 'student',
    views: 890,
    likes: 67,
    shares: 18,
    comments_count: 15,
    is_featured: false,
    is_private: false,
    created_at: new Date('2024-01-13'),
    updated_at: new Date('2024-01-13')
  }
];

const mockCreators = {
  'teacher_1': { id: 'teacher_1', name: 'Dr. Sarah Johnson', avatar: '/avatars/sarah.jpg', type: 'teacher' as const, rating: 4.8 },
  'teacher_2': { id: 'teacher_2', name: 'Prof. Michael Chen', avatar: '/avatars/michael.jpg', type: 'teacher' as const, rating: 4.9 },
  'student_1': { id: 'student_1', name: 'Alex Rivera', avatar: '/avatars/alex.jpg', type: 'student' as const, rating: undefined }
};

const mockUserProgress: UserProgress = {
  user_id: 'current_user',
  total_points: 1250,
  level: 3,
  badges: [
    {
      badge_id: 'first_video',
      name: 'First Video',
      description: 'Uploaded your first educational video',
      icon_url: '/badges/first-video.png',
      earned_at: new Date('2024-01-10'),
      category: 'achievement'
    },
    {
      badge_id: 'helpful_teacher',
      name: 'Helpful Teacher',
      description: 'Received 50+ likes on your videos',
      icon_url: '/badges/helpful-teacher.png',
      earned_at: new Date('2024-01-12'),
      category: 'engagement'
    }
  ],
  completed_challenges: ['math_challenge_1', 'biology_quiz_1'],
  streak_days: 7,
  weekly_goal_progress: 85
};

export function EducationalVideoPage() {
  const [activeTab, setActiveTab] = useState('home');
  const [showUpload, setShowUpload] = useState(false);
  const [showStudentProfile, setShowStudentProfile] = useState(false);
  const [showTeacherProfile, setShowTeacherProfile] = useState<string | null>(null);
  const [videos, setVideos] = useState<VideoFeedItem[]>([]);
  const [bookmarkedVideos, setBookmarkedVideos] = useState<VideoFeedItem[]>([]);

  // const { currentStudent, setCurrentStudent } = useMatchingStore(); // Not used in this component

  // Initialize videos with mock data
  useEffect(() => {
    const videoFeedItems: VideoFeedItem[] = mockVideos.map(video => ({
      video,
      creator: mockCreators[video.creator_id as keyof typeof mockCreators] || {
        id: video.creator_id,
        name: 'Unknown Creator',
        type: video.creator_type,
        rating: undefined
      },
      isLiked: Math.random() > 0.7, // Mock user interactions
      isBookmarked: Math.random() > 0.8,
      userInteraction: {
        liked: Math.random() > 0.7,
        bookmarked: Math.random() > 0.8,
        watched: Math.random() > 0.5
      }
    }));

    setVideos(videoFeedItems);
  }, []);

  const handleVideoLike = async (videoId: string) => {
    setVideos(prev => prev.map(item => {
      if (item.video.video_id === videoId) {
        const newLiked = !item.userInteraction.liked;
        return {
          ...item,
          video: {
            ...item.video,
            likes: newLiked ? item.video.likes + 1 : item.video.likes - 1
          },
          userInteraction: {
            ...item.userInteraction,
            liked: newLiked
          }
        };
      }
      return item;
    }));
  };

  const handleVideoBookmark = async (videoId: string) => {
    setVideos(prev => prev.map(item => {
      if (item.video.video_id === videoId) {
        return {
          ...item,
          userInteraction: {
            ...item.userInteraction,
            bookmarked: !item.userInteraction.bookmarked
          }
        };
      }
      return item;
    }));
  };

  const handleVideoShare = async (videoId: string) => {
    // Mock share functionality
    navigator.clipboard.writeText(`Check out this educational video: ${window.location.origin}/video/${videoId}`);
    alert('Video link copied to clipboard!');
  };

  const handleVideoComment = async (videoId: string, _comment: string) => {
    setVideos(prev => prev.map(item => {
      if (item.video.video_id === videoId) {
        return {
          ...item,
          video: {
            ...item.video,
            comments_count: item.video.comments_count + 1
          }
        };
      }
      return item;
    }));
  };

  const handleVideoUpload = async (uploadData: VideoUploadData) => {
    // Mock upload - in real app, this would upload to server
    console.log('Uploading video:', uploadData);

    // Simulate successful upload
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Add new video to feed
    const newVideo: EducationalVideo = {
      video_id: `video_${Date.now()}`,
      title: uploadData.title,
      description: uploadData.description,
      video_url: URL.createObjectURL(uploadData.video_file),
      thumbnail_url: uploadData.thumbnail_file ? URL.createObjectURL(uploadData.thumbnail_file) : '/thumbnails/default.jpg',
      duration: 180, // Mock duration
      subject: uploadData.subject,
      topic: uploadData.topic,
      grade_level: uploadData.grade_level,
      difficulty: uploadData.difficulty,
      tags: uploadData.tags,
      creator_id: 'current_user',
      creator_type: 'student',
      views: 0,
      likes: 0,
      shares: 0,
      comments_count: 0,
      is_featured: false,
      is_private: uploadData.is_private,
      created_at: new Date(),
      updated_at: new Date()
    };

    const newVideoItem: VideoFeedItem = {
      video: newVideo,
      creator: {
        id: 'current_user',
        name: 'You',
        avatar: undefined,
        type: 'student',
        rating: undefined
      },
      isLiked: false,
      isBookmarked: false,
      userInteraction: {
        liked: false,
        bookmarked: false,
        watched: false
      }
    };

    setVideos(prev => [newVideoItem, ...prev]);
    setShowUpload(false);
  };

  const handleLoadMore = async () => {
    // Mock loading more videos
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add more mock videos
    const additionalVideos = mockVideos.map(video => ({
      ...video,
      video_id: `${video.video_id}_extra_${Date.now()}`
    }));

    const additionalVideoItems: VideoFeedItem[] = additionalVideos.map(video => ({
      video,
      creator: mockCreators[video.creator_id as keyof typeof mockCreators] || {
        id: video.creator_id,
        name: 'Unknown Creator',
        type: video.creator_type,
        rating: undefined
      },
      isLiked: false,
      isBookmarked: false,
      userInteraction: {
        liked: false,
        bookmarked: false,
        watched: false
      }
    }));

    setVideos(prev => [...prev, ...additionalVideoItems]);
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
        <StudentProfileForm
          onComplete={() => setShowStudentProfile(false)}
        />
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
      teacher_id: 'teacher_1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@school.edu',
      expertise_areas: ['Mathematics', 'Physics'],
      qualifications: ['PhD in Mathematics', '10+ years teaching experience'],
      availability: [
        { day_of_week: 1, start_time: '09:00', end_time: '12:00' },
        { day_of_week: 1, start_time: '14:00', end_time: '17:00' },
        { day_of_week: 2, start_time: '09:00', end_time: '12:00' },
        { day_of_week: 2, start_time: '14:00', end_time: '17:00' },
        { day_of_week: 3, start_time: '09:00', end_time: '12:00' },
        { day_of_week: 4, start_time: '14:00', end_time: '17:00' },
        { day_of_week: 5, start_time: '09:00', end_time: '12:00' }
      ] as any,
      teaching_style: 'DIRECT_INSTRUCTION' as any,
      rating: 4.8,
      total_sessions: 150,
      status: 'AVAILABLE' as any,
      created_at: new Date('2020-01-15'),
      updated_at: new Date('2024-01-15'),
      // Extended properties for educational video
      profile_image: '/avatars/sarah.jpg',
      bio: 'Passionate mathematics educator with a PhD from MIT. Specializing in making complex concepts accessible to all students.',
      languages: ['English', 'Spanish'],
      certifications: ['Certified Math Teacher', 'STEM Education Specialist'],
      is_verified: true,
      hourly_rate: 50,
      total_reviews: 89,
      total_students: 150
    },
    {
      teacher_id: 'teacher_2',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@university.edu',
      expertise_areas: ['Biology', 'Chemistry', 'Environmental Science'],
      qualifications: ['Professor of Biology', 'Published researcher in molecular biology'],
      availability: [
        { day_of_week: 1, start_time: '10:00', end_time: '14:00' },
        { day_of_week: 2, start_time: '10:00', end_time: '14:00' },
        { day_of_week: 2, start_time: '15:00', end_time: '18:00' },
        { day_of_week: 3, start_time: '10:00', end_time: '14:00' },
        { day_of_week: 4, start_time: '15:00', end_time: '18:00' },
        { day_of_week: 5, start_time: '10:00', end_time: '14:00' }
      ] as any,
      teaching_style: 'EXPERIENTIAL' as any,
      rating: 4.9,
      total_sessions: 200,
      status: 'AVAILABLE' as any,
      created_at: new Date('2019-08-20'),
      updated_at: new Date('2024-01-14'),
      // Extended properties for educational video
      profile_image: '/avatars/michael.jpg',
      bio: 'Award-winning biology professor passionate about making science accessible and exciting for students of all ages.',
      languages: ['English', 'Mandarin'],
      certifications: ['AP Biology Teacher', 'Research Scientist'],
      is_verified: true,
      hourly_rate: 65,
      total_reviews: 120,
      total_students: 200
    }
  ];

  const renderTeacherProfile = (teacherId: string) => {
    const teacher = mockTeachers.find(t => t.teacher_id === teacherId);
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
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={teacher.profile_image} />
              <AvatarFallback className="text-lg">{teacher.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold">{teacher.name}</h2>
                {teacher.is_verified && <CheckCircle className="h-5 w-5 text-blue-500" />}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{teacher.rating}</span>
                  <span>({teacher.total_reviews} reviews)</span>
                </div>
                <span>{teacher.total_students} students</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {teacher.expertise_areas.map(subject => (
                  <Badge key={subject} variant="secondary" className="text-xs">
                    {subject}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-700">{teacher.bio}</p>
            </div>
          </div>

          {/* Subscription Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                Subscription Plans
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Free Access</h3>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    <li>• Access to public videos</li>
                    <li>• Basic Q&A in comments</li>
                    <li>• Limited study materials</li>
                  </ul>
                  <Button className="w-full" variant="outline">
                    Subscribe Free
                  </Button>
                </div>

                <div className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Premium Access</h3>
                    <Badge className="bg-yellow-500">${teacher.hourly_rate}/month</Badge>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    <li>• All public and private videos</li>
                    <li>• Direct messaging with teacher</li>
                    <li>• Exclusive study materials</li>
                    <li>• Priority Q&A responses</li>
                    <li>• Progress tracking</li>
                  </ul>
                  <Button className="w-full">
                    Subscribe Premium
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Contact Teacher
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Mail className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium">Send Message</div>
                    <div className="text-sm text-gray-600">Direct messaging</div>
                  </div>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Phone className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium">Book Session</div>
                    <div className="text-sm text-gray-600">1-on-1 tutoring</div>
                  </div>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Users className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium">Group Class</div>
                    <div className="text-sm text-gray-600">Join group sessions</div>
                  </div>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Video className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium">Live Session</div>
                    <div className="text-sm text-gray-600">Real-time tutoring</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((dayName, index) => {
                  interface AvailabilitySlot {
                    day_of_week: number;
                    start_time: string;
                    end_time: string;
                  }

                                    const daySchedules = teacher.availability.filter((schedule: AvailabilitySlot) => schedule.day_of_week === index);
                  return (
                    <div key={dayName} className="flex justify-between items-center">
                      <span className="capitalize font-medium">{dayName}</span>
                      <div className="flex gap-1">
                        {daySchedules.map((schedule: { start_time: string; end_time: string; day_of_week: number }, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {schedule.start_time}-{schedule.end_time}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Qualifications */}
          <Card>
            <CardHeader>
              <CardTitle>Qualifications & Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium mb-1">Education</h4>
                <p className="text-sm text-gray-600">{teacher.qualifications}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {teacher.certifications.map(cert => (
                    <Badge key={cert} variant="secondary" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Languages</h4>
                <div className="flex gap-2">
                  {teacher.languages.map(lang => (
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
    <div className="min-h-screen bg-black text-white">
      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6 text-blue-400" />
            <span className="font-bold text-lg">EduTok</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setShowUpload(true)}
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setActiveTab('search')}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-screen">
        {activeTab === 'home' && (
          <VideoFeed
            videos={videos}
            onVideoLike={handleVideoLike}
            onVideoBookmark={(videoId) => {
              handleVideoBookmark(videoId);
              // Add to bookmarked videos
              const video = videos.find(v => v.video.video_id === videoId);
              if (video && !bookmarkedVideos.find(bv => bv.video.video_id === videoId)) {
                setBookmarkedVideos(prev => [...prev, video]);
              }
            }}
            onVideoShare={handleVideoShare}
            onVideoComment={handleVideoComment}
            onLoadMore={handleLoadMore}
            hasMore={videos.length < 20}
            isLoading={false}
          />
        )}

        {activeTab === 'teachers' && (
          <div className="h-screen overflow-y-auto pt-16 pb-20">
            <div className="p-4 space-y-4">
              <h2 className="text-xl font-bold mb-4">Featured Teachers</h2>
              {mockTeachers.map(teacher => (
                <Card key={teacher.teacher_id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={teacher.profile_image} />
                        <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{teacher.name}</h3>
                          {teacher.is_verified && <CheckCircle className="h-4 w-4 text-blue-400" />}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{teacher.rating}</span>
                          <span>•</span>
                          <span>{teacher.total_students} students</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowTeacherProfile(teacher.teacher_id)}
                        className="border-gray-600 text-white hover:bg-gray-800"
                      >
                        View Profile
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {teacher.expertise_areas.slice(0, 3).map(subject => (
                        <Badge key={subject} variant="secondary" className="text-xs bg-gray-800">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">{teacher.bio}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-gray-400">From </span>
                        <span className="font-semibold text-green-400">${teacher.hourly_rate}/hr</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-gray-600">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Subscribe
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div className="h-screen overflow-y-auto pt-16 pb-20">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Bookmarked Videos</h2>
              {bookmarkedVideos.length === 0 ? (
                <div className="text-center py-12">
                  <Bookmark className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-400 mb-2">No bookmarked videos yet</h3>
                  <p className="text-gray-500">Bookmark videos to save them for later</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookmarkedVideos.map(item => (
                    <Card key={item.video.video_id} className="bg-gray-900 border-gray-800 overflow-hidden">
                      <div className="flex">
                        <div className="w-32 h-24 bg-gray-800 relative flex-shrink-0">
                          <img
                            src={item.video.thumbnail_url}
                            alt={item.video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <PlayCircle className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        <CardContent className="flex-1 p-3">
                          <h3 className="font-semibold line-clamp-2 mb-1">{item.video.title}</h3>
                          <p className="text-sm text-gray-400 line-clamp-1 mb-2">{item.creator.name}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{item.video.views.toLocaleString()} views</span>
                            <span>{item.video.likes} likes</span>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="h-screen overflow-y-auto pt-16 pb-20">
            <div className="p-4 space-y-6">
              {/* Profile Header */}
              <div className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarFallback className="text-2xl">U</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-1">Your Profile</h2>
                <p className="text-gray-400">Student • Level {mockUserProgress.level}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-900 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{mockUserProgress.total_points}</div>
                  <div className="text-sm text-gray-400">Points</div>
                </div>
                <div className="text-center p-4 bg-gray-900 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{mockUserProgress.streak_days}</div>
                  <div className="text-sm text-gray-400">Day Streak</div>
                </div>
                <div className="text-center p-4 bg-gray-900 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">{mockUserProgress.badges.length}</div>
                  <div className="text-sm text-gray-400">Badges</div>
                </div>
              </div>

              {/* Badges */}
              <div>
                <h3 className="font-semibold mb-3">Your Badges</h3>
                <div className="grid grid-cols-2 gap-3">
                  {mockUserProgress.badges.map(badge => (
                    <div key={badge.badge_id} className="bg-gray-900 p-3 rounded-lg text-center">
                      <Award className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                      <div className="font-medium text-sm">{badge.name}</div>
                      <div className="text-xs text-gray-400">{badge.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-white hover:bg-gray-800"
                  onClick={() => setShowUpload(true)}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Video
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-white hover:bg-gray-800"
                  onClick={() => setShowStudentProfile(true)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Complete Profile
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-800">
        <div className="flex items-center justify-around py-2">
          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 p-2 ${
              activeTab === 'home' ? 'text-blue-400' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('home')}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 p-2 ${
              activeTab === 'teachers' ? 'text-blue-400' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('teachers')}
          >
            <Users className="h-6 w-6" />
            <span className="text-xs">Teachers</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 p-2 ${
              activeTab === 'bookmarks' ? 'text-blue-400' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('bookmarks')}
          >
            <Bookmark className="h-6 w-6" />
            <span className="text-xs">Saved</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 p-2 ${
              activeTab === 'profile' ? 'text-blue-400' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            <User className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
