import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bookmark, PlayCircle } from 'lucide-react';
import { VideoFeedItem } from '../types';

interface BookmarksTabProps {
  bookmarkedVideos: VideoFeedItem[];
}

export const BookmarksTab: React.FC<BookmarksTabProps> = ({
  bookmarkedVideos
}) => {
  return (
    <div className="h-screen overflow-y-auto pt-16 pb-20 bg-gradient-to-br from-[#1B263B] via-[#415A77] to-[#1B263B]">
      <div className="p-4 sm:p-6">
        <h2 className="text-xl font-bold mb-4 sm:mb-6">Bookmarked Videos</h2>
        {bookmarkedVideos.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="h-16 w-16 mx-auto text-gray-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">
              No bookmarked videos yet
            </h3>
            <p className="text-gray-500">
              Bookmark videos to save them for later
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarkedVideos.map((item) => (
              <Card
                key={item.video.video_id}
                className="bg-gray-900 border-gray-800 overflow-hidden"
              >
                <div className="flex">
                  <div className="w-32 h-24 bg-gray-800 relative flex-shrink-0">
                    <img
                      src={item.video.thumbnail_url}
                      alt={item.video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <PlayCircle className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardContent className="flex-1 p-3">
                    <h3 className="font-semibold line-clamp-2 mb-1">
                      {item.video.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-1 mb-2">
                      {item.creator.name}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        {item.video.views.toLocaleString()} views
                      </span>
                      <span>{item.video.likes} likes</span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
