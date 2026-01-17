import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import {
  Quiz,
  QuizAttempt,
  QuizStreak,
  QuizFilters,
  StudentQuizProgress,
  ScienceSubject,
  QuizDifficulty
} from '../types';
import { QuizService } from '../services/quizService';

interface QuizState {
  // Quiz data
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  currentAttempt: QuizAttempt | null;

  // User progress
  userStreak: QuizStreak | null;
  userProgress: StudentQuizProgress | null;

  // Filters and UI
  filters: QuizFilters;
  isLoading: boolean;
  error: string | null;
}

type QuizAction =
  | { type: 'SET_QUIZZES'; payload: Quiz[] }
  | { type: 'SET_CURRENT_QUIZ'; payload: Quiz | null }
  | { type: 'SET_CURRENT_ATTEMPT'; payload: QuizAttempt | null }
  | { type: 'SET_USER_STREAK'; payload: QuizStreak | null }
  | { type: 'SET_USER_PROGRESS'; payload: StudentQuizProgress | null }
  | { type: 'UPDATE_FILTERS'; payload: Partial<QuizFilters> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' }
  | { type: 'RESET_CURRENT_QUIZ' }
  | { type: 'RESET' };

const initialState: QuizState = {
  quizzes: [],
  currentQuiz: null,
  currentAttempt: null,
  userStreak: null,
  userProgress: null,
  filters: {
    sort_by: 'newest',
    subject: ScienceSubject.GENERAL_SCIENCE,
    difficulty: QuizDifficulty.EASY
  },
  isLoading: false,
  error: null,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_QUIZZES':
      return { ...state, quizzes: action.payload };

    case 'SET_CURRENT_QUIZ':
      return { ...state, currentQuiz: action.payload };

    case 'SET_CURRENT_ATTEMPT':
      return { ...state, currentAttempt: action.payload };

    case 'SET_USER_STREAK':
      return { ...state, userStreak: action.payload };

    case 'SET_USER_PROGRESS':
      return { ...state, userProgress: action.payload };

    case 'UPDATE_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'CLEAR_ERROR':
      return { ...state, error: null };

    case 'RESET_CURRENT_QUIZ':
      return { ...state, currentQuiz: null, currentAttempt: null };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

interface QuizContextType extends QuizState {
  // Quiz actions
  fetchQuizzes: (filters?: Partial<QuizFilters>) => Promise<void>;
  fetchQuizById: (quizId: string) => Promise<void>;
  startQuizAttempt: (quizId: string) => Promise<string>;
  submitQuizAttempt: (attemptId: string, answers: any[]) => Promise<void>;

  // Progress actions
  fetchUserStreak: (studentId: string) => Promise<void>;
  fetchUserProgress: (studentId: string) => Promise<void>;
  setWeeklyGoal: (studentId: string, goal: number) => Promise<void>;

  // Utility actions
  updateFilters: (filters: Partial<QuizFilters>) => void;
  clearError: () => void;
  resetCurrentQuiz: () => void;
  reset: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const contextValue: QuizContextType = {
    ...state,

    // Quiz actions
    fetchQuizzes: async (filters = {}) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      try {
        const currentFilters = { ...state.filters, ...filters };
        const response = await QuizService.getQuizzes(currentFilters);
        dispatch({ type: 'SET_QUIZZES', payload: response.quizzes });
        dispatch({ type: 'UPDATE_FILTERS', payload: currentFilters });
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: error instanceof Error ? error.message : 'Failed to fetch quizzes'
        });
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    fetchQuizById: async (quizId: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      try {
        const quiz = await QuizService.getQuizById(quizId);
        dispatch({ type: 'SET_CURRENT_QUIZ', payload: quiz });
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: error instanceof Error ? error.message : 'Failed to fetch quiz'
        });
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    startQuizAttempt: async (quizId: string): Promise<string> => {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      try {
        const { attempt_id, quiz } = await QuizService.startQuizAttempt(quizId);
        dispatch({ type: 'SET_CURRENT_QUIZ', payload: quiz });
        dispatch({ type: 'SET_LOADING', payload: false });
        return attempt_id;
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: error instanceof Error ? error.message : 'Failed to start quiz attempt'
        });
        dispatch({ type: 'SET_LOADING', payload: false });
        throw error;
      }
    },

    submitQuizAttempt: async (attemptId: string, answers: any[]) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      try {
        const response = await QuizService.submitQuizAttempt(attemptId, answers);
        dispatch({ type: 'SET_CURRENT_ATTEMPT', payload: response.attempt });
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: error instanceof Error ? error.message : 'Failed to submit quiz attempt'
        });
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    // Progress actions
    fetchUserStreak: async (studentId: string) => {
      try {
        const streak = await QuizService.getStudentStreak(studentId);
        dispatch({ type: 'SET_USER_STREAK', payload: streak });
      } catch (error) {
        console.error('Failed to fetch user streak:', error);
      }
    },

    fetchUserProgress: async (studentId: string) => {
      try {
        const progress = await QuizService.getStudentProgress(studentId);
        dispatch({ type: 'SET_USER_PROGRESS', payload: progress });
      } catch (error) {
        console.error('Failed to fetch user progress:', error);
      }
    },

    setWeeklyGoal: async (studentId: string, goal: number) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      try {
        const updatedStreak = await QuizService.setWeeklyGoal(studentId, goal);
        dispatch({ type: 'SET_USER_STREAK', payload: updatedStreak });
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: error instanceof Error ? error.message : 'Failed to set weekly goal'
        });
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    // Utility actions
    updateFilters: (filters: Partial<QuizFilters>) => {
      dispatch({ type: 'UPDATE_FILTERS', payload: filters });
    },

    clearError: () => {
      dispatch({ type: 'CLEAR_ERROR' });
    },

    resetCurrentQuiz: () => {
      dispatch({ type: 'RESET_CURRENT_QUIZ' });
    },

    reset: () => {
      dispatch({ type: 'RESET' });
    }
  };

  return React.createElement(
    QuizContext.Provider,
    { value: contextValue },
    children
  );
}

export function useQuizStore() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuizStore must be used within a QuizProvider');
  }
  return context;
}
