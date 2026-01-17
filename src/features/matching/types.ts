// Core entity types for the LMS Student-Teacher Matching System

export interface Student {
  student_id: string;
  name: string;
  email: string;
  learning_style: LearningStyle;
  preferred_schedule: Schedule[];
  location?: string;
  timezone?: string;
  status: StudentStatus;
  created_at: Date;
  updated_at: Date;
}

export interface Teacher {
  teacher_id: string;
  name: string;
  email: string;
  expertise_areas: string[];
  availability: Schedule[];
  qualifications: string[];
  teaching_style: TeachingStyle;
  location?: string;
  timezone?: string;
  rating: number;
  total_sessions: number;
  status: TeacherStatus;
  materials: TeacherMaterial[];
  session_pricing: SessionPricing;
  created_at: Date;
  updated_at: Date;
}

export interface Match {
  match_id: string;
  student_id: string;
  teacher_id: string;
  match_date: Date;
  status: MatchStatus;
  compatibility_score: number;
  match_criteria: MatchCriteria;
  created_at: Date;
  updated_at: Date;
}

export interface Course {
  course_id: string;
  match_id: string;
  title: string;
  subject: string;
  start_date: Date;
  end_date: Date;
  status: CourseStatus;
  progress_percentage: number;
  final_rating?: number;
  created_at: Date;
  updated_at: Date;
}

// Enums for status and types
export enum StudentStatus {
  REGISTERED = 'registered',
  PROFILE_COMPLETE = 'profile_complete',
  SEEKING_MATCH = 'seeking_match',
  MATCHED = 'matched',
  COURSE_SCHEDULED = 'course_scheduled'
}

export enum TeacherStatus {
  REGISTERED = 'registered',
  PROFILE_VERIFIED = 'profile_verified',
  AVAILABLE = 'available',
  MATCHED = 'matched',
  BUSY = 'busy'
}

export enum MatchStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export enum CourseStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum LearningStyle {
  VISUAL = 'visual',
  AUDITORY = 'auditory',
  KINESTHETIC = 'kinesthetic',
  READING_WRITING = 'reading_writing'
}

export enum TeachingStyle {
  DIRECT_INSTRUCTION = 'direct_instruction',
  INQUIRY_BASED = 'inquiry_based',
  COLLABORATIVE = 'collaborative',
  EXPERIENTIAL = 'experiential'
}

// Schedule and time-related types
export interface Schedule {
  day_of_week: number; // 0-6 (Sunday-Saturday)
  start_time: string; // HH:MM format
  end_time: string; // HH:MM format
}

// Matching criteria and weights
export interface MatchCriteria {
  subject_expertise_score: number; // 0-100
  schedule_compatibility_score: number; // 0-100
  style_compatibility_score: number; // 0-100
  rating_score: number; // 0-100
  location_score: number; // 0-100
  total_score: number; // 0-100
}

export const MATCH_WEIGHTS = {
  SUBJECT_EXPERTISE: 0.35,
  SCHEDULE_COMPATIBILITY: 0.25,
  STYLE_COMPATIBILITY: 0.20,
  RATING: 0.15,
  LOCATION: 0.05
} as const;

// API response types
export interface MatchingResult {
  matches: Match[];
  total_matches: number;
  search_criteria: {
    student_id: string;
    subject?: string;
    min_compatibility_score?: number;
  };
}

export interface ProfileCompletionData {
  student?: Partial<Student>;
  teacher?: Partial<Teacher>;
}

// Teacher Materials and Pricing Types
export interface TeacherMaterial {
  material_id: string;
  teacher_id: string;
  title: string;
  description: string;
  type: MaterialType;
  subject: string;
  grade_level: string;
  file_url?: string;
  video_url?: string;
  youtube_url?: string; // For YouTube Shorts and videos
  price: number; // 0 for free
  is_active: boolean;
  downloads_count: number;
  rating: number;
  created_at: Date;
  updated_at: Date;
}

export interface SessionPricing {
  one_on_one_price: number; // per hour
  group_price: number; // per hour per student
  max_group_size: number;
  currency: string;
  discount_packages?: PricingPackage[];
}

export interface PricingPackage {
  package_id: string;
  name: string;
  session_count: number;
  total_price: number;
  discount_percentage: number;
  description: string;
}

export enum MaterialType {
  PDF = 'pdf',
  QUIZ = 'quiz',
  VIDEO = 'video',
  WORKSHEET = 'worksheet',
  PRESENTATION = 'presentation'
}

// Session Booking Types
export interface SessionBooking {
  booking_id: string;
  teacher_id: string;
  student_id: string;
  session_type: 'one_on_one' | 'group';
  participants?: string[]; // for group sessions
  scheduled_date: Date;
  duration_hours: number;
  price: number;
  status: BookingStatus;
  meeting_link?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show'
}
