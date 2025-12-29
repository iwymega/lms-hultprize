import React, { useState } from 'react'
import { X, Search, Upload, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import ImageSelectionCard from './ImageSelectionCard'
import UploadImageModal from './UploadImageModal'
import useIndexFile from '@/services/file/hooks/useIndexFile'

export interface MediaFile {
    id: string
    name: string
    size: number
    size_for_human?: string
    url: string
    ext: string
    mime_type: string
    created_at: string
    updated_at: string
}

interface MediaLibraryModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSelect: (file: MediaFile | MediaFile[]) => void
    multiple?: boolean
    title?: string
    subtitle?: string
}

const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({
    open,
    onOpenChange,
    onSelect,
    multiple = false,
    title = "Media Library",
    subtitle = "Select or upload images"
}) => {
    const [search, setSearch] = useState("")
    const [selectedFiles, setSelectedFiles] = useState<string[]>([])
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

    // Fetch files from API
    const { data: filesData, isLoading } = useIndexFile({
        params: {
            search: search,
            paginate: 50,
            'filter[is_trashed]': 'false'
        }
    })

    const displayFiles = filesData?.data || []

    const handleFileClick = (fileId: string) => {
        if (multiple) {
            setSelectedFiles(prev => {
                if (prev.includes(fileId)) {
                    return prev.filter(id => id !== fileId)
                } else {
                    return [...prev, fileId]
                }
            })
        } else {
            setSelectedFiles([fileId])
            // Immediately select for single selection
            const selectedFile = displayFiles.find((f: MediaFile) => f.id === fileId)
            if (selectedFile) {
                onSelect(selectedFile)
                onOpenChange(false)
                setSelectedFiles([])
                setSearch("")
            }
        }
    }

    const handleConfirmSelection = () => {
        if (multiple) {
            const selected = displayFiles.filter((f: MediaFile) => selectedFiles.includes(f.id))
            onSelect(selected)
        }
        onOpenChange(false)
        setSelectedFiles([])
        setSearch("")
    }

    const handleClose = () => {
        onOpenChange(false)
        setSelectedFiles([])
        setSearch("")
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-5xl p-0 gap-0">
                    {/* Header */}
                    <div className="p-6 pb-4">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h2 className="text-2xl font-bold">{title}</h2>
                                <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleClose}
                                className="h-8 w-8"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Search and Upload Bar */}
                        <div className="flex items-center gap-3 mt-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search images..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 font-medium">
                                    {isLoading ? 'Loading...' : `${displayFiles.length} images`}
                                </span>
                                <Button
                                    className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                                    onClick={() => setIsUploadModalOpen(true)}
                                >
                                    <Upload className="h-4 w-4" />
                                    Upload Image
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Images Grid */}
                    <div className="px-6 pb-4 max-h-[500px] overflow-y-auto">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                                <span className="ml-2 text-gray-500">Loading images...</span>
                            </div>
                        ) : displayFiles.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                No images found
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {displayFiles.map((file: MediaFile) => (
                                    <ImageSelectionCard
                                        key={file.id}
                                        file={file}
                                        isSelected={selectedFiles.includes(file.id)}
                                        onClick={() => handleFileClick(file.id)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t p-4 px-6 flex items-center justify-between bg-gray-50">
                        <p className="text-sm text-gray-600">
                            Click on an image to select it
                        </p>
                        <div className="flex items-center gap-2">
                            {multiple && selectedFiles.length > 0 && (
                                <Button
                                    onClick={handleConfirmSelection}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    Select {selectedFiles.length} {selectedFiles.length === 1 ? 'Image' : 'Images'}
                                </Button>
                            )}
                            <Button variant="outline" onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Upload Modal */}
            <UploadImageModal
                open={isUploadModalOpen}
                onOpenChange={setIsUploadModalOpen}
            />
        </>
    )
}

export default MediaLibraryModal
