import { privateApi as api } from '@/api/api';
import {
  Quiz,
  QuizAttempt,
  QuizStreak,
  QuizCreationData,
  QuizFilters,
  QuizListResponse,
  QuizAttemptResponse,
  StreakUpdateResponse,
  StudentQuizProgress
} from '../types';

export class QuizService {
  // Quiz Management
  static async getQuizzes(filters: QuizFilters = { sort_by: 'newest' }): Promise<QuizListResponse> {
    const params = new URLSearchParams();

    if (filters.subject) params.append('subject', filters.subject);
    if (filters.topic) params.append('topic', filters.topic);
    if (filters.grade_level) params.append('grade_level', filters.grade_level);
    if (filters.difficulty) params.append('difficulty', filters.difficulty);
    if (filters.created_by) params.append('created_by', filters.created_by);
    if (filters.is_active !== undefined) params.append('is_active', filters.is_active.toString());
    params.append('sort_by', filters.sort_by);

    const response = await api.get(`/quizzes?${params.toString()}`);
    return response.data;
  }

  static async getQuizById(quizId: string): Promise<Quiz> {
    const response = await api.get(`/quizzes/${quizId}`);
    return response.data;
  }

  static async createQuiz(quizData: QuizCreationData): Promise<Quiz> {
    const response = await api.post('/quizzes', quizData);
    return response.data;
  }

  static async updateQuiz(quizId: string, quizData: Partial<QuizCreationData>): Promise<Quiz> {
    const response = await api.put(`/quizzes/${quizId}`, quizData);
    return response.data;
  }

  static async deleteQuiz(quizId: string): Promise<void> {
    await api.delete(`/quizzes/${quizId}`);
  }

  // Quiz Attempts
  static async startQuizAttempt(quizId: string): Promise<{ attempt_id: string; quiz: Quiz }> {
    const response = await api.post(`/quizzes/${quizId}/attempts`);
    return response.data;
  }

  static async submitQuizAttempt(attemptId: string, answers: any[]): Promise<QuizAttemptResponse> {
    const response = await api.post(`/quiz-attempts/${attemptId}/submit`, { answers });
    return response.data;
  }

  static async getQuizAttempt(attemptId: string): Promise<QuizAttempt> {
    const response = await api.get(`/quiz-attempts/${attemptId}`);
    return response.data;
  }

  static async getStudentAttempts(studentId: string, quizId?: string): Promise<QuizAttempt[]> {
    const params = quizId ? `?quiz_id=${quizId}` : '';
    const response = await api.get(`/students/${studentId}/quiz-attempts${params}`);
    return response.data;
  }

  // Quiz Streaks and Progress
  static async getStudentStreak(studentId: string): Promise<QuizStreak> {
    const response = await api.get(`/students/${studentId}/quiz-streak`);
    return response.data;
  }

  static async updateStreakAfterAttempt(attemptId: string): Promise<StreakUpdateResponse> {
    const response = await api.post(`/quiz-attempts/${attemptId}/update-streak`);
    return response.data;
  }

  static async getStudentProgress(studentId: string): Promise<StudentQuizProgress> {
    const response = await api.get(`/students/${studentId}/quiz-progress`);
    return response.data;
  }

  static async setWeeklyGoal(studentId: string, goal: number): Promise<QuizStreak> {
    const response = await api.put(`/students/${studentId}/weekly-goal`, { goal });
    return response.data;
  }

  // Quiz Analytics
  static async getQuizStats(): Promise<any> {
    const response = await api.get('/quizzes/stats');
    return response.data;
  }

  static async getPopularQuizzes(limit: number = 10): Promise<Quiz[]> {
    const response = await api.get(`/quizzes/popular?limit=${limit}`);
    return response.data;
  }

  static async getRecommendedQuizzes(studentId: string, limit: number = 5): Promise<Quiz[]> {
    const response = await api.get(`/students/${studentId}/recommended-quizzes?limit=${limit}`);
    return response.data;
  }

  // Helper methods
  static calculateScore(answers: any[], questions: any[]): { score: number; percentage: number } {
    let totalPoints = 0;
    let earnedPoints = 0;

    questions.forEach((question, index) => {
      totalPoints += question.points;
      const answer = answers[index];

      if (this.isAnswerCorrect(answer, question.correct_answer)) {
        earnedPoints += question.points;
      }
    });

    const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

    return { score: earnedPoints, percentage };
  }

  private static isAnswerCorrect(userAnswer: any, correctAnswer: any): boolean {
    if (Array.isArray(correctAnswer)) {
      if (!Array.isArray(userAnswer)) return false;
      return correctAnswer.length === userAnswer.length &&
             correctAnswer.every(ans => userAnswer.includes(ans));
    }
    return userAnswer === correctAnswer;
  }
}
