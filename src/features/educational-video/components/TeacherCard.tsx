import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, CheckCircle, Mail, MessageSquare, Crown } from 'lucide-react';

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

interface TeacherCardProps {
  teacher: Teacher;
  index: number;
  onViewProfile: (teacherId: string) => void;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({
  teacher,
  index,
  onViewProfile
}) => {
  const isBlueTheme = index % 2 === 0;

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${
        isBlueTheme
          ? 'from-[#1B263B]/30 to-[#415A77]/20'
          : 'from-[#1B263B]/25 to-[#415A77]/15'
      }`} />

      <CardContent className="relative p-6">
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar with Glow Effect */}
          <div className="relative">
            <Avatar className="h-16 w-16 ring-2 ring-white/20 shadow-lg">
              <AvatarImage src={teacher.profile_image} />
              <AvatarFallback className={`${
                isBlueTheme
                  ? 'bg-gradient-to-br from-slate-600 to-slate-700'
                  : 'bg-gradient-to-br from-stone-600 to-stone-700'
              } text-white font-bold text-lg border border-white/20`}>
                {teacher.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {teacher.is_verified && (
              <div className={`absolute -bottom-1 -right-1 ${
                isBlueTheme ? 'bg-amber-500' : 'bg-orange-500'
              } rounded-full p-1 border border-white/20`}>
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg text-white truncate">{teacher.name}</h3>
            </div>

            {/* Rating and Stats */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-full">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-300">{teacher.rating}</span>
              </div>
              <div className="text-sm text-gray-300">
                {teacher.total_students} students
              </div>
              <div className="text-sm text-gray-300">
                {teacher.total_reviews} reviews
              </div>
            </div>

            {/* Subject Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {teacher.expertise_areas.slice(0, 3).map((subject) => (
                <Badge
                  key={subject}
                  className={`text-xs font-medium ${
                    isBlueTheme
                      ? 'bg-[#E0E1DD]/20 text-[#1B263B] border-[#E0E1DD]/40'
                      : 'bg-[#415A77]/20 text-[#E0E1DD] border-[#415A77]/40'
                  } border backdrop-blur-sm`}
                >
                  {subject}
                </Badge>
              ))}
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-300 line-clamp-2 mb-4">
              {teacher.bio}
            </p>

            {/* Price and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">
                  ${teacher.hourly_rate}
                </span>
                <span className="text-sm text-gray-300">/hour</span>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
                >
                  <Mail className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  className={`${
                    isBlueTheme
                      ? 'bg-[#1B263B] hover:bg-[#415A77] text-[#E0E1DD]'
                      : 'bg-[#415A77] hover:bg-[#1B263B] text-[#E0E1DD]'
                  } shadow-lg border border-[#E0E1DD]/30`}
                  onClick={() => onViewProfile(teacher.teacher_id)}
                >
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="flex gap-3 pt-4 border-t border-white/10">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-white hover:bg-white/10 border border-white/20"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Message
          </Button>
          <Button
            size="sm"
            className={`flex-1 ${
              isBlueTheme
                ? 'bg-[#E0E1DD] hover:bg-[#E0E1DD]/90 text-[#1B263B]'
                : 'bg-[#E0E1DD] hover:bg-[#E0E1DD]/90 text-[#1B263B]'
            } shadow-lg border border-[#1B263B]/20`}
          >
            <Crown className="h-4 w-4 mr-2" />
            Subscribe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
