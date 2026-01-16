import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Video,
  Upload,
  Search,
  Filter,
  TrendingUp,
  BookOpen,
  Users,
  Award,
  PlayCircle,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  Star,
  Target,
  Zap
} from 'lucide-react';
import { VideoFeed } from '../components/VideoFeed';
import { VideoUpload } from '../components/VideoUpload';
import { StudentProfileForm } from '../../matching/components/StudentProfileForm';
import { useMatchingStore } from '../../matching/stores/matchingStore';
import {
  EducationalVideo,
  VideoFeedItem,
  VideoUploadData,
  VideoFilters,
  GradeLevel,
  DifficultyLevel,
  Badge as BadgeType,
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
  const [activeTab, setActiveTab] = useState('feed');
  const [showUpload, setShowUpload] = useState(false);
  const [showStudentProfile, setShowStudentProfile] = useState(false);
  const [videos, setVideos] = useState<VideoFeedItem[]>([]);
  const [filters, setFilters] = useState<VideoFilters>({
    sort_by: 'trending',
    time_range: 'week'
  });

  const { currentStudent, setCurrentStudent } = useMatchingStore();

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

  const handleVideoComment = async (videoId: string, comment: string) => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Video className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">EduTok</h1>
              </div>
              <Badge variant="secondary" className="hidden md:flex">
                Educational Video Platform
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              {!currentStudent && (
                <Button
                  variant="outline"
                  onClick={() => setShowStudentProfile(true)}
                  className="hidden md:flex"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Complete Profile
                </Button>
              )}

              <Button onClick={() => setShowUpload(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Video
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="feed" className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4" />
              Feed
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="learn" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Learn
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            <VideoFeed
              videos={videos}
              onVideoLike={handleVideoLike}
              onVideoBookmark={handleVideoBookmark}
              onVideoShare={handleVideoShare}
              onVideoComment={handleVideoComment}
              onLoadMore={handleLoadMore}
              hasMore={videos.length < 20}
              isLoading={false}
            />
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos
                .filter(item => item.video.views > 1000)
                .sort((a, b) => b.video.views - a.video.views)
                .slice(0, 9)
                .map((item) => (
                  <Card key={item.video.video_id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 relative">
                      <img
                        src={item.video.thumbnail_url}
                        alt={item.video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <PlayCircle className="h-12 w-12 text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {Math.floor(item.video.duration / 60)}:{(item.video.duration % 60).toString().padStart(2, '0')}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold line-clamp-2 mb-2">{item.video.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={item.creator.avatar} />
                          <AvatarFallback>{item.creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{item.creator.name}</span>
                        {item.creator.rating && (
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>{item.creator.rating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{item.video.views.toLocaleString()} views</span>
                        <span>{item.video.likes} likes</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="learn" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Learning Paths */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Learning Paths
                  </CardTitle>
                  <CardDescription>
                    Structured learning journeys for different subjects
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['Mathematics', 'Science', 'Programming', 'Languages'].map((subject) => (
                    <div key={subject} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{subject} Fundamentals</p>
                          <p className="text-sm text-gray-600">12 videos • 4 hours</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Start Learning
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Challenges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Weekly Challenges
                  </CardTitle>
                  <CardDescription>
                    Compete with others and earn badges
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
                    <h4 className="font-semibold mb-2">Math Problem Solving</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Create a video explaining how to solve quadratic equations
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">50 points</Badge>
                      <Button size="sm">Join Challenge</Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Science Experiment</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Demonstrate a simple physics experiment
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">75 points</Badge>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {mockUserProgress.total_points}
                    </div>
                    <p className="text-sm text-gray-600">Total Points</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Level {mockUserProgress.level}</span>
                      <span>{mockUserProgress.level * 100}/{(mockUserProgress.level + 1) * 100}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(mockUserProgress.level * 100 % 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-semibold">{mockUserProgress.streak_days}</div>
                      <p className="text-xs text-gray-600">Day Streak</p>
                    </div>
                    <div>
                      <div className="text-xl font-semibold">{mockUserProgress.weekly_goal_progress}%</div>
                      <p className="text-xs text-gray-600">Weekly Goal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Your Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {mockUserProgress.badges.map((badge) => (
                      <div key={badge.badge_id} className="text-center p-3 border rounded-lg">
                        <Award className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                        <p className="font-medium text-sm">{badge.name}</p>
                        <p className="text-xs text-gray-600">{badge.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm">Completed "Math Challenge"</p>
                      <p className="text-xs text-gray-600">2 days ago</p>
                    </div>
                    <Badge variant="secondary">+50 pts</Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm">Uploaded new video</p>
                      <p className="text-xs text-gray-600">3 days ago</p>
                    </div>
                    <Badge variant="secondary">+25 pts</Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm">Reached 7-day streak</p>
                      <p className="text-xs text-gray-600">1 week ago</p>
                    </div>
                    <Badge variant="secondary">+100 pts</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
