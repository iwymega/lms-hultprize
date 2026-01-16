import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Clock } from 'lucide-react';
import { Student, LearningStyle, Schedule, StudentStatus } from '../types';
import { useMatchingStore } from '../stores/matchingStore';

const studentProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  learning_style: z.nativeEnum(LearningStyle),
  location: z.string().optional(),
  timezone: z.string().optional(),
  learning_goals: z.string().min(10, 'Please describe your learning goals'),
  preferred_subjects: z.array(z.string()).min(1, 'Select at least one subject'),
});

type StudentProfileFormData = z.infer<typeof studentProfileSchema>;

interface StudentProfileFormProps {
  onComplete?: () => void;
}

const SUBJECT_OPTIONS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology',
  'Computer Science', 'Programming', 'Data Structures',
  'English Literature', 'Writing', 'Grammar',
  'History', 'Geography', 'Economics',
  'Art', 'Music', 'Languages'
];

const TIMEZONE_OPTIONS = [
  'UTC-12', 'UTC-11', 'UTC-10', 'UTC-9', 'UTC-8', 'UTC-7', 'UTC-6', 'UTC-5',
  'UTC-4', 'UTC-3', 'UTC-2', 'UTC-1', 'UTC+0', 'UTC+1', 'UTC+2', 'UTC+3',
  'UTC+4', 'UTC+5', 'UTC+6', 'UTC+7', 'UTC+8', 'UTC+9', 'UTC+10', 'UTC+11', 'UTC+12'
];

const DAYS_OF_WEEK = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' }
];

export function StudentProfileForm({ onComplete }: StudentProfileFormProps) {
  const { setCurrentStudent, updateStudentProfile, currentStudent } = useMatchingStore();
  const [scheduleSlots, setScheduleSlots] = React.useState<Schedule[]>([]);
  const [newSubject, setNewSubject] = React.useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<StudentProfileFormData>({
    resolver: zodResolver(studentProfileSchema),
    defaultValues: {
      name: currentStudent?.name || '',
      email: currentStudent?.email || '',
      learning_style: currentStudent?.learning_style || LearningStyle.VISUAL,
      location: currentStudent?.location || '',
      timezone: currentStudent?.timezone || 'UTC+8',
      learning_goals: '',
      preferred_subjects: currentStudent?.preferred_schedule ? [] : [],
    }
  });

  const watchedSubjects = watch('preferred_subjects');

  const addSubject = (subject: string) => {
    if (subject && !watchedSubjects.includes(subject)) {
      setValue('preferred_subjects', [...watchedSubjects, subject]);
    }
    setNewSubject('');
  };

  const removeSubject = (subject: string) => {
    setValue('preferred_subjects', watchedSubjects.filter(s => s !== subject));
  };

  const addScheduleSlot = () => {
    const newSlot: Schedule = {
      day_of_week: 1,
      start_time: '09:00',
      end_time: '17:00'
    };
    setScheduleSlots([...scheduleSlots, newSlot]);
  };

  const updateScheduleSlot = (index: number, field: keyof Schedule, value: string | number) => {
    const updatedSlots = scheduleSlots.map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    );
    setScheduleSlots(updatedSlots);
  };

  const removeScheduleSlot = (index: number) => {
    setScheduleSlots(scheduleSlots.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: StudentProfileFormData) => {
    try {
      const student: Student = {
        student_id: currentStudent?.student_id || `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: data.name,
        email: data.email,
        learning_style: data.learning_style,
        preferred_schedule: scheduleSlots,
        location: data.location,
        timezone: data.timezone,
        status: StudentStatus.PROFILE_COMPLETE,
        created_at: currentStudent?.created_at || new Date(),
        updated_at: new Date()
      };

      if (currentStudent) {
        updateStudentProfile(student);
      } else {
        setCurrentStudent(student);
      }

      onComplete?.();
    } catch (error) {
      console.error('Failed to save student profile:', error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Student Profile</CardTitle>
        <CardDescription>
          Fill in your details to help us find the perfect teacher for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Learning Style */}
          <div className="space-y-2">
            <Label htmlFor="learning_style">Learning Style</Label>
            <Select
              value={watch('learning_style')}
              onValueChange={(value) => setValue('learning_style', value as LearningStyle)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your learning style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={LearningStyle.VISUAL}>Visual - I learn best with images and diagrams</SelectItem>
                <SelectItem value={LearningStyle.AUDITORY}>Auditory - I learn best through listening</SelectItem>
                <SelectItem value={LearningStyle.KINESTHETIC}>Kinesthetic - I learn best through hands-on activities</SelectItem>
                <SelectItem value={LearningStyle.READING_WRITING}>Reading/Writing - I learn best through reading and writing</SelectItem>
              </SelectContent>
            </Select>
            {errors.learning_style && (
              <p className="text-sm text-red-600">{errors.learning_style.message}</p>
            )}
          </div>

          {/* Location and Timezone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                {...register('location')}
                placeholder="City, Country"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={watch('timezone')}
                onValueChange={(value) => setValue('timezone', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {TIMEZONE_OPTIONS.map((tz) => (
                    <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Preferred Subjects */}
          <div className="space-y-2">
            <Label>Preferred Subjects</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {watchedSubjects.map((subject) => (
                <Badge key={subject} variant="secondary" className="flex items-center gap-1">
                  {subject}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeSubject(subject)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Select value={newSubject} onValueChange={setNewSubject}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECT_OPTIONS.filter(subject => !watchedSubjects.includes(subject)).map((subject) => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => addSubject(newSubject)}
                disabled={!newSubject}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {errors.preferred_subjects && (
              <p className="text-sm text-red-600">{errors.preferred_subjects.message}</p>
            )}
          </div>

          {/* Learning Goals */}
          <div className="space-y-2">
            <Label htmlFor="learning_goals">Learning Goals</Label>
            <Textarea
              id="learning_goals"
              {...register('learning_goals')}
              placeholder="Describe what you want to achieve with your studies..."
              rows={4}
            />
            {errors.learning_goals && (
              <p className="text-sm text-red-600">{errors.learning_goals.message}</p>
            )}
          </div>

          {/* Schedule Preferences */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Available Schedule</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addScheduleSlot}
              >
                <Clock className="h-4 w-4 mr-2" />
                Add Time Slot
              </Button>
            </div>

            {scheduleSlots.map((slot, index) => (
              <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                <Select
                  value={slot.day_of_week.toString()}
                  onValueChange={(value) => updateScheduleSlot(index, 'day_of_week', parseInt(value))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS_OF_WEEK.map((day) => (
                      <SelectItem key={day.value} value={day.value.toString()}>
                        {day.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="time"
                  value={slot.start_time}
                  onChange={(e) => updateScheduleSlot(index, 'start_time', e.target.value)}
                  className="w-32"
                />

                <span className="text-sm text-gray-500">to</span>

                <Input
                  type="time"
                  value={slot.end_time}
                  onChange={(e) => updateScheduleSlot(index, 'end_time', e.target.value)}
                  className="w-32"
                />

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeScheduleSlot(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {scheduleSlots.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No schedule slots added yet. Click "Add Time Slot" to specify when you're available.
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Complete Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
