import React from "react";
import { BookOpen, Trophy, Users } from "lucide-react";

interface Props {
  text?: string;
  time?: number;
}

const FullPageLoader: React.FC<Props> = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#030712] to-[#162456] z-[9999] flex flex-col items-center justify-center min-h-screen text-white font-sans">
      {/* SMATCH Logo */}
      <div className="mb-4">
        <img
          src="/smatch.png"
          alt="SMATCH Logo"
          className="w-16 h-16 object-contain"
        />
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold m-0">SMATCH</h1>
        <p className="text-2xl mt-2 mb-0">Study and More</p>
      </div>

      {/* Icons Row */}
      <div className="flex gap-4 items-center mb-8">
        {/* Learn Circle */}
        <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
          <BookOpen size={32} color="white" />
        </div>

        {/* Compete Circle */}
        <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center text-sm font-bold">
          <Trophy size={32} color="white" />
        </div>

        {/* Connect Circle */}
        <div className="w-20 h-20 rounded-full bg-cyan-400 flex items-center justify-center text-sm font-bold">
          <Users size={32} color="white" />
        </div>
      </div>

      {/* Loading Progress */}
      <div className="text-center">
        <p className="text-xl mb-4">Loading... 60%</p>
        <div className="w-[300px] h-2.5 bg-gray-600 rounded overflow-hidden">
          <div className="w-3/5 h-full bg-cyan-400 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default FullPageLoader;
