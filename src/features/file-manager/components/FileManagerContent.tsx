import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import FileCard from './FileCard'
import UploadFileModal from './UploadFileModal'

const FileManagerContent: React.FC = () => {
    const [search, setSearch] = useState("")
    const [fileType, setFileType] = useState("all")
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

    // Mock data - replace with actual API call
    const files = [
        {
            id: '1',
            name: 'qr-code (1).webp',
            size: '23.17 KB',
            type: 'image',
            url: '/placeholder-qr.webp',
            createdAt: '2025-12-13'
        },
        {
            id: '2',
            name: 'frame-top-left.d701606.webp',
            size: '47.57 KB',
            type: 'image',
            url: '/placeholder-frame.webp',
            createdAt: '2025-12-13'
        },
        {
            id: '3',
            name: 'screencapture-file-Users-sunar...',
            size: '125.65 KB',
            type: 'image',
            url: '/placeholder-capture.webp',
            createdAt: '2025-12-13'
        },
        {
            id: '4',
            name: 'WhatsApp Image 2025-12-13 at...',
            size: '108.29 KB',
            type: 'image',
            url: '/placeholder-whatsapp.webp',
            createdAt: '2025-12-13'
        }
    ]

    const totalFiles = files.length
    const usedStorage = "310.68 KB"
    const totalStorage = "1 GB"
    const storagePercentage = 0

    return (
        <main className="p-6">
            {/* Top Bar */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Search */}
                <div className="flex-1 min-w-[200px]">
                    <Input
                        type="text"
                        placeholder="Search files..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full"
                    />
                </div>

                {/* File Type Filter */}
                <Select value={fileType} onValueChange={setFileType}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="image">Images</SelectItem>
                        <SelectItem value="document">Documents</SelectItem>
                        <SelectItem value="video">Videos</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>

                {/* Filter Button */}
                <Button variant="outline">
                    Filter
                </Button>

                {/* Upload Button */}
                <Button 
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                    onClick={() => setIsUploadModalOpen(true)}
                >
                    <Upload className="h-4 w-4" />
                    Upload Files
                </Button>

                <span className="text-gray-500 text-sm">or drag & drop anywhere</span>
            </div>

            {/* Storage Usage */}
            <div className="bg-white rounded-lg border p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                    <h2 className="text-lg font-semibold">Storage Usage</h2>
                    <div className="flex items-center gap-8">
                        <div className="text-right">
                            <div className="text-2xl font-bold">{totalFiles}</div>
                            <div className="text-sm text-gray-500">Total Files</div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold">{totalStorage}</div>
                            <div className="text-sm text-gray-500">Storage Limit</div>
                        </div>
                    </div>
                </div>
                
                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{usedStorage} of {totalStorage} used</span>
                        <span className="text-sm font-medium text-green-600">{storagePercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                            className="bg-green-500 h-2 rounded-full transition-all"
                            style={{ width: `${storagePercentage}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Files Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {files.map((file) => (
                    <FileCard key={file.id} file={file} />
                ))}
            </div>

            {files.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No files found. Upload your first file to get started.
                </div>
            )}

            {/* Upload Modal */}
            <UploadFileModal 
                open={isUploadModalOpen} 
                onOpenChange={setIsUploadModalOpen}
            />
        </main>
    )
}

export default FileManagerContent
