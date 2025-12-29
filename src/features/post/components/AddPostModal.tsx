import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreatePostSchema, CreatePost } from '@/services/post/schema/CreatePostSchema'
import useCreatePost from '@/services/post/hooks/useCreatePost'
import { toast } from 'sonner'

const AddPostModal: React.FC = () => {
    const [open, setOpen] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreatePost>({
        resolver: zodResolver(CreatePostSchema),
    })

    const createPostMutation = useCreatePost()

    const onSubmit = (data: CreatePost) => {
        createPostMutation.mutate(data, {
            onSuccess: () => {
                toast.success('Post created successfully')
                setOpen(false)
                reset()
            },
            onError: (error) => {
                toast.error('Failed to create post')
                console.error(error)
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Post
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Post</DialogTitle>
                    <DialogDescription>
                        Create a new post by filling in the details below.
                    </DialogDescription>
                </DialogHeader>
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
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={createPostMutation.isPending}>
                            {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddPostModal