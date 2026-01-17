// Quiz Feature Types for LMS

export interface Quiz {
  quiz_id: string;
  title: string;
  description: string;
  subject: ScienceSubject;
  topic: string;
  grade_level: string;
  difficulty: QuizDifficulty;
  questions: QuizQuestion[];
  time_limit?: number; // in minutes
  passing_score: number; // percentage
  is_active: boolean;
  created_by: string; // teacher ID
  total_attempts: number;
  average_score: number;
  tags: string[];
  created_at: Date;
  updated_at: Date;
}

export interface QuizQuestion {
  question_id: string;
  quiz_id: string;
  question_text: string;
  question_type: QuestionType;
  options?: string[]; // for multiple choice
  correct_answer: string | string[]; // single answer or multiple correct answers
  explanation?: string;
  points: number;
  time_limit?: number; // in seconds
  order: number;
}

export interface QuizAttempt {
  attempt_id: string;
  quiz_id: string;
  student_id: string;
  answers: QuizAnswer[];
  score: number;
  percentage: number;
  time_taken: number; // in seconds
  completed_at: Date;
  is_passed: boolean;
}

export interface QuizAnswer {
  question_id: string;
  answer: string | string[];
  is_correct: boolean;
  time_taken: number; // in seconds
}

export interface QuizStreak {
  streak_id: string;
  student_id: string;
  current_streak: number;
  longest_streak: number;
  last_quiz_date: Date;
  weekly_goal: number; // quizzes per week
  weekly_progress: number; // completed this week
  week_start_date: Date;
  badges_earned: QuizBadge[];
  created_at: Date;
  updated_at: Date;
}

export interface QuizBadge {
  badge_id: string;
  name: string;
  description: string;
  icon: string;
  earned_at: Date;
  type: BadgeType;
}

export enum ScienceSubject {
  PHYSICS = 'physics',
  CHEMISTRY = 'chemistry',
  BIOLOGY = 'biology',
  EARTH_SCIENCE = 'earth_science',
  ASTRONOMY = 'astronomy',
  ENVIRONMENTAL_SCIENCE = 'environmental_science',
  GENERAL_SCIENCE = 'general_science'
}

export enum QuizDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert'
}

export enum QuestionType {
  MULTIPLE_CHOICE_SINGLE = 'multiple_choice_single',
  MULTIPLE_CHOICE_MULTIPLE = 'multiple_choice_multiple',
  TRUE_FALSE = 'true_false',
  SHORT_ANSWER = 'short_answer',
  ESSAY = 'essay'
}

export enum BadgeType {
  FIRST_QUIZ = 'first_quiz',
  WEEKLY_WARRIOR = 'weekly_warrior',
  STREAK_MASTER = 'streak_master',
  PERFECT_SCORE = 'perfect_score',
  SUBJECT_EXPERT = 'subject_expert',
  SPEED_DEMON = 'speed_demon',
  CONSISTENT_LEARNER = 'consistent_learner'
}

// Quiz Statistics and Analytics
export interface QuizStats {
  total_quizzes: number;
  total_attempts: number;
  average_score: number;
  pass_rate: number;
  popular_subjects: { subject: ScienceSubject; count: number }[];
  difficulty_distribution: { difficulty: QuizDifficulty; count: number }[];
}

export interface StudentQuizProgress {
  student_id: string;
  completed_quizzes: number;
  average_score: number;
  favorite_subject: ScienceSubject;
  current_streak: number;
  weekly_progress: number;
  badges_count: number;
  total_time_spent: number; // in minutes
  last_activity: Date;
}

// Quiz Creation and Management
export interface QuizCreationData {
  title: string;
  description: string;
  subject: ScienceSubject;
  topic: string;
  grade_level: string;
  difficulty: QuizDifficulty;
  questions: Omit<QuizQuestion, 'question_id' | 'quiz_id'>[];
  time_limit?: number;
  passing_score: number;
  tags: string[];
}

export interface QuizFilters {
  subject?: ScienceSubject;
  topic?: string;
  grade_level?: string;
  difficulty?: QuizDifficulty;
  created_by?: string;
  is_active?: boolean;
  sort_by: 'newest' | 'oldest' | 'popular' | 'rating';
}

// API Response Types
export interface QuizListResponse {
  quizzes: Quiz[];
  total_count: number;
  has_more: boolean;
  filters: QuizFilters;
}

export interface QuizAttemptResponse {
  attempt: QuizAttempt;
  quiz: Quiz;
  feedback?: string;
  next_recommended_quiz?: string;
}

export interface StreakUpdateResponse {
  streak: QuizStreak;
  new_badges?: QuizBadge[];
  weekly_goal_achieved: boolean;
}
