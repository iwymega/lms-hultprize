import React, { useState, useEffect } from 'react'
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
import { Edit } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreatePostSchema, CreatePost } from '@/services/post/schema/CreatePostSchema'
import { useUpdatePost } from '@/services/post/hooks/useUpdatePost'
import { toast } from 'sonner'

interface EditPostModalProps {
    post: any
}

const EditPostModal: React.FC<EditPostModalProps> = ({ post }) => {
    const [open, setOpen] = useState(false)
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreatePost>({
        resolver: zodResolver(CreatePostSchema),
    })

    const updatePostMutation = useUpdatePost()

    useEffect(() => {
        if (post) {
            setValue('title', post.title)
            setValue('content', post.content)
            setValue('author', post.author)
            setValue('published', post.published)
        }
    }, [post, setValue])

    const onSubmit = (data: CreatePost) => {
        updatePostMutation.mutate({ post_id: post.id, data }, {
            onSuccess: () => {
                toast.success('Post updated successfully')
                setOpen(false)
            },
            onError: (error: any) => {
                toast.error('Failed to update post')
                console.error(error)
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 px-2">
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Post</DialogTitle>
                    <DialogDescription>
                        Update the post details below.
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
                        <Button type="submit" disabled={updatePostMutation.isPending}>
                            {updatePostMutation.isPending ? 'Updating...' : 'Update Post'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditPostModal