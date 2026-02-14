import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Trophy, Flame, Star } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { UserProgress } from "../types";
import { Card } from "@/components/ui/card";

interface ProfileTabProps {
  userProgress: UserProgress;
  onUploadVideo: () => void;
  onCompleteProfile: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({}) => {
  const weeklyData = [
    { day: "Mon", quizzes: 3 },
    { day: "Tue", quizzes: 2.25 },
    { day: "Wed", quizzes: 1.5 },
    { day: "Thu", quizzes: 0.75 },
    { day: "Fri", quizzes: 0 },
    { day: "Sat", quizzes: 0 },
    { day: "Sun", quizzes: 0 },
  ];

  const subjectData = [
    { name: "Physics", value: 45, color: "#8884d8" },
    { name: "Chemistry", value: 28, color: "#82ca9d" },
    { name: "Biology", value: 18, color: "#ffc658" },
    { name: "Astronomy", value: 9, color: "#ff7300" },
  ];

  return (
    <div className="h-screen bg-gray-900 overflow-y-auto pt-16 pb-20">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Profile Header */}
        <div className="text-center">
          <Avatar className="h-20 w-20 mx-auto mb-4">
            <AvatarImage src="/foto2.jpeg" />
            <AvatarFallback className="text-2xl">GM</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold mb-1">@Gung Mahendra</h2>
          <p className="text-gray-400">I love chemistry</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className=" p-4 bg-blue-600 rounded-lg">
            <div className="text-sm text-gray-300 flex items-center gap-1">
              <Trophy className="text-yellow-400" /> Quizzes Done
            </div>

            <div className="text-3xl font-bold text-white">47</div>
          </div>
          <div className="p-4 bg-green-600 rounded-lg">
            <div className="text-sm text-gray-300 flex items-center gap-1">
              <Flame className="text-yellow-400" /> Current Streak
            </div>
            <div className="text-3xl font-bold text-white">12</div>
            <div className="text-sm text-gray-300">28 days 🏆 Best</div>
          </div>
          <div className=" p-4 bg-purple-600 rounded-lg">
            <div className="text-sm text-gray-300 flex items-center gap-1">
              <User className="text-yellow-400" /> Followers
            </div>

            <div className="text-3xl font-bold text-white">234</div>
          </div>
          <div className=" p-4 bg-pink-600 rounded-lg">
            <div className="text-sm text-gray-300 flex items-center gap-1">
              <Star className="text-yellow-400" /> Mutuals
            </div>
            <div className="text-3xl font-bold text-white">89</div>
          </div>
        </div>

        {/* Favorite Subject */}
        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-2 text-white">Favorite Subject</h3>
          <Card className="p-4 bg-gradient-to-r text-center from-blue-800 via-blue-500 to-purple-600">
            <div className="text-2xl font-extrabold text-white">Physics</div>
            <div className="text-sm text-gray-300">
              Based on your engagement
            </div>
          </Card>
        </div>

        {/* Weekly Quiz Activity */}
        <Card className="p-4 bg-gray-900 text-white rounded-lg">
          <h3 className="font-semibold mb-3">Weekly Quiz Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Bar dataKey="quizzes" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-center mt-2 text-sm">
            Total this week: 11 quizzes
          </div>
        </Card>

        {/* Subject Engagement */}
        <Card className="p-4 bg-gray-900 text-white rounded-lg">
          <h3 className="font-semibold mb-3">Subject Engagement</h3>
          <div className="grid grid-cols-1 gap-4">
            <ResponsiveContainer width="100%">
              <PieChart>
                <Pie
                  data={subjectData}
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {subjectData.map((subject) => (
                <div key={subject.name} className="flex justify-between">
                  <span>{subject.name}</span>
                  <span>{subject.value}% engagement</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent Achievements */}
        <Card className="p-4 bg-gray-900 text-white rounded-lg">
          <h3 className="font-semibold mb-3">Recent Achievements</h3>
          <div className="space-y-3">
            <div className="bg-gray-900 p-3 rounded-lg flex items-center">
              <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <div className="font-medium">Quiz Master</div>
                <div className="text-sm text-gray-400">
                  Completed 50 quizzes
                </div>
              </div>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg flex items-center">
              <Flame className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <div className="font-medium">On Fire!</div>
                <div className="text-sm text-gray-400">12-day streak</div>
              </div>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg flex items-center">
              <Star className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <div className="font-medium">Physics Expert</div>
                <div className="text-sm text-gray-400">
                  45% engagement in Physics
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
