import {
  Student,
  Teacher,
  Match,
  MatchCriteria,
  MatchStatus,
  MATCH_WEIGHTS,
  MatchingResult,
  LearningStyle,
  TeachingStyle
} from '../types';

export class MatchingService {
  /**
   * Main matching algorithm that calculates compatibility between a student and teacher
   */
  static calculateCompatibility(student: Student, teacher: Teacher, subject?: string): MatchCriteria {
    const subjectScore = this.calculateSubjectExpertiseScore(teacher, subject);
    const scheduleScore = this.calculateScheduleCompatibilityScore(student, teacher);
    const styleScore = this.calculateStyleCompatibilityScore(student, teacher);
    const ratingScore = this.calculateRatingScore(teacher);
    const locationScore = this.calculateLocationScore(student, teacher);

    const totalScore = Math.round(
      subjectScore * MATCH_WEIGHTS.SUBJECT_EXPERTISE +
      scheduleScore * MATCH_WEIGHTS.SCHEDULE_COMPATIBILITY +
      styleScore * MATCH_WEIGHTS.STYLE_COMPATIBILITY +
      ratingScore * MATCH_WEIGHTS.RATING +
      locationScore * MATCH_WEIGHTS.LOCATION
    );

    return {
      subject_expertise_score: subjectScore,
      schedule_compatibility_score: scheduleScore,
      style_compatibility_score: styleScore,
      rating_score: ratingScore,
      location_score: locationScore,
      total_score: Math.min(100, Math.max(0, totalScore))
    };
  }

  /**
   * Calculate subject expertise compatibility (35% weight)
   */
  private static calculateSubjectExpertiseScore(teacher: Teacher, subject?: string): number {
    if (!subject) return 50; // Neutral score if no specific subject requested

    const hasExactMatch = teacher.expertise_areas.some(area =>
      area.toLowerCase().includes(subject.toLowerCase())
    );

    if (hasExactMatch) return 100;

    // Check for partial matches or related subjects
    const hasPartialMatch = teacher.expertise_areas.some(area =>
      subject.toLowerCase().includes(area.toLowerCase()) ||
      area.toLowerCase().includes(subject.toLowerCase())
    );

    return hasPartialMatch ? 75 : 25;
  }

  /**
   * Calculate schedule compatibility (25% weight)
   */
  private static calculateScheduleCompatibilityScore(student: Student, teacher: Teacher): number {
    const studentSchedules = student.preferred_schedule;
    const teacherSchedules = teacher.availability;

    if (!studentSchedules.length || !teacherSchedules.length) return 0;

    let totalOverlapMinutes = 0;
    let totalStudentMinutes = 0;

    // Calculate total student available minutes
    studentSchedules.forEach(schedule => {
      const duration = this.calculateDurationInMinutes(schedule.start_time, schedule.end_time);
      totalStudentMinutes += duration;
    });

    // Calculate overlapping minutes
    studentSchedules.forEach(studentSchedule => {
      teacherSchedules.forEach(teacherSchedule => {
        if (studentSchedule.day_of_week === teacherSchedule.day_of_week) {
          const overlap = this.calculateOverlapMinutes(
            studentSchedule.start_time, studentSchedule.end_time,
            teacherSchedule.start_time, teacherSchedule.end_time
          );
          totalOverlapMinutes += overlap;
        }
      });
    });

    if (totalStudentMinutes === 0) return 0;

    const compatibilityPercentage = (totalOverlapMinutes / totalStudentMinutes) * 100;
    return Math.min(100, Math.max(0, Math.round(compatibilityPercentage)));
  }

  /**
   * Calculate teaching/learning style compatibility (20% weight)
   */
  private static calculateStyleCompatibilityScore(student: Student, teacher: Teacher): number {
    const styleCompatibilityMap: Record<LearningStyle, TeachingStyle[]> = {
      [LearningStyle.VISUAL]: [TeachingStyle.EXPERIENTIAL, TeachingStyle.COLLABORATIVE],
      [LearningStyle.AUDITORY]: [TeachingStyle.DIRECT_INSTRUCTION, TeachingStyle.INQUIRY_BASED],
      [LearningStyle.KINESTHETIC]: [TeachingStyle.EXPERIENTIAL, TeachingStyle.COLLABORATIVE],
      [LearningStyle.READING_WRITING]: [TeachingStyle.DIRECT_INSTRUCTION, TeachingStyle.INQUIRY_BASED]
    };

    const compatibleStyles = styleCompatibilityMap[student.learning_style] || [];
    const isCompatible = compatibleStyles.includes(teacher.teaching_style);

    return isCompatible ? 100 : 50;
  }

  /**
   * Calculate rating score based on teacher's performance (15% weight)
   */
  private static calculateRatingScore(teacher: Teacher): number {
    // Normalize rating to 0-100 scale (assuming rating is out of 5)
    const normalizedRating = (teacher.rating / 5) * 100;

    // Factor in total sessions for reliability
    const experienceFactor = Math.min(1, teacher.total_sessions / 50); // Max bonus at 50 sessions

    return Math.round(normalizedRating * (0.7 + 0.3 * experienceFactor));
  }

  /**
   * Calculate location/timezone compatibility (5% weight)
   */
  private static calculateLocationScore(student: Student, teacher: Teacher): number {
    if (!student.timezone || !teacher.timezone) return 50;

    if (student.timezone === teacher.timezone) return 100;

    // Check if timezones are compatible (within reasonable difference)
    const timezoneDifference = Math.abs(this.getTimezoneOffset(student.timezone) - this.getTimezoneOffset(teacher.timezone));
    const maxAcceptableDifference = 4; // 4 hours

    if (timezoneDifference <= maxAcceptableDifference) return 75;

    return 25;
  }

  /**
   * Find best matches for a student
   */
  static findMatches(student: Student, teachers: Teacher[], subject?: string, minScore = 60): MatchingResult {
    const matches: Match[] = [];

    teachers.forEach(teacher => {
      const criteria = this.calculateCompatibility(student, teacher, subject);

      if (criteria.total_score >= minScore) {
        const match: Match = {
          match_id: this.generateMatchId(),
          student_id: student.student_id,
          teacher_id: teacher.teacher_id,
          match_date: new Date(),
          status: 'pending' as MatchStatus,
          compatibility_score: criteria.total_score,
          match_criteria: criteria,
          created_at: new Date(),
          updated_at: new Date()
        };

        matches.push(match);
      }
    });

    // Sort by compatibility score (highest first)
    matches.sort((a, b) => b.compatibility_score - a.compatibility_score);

    return {
      matches,
      total_matches: matches.length,
      search_criteria: {
        student_id: student.student_id,
        subject,
        min_compatibility_score: minScore
      }
    };
  }

  // Helper methods

  private static calculateDurationInMinutes(startTime: string, endTime: string): number {
    const start = this.timeToMinutes(startTime);
    const end = this.timeToMinutes(endTime);
    return Math.max(0, end - start);
  }

  private static calculateOverlapMinutes(
    start1: string, end1: string,
    start2: string, end2: string
  ): number {
    const start1Min = this.timeToMinutes(start1);
    const end1Min = this.timeToMinutes(end1);
    const start2Min = this.timeToMinutes(start2);
    const end2Min = this.timeToMinutes(end2);

    const overlapStart = Math.max(start1Min, start2Min);
    const overlapEnd = Math.min(end1Min, end2Min);

    return Math.max(0, overlapEnd - overlapStart);
  }

  private static timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private static getTimezoneOffset(timezone: string): number {
    // Simplified timezone offset mapping
    const timezoneOffsets: Record<string, number> = {
      'UTC+0': 0, 'UTC+1': 1, 'UTC+2': 2, 'UTC+3': 3, 'UTC+4': 4,
      'UTC+5': 5, 'UTC+6': 6, 'UTC+7': 7, 'UTC+8': 8, 'UTC+9': 9,
      'UTC+10': 10, 'UTC+11': 11, 'UTC+12': 12,
      'UTC-1': -1, 'UTC-2': -2, 'UTC-3': -3, 'UTC-4': -4, 'UTC-5': -5,
      'UTC-6': -6, 'UTC-7': -7, 'UTC-8': -8, 'UTC-9': -9, 'UTC-10': -10,
      'UTC-11': -11, 'UTC-12': -12
    };

    return timezoneOffsets[timezone] || 0;
  }

  private static generateMatchId(): string {
    return `match_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
