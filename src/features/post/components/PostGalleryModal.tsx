import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useGetPostGallery } from '@/services/post/hooks/useGetPostGallery'
import { useAddPostGallery } from '@/services/post/hooks/useAddPostGallery'
import { useRemovePostGallery } from '@/services/post/hooks/useRemovePostGallery'
import { toast } from 'sonner'
import { Loader2, Plus, Trash2, X } from 'lucide-react'
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

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [open])

    if (!open) return null

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
                onClick={() => onOpenChange(false)}
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div 
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-300"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 pb-4 border-b">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Manage Post Gallery</h2>
                                <p className="text-gray-500 text-sm mt-1">Add or remove images from this post's gallery</p>
                            </div>
                            <button
                                onClick={() => onOpenChange(false)}
                                className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
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
                    </div>

                    {/* Footer */}
                    <div className="border-t p-4 px-6 flex justify-end bg-gradient-to-r from-gray-50 to-gray-100">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>

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
