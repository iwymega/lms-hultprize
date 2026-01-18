import React, { useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { useQuizStore } from '../stores/quizStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScienceSubject, QuizDifficulty } from '../types';
import { BookOpen, Clock, Trophy, Target } from 'lucide-react';

const QuizPage: React.FC = () => {
  const {
    quizzes,
    filters,
    isLoading,
    error,
    fetchQuizzes,
    updateFilters,
    userStreak
  } = useQuizStore();

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  const handleSubjectChange = (subject: ScienceSubject) => {
    updateFilters({ subject });
    fetchQuizzes({ subject });
  };

  const handleDifficultyChange = (difficulty: QuizDifficulty) => {
    updateFilters({ difficulty });
    fetchQuizzes({ difficulty });
  };

  const getSubjectColor = (subject: ScienceSubject) => {
    const colors = {
      [ScienceSubject.PHYSICS]: 'bg-blue-100 text-blue-800',
      [ScienceSubject.CHEMISTRY]: 'bg-green-100 text-green-800',
      [ScienceSubject.BIOLOGY]: 'bg-red-100 text-red-800',
      [ScienceSubject.EARTH_SCIENCE]: 'bg-yellow-100 text-yellow-800',
      [ScienceSubject.ASTRONOMY]: 'bg-purple-100 text-purple-800',
      [ScienceSubject.ENVIRONMENTAL_SCIENCE]: 'bg-teal-100 text-teal-800',
      [ScienceSubject.GENERAL_SCIENCE]: 'bg-gray-100 text-gray-800'
    };
    return colors[subject] || colors[ScienceSubject.GENERAL_SCIENCE];
  };

  const getDifficultyColor = (difficulty: QuizDifficulty) => {
    const colors = {
      [QuizDifficulty.EASY]: 'bg-green-100 text-green-800',
      [QuizDifficulty.MEDIUM]: 'bg-yellow-100 text-yellow-800',
      [QuizDifficulty.HARD]: 'bg-red-100 text-red-800',
      [QuizDifficulty.EXPERT]: 'bg-purple-100 text-purple-800'
    };
    return colors[difficulty];
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-8 px-4">
          <div className="text-center">Loading quizzes...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-8 px-4">
          <div className="text-center text-red-600">Error: {error}</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Science Quizzes</h1>
          <p className="text-gray-600">Test your knowledge and maintain your learning streak!</p>
        </div>

        {/* Progress Overview */}
        {userStreak && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">Current Streak</p>
                    <p className="text-2xl font-bold">{userStreak.current_streak}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Weekly Goal</p>
                    <p className="text-2xl font-bold">{userStreak.weekly_goal}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">This Week</p>
                    <p className="text-2xl font-bold">{userStreak.weekly_progress}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">Best Streak</p>
                    <p className="text-2xl font-bold">{userStreak.longest_streak}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Subject:</label>
            <Select value={filters.subject} onValueChange={handleSubjectChange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ScienceSubject).map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject.replace('_', ' ').toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Difficulty:</label>
            <Select value={filters.difficulty} onValueChange={handleDifficultyChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.quiz_id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    <CardDescription>{quiz.description}</CardDescription>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className={getSubjectColor(quiz.subject)}>
                    {quiz.subject.replace('_', ' ')}
                  </Badge>
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    {quiz.difficulty}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span>{quiz.questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Attempts:</span>
                    <span>{quiz.total_attempts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. Score:</span>
                    <span>{quiz.average_score.toFixed(1)}%</span>
                  </div>
                  {quiz.time_limit && (
                    <div className="flex justify-between">
                      <span>Time Limit:</span>
                      <span>{quiz.time_limit} min</span>
                    </div>
                  )}
                </div>

                <Button className="w-full mt-4" size="sm">
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {quizzes.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes found</h3>
            <p className="text-gray-500">Try adjusting your filters or check back later for new quizzes.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default QuizPage;
