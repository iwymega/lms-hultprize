import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  Play,
  Volume2,
  VolumeX,
  MoreVertical,
  Award,
  Star,
  Eye
} from 'lucide-react';
import {
  VideoFeedItem,
  VideoPlayerState,
  GradeLevel,
  DifficultyLevel
} from '../types';

interface VideoFeedProps {
  videos: VideoFeedItem[];
  onVideoLike: (videoId: string) => void;
  onVideoBookmark: (videoId: string) => void;
  onVideoShare: (videoId: string) => void;
  onVideoComment: (videoId: string, comment: string) => void;
  onViewTeacherProfile?: (teacherId: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

interface VideoCardProps {
  videoItem: VideoFeedItem;
  isActive: boolean;
  onLike: () => void;
  onBookmark: () => void;
  onShare: () => void;
  onComment: (comment: string) => void;
  onViewTeacherProfile?: (teacherId: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  videoItem,
  isActive,
  onLike,
  onBookmark,
  onShare,
  onComment,
  onViewTeacherProfile
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playerState, setPlayerState] = useState<VideoPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isFullscreen: false,
    playbackRate: 1
  });
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const { video, creator, userInteraction } = videoItem;

  // Auto-play/pause based on visibility
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        // Try to play, but handle autoplay restrictions
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setPlayerState(prev => ({ ...prev, isPlaying: true }));
            })
            .catch(() => {
              // Autoplay failed, keep paused
              setPlayerState(prev => ({ ...prev, isPlaying: false }));
            });
        }
      } else {
        videoRef.current.pause();
        setPlayerState(prev => ({ ...prev, isPlaying: false }));
      }
    }
  }, [isActive]);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (playerState.isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  }, [playerState.isPlaying]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !playerState.isMuted;
      setPlayerState(prev => ({ ...prev, isMuted: !prev.isMuted }));
    }
  }, [playerState.isMuted]);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setPlayerState(prev => ({
        ...prev,
        currentTime: videoRef.current!.currentTime,
        duration: videoRef.current!.duration
      }));
    }
  }, []);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(newComment.trim());
      setNewComment('');
    }
  };



  const getGradeLevelColor = (level: GradeLevel) => {
    switch (level) {
      case GradeLevel.ELEMENTARY: return 'bg-green-100 text-green-800';
      case GradeLevel.MIDDLE: return 'bg-blue-100 text-blue-800';
      case GradeLevel.HIGH: return 'bg-purple-100 text-purple-800';
      case GradeLevel.COLLEGE: return 'bg-orange-100 text-orange-800';
      case GradeLevel.PROFESSIONAL: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (level: DifficultyLevel) => {
    switch (level) {
      case DifficultyLevel.BEGINNER: return 'bg-emerald-100 text-emerald-800';
      case DifficultyLevel.INTERMEDIATE: return 'bg-yellow-100 text-yellow-800';
      case DifficultyLevel.ADVANCED: return 'bg-orange-100 text-orange-800';
      case DifficultyLevel.EXPERT: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative h-screen w-full bg-black flex items-center justify-center">
      {/* Video Player */}
      <video
        ref={videoRef}
        src={video.video_url}
        poster={video.thumbnail_url}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onClick={togglePlay}
      />

      {/* Video Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

      {/* Play/Pause Overlay */}
      {!playerState.isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="lg"
            className="rounded-full bg-black/50 hover:bg-black/70 text-white"
            onClick={togglePlay}
          >
            <Play className="h-12 w-12" />
          </Button>
        </div>
      )}

      {/* Video Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex items-start justify-between">
          {/* Video Details */}
          <div className="flex-1 mr-12">
            {/* Creator Info */}
            <div className="flex items-center mb-2">
              <Avatar className="h-10 w-10 mr-3 border-2 border-white">
                <AvatarImage src={creator.avatar} />
                <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                {creator.type === 'teacher' && onViewTeacherProfile ? (
                  <button
                    onClick={() => onViewTeacherProfile(video.creator_id)}
                    className="font-semibold text-sm text-left hover:underline"
                  >
                    {creator.name}
                  </button>
                ) : (
                  <p className="font-semibold text-sm">{creator.name}</p>
                )}
                <div className="flex items-center gap-2">
                  {creator.type === 'teacher' && creator.rating && (
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-xs">{creator.rating.toFixed(1)}</span>
                    </div>
                  )}
                  <Badge variant="secondary" className="text-xs">
                    {creator.type}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Video Title & Description */}
            <h3 className="font-bold text-lg mb-1 line-clamp-2">{video.title}</h3>
            <p className="text-sm text-gray-200 mb-2 line-clamp-3">{video.description}</p>

            {/* Tags & Metadata */}
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge className={getGradeLevelColor(video.grade_level)}>
                {video.grade_level}
              </Badge>
              <Badge className={getDifficultyColor(video.difficulty)}>
                {video.difficulty}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {video.subject}
              </Badge>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-gray-300">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{video.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                <span>{video.likes.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                <span>{video.comments_count}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-4">
            {/* Like Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-full p-3 ${
                userInteraction.liked
                  ? 'text-red-500 bg-red-500/20'
                  : 'text-white hover:bg-white/20'
              }`}
              onClick={onLike}
            >
              <Heart className={`h-6 w-6 ${userInteraction.liked ? 'fill-current' : ''}`} />
            </Button>
            <span className="text-xs text-white">{video.likes}</span>

            {/* Comment Button */}
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full p-3 text-white hover:bg-white/20"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            <span className="text-xs text-white">{video.comments_count}</span>

            {/* Bookmark Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-full p-3 ${
                userInteraction.bookmarked
                  ? 'text-blue-500 bg-blue-500/20'
                  : 'text-white hover:bg-white/20'
              }`}
              onClick={onBookmark}
            >
              <Bookmark className={`h-6 w-6 ${userInteraction.bookmarked ? 'fill-current' : ''}`} />
            </Button>

            {/* Share Button */}
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full p-3 text-white hover:bg-white/20"
              onClick={onShare}
            >
              <Share className="h-6 w-6" />
            </Button>

            {/* More Options */}
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full p-3 text-white hover:bg-white/20"
            >
              <MoreVertical className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-black/50">
        <div
          className="h-full bg-white transition-all duration-100"
          style={{
            width: playerState.duration > 0
              ? `${(playerState.currentTime / playerState.duration) * 100}%`
              : '0%'
          }}
        />
      </div>

      {/* Volume Control */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-4 right-4 rounded-full bg-black/50 text-white hover:bg-black/70"
        onClick={toggleMute}
      >
        {playerState.isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>

      {/* Comments Panel */}
      {showComments && (
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Comments ({video.comments_count})</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Mock comments - in real app, fetch from API */}
            <div className="text-sm text-gray-500 text-center py-8">
              Comments will be loaded here
            </div>
          </div>
          <form onSubmit={handleCommentSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
              />
              <Button type="submit" size="sm" disabled={!newComment.trim()}>
                Post
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export const VideoFeed: React.FC<VideoFeedProps> = ({
  videos,
  onVideoLike,
  onVideoBookmark,
  onVideoShare,
  onVideoComment,
  onViewTeacherProfile,
  onLoadMore,
  hasMore = false,
  isLoading = false
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const deltaThreshold = 50; // Minimum scroll distance to trigger navigation

    if (Math.abs(e.deltaY) > deltaThreshold) {
      if (e.deltaY > 0 && currentVideoIndex < videos.length - 1) {
        setCurrentVideoIndex(prev => prev + 1);
      } else if (e.deltaY < 0 && currentVideoIndex > 0) {
        setCurrentVideoIndex(prev => prev - 1);
      }
    }
  }, [currentVideoIndex, videos.length]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' && currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    } else if (e.key === 'ArrowUp' && currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1);
    }
  }, [currentVideoIndex, videos.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
      window.addEventListener('keydown', handleKeyPress);

      return () => {
        container.removeEventListener('wheel', handleScroll);
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [handleScroll, handleKeyPress]);

  // Load more videos when reaching the end
  useEffect(() => {
    if (currentVideoIndex >= videos.length - 2 && hasMore && onLoadMore && !isLoading) {
      onLoadMore();
    }
  }, [currentVideoIndex, videos.length, hasMore, onLoadMore, isLoading]);

  if (videos.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Award className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No videos yet</h3>
          <p className="text-gray-500">Be the first to upload an educational video!</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-screen overflow-hidden">
      {videos.map((videoItem, index) => (
        <div
          key={videoItem.video.video_id}
          className={`absolute inset-0 transition-opacity duration-300 ${
            index === currentVideoIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <VideoCard
            videoItem={videoItem}
            isActive={index === currentVideoIndex}
            onLike={() => onVideoLike(videoItem.video.video_id)}
            onBookmark={() => onVideoBookmark(videoItem.video.video_id)}
            onShare={() => onVideoShare(videoItem.video.video_id)}
            onComment={(comment) => onVideoComment(videoItem.video.video_id, comment)}
            onViewTeacherProfile={onViewTeacherProfile}
          />
        </div>
      ))}

      {/* Video Navigation Indicators */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
        {videos.slice(0, 5).map((_, index) => (
          <button
            key={index}
            className={`w-1 h-8 rounded-full transition-colors ${
              index === currentVideoIndex
                ? 'bg-white'
                : index < currentVideoIndex
                ? 'bg-white/50'
                : 'bg-white/20'
            }`}
            onClick={() => setCurrentVideoIndex(index)}
          />
        ))}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            Loading more videos...
          </div>
        </div>
      )}
    </div>
  );
};
