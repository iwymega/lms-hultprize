import React, { useState } from 'react'
import { X, Search, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import ImageSelectionCard from './ImageSelectionCard'
import UploadImageModal from './UploadImageModal'

export interface MediaFile {
    id: string
    name: string
    size: string
    url: string
    type?: string
    createdAt?: string
}

interface MediaLibraryModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSelect: (file: MediaFile | MediaFile[]) => void
    multiple?: boolean
    title?: string
    subtitle?: string
    files?: MediaFile[]
}

const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({
    open,
    onOpenChange,
    onSelect,
    multiple = false,
    title = "Media Library",
    subtitle = "Select or upload images",
    files = []
}) => {
    const [search, setSearch] = useState("")
    const [selectedFiles, setSelectedFiles] = useState<string[]>([])
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

    // Mock data - replace with actual API data passed via props
    const defaultFiles: MediaFile[] = [
        {
            id: '1',
            name: 'qr-code (1).webp',
            size: '29.17 KB',
            url: '/placeholder-qr.webp',
            type: 'image'
        },
        {
            id: '2',
            name: 'frame-top-left.d701606.webp',
            size: '47.57 KB',
            url: '/placeholder-frame.webp',
            type: 'image'
        },
        {
            id: '3',
            name: 'screencapture-file-Users-sunar...',
            size: '125.65 KB',
            url: '/placeholder-capture.webp',
            type: 'image'
        },
        {
            id: '4',
            name: 'WhatsApp Image 2025-12-13 at...',
            size: '108.29 KB',
            url: '/placeholder-whatsapp.webp',
            type: 'image'
        }
    ]

    const displayFiles = files.length > 0 ? files : defaultFiles

    const filteredFiles = displayFiles.filter(file =>
        file.name.toLowerCase().includes(search.toLowerCase())
    )

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
            const selectedFile = displayFiles.find(f => f.id === fileId)
            if (selectedFile) {
                onSelect(selectedFile)
                onOpenChange(false)
                setSelectedFiles([])
            }
        }
    }

    const handleConfirmSelection = () => {
        if (multiple) {
            const selected = displayFiles.filter(f => selectedFiles.includes(f.id))
            onSelect(selected)
        }
        onOpenChange(false)
        setSelectedFiles([])
    }

    const handleClose = () => {
        onOpenChange(false)
        setSelectedFiles([])
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
                                    {filteredFiles.length} images
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
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredFiles.map((file) => (
                                <ImageSelectionCard
                                    key={file.id}
                                    file={file}
                                    isSelected={selectedFiles.includes(file.id)}
                                    onClick={() => handleFileClick(file.id)}
                                />
                            ))}
                        </div>

                        {filteredFiles.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                No images found
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
