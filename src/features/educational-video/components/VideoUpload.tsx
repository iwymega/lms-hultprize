import React, { useState, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Upload,
  X,
  Play,
  Pause,
  Scissors,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Video,
  Image as ImageIcon,
  Tag,
  BookOpen,
  Target,
  Users
} from 'lucide-react';
import {
  VideoUploadData,
  GradeLevel,
  DifficultyLevel,
  VideoCategory
} from '../types';

const videoUploadSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
  subject: z.string().min(1, 'Please select a subject'),
  topic: z.string().min(1, 'Please enter a topic'),
  grade_level: z.nativeEnum(GradeLevel),
  difficulty: z.nativeEnum(DifficultyLevel),
  tags: z.array(z.string()).min(1, 'Add at least one tag').max(10, 'Maximum 10 tags allowed'),
  is_private: z.boolean(),
});

type VideoUploadFormData = z.infer<typeof videoUploadSchema>;

interface VideoUploadProps {
  onUpload: (data: VideoUploadData) => Promise<void>;
  onCancel?: () => void;
  maxFileSize?: number; // in MB
  allowedFormats?: string[];
}

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology',
  'Computer Science', 'Programming', 'Data Structures', 'Algorithms',
  'English Literature', 'Writing', 'Grammar', 'Creative Writing',
  'History', 'Geography', 'Economics', 'Political Science',
  'Art', 'Music', 'Physical Education', 'Health',
  'Languages', 'Psychology', 'Sociology', 'Philosophy'
];

const COMMON_TAGS = [
  'tutorial', 'explanation', 'tips', 'study-guide', 'practice',
  'quiz', 'homework-help', 'exam-prep', 'project-ideas',
  'career-advice', 'motivation', 'study-hacks', 'learning-tips'
];

export function VideoUpload({
  onUpload,
  onCancel,
  maxFileSize = 100,
  allowedFormats = ['mp4', 'mov', 'avi', 'webm']
}: VideoUploadProps) {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [currentTag, setCurrentTag] = useState('');

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<VideoUploadFormData>({
    resolver: zodResolver(videoUploadSchema),
    defaultValues: {
      title: '',
      description: '',
      subject: '',
      topic: '',
      grade_level: GradeLevel.HIGH,
      difficulty: DifficultyLevel.INTERMEDIATE,
      tags: [],
      is_private: false,
    },
    mode: 'onChange'
  });

  const watchedTags = watch('tags');

  const handleVideoSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxFileSize * 1024 * 1024) {
      alert(`File size must be less than ${maxFileSize}MB`);
      return;
    }

    // Validate file format
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!allowedFormats.includes(fileExtension || '')) {
      alert(`Allowed formats: ${allowedFormats.join(', ')}`);
      return;
    }

    setSelectedVideo(file);

    // Create video preview
    const videoUrl = URL.createObjectURL(file);
    setVideoPreview(videoUrl);

    // Get video duration
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      setVideoDuration(video.duration);
      URL.revokeObjectURL(videoUrl);
    };
    video.src = videoUrl;
  }, [maxFileSize, allowedFormats]);

  const handleThumbnailSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB for thumbnails)
    if (file.size > 5 * 1024 * 1024) {
      alert('Thumbnail file size must be less than 5MB');
      return;
    }

    // Validate file format
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!['jpg', 'jpeg', 'png', 'webp'].includes(fileExtension || '')) {
      alert('Thumbnail must be JPG, PNG, or WebP');
      return;
    }

    setSelectedThumbnail(file);
    const thumbnailUrl = URL.createObjectURL(file);
    setThumbnailPreview(thumbnailUrl);
  }, []);

  const removeVideo = () => {
    setSelectedVideo(null);
    setVideoPreview(null);
    setVideoDuration(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };

  const removeThumbnail = () => {
    setSelectedThumbnail(null);
    setThumbnailPreview(null);
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = '';
    }
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !watchedTags.includes(trimmedTag) && watchedTags.length < 10) {
      setValue('tags', [...watchedTags, trimmedTag]);
    }
    setCurrentTag('');
  };

  const removeTag = (tagToRemove: string) => {
    setValue('tags', watchedTags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = async (data: VideoUploadFormData) => {
    if (!selectedVideo) {
      alert('Please select a video file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const uploadData: VideoUploadData = {
        title: data.title,
        description: data.description,
        subject: data.subject,
        topic: data.topic,
        grade_level: data.grade_level,
        difficulty: data.difficulty,
        tags: data.tags,
        is_private: data.is_private,
        video_file: selectedVideo,
        thumbnail_file: selectedThumbnail || undefined,
      };

      await onUpload(uploadData);

      setUploadProgress(100);
      clearInterval(progressInterval);

      // Reset form
      setSelectedVideo(null);
      setSelectedThumbnail(null);
      setVideoPreview(null);
      setThumbnailPreview(null);
      setVideoDuration(null);

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Upload Educational Video
          </CardTitle>
          <CardDescription>
            Share your knowledge with short, engaging educational videos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Video Upload Section */}
            <div className="space-y-4">
              <Label>Video File</Label>

              {!selectedVideo ? (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => videoInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Click to upload your educational video
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    MP4, MOV, AVI, or WebM (max {maxFileSize}MB)
                  </p>
                  <Button type="button" variant="outline">
                    Choose Video
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <video
                    ref={videoPreviewRef}
                    src={videoPreview || undefined}
                    className="w-full max-h-64 rounded-lg bg-black"
                    controls
                    preload="metadata"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeVideo}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  {videoDuration && (
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {formatDuration(videoDuration)}
                    </div>
                  )}
                </div>
              )}

              <input
                ref={videoInputRef}
                type="file"
                accept={`video/${allowedFormats.join(',video/')}`}
                onChange={handleVideoSelect}
                className="hidden"
              />
            </div>

            {/* Thumbnail Upload Section */}
            <div className="space-y-4">
              <Label>Thumbnail (Optional)</Label>

              {!selectedThumbnail ? (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => thumbnailInputRef.current?.click()}
                >
                  <ImageIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Click to add a custom thumbnail
                  </p>
                </div>
              ) : (
                <div className="relative inline-block">
                  <img
                    src={thumbnailPreview || undefined}
                    alt="Video thumbnail"
                    className="w-32 h-24 rounded-lg object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 p-0"
                    onClick={removeThumbnail}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              <input
                ref={thumbnailInputRef}
                type="file"
                accept="image/*"
                onChange={handleThumbnailSelect}
                className="hidden"
              />
            </div>

            {/* Video Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Video Title</Label>
                  <Input
                    id="title"
                    {...register('title')}
                    placeholder="Enter an engaging title"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={watch('subject')} onValueChange={(value) => setValue('subject', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map((subject) => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.subject && (
                    <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    {...register('topic')}
                    placeholder="Specific topic covered"
                  />
                  {errors.topic && (
                    <p className="text-sm text-red-600 mt-1">{errors.topic.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="grade_level">Grade Level</Label>
                  <Select
                    value={watch('grade_level')}
                    onValueChange={(value) => setValue('grade_level', value as GradeLevel)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={GradeLevel.ELEMENTARY}>Elementary (Grades 1-5)</SelectItem>
                      <SelectItem value={GradeLevel.MIDDLE}>Middle School (Grades 6-8)</SelectItem>
                      <SelectItem value={GradeLevel.HIGH}>High School (Grades 9-12)</SelectItem>
                      <SelectItem value={GradeLevel.COLLEGE}>College/University</SelectItem>
                      <SelectItem value={GradeLevel.PROFESSIONAL}>Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select
                    value={watch('difficulty')}
                    onValueChange={(value) => setValue('difficulty', value as DifficultyLevel)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={DifficultyLevel.BEGINNER}>Beginner</SelectItem>
                      <SelectItem value={DifficultyLevel.INTERMEDIATE}>Intermediate</SelectItem>
                      <SelectItem value={DifficultyLevel.ADVANCED}>Advanced</SelectItem>
                      <SelectItem value={DifficultyLevel.EXPERT}>Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_private"
                    {...register('is_private')}
                    className="rounded"
                  />
                  <Label htmlFor="is_private">Make video private</Label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Describe what students will learn from this video..."
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {watchedTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag(currentTag);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addTag(currentTag)}
                  disabled={!currentTag.trim() || watchedTags.length >= 10}
                >
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                <span className="text-sm text-gray-500 mr-2">Suggestions:</span>
                {COMMON_TAGS.filter(tag => !watchedTags.includes(tag)).slice(0, 5).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    className="text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {errors.tags && (
                <p className="text-sm text-red-600 mt-1">{errors.tags.message}</p>
              )}
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading video...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel} disabled={isUploading}>
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                disabled={!selectedVideo || isUploading || !isValid}
                className="flex-1"
              >
                {isUploading ? 'Uploading...' : 'Upload Video'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
