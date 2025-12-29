import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreatePostSchema, CreatePost } from '@/services/post/schema/CreatePostSchema'
import useCreatePost from '@/services/post/hooks/useCreatePost'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

const CreatePostContent: React.FC = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<CreatePost>({
        resolver: zodResolver(CreatePostSchema),
    })

    const createPostMutation = useCreatePost()

    const onSubmit = (data: CreatePost) => {
        createPostMutation.mutate(data, {
            onSuccess: () => {
                toast.success('Post created successfully')
                navigate('/posts')
            },
            onError: (error: any) => {
                toast.error('Failed to create post')
                console.error(error)
            }
        })
    }

    return (
        <main className="p-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            {...register('title')}
                            placeholder="Enter post title"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            {...register('content')}
                            placeholder="Enter post content"
                            rows={6}
                        />
                        {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="author">Author</Label>
                        <Input
                            id="author"
                            {...register('author')}
                            placeholder="Enter author name"
                        />
                        {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="published" {...register('published')} />
                        <Label htmlFor="published">Published</Label>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => navigate('/posts')}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={createPostMutation.isPending}>
                            {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CreatePostContent