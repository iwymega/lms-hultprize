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
          ? 'from-blue-500/10 to-purple-500/10'
          : 'from-emerald-500/10 to-teal-500/10'
      }`} />

      <CardContent className="relative p-6">
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar with Glow Effect */}
          <div className="relative">
            <Avatar className="h-16 w-16 ring-2 ring-white/20 shadow-lg">
              <AvatarImage src={teacher.profile_image} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-lg">
                {teacher.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {teacher.is_verified && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
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
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
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
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-emerald-500 hover:bg-emerald-600'
                  } text-white shadow-lg`}
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
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'
            } text-white shadow-lg`}
          >
            <Crown className="h-4 w-4 mr-2" />
            Subscribe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
