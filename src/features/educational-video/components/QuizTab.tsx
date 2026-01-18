import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScienceSubject, QuizDifficulty } from '../../quiz/types';
import { BookOpen, Clock, Trophy, Target, Play, Award } from 'lucide-react';

// Mock quiz data
const mockQuizzes = [
  {
    quiz_id: '1',
    title: 'Newton\'s Laws of Motion',
    description: 'Test your understanding of the fundamental principles of physics',
    subject: ScienceSubject.PHYSICS,
    difficulty: QuizDifficulty.MEDIUM,
    questions: Array(10).fill({}), // Mock questions
    total_attempts: 245,
    average_score: 78.5,
    time_limit: 15,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    quiz_id: '2',
    title: 'Chemical Bonding Basics',
    description: 'Explore the different types of chemical bonds and their properties',
    subject: ScienceSubject.CHEMISTRY,
    difficulty: QuizDifficulty.EASY,
    questions: Array(8).fill({}),
    total_attempts: 189,
    average_score: 85.2,
    time_limit: 12,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    quiz_id: '3',
    title: 'Cell Structure and Function',
    description: 'Comprehensive quiz on eukaryotic and prokaryotic cell biology',
    subject: ScienceSubject.BIOLOGY,
    difficulty: QuizDifficulty.HARD,
    questions: Array(15).fill({}),
    total_attempts: 156,
    average_score: 67.8,
    time_limit: 20,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    quiz_id: '4',
    title: 'Plate Tectonics Theory',
    description: 'Understanding continental drift and plate boundaries',
    subject: ScienceSubject.EARTH_SCIENCE,
    difficulty: QuizDifficulty.MEDIUM,
    questions: Array(12).fill({}),
    total_attempts: 98,
    average_score: 82.1,
    time_limit: 18,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    quiz_id: '5',
    title: 'Solar System Formation',
    description: 'The nebular hypothesis and planetary formation processes',
    subject: ScienceSubject.ASTRONOMY,
    difficulty: QuizDifficulty.EXPERT,
    questions: Array(20).fill({}),
    total_attempts: 67,
    average_score: 54.3,
    time_limit: 25,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    quiz_id: '6',
    title: 'Ecosystem Dynamics',
    description: 'Energy flow, nutrient cycles, and population interactions',
    subject: ScienceSubject.ENVIRONMENTAL_SCIENCE,
    difficulty: QuizDifficulty.MEDIUM,
    questions: Array(14).fill({}),
    total_attempts: 134,
    average_score: 76.9,
    time_limit: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    quiz_id: '7',
    title: 'Quantum Mechanics Fundamentals',
    description: 'Wave-particle duality, uncertainty principle, and quantum states',
    subject: ScienceSubject.PHYSICS,
    difficulty: QuizDifficulty.EXPERT,
    questions: Array(18).fill({}),
    total_attempts: 45,
    average_score: 42.7,
    time_limit: 30,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    quiz_id: '8',
    title: 'Organic Chemistry Reactions',
    description: 'Common reaction mechanisms and functional group transformations',
    subject: ScienceSubject.CHEMISTRY,
    difficulty: QuizDifficulty.HARD,
    questions: Array(16).fill({}),
    total_attempts: 112,
    average_score: 61.4,
    time_limit: 22,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    quiz_id: '9',
    title: 'Human Anatomy Systems',
    description: 'Major organ systems and their physiological functions',
    subject: ScienceSubject.BIOLOGY,
    difficulty: QuizDifficulty.MEDIUM,
    questions: Array(13).fill({}),
    total_attempts: 203,
    average_score: 79.6,
    time_limit: 16,
    created_at: new Date(),
    updated_at: new Date()
  }
];

const mockUserStreak = {
  current_streak: 7,
  weekly_goal: 10,
  weekly_progress: 8,
  longest_streak: 15,
  last_quiz_date: new Date()
};

export const QuizTab: React.FC = () => {
  const [quizzes, setQuizzes] = useState(mockQuizzes);
  const [filteredQuizzes, setFilteredQuizzes] = useState(mockQuizzes);
  const [selectedSubject, setSelectedSubject] = useState<ScienceSubject | 'ALL'>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty | 'ALL'>('ALL');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    filterQuizzes();
  }, [selectedSubject, selectedDifficulty]);

  const filterQuizzes = () => {
    let filtered = mockQuizzes;

    if (selectedSubject !== 'ALL') {
      filtered = filtered.filter(quiz => quiz.subject === selectedSubject);
    }

    if (selectedDifficulty !== 'ALL') {
      filtered = filtered.filter(quiz => quiz.difficulty === selectedDifficulty);
    }

    setFilteredQuizzes(filtered);
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value as ScienceSubject | 'ALL');
  };

  const handleDifficultyChange = (value: string) => {
    setSelectedDifficulty(value as QuizDifficulty | 'ALL');
  };

  const getSubjectColor = (subject: ScienceSubject) => {
    const colors = {
      [ScienceSubject.PHYSICS]: 'bg-[#E0E1DD]/20 text-[#1B263B] border-[#E0E1DD]/40',
      [ScienceSubject.CHEMISTRY]: 'bg-[#415A77]/20 text-[#E0E1DD] border-[#415A77]/40',
      [ScienceSubject.BIOLOGY]: 'bg-[#E0E1DD]/20 text-[#1B263B] border-[#E0E1DD]/40',
      [ScienceSubject.EARTH_SCIENCE]: 'bg-[#415A77]/20 text-[#E0E1DD] border-[#415A77]/40',
      [ScienceSubject.ASTRONOMY]: 'bg-[#E0E1DD]/20 text-[#1B263B] border-[#E0E1DD]/40',
      [ScienceSubject.ENVIRONMENTAL_SCIENCE]: 'bg-[#415A77]/20 text-[#E0E1DD] border-[#415A77]/40',
      [ScienceSubject.GENERAL_SCIENCE]: 'bg-[#E0E1DD]/20 text-[#1B263B] border-[#E0E1DD]/40'
    };
    return colors[subject] || colors[ScienceSubject.GENERAL_SCIENCE];
  };

  const getDifficultyColor = (difficulty: QuizDifficulty) => {
    const colors = {
      [QuizDifficulty.EASY]: 'bg-[#E0E1DD]/20 text-[#1B263B] border-[#E0E1DD]/40',
      [QuizDifficulty.MEDIUM]: 'bg-[#415A77]/20 text-[#E0E1DD] border-[#415A77]/40',
      [QuizDifficulty.HARD]: 'bg-[#1B263B]/20 text-[#E0E1DD] border-[#1B263B]/40',
      [QuizDifficulty.EXPERT]: 'bg-[#E0E1DD] text-[#1B263B] border-[#1B263B]/40'
    };
    return colors[difficulty];
  };

  return (
    <div className="h-screen overflow-y-auto pt-16 pb-20 bg-gradient-to-br from-[#1B263B] via-[#415A77] to-[#1B263B]">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E0E1DD] mb-2">Science Quizzes</h2>
          <p className="text-[#E0E1DD]/80">Test your knowledge and maintain your learning streak!</p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-[#E0E1DD]" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-[#E0E1DD]/80">Current Streak</p>
                  <p className="text-lg sm:text-2xl font-bold text-[#E0E1DD]">{mockUserStreak.current_streak}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-[#E0E1DD]" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-[#E0E1DD]/80">Weekly Goal</p>
                  <p className="text-lg sm:text-2xl font-bold text-[#E0E1DD]">{mockUserStreak.weekly_goal}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-[#E0E1DD]" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-[#E0E1DD]/80">This Week</p>
                  <p className="text-lg sm:text-2xl font-bold text-[#E0E1DD]">{mockUserStreak.weekly_progress}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#E0E1DD]" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-[#E0E1DD]/80">Best Streak</p>
                  <p className="text-lg sm:text-2xl font-bold text-[#E0E1DD]">{mockUserStreak.longest_streak}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-sm font-medium text-[#E0E1DD]">Subject:</label>
            <Select value={selectedSubject} onValueChange={handleSubjectChange}>
              <SelectTrigger className="w-full sm:w-48 bg-white/10 border-white/20 text-[#E0E1DD] min-h-[44px]">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Subjects</SelectItem>
                {Object.values(ScienceSubject).map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject.replace('_', ' ').toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-sm font-medium text-[#E0E1DD]">Difficulty:</label>
            <Select value={selectedDifficulty} onValueChange={handleDifficultyChange}>
              <SelectTrigger className="w-full sm:w-32 bg-white/10 border-white/20 text-[#E0E1DD] min-h-[44px]">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Levels</SelectItem>
                {Object.values(QuizDifficulty).map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quiz Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredQuizzes.map((quiz: any) => (
            <Card key={quiz.quiz_id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base sm:text-lg text-[#E0E1DD] line-clamp-2">{quiz.title}</CardTitle>
                    <CardDescription className="text-[#E0E1DD]/70 line-clamp-2 mt-1">{quiz.description}</CardDescription>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge className={`${getSubjectColor(quiz.subject)} border backdrop-blur-sm text-xs`}>
                    {quiz.subject.replace('_', ' ')}
                  </Badge>
                  <Badge className={`${getDifficultyColor(quiz.difficulty)} border backdrop-blur-sm text-xs`}>
                    {quiz.difficulty}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-2 text-sm text-[#E0E1DD]/80 mb-4">
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span className="font-medium">{quiz.questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Attempts:</span>
                    <span className="font-medium">{quiz.total_attempts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. Score:</span>
                    <span className="font-medium">{quiz.average_score.toFixed(1)}%</span>
                  </div>
                  {quiz.time_limit && (
                    <div className="flex justify-between">
                      <span>Time Limit:</span>
                      <span className="font-medium">{quiz.time_limit} min</span>
                    </div>
                  )}
                </div>

                <Button className="w-full bg-[#E0E1DD] hover:bg-[#E0E1DD]/90 text-[#1B263B] font-semibold min-h-[44px] shadow-lg border border-[#1B263B]/20">
                  <Play className="h-4 w-4 mr-2" />
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {quizzes.length === 0 && (
          <div className="text-center py-12">
            <Award className="mx-auto h-12 w-12 text-[#E0E1DD]/60 mb-4" />
            <h3 className="text-lg font-medium text-[#E0E1DD] mb-2">No quizzes found</h3>
            <p className="text-[#E0E1DD]/70">Try adjusting your filters or check back later for new quizzes.</p>
          </div>
        )}
      </div>
    </div>
  );
};
