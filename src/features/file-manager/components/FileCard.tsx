import React, { useState } from 'react'
import { Eye, Trash2, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { useDeleteFile } from '@/services/file/hooks/useDeleteFile'
import { useRestoreFile } from '@/services/file/hooks/useRestoreFile'

interface FileCardProps {
    file: {
        id: string
        name: string
        size: number
        url: string
        ext: string
        mime_type: string
        created_at: string
        size_for_human?: string
    }
    isTrashed?: boolean
}

const FileCard: React.FC<FileCardProps> = ({ file, isTrashed = false }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const deleteMutation = useDeleteFile()
    const restoreMutation = useRestoreFile()

    // Format file size
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    }

    // Use size_for_human if available, otherwise format it
    const displaySize = file.size_for_human || formatFileSize(file.size)

    const handleView = () => {
        // Open file in new tab or preview modal
        window.open(file.url, '_blank')
    }

    const handleDelete = () => {
        deleteMutation.mutate({ id: file.id }, {
            onSuccess: () => {
                toast.success(`File "${file.name}" deleted successfully`)
                setShowDeleteDialog(false)
            },
            onError: (error) => {
                toast.error('Failed to delete file')
                console.error(error)
                setShowDeleteDialog(false)
            }
        })
    }

    const handleRestore = () => {
        restoreMutation.mutate({ id: file.id }, {
            onSuccess: () => {
                toast.success(`File "${file.name}" restored successfully`)
            },
            onError: (error) => {
                toast.error('Failed to restore file')
                console.error(error)
            }
        })
    }

    return (
        <>
            <div
                className="relative bg-white rounded-lg border overflow-hidden group cursor-pointer transition-shadow hover:shadow-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Preview */}
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            // Fallback if image fails to load
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150"%3E%3Crect fill="%23ddd" width="200" height="150"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="14" dy="75" dx="50"%3ENo Preview%3C/text%3E%3C/svg%3E'
                        }}
                    />
                </div>

                {/* Hover Actions */}
                {isHovered && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity">
                        <Button
                            size="icon"
                            variant="secondary"
                            className="rounded-full w-10 h-10"
                            onClick={handleView}
                        >
                            <Eye className="h-5 w-5" />
                        </Button>
                        {isTrashed ? (
                            <Button
                                size="icon"
                                variant="secondary"
                                className="rounded-full w-10 h-10"
                                onClick={handleRestore}
                                disabled={restoreMutation.isPending}
                            >
                                <RotateCcw className="h-5 w-5 text-green-600" />
                            </Button>
                        ) : (
                            <Button
                                size="icon"
                                variant="secondary"
                                className="rounded-full w-10 h-10"
                                onClick={() => setShowDeleteDialog(true)}
                            >
                                <Trash2 className="h-5 w-5 text-red-600" />
                            </Button>
                        )}
                    </div>
                )}

                {/* File Info */}
                <div className="p-3">
                    <p className="text-sm font-medium truncate" title={file.name}>
                        {file.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{displaySize}</p>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the file "{file.name}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default FileCard
