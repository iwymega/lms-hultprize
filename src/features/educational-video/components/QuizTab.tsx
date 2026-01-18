import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScienceSubject, QuizDifficulty } from '../../quiz/types';
import { BookOpen, Clock, Trophy, Target, Play, Award, CheckCircle, XCircle, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

// Mock questions for each quiz
const mockQuestions = {
  '1': [ // Newton's Laws
    {
      id: 'q1',
      question: 'According to Newton\'s First Law, an object at rest will remain at rest, and an object in motion will remain in motion with constant velocity, unless acted upon by:',
      options: ['A magnetic field', 'An unbalanced force', 'Gravity', 'Friction'],
      correctAnswer: 1,
      explanation: 'Newton\'s First Law states that an object will maintain its state of motion unless acted upon by an unbalanced force.'
    },
    {
      id: 'q2',
      question: 'Newton\'s Second Law states that Force equals:',
      options: ['Mass × Acceleration', 'Mass × Velocity', 'Mass ÷ Acceleration', 'Velocity ÷ Acceleration'],
      correctAnswer: 0,
      explanation: 'F = ma (Force = Mass × Acceleration)'
    },
    {
      id: 'q3',
      question: 'For every action, there is an equal and opposite reaction. This is Newton\'s:',
      options: ['First Law', 'Second Law', 'Third Law', 'Law of Universal Gravitation'],
      correctAnswer: 2,
      explanation: 'Newton\'s Third Law: For every action, there is an equal and opposite reaction.'
    }
  ],
  '2': [ // Chemical Bonding
    {
      id: 'q1',
      question: 'Which type of bond involves the sharing of electrons between atoms?',
      options: ['Ionic bond', 'Covalent bond', 'Hydrogen bond', 'Metallic bond'],
      correctAnswer: 1,
      explanation: 'Covalent bonds involve the sharing of electrons between atoms.'
    },
    {
      id: 'q2',
      question: 'In an ionic bond, electrons are:',
      options: ['Shared equally', 'Transferred from one atom to another', 'Both shared and transferred', 'Not involved'],
      correctAnswer: 1,
      explanation: 'Ionic bonds form when electrons are transferred from one atom to another.'
    }
  ],
  '3': [ // Cell Biology
    {
      id: 'q1',
      question: 'Which organelle is responsible for producing energy in eukaryotic cells?',
      options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
      correctAnswer: 1,
      explanation: 'Mitochondria are the powerhouse of the cell, responsible for ATP production.'
    },
    {
      id: 'q2',
      question: 'The control center of the cell containing DNA is the:',
      options: ['Mitochondria', 'Nucleus', 'Endoplasmic reticulum', 'Lysosome'],
      correctAnswer: 1,
      explanation: 'The nucleus contains the cell\'s genetic material (DNA).'
    }
  ]
};

// Mock quiz data
const mockQuizzes = [
  {
    quiz_id: '1',
    title: 'Newton\'s Laws of Motion',
    description: 'Test your understanding of the fundamental principles of physics',
    subject: ScienceSubject.PHYSICS,
    difficulty: QuizDifficulty.MEDIUM,
    questions: mockQuestions['1'],
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
  const [filteredQuizzes, setFilteredQuizzes] = useState(mockQuizzes);
  const [selectedSubject, setSelectedSubject] = useState<ScienceSubject | 'ALL'>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty | 'ALL'>('ALL');

  // Quiz taking state
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [quizStartTime, setQuizStartTime] = useState<Date | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState<any>(null);

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

  // Quiz taking functions
  const startQuiz = (quiz: any) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setAnswers(new Array(quiz.questions.length).fill(-1));
    setQuizStartTime(new Date());
    setTimeRemaining(quiz.time_limit ? quiz.time_limit * 60 : null);
    setShowResults(false);
    setQuizResults(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitQuiz = () => {
    const endTime = new Date();
    const timeSpent = quizStartTime ? Math.floor((endTime.getTime() - quizStartTime.getTime()) / 1000) : 0;

    let correctAnswers = 0;
    const questionResults = activeQuiz.questions.map((question: any, index: number) => {
      const isCorrect = answers[index] === question.correctAnswer;
      if (isCorrect) correctAnswers++;
      return {
        question: question.question,
        userAnswer: answers[index],
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
        options: question.options
      };
    });

    const score = Math.round((correctAnswers / activeQuiz.questions.length) * 100);

    const results = {
      quizId: activeQuiz.quiz_id,
      quizTitle: activeQuiz.title,
      score,
      correctAnswers,
      totalQuestions: activeQuiz.questions.length,
      timeSpent,
      timeLimit: activeQuiz.time_limit,
      questionResults,
      completedAt: endTime
    };

    setQuizResults(results);
    setShowResults(true);
    setActiveQuiz(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTimeRemaining(null);
    setQuizStartTime(null);
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTimeRemaining(null);
    setQuizStartTime(null);
    setShowResults(false);
    setQuizResults(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeRemaining !== null && timeRemaining > 0 && activeQuiz) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 1) {
            // Auto-submit when time runs out
            if (prev === 1) {
              submitQuiz();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeRemaining, activeQuiz]);

  return (
    <>
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

                <Button
                  className="w-full bg-[#E0E1DD] hover:bg-[#E0E1DD]/90 text-[#1B263B] font-semibold min-h-[44px] shadow-lg border border-[#1B263B]/20"
                  onClick={() => startQuiz(quiz)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockQuizzes.length === 0 && (
          <div className="text-center py-12">
            <Award className="mx-auto h-12 w-12 text-[#E0E1DD]/60 mb-4" />
            <h3 className="text-lg font-medium text-[#E0E1DD] mb-2">No quizzes found</h3>
            <p className="text-[#E0E1DD]/70">Try adjusting your filters or check back later for new quizzes.</p>
          </div>
        )}
      </div>
    </div>

    {/* Quiz Taking Modal */}
    <Dialog open={!!activeQuiz} onOpenChange={() => resetQuiz()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#1B263B] to-[#415A77] border-white/20">
        <DialogHeader>
          <DialogTitle className="text-[#E0E1DD] flex items-center justify-between">
            <span>{activeQuiz?.title}</span>
            {timeRemaining !== null && (
              <div className="flex items-center gap-2 text-lg font-mono">
                <Clock className="h-5 w-5" />
                {formatTime(timeRemaining)}
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-[#E0E1DD]/80">
              <span>Question {currentQuestionIndex + 1} of {activeQuiz?.questions.length}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / activeQuiz?.questions.length) * 100)}%</span>
            </div>
            <Progress
              value={((currentQuestionIndex + 1) / activeQuiz?.questions.length) * 100}
              className="h-2 bg-white/20"
            />
          </div>

          {/* Current Question */}
          {activeQuiz && activeQuiz.questions[currentQuestionIndex] && (
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <h3 className="text-lg font-medium text-[#E0E1DD] mb-4">
                  {activeQuiz.questions[currentQuestionIndex].question}
                </h3>

                <RadioGroup
                  value={answers[currentQuestionIndex]?.toString()}
                  onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                  className="space-y-3"
                >
                  {activeQuiz.questions[currentQuestionIndex].options.map((option: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${index}`}
                        className="border-white/40 text-[#E0E1DD]"
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 text-[#E0E1DD] cursor-pointer p-3 rounded-md hover:bg-white/10 transition-colors"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={previousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="border-white/40 text-[#E0E1DD] hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentQuestionIndex === activeQuiz.questions.length - 1 ? (
                  <Button
                    onClick={submitQuiz}
                    disabled={answers[currentQuestionIndex] === -1}
                    className="bg-[#E0E1DD] hover:bg-[#E0E1DD]/90 text-[#1B263B] font-semibold"
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Button
                    onClick={nextQuestion}
                    disabled={answers[currentQuestionIndex] === -1}
                    className="bg-[#E0E1DD] hover:bg-[#E0E1DD]/90 text-[#1B263B] font-semibold"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>

    {/* Results Modal */}
    <Dialog open={showResults} onOpenChange={() => setShowResults(false)}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#1B263B] to-[#415A77] border-white/20">
        <DialogHeader>
          <DialogTitle className="text-[#E0E1DD] text-center text-2xl">
            Quiz Results
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Score Overview */}
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-[#E0E1DD]">
              {quizResults?.score}%
            </div>
            <div className="text-[#E0E1DD]/80">
              {quizResults?.correctAnswers} out of {quizResults?.totalQuestions} correct
            </div>
            <div className="flex justify-center gap-4 text-sm text-[#E0E1DD]/70">
              <span>Time: {formatTime(quizResults?.timeSpent || 0)}</span>
              {quizResults?.timeLimit && (
                <span>Limit: {quizResults.timeLimit} min</span>
              )}
            </div>
          </div>

          {/* Performance Badge */}
          <div className="text-center">
            {quizResults?.score >= 90 ? (
              <div className="inline-flex items-center gap-2 bg-[#E0E1DD] text-[#1B263B] px-4 py-2 rounded-full font-semibold">
                <Trophy className="h-5 w-5" />
                Excellent!
              </div>
            ) : quizResults?.score >= 80 ? (
              <div className="inline-flex items-center gap-2 bg-[#415A77] text-[#E0E1DD] px-4 py-2 rounded-full font-semibold">
                <Award className="h-5 w-5" />
                Great Job!
              </div>
            ) : quizResults?.score >= 70 ? (
              <div className="inline-flex items-center gap-2 bg-[#E0E1DD]/80 text-[#1B263B] px-4 py-2 rounded-full font-semibold">
                <CheckCircle className="h-5 w-5" />
                Good Work!
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-[#1B263B] text-[#E0E1DD] px-4 py-2 rounded-full font-semibold">
                <RotateCcw className="h-5 w-5" />
                Keep Practicing!
              </div>
            )}
          </div>

          {/* Question Review */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#E0E1DD]">Question Review</h3>
            {quizResults?.questionResults.map((result: any, index: number) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {result.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1 space-y-2">
                      <p className="text-[#E0E1DD] font-medium">
                        Question {index + 1}: {result.question}
                      </p>

                      <div className="space-y-1 text-sm">
                        <p className="text-[#E0E1DD]/80">
                          Your answer: <span className={result.isCorrect ? 'text-green-400' : 'text-red-400'}>
                            {result.options[result.userAnswer]}
                          </span>
                        </p>
                        {!result.isCorrect && (
                          <p className="text-[#E0E1DD]/80">
                            Correct answer: <span className="text-green-400">
                              {result.options[result.correctAnswer]}
                            </span>
                          </p>
                        )}
                      </div>

                      <p className="text-[#E0E1DD]/70 text-sm italic">
                        {result.explanation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={resetQuiz}
              className="flex-1 bg-[#E0E1DD] hover:bg-[#E0E1DD]/90 text-[#1B263B] font-semibold"
            >
              Take Another Quiz
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowResults(false)}
              className="border-white/40 text-[#E0E1DD] hover:bg-white/10"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </>
  );
};
