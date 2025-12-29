import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdatePostSchema, UpdatePost } from '@/services/post/schema/UpdatePostSchema'
import { useUpdatePost } from '@/services/post/hooks/useUpdatePost'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router'
import { Upload, X, Loader2 } from 'lucide-react'
import useIndexPost from '@/services/post/hooks/useIndexPost'

const EditPostContent: React.FC = () => {
    const navigate = useNavigate()
    const { postId } = useParams<{ postId: string }>()
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<UpdatePost>({
        resolver: zodResolver(UpdatePostSchema),
    })

    // Fetch post data using useIndexPost with filter[id]
    const { data: postData, isLoading: isLoadingPost } = useIndexPost({ 
        params: { 
            'filter[id]': postId 
        } 
    })

    // Populate form when data is loaded
    useEffect(() => {
        if (postData?.data && postData.data.length > 0) {
            const post = postData.data[0]
            reset({
                title: post.title,
                content: post.content,
            })
            if (post.image_url) {
                setImagePreview(post.image_url)
            }
        }
    }, [postData, reset])

    const updatePostMutation = useUpdatePost()

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setValue('image', file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeImage = () => {
        setImagePreview(null)
        setValue('image', null as any)
    }

    const onSubmit = (data: UpdatePost) => {
        updatePostMutation.mutate({ post_id: postId!, data }, {
            onSuccess: () => {
                toast.success('Post updated successfully')
                navigate('/posts')
            },
            onError: (error: any) => {
                toast.error('Failed to update post')
                console.error(error)
            }
        })
    }

    if (isLoadingPost) {
        return (
            <main className="p-6">
                <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-500">Loading post data...</p>
                    </div>
                </div>
            </main>
        )
    }

    if (!postData?.data || postData.data.length === 0) {
        return (
            <main className="p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">Post not found</p>
                        <Button onClick={() => navigate('/posts')}>Back to Posts</Button>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="p-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            {...register('title')}
                            placeholder="Enter post title (max 255 characters)"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            {...register('content')}
                            placeholder="Enter post content (max 1000 characters)"
                            rows={6}
                        />
                        {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="image">Image (optional)</Label>
                        <div className="mt-2">
                            {imagePreview ? (
                                <div className="relative inline-block">
                                    <img src={imagePreview} alt="Preview" className="w-full max-w-md h-48 object-cover rounded-lg" />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2"
                                        onClick={removeImage}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">Click to upload new image</span>
                                    <span className="text-xs text-gray-400 mt-1">JPG, JPEG, PNG, GIF (max 20MB)</span>
                                </label>
                            )}
                            <Input
                                id="image"
                                type="file"
                                accept="image/jpg,image/jpeg,image/png,image/gif"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => navigate('/posts')}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={updatePostMutation.isPending}>
                            {updatePostMutation.isPending ? 'Updating...' : 'Update Post'}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default EditPostContent