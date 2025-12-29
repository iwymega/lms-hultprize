import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useGetPostGallery } from '@/services/post/hooks/useGetPostGallery'
import { useAddPostGallery } from '@/services/post/hooks/useAddPostGallery'
import { useRemovePostGallery } from '@/services/post/hooks/useRemovePostGallery'
import { toast } from 'sonner'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import MediaLibraryModal from '@/shared/components/media-library/MediaLibraryModal'

interface PostGalleryModalProps {
    postId: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

const PostGalleryModal: React.FC<PostGalleryModalProps> = ({ postId, open, onOpenChange }) => {
    const [showMediaLibrary, setShowMediaLibrary] = useState(false)
    const { data: galleryData, isLoading } = useGetPostGallery({ post_id: postId })
    const addGalleryMutation = useAddPostGallery()
    const removeGalleryMutation = useRemovePostGallery()

    const gallery = galleryData?.data || []

    const handleAddImages = (selectedFiles: any) => {
        const files = Array.isArray(selectedFiles) ? selectedFiles : [selectedFiles]
        const fileIds = files.map(file => file.id).join(', ')
        
        addGalleryMutation.mutate(
            { post_id: postId, data: { file_ids: fileIds } },
            {
                onSuccess: () => {
                    toast.success('Images added to gallery successfully')
                    setShowMediaLibrary(false)
                },
                onError: (error) => {
                    toast.error('Failed to add images to gallery')
                    console.error(error)
                }
            }
        )
    }

    const handleRemoveImage = (fileId: string) => {
        removeGalleryMutation.mutate(
            { post_id: postId, file_id: fileId },
            {
                onSuccess: () => {
                    toast.success('Image removed from gallery')
                },
                onError: (error) => {
                    toast.error('Failed to remove image')
                    console.error(error)
                }
            }
        )
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Manage Post Gallery</DialogTitle>
                        <DialogDescription>
                            Add or remove images from this post's gallery
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Gallery Images ({gallery.length})</h3>
                            <Button
                                onClick={() => setShowMediaLibrary(true)}
                                className="flex items-center gap-2"
                                size="sm"
                            >
                                <Plus className="h-4 w-4" />
                                Add Images
                            </Button>
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center items-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                            </div>
                        ) : gallery.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                                <p className="text-gray-500">No images in gallery</p>
                                <Button
                                    onClick={() => setShowMediaLibrary(true)}
                                    variant="outline"
                                    className="mt-4"
                                >
                                    Add First Image
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {gallery.map((file) => (
                                    <div key={file.id} className="relative group">
                                        <img
                                            src={file.url}
                                            alt={file.name}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                            <Button
                                                size="icon"
                                                variant="destructive"
                                                onClick={() => handleRemoveImage(file.id)}
                                                disabled={removeGalleryMutation.isPending}
                                            >
                                                {removeGalleryMutation.isPending ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                        <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <MediaLibraryModal
                open={showMediaLibrary}
                onOpenChange={setShowMediaLibrary}
                onSelect={handleAddImages}
                multiple={true}
                title="Select Images for Gallery"
            />
        </>
    )
}

export default PostGalleryModal
