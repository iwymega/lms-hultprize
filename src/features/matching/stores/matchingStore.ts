import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  Student,
  Teacher,
  Match,
  Course,
  StudentStatus,
  TeacherStatus,
  MatchStatus,
  CourseStatus,
  TeachingStyle,
} from "../types";
import { MatchingService } from "../services/matchingService";

interface MatchingState {
  // Current user profiles
  currentStudent: Student | null;
  currentTeacher: Teacher | null;

  // Available data
  availableTeachers: Teacher[];
  availableStudents: Student[];

  // Matching results
  currentMatches: Match[];
  selectedMatch: Match | null;

  // Course management
  currentCourses: Course[];

  // UI state
  isLoading: boolean;
  error: string | null;
}

type MatchingAction =
  | { type: "SET_CURRENT_STUDENT"; payload: Student | null }
  | { type: "SET_CURRENT_TEACHER"; payload: Teacher | null }
  | { type: "UPDATE_STUDENT_PROFILE"; payload: Partial<Student> }
  | { type: "UPDATE_TEACHER_PROFILE"; payload: Partial<Teacher> }
  | { type: "SET_AVAILABLE_TEACHERS"; payload: Teacher[] }
  | { type: "SET_MATCHES"; payload: Match[] }
  | { type: "SELECT_MATCH"; payload: Match | null }
  | {
      type: "UPDATE_MATCH_STATUS";
      payload: { matchId: string; status: MatchStatus };
    }
  | { type: "ADD_COURSE"; payload: Course }
  | {
      type: "UPDATE_COURSE";
      payload: { courseId: string; updates: Partial<Course> };
    }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CLEAR_MATCHES" }
  | { type: "RESET" };

const initialState: MatchingState = {
  currentStudent: null,
  currentTeacher: null,
  availableTeachers: [],
  availableStudents: [],
  currentMatches: [],
  selectedMatch: null,
  currentCourses: [],
  isLoading: false,
  error: null,
};

function matchingReducer(
  state: MatchingState,
  action: MatchingAction,
): MatchingState {
  switch (action.type) {
    case "SET_CURRENT_STUDENT":
      return { ...state, currentStudent: action.payload };

    case "SET_CURRENT_TEACHER":
      return { ...state, currentTeacher: action.payload };

    case "UPDATE_STUDENT_PROFILE":
      return {
        ...state,
        currentStudent: state.currentStudent
          ? {
              ...state.currentStudent,
              ...action.payload,
              updated_at: new Date(),
            }
          : null,
      };

    case "UPDATE_TEACHER_PROFILE":
      return {
        ...state,
        currentTeacher: state.currentTeacher
          ? {
              ...state.currentTeacher,
              ...action.payload,
              updated_at: new Date(),
            }
          : null,
      };

    case "SET_AVAILABLE_TEACHERS":
      return { ...state, availableTeachers: action.payload };

    case "SET_MATCHES":
      return { ...state, currentMatches: action.payload };

    case "SELECT_MATCH":
      return { ...state, selectedMatch: action.payload };

    case "UPDATE_MATCH_STATUS":
      return {
        ...state,
        currentMatches: state.currentMatches.map((match) =>
          match.match_id === action.payload.matchId
            ? {
                ...match,
                status: action.payload.status,
                updated_at: new Date(),
              }
            : match,
        ),
      };

    case "ADD_COURSE":
      return {
        ...state,
        currentCourses: [...state.currentCourses, action.payload],
      };

    case "UPDATE_COURSE":
      return {
        ...state,
        currentCourses: state.currentCourses.map((course) =>
          course.course_id === action.payload.courseId
            ? { ...course, ...action.payload.updates, updated_at: new Date() }
            : course,
        ),
      };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "CLEAR_MATCHES":
      return { ...state, currentMatches: [], selectedMatch: null };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

interface MatchingContextType extends MatchingState {
  // Actions
  setCurrentStudent: (student: Student | null) => void;
  setCurrentTeacher: (teacher: Teacher | null) => void;
  updateStudentProfile: (updates: Partial<Student>) => void;
  updateTeacherProfile: (updates: Partial<Teacher>) => void;

  // Matching actions
  findMatches: (
    student: Student,
    subject?: string,
    minScore?: number,
  ) => Promise<void>;
  selectMatch: (match: Match) => void;
  acceptMatch: (matchId: string) => Promise<void>;
  rejectMatch: (matchId: string) => Promise<void>;

  // Course actions
  createCourse: (match: Match, courseData: Partial<Course>) => Promise<void>;
  updateCourseProgress: (courseId: string, progress: number) => Promise<void>;
  completeCourse: (courseId: string, rating?: number) => Promise<void>;

  // Status updates
  updateStudentStatus: (status: StudentStatus) => void;
  updateTeacherStatus: (status: TeacherStatus) => void;

  // Utility actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearMatches: () => void;
  reset: () => void;
}

const MatchingContext = createContext<MatchingContextType | undefined>(
  undefined,
);

export function MatchingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(matchingReducer, initialState);

  const contextValue: MatchingContextType = {
    ...state,

    // Profile management
    setCurrentStudent: (student) =>
      dispatch({ type: "SET_CURRENT_STUDENT", payload: student }),
    setCurrentTeacher: (teacher) =>
      dispatch({ type: "SET_CURRENT_TEACHER", payload: teacher }),

    updateStudentProfile: (updates) =>
      dispatch({ type: "UPDATE_STUDENT_PROFILE", payload: updates }),
    updateTeacherProfile: (updates) =>
      dispatch({ type: "UPDATE_TEACHER_PROFILE", payload: updates }),

    // Matching actions
    findMatches: async (student, subject, minScore = 60) => {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      try {
        // In a real app, this would fetch teachers from an API
        // For now, we'll use mock data or the availableTeachers from state
        if (state.availableTeachers.length === 0) {
          const mockTeachers = generateMockTeachers();
          dispatch({ type: "SET_AVAILABLE_TEACHERS", payload: mockTeachers });
        }

        const result = MatchingService.findMatches(
          student,
          state.availableTeachers,
          subject,
          minScore,
        );
        dispatch({ type: "SET_MATCHES", payload: result.matches });
        dispatch({ type: "SET_LOADING", payload: false });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload:
            error instanceof Error ? error.message : "Failed to find matches",
        });
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },

    selectMatch: (match) => dispatch({ type: "SELECT_MATCH", payload: match }),

    acceptMatch: async (matchId) => {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      try {
        dispatch({
          type: "UPDATE_MATCH_STATUS",
          payload: { matchId, status: MatchStatus.ACCEPTED },
        });
        dispatch({ type: "SET_LOADING", payload: false });

        // Update student status to matched
        contextValue.updateStudentStatus(StudentStatus.MATCHED);
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload:
            error instanceof Error ? error.message : "Failed to accept match",
        });
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },

    rejectMatch: async (matchId) => {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      try {
        dispatch({
          type: "UPDATE_MATCH_STATUS",
          payload: { matchId, status: MatchStatus.REJECTED },
        });
        dispatch({ type: "SET_LOADING", payload: false });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload:
            error instanceof Error ? error.message : "Failed to reject match",
        });
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },

    // Course actions
    createCourse: async (match, courseData) => {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      try {
        const newCourse: Course = {
          course_id: `course_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          match_id: match.match_id,
          title:
            courseData.title ||
            `Course: ${match.match_criteria.subject_expertise_score > 50 ? "Advanced" : "Beginner"} ${courseData.subject || "Subject"}`,
          subject: courseData.subject || "General",
          start_date: courseData.start_date || new Date(),
          end_date:
            courseData.end_date ||
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          status: CourseStatus.SCHEDULED,
          progress_percentage: 0,
          created_at: new Date(),
          updated_at: new Date(),
        };

        dispatch({ type: "ADD_COURSE", payload: newCourse });
        dispatch({ type: "SET_LOADING", payload: false });

        // Update student status to course scheduled
        contextValue.updateStudentStatus(StudentStatus.COURSE_SCHEDULED);
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload:
            error instanceof Error ? error.message : "Failed to create course",
        });
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },

    updateCourseProgress: async (courseId, progress) => {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      try {
        dispatch({
          type: "UPDATE_COURSE",
          payload: { courseId, updates: { progress_percentage: progress } },
        });
        dispatch({ type: "SET_LOADING", payload: false });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload:
            error instanceof Error
              ? error.message
              : "Failed to update progress",
        });
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },

    completeCourse: async (courseId, rating) => {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      try {
        dispatch({
          type: "UPDATE_COURSE",
          payload: {
            courseId,
            updates: {
              status: CourseStatus.COMPLETED,
              final_rating: rating,
            },
          },
        });
        dispatch({ type: "SET_LOADING", payload: false });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload:
            error instanceof Error
              ? error.message
              : "Failed to complete course",
        });
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },

    // Status updates
    updateStudentStatus: (status) => {
      if (state.currentStudent) {
        contextValue.updateStudentProfile({ status });
      }
    },

    updateTeacherStatus: (status) => {
      if (state.currentTeacher) {
        contextValue.updateTeacherProfile({ status });
      }
    },

    // Utility actions
    setLoading: (loading) =>
      dispatch({ type: "SET_LOADING", payload: loading }),
    setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
    clearMatches: () => dispatch({ type: "CLEAR_MATCHES" }),
    reset: () => dispatch({ type: "RESET" }),
  };

  return React.createElement(
    MatchingContext.Provider,
    { value: contextValue },
    children,
  );
}

export function useMatchingStore() {
  const context = useContext(MatchingContext);
  if (context === undefined) {
    throw new Error("useMatchingStore must be used within a MatchingProvider");
  }
  return context;
}

// Mock data generator for demonstration
function generateMockTeachers(): Teacher[] {
  return [
    {
      teacher_id: "teacher_1",
      name: "Naoto Masunaga",
      email: "naoto.masunaga@example.com",
      expertise_areas: ["Mathematics", "Physics", "Calculus"],
      availability: [
        { day_of_week: 1, start_time: "09:00", end_time: "17:00" },
        { day_of_week: 3, start_time: "10:00", end_time: "16:00" },
        { day_of_week: 5, start_time: "14:00", end_time: "20:00" },
      ],
      qualifications: ["PhD Mathematics", "10 years teaching experience"],
      teaching_style: TeachingStyle.DIRECT_INSTRUCTION,
      location: "Tokyo",
      timezone: "UTC+9",
      rating: 4.8,
      total_sessions: 150,
      status: TeacherStatus.AVAILABLE,
      materials: [],
      session_pricing: {
        one_on_one_price: 50,
        group_price: 25,
        max_group_size: 5,
        currency: "USD",
      },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      teacher_id: "teacher_2",
      name: "Gung Mahendra",
      email: "gung.mahendra@example.com",
      expertise_areas: ["Computer Science", "Programming", "Data Structures"],
      availability: [
        { day_of_week: 2, start_time: "13:00", end_time: "19:00" },
        { day_of_week: 4, start_time: "15:00", end_time: "21:00" },
        { day_of_week: 6, start_time: "10:00", end_time: "16:00" },
      ],
      qualifications: ["MS Computer Science", "Software Engineer at Google"],
      teaching_style: TeachingStyle.EXPERIENTIAL,
      location: "Jakarta",
      timezone: "UTC+7",
      rating: 4.9,
      total_sessions: 200,
      status: TeacherStatus.AVAILABLE,
      materials: [],
      session_pricing: {
        one_on_one_price: 60,
        group_price: 30,
        max_group_size: 4,
        currency: "USD",
      },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      teacher_id: "teacher_3",
      name: "Rohit Jagan",
      email: "rohit.jagan@example.com",
      expertise_areas: ["English Literature", "Writing", "Grammar"],
      availability: [
        { day_of_week: 1, start_time: "08:00", end_time: "12:00" },
        { day_of_week: 2, start_time: "18:00", end_time: "22:00" },
        { day_of_week: 3, start_time: "09:00", end_time: "15:00" },
      ],
      qualifications: ["MA English Literature", "Published Author"],
      teaching_style: TeachingStyle.INQUIRY_BASED,
      location: "Mumbai",
      timezone: "UTC+5:30",
      rating: 4.7,
      total_sessions: 120,
      status: TeacherStatus.AVAILABLE,
      materials: [],
      session_pricing: {
        one_on_one_price: 45,
        group_price: 20,
        max_group_size: 6,
        currency: "USD",
      },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      teacher_id: "teacher_4",
      name: "Ku Kasen",
      email: "ku.kasen@example.com",
      expertise_areas: ["History", "Geography", "Economics"],
      availability: [
        { day_of_week: 1, start_time: "10:00", end_time: "16:00" },
        { day_of_week: 4, start_time: "14:00", end_time: "20:00" },
        { day_of_week: 6, start_time: "09:00", end_time: "15:00" },
      ],
      qualifications: ["PhD History", "Researcher at National University"],
      teaching_style: TeachingStyle.DIRECT_INSTRUCTION,
      location: "Bangkok",
      timezone: "UTC+7",
      rating: 4.6,
      total_sessions: 180,
      status: TeacherStatus.AVAILABLE,
      materials: [],
      session_pricing: {
        one_on_one_price: 40,
        group_price: 18,
        max_group_size: 8,
        currency: "USD",
      },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      teacher_id: "teacher_5",
      name: "Sami Rajjal",
      email: "sami.rajjal@example.com",
      expertise_areas: ["Art", "Music", "Languages"],
      availability: [
        { day_of_week: 2, start_time: "11:00", end_time: "17:00" },
        { day_of_week: 3, start_time: "16:00", end_time: "22:00" },
        { day_of_week: 5, start_time: "12:00", end_time: "18:00" },
      ],
      qualifications: ["MFA Fine Arts", "Professional Artist"],
      teaching_style: TeachingStyle.EXPERIENTIAL,
      location: "Dubai",
      timezone: "UTC+4",
      rating: 4.5,
      total_sessions: 90,
      status: TeacherStatus.AVAILABLE,
      materials: [],
      session_pricing: {
        one_on_one_price: 55,
        group_price: 28,
        max_group_size: 3,
        currency: "USD",
      },
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
}
