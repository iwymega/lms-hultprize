// Educational Video App Types (TikTok-style)

export interface EducationalVideo {
  video_id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  duration: number; // in seconds
  subject: string;
  topic: string;
  grade_level: GradeLevel;
  difficulty: DifficultyLevel;
  tags: string[];
  creator_id: string; // teacher or student ID
  creator_type: 'teacher' | 'student';
  views: number;
  likes: number;
  shares: number;
  comments_count: number;
  is_featured: boolean;
  is_private: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface VideoComment {
  comment_id: string;
  video_id: string;
  user_id: string;
  user_type: 'teacher' | 'student';
  content: string;
  likes: number;
  parent_comment_id?: string; // for replies
  created_at: Date;
  updated_at: Date;
}

export interface VideoLike {
  like_id: string;
  video_id: string;
  user_id: string;
  user_type: 'teacher' | 'student';
  created_at: Date;
}

export interface VideoBookmark {
  bookmark_id: string;
  video_id: string;
  user_id: string;
  user_type: 'teacher' | 'student';
  created_at: Date;
}

export interface VideoPlaylist {
  playlist_id: string;
  title: string;
  description: string;
  creator_id: string;
  creator_type: 'teacher' | 'student';
  videos: string[]; // video IDs
  is_public: boolean;
  tags: string[];
  created_at: Date;
  updated_at: Date;
}

export interface VideoChallenge {
  challenge_id: string;
  title: string;
  description: string;
  subject: string;
  topic: string;
  grade_level: GradeLevel;
  deadline: Date;
  reward_points: number;
  submissions: VideoSubmission[];
  created_by: string; // teacher ID
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface VideoSubmission {
  submission_id: string;
  challenge_id: string;
  video_id: string;
  student_id: string;
  score?: number;
  feedback?: string;
  submitted_at: Date;
}

export enum GradeLevel {
  ELEMENTARY = 'elementary', // Grades 1-5
  MIDDLE = 'middle', // Grades 6-8
  HIGH = 'high', // Grades 9-12
  COLLEGE = 'college',
  PROFESSIONAL = 'professional'
}

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum VideoCategory {
  TUTORIAL = 'tutorial',
  EXPLANATION = 'explanation',
  DEMONSTRATION = 'demonstration',
  QUIZ = 'quiz',
  PROJECT = 'project',
  DISCUSSION = 'discussion',
  CHALLENGE = 'challenge'
}

export interface VideoFeedItem {
  video: EducationalVideo;
  creator: {
    id: string;
    name: string;
    avatar?: string;
    type: 'teacher' | 'student';
    rating?: number;
  };
  isLiked: boolean;
  isBookmarked: boolean;
  userInteraction: {
    liked: boolean;
    bookmarked: boolean;
    watched: boolean;
  };
}

export interface VideoUploadData {
  title: string;
  description: string;
  subject: string;
  topic: string;
  grade_level: GradeLevel;
  difficulty: DifficultyLevel;
  tags: string[];
  is_private: boolean;
  video_file: File;
  thumbnail_file?: File;
}

export interface VideoFilters {
  subject?: string;
  topic?: string;
  grade_level?: GradeLevel;
  difficulty?: DifficultyLevel;
  creator_type?: 'teacher' | 'student';
  is_featured?: boolean;
  sort_by: 'latest' | 'popular' | 'trending' | 'rating';
  time_range?: 'today' | 'week' | 'month' | 'all';
}

// API Response Types
export interface VideoFeedResponse {
  videos: VideoFeedItem[];
  has_more: boolean;
  next_cursor?: string;
  total_count: number;
}

export interface VideoStats {
  total_videos: number;
  total_views: number;
  total_likes: number;
  total_comments: number;
  user_stats: {
    videos_uploaded: number;
    videos_liked: number;
    videos_bookmarked: number;
    challenges_completed: number;
  };
}

// Video Player States
export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  playbackRate: number;
}

// Challenge and Gamification
export interface UserProgress {
  user_id: string;
  total_points: number;
  level: number;
  badges: Badge[];
  completed_challenges: string[];
  streak_days: number;
  weekly_goal_progress: number;
}

export interface Badge {
  badge_id: string;
  name: string;
  description: string;
  icon_url: string;
  earned_at: Date;
  category: 'learning' | 'engagement' | 'achievement' | 'social';
}

export enum BadgeType {
  FIRST_VIDEO = 'first_video',
  VIDEO_MASTER = 'video_master',
  HELPFUL_TEACHER = 'helpful_teacher',
  KNOWLEDGE_SEEKER = 'knowledge_seeker',
  CHALLENGE_WINNER = 'challenge_winner',
  COMMUNITY_BUILDER = 'community_builder',
  STREAK_MASTER = 'streak_master'
}
