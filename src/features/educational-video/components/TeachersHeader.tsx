import React from 'react';
import { Users } from 'lucide-react';

export const TeachersHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-b border-white/10">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Users className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Expert Teachers</h2>
            <p className="text-gray-300 text-sm">Connect with top educators in your field</p>
          </div>
        </div>
      </div>
    </div>
  );
};
