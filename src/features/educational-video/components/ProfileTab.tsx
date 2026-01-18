import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Award, Upload, User } from 'lucide-react';
import { UserProgress } from '../types';

interface ProfileTabProps {
  userProgress: UserProgress;
  onUploadVideo: () => void;
  onCompleteProfile: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  userProgress,
  onUploadVideo,
  onCompleteProfile
}) => {
  return (
    <div className="h-screen overflow-y-auto pt-16 pb-20">
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <div className="text-center">
          <Avatar className="h-20 w-20 mx-auto mb-4">
            <AvatarFallback className="text-2xl">U</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold mb-1">Your Profile</h2>
          <p className="text-gray-400">
            Student • Level {userProgress.level}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-900 rounded-lg">
            <div className="text-2xl font-bold text-blue-400">
              {userProgress.total_points}
            </div>
            <div className="text-sm text-gray-400">Points</div>
          </div>
          <div className="text-center p-4 bg-gray-900 rounded-lg">
            <div className="text-2xl font-bold text-green-400">
              {userProgress.streak_days}
            </div>
            <div className="text-sm text-gray-400">Day Streak</div>
          </div>
          <div className="text-center p-4 bg-gray-900 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">
              {userProgress.badges.length}
            </div>
            <div className="text-sm text-gray-400">Badges</div>
          </div>
        </div>

        {/* Badges */}
        <div>
          <h3 className="font-semibold mb-3">Your Badges</h3>
          <div className="grid grid-cols-2 gap-3">
            {userProgress.badges.map((badge) => (
              <div
                key={badge.badge_id}
                className="bg-gray-900 p-3 rounded-lg text-center"
              >
                <Award className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                <div className="font-medium text-sm">{badge.name}</div>
                <div className="text-xs text-gray-400">
                  {badge.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full border-gray-600 text-white hover:bg-gray-800"
            onClick={onUploadVideo}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Video
          </Button>
          <Button
            variant="outline"
            className="w-full border-gray-600 text-white hover:bg-gray-800"
            onClick={onCompleteProfile}
          >
            <User className="h-4 w-4 mr-2" />
            Complete Profile
          </Button>
        </div>
      </div>
    </div>
  );
};
