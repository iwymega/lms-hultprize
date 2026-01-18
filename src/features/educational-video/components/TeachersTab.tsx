import React from 'react';
import { Button } from '@/components/ui/button';
import { TeachersHeader } from './TeachersHeader';
import { TeacherCard } from './TeacherCard';

interface Teacher {
  teacher_id: string;
  name: string;
  profile_image?: string;
  bio: string;
  expertise_areas: string[];
  rating: number;
  total_students: number;
  total_reviews: number;
  is_verified: boolean;
  hourly_rate: number;
}

interface TeachersTabProps {
  teachers: Teacher[];
  onViewTeacherProfile: (teacherId: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export const TeachersTab: React.FC<TeachersTabProps> = ({
  teachers,
  onViewTeacherProfile,
  onLoadMore,
  hasMore = false
}) => {
  return (
    <div className="h-screen overflow-y-auto pt-16 pb-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header Section */}
      <TeachersHeader />

      {/* Teachers Grid */}
      <div className="p-4">
        <div className="grid gap-4">
          {teachers.map((teacher, index) => (
            <TeacherCard
              key={teacher.teacher_id}
              teacher={teacher}
              index={index}
              onViewProfile={onViewTeacherProfile}
            />
          ))}
        </div>

        {/* Load More Section */}
        {(hasMore || onLoadMore) && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
              onClick={onLoadMore}
            >
              Load More Teachers
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
