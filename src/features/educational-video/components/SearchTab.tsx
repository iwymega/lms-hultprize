import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { VideoFeed } from './VideoFeed';
import { VideoFeedItem } from '../types';

interface SearchTabProps {
  searchQuery: string;
  filteredVideos: VideoFeedItem[];
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  onVideoLike: (videoId: string) => void;
  onVideoBookmark: (videoId: string) => void;
  onVideoShare: (videoId: string) => void;
  onVideoComment: (videoId: string, comment: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

export const SearchTab: React.FC<SearchTabProps> = ({
  searchQuery,
  filteredVideos,
  onSearchChange,
  onClearSearch,
  onVideoLike,
  onVideoBookmark,
  onVideoShare,
  onVideoComment,
  onLoadMore,
  hasMore = false,
  isLoading = false
}) => {
  return (
    <div className="h-screen">
      {/* Search Header */}
      <div className="pt-16 pb-4 px-4 sm:px-6 bg-gradient-to-r from-[#1B263B] to-[#415A77]">
        <div className="flex items-center gap-3 mb-4">
          <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search videos, subjects, teachers..."
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 sm:py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#E0E1DD] min-h-[44px] sm:min-h-[36px] text-base"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSearch}
              className="text-gray-400 hover:text-white flex-shrink-0 min-h-[44px] sm:min-h-[36px]"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Search Results Info */}
        <div className="text-sm text-gray-400">
          {searchQuery ? (
            <span>
              Found {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} for "{searchQuery}"
            </span>
          ) : (
            <span>Enter a search term to find videos</span>
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchQuery ? (
        filteredVideos.length > 0 ? (
          <VideoFeed
            videos={filteredVideos}
            onVideoLike={onVideoLike}
            onVideoBookmark={onVideoBookmark}
            onVideoShare={onVideoShare}
            onVideoComment={onVideoComment}
            onLoadMore={onLoadMore}
            hasMore={hasMore}
            isLoading={isLoading}
          />
        ) : (
          <div className="h-screen flex items-center justify-center bg-black">
            <div className="text-center">
              <Search className="h-16 w-16 mx-auto text-gray-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">
                No videos found
              </h3>
              <p className="text-gray-500">
                Try searching for different keywords
              </p>
            </div>
          </div>
        )
      ) : (
        <div className="h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <Search className="h-16 w-16 mx-auto text-gray-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">
              Search for educational videos
            </h3>
            <p className="text-gray-500">
              Find videos by subject, topic, or teacher name
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
