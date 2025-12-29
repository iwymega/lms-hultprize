import React, { useState } from 'react'
import DebouncedSearchInput from '@/shared/components/search/DebouncedSearchInput'
import useIndexPost from '@/services/post/hooks/useIndexPost';
import { Download, Search, Plus, Edit, Images } from 'lucide-react';
import FilterDropdown from '@/shared/components/utility/FilterDropdown';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { BaseTable, useColumnToggle } from '@/shared/components/table/BaseTable';
import PaginationWithShow from '@/shared/components/pagination/PaginationWithShow';
import SortByDropdown from '@/shared/components/utility/SortByDropdown';
import RemovePost from './RemovePost';
import PostGalleryModal from './PostGalleryModal';
import { useNavigate } from 'react-router';

const PostPageContent: React.FC = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [showGalleryModal, setShowGalleryModal] = useState(false);

    const { data: posts, isFetching, isSuccess } = useIndexPost({
        params: {
            search: search,
            paginate: entriesPerPage,
            page: currentPage
        }
    });

    const [isPublished, setIsPublished] = useState(false);
    const [isDraft, setIsDraft] = useState(false);

    const handleApplyFilter = () => {
        console.log("Filter applied", { isPublished, isDraft });
        // Aksi untuk menerapkan filter sesuai dengan status yang dipilih.
    };

    const handleClearFilter = () => {
        setIsPublished(false);
        setIsDraft(false);
        console.log("Filters cleared");
        // Aksi untuk membersihkan filter.
    };

    const [isAscending, setIsAscending] = useState(true); // State untuk urutan (ascending/descending)

    // Column definitions
    const columns = [
        { title: "Title", key: "title" },
        { title: "Content", key: "content", render: (item: any) => item.content.substring(0, 50) + "..." },
        { 
            title: "Image", 
            key: "image_url", 
            render: (item: any) => (
                <img src={item.image_url} alt={item.title} className="w-16 h-16 object-cover rounded" />
            )
        },
        { title: "Created At", key: "created_at", render: (item: any) => new Date(item.created_at).toLocaleDateString() },
        {
            title: "Actions",
            key: "actions",
            render: (item: any) => (
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2"
                        onClick={() => navigate(`/posts/edit/${item.id}`)}
                        aria-label="Edit"
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2"
                        onClick={() => {
                            setSelectedPostId(item.id)
                            setShowGalleryModal(true)
                        }}
                        aria-label="Gallery"
                    >
                        <Images className="h-4 w-4" />
                    </Button>
                    <RemovePost post={item} />
                </div>
            ),
            className: "text-right",
        },
    ];

    // Hook untuk column toggle
    const { filteredColumns, renderColumnToggle } = useColumnToggle(columns);

    return (
        <main className="p-6">
            {/* Action Bar */}
            <div className="flex justify-between items-center mb-6 flex-wrap gap-y-4">
                {/* Left - Add Button */}
                <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2" onClick={() => navigate('/posts/create')}>
                    <Plus className="h-4 w-4" />
                    Add Post
                </Button>

                {/* Right - Search, Filter, Download */}
                <div className="flex items-center gap-2">
                    <DebouncedSearchInput
                        value={search}
                        onChange={setSearch}
                        debounceTime={400}
                        icon={<Search className="h-4 w-4" />}
                        className="my-4"
                        inputClassName="text-sm"
                        placeholder="Search here..."
                    />

                    {/* Filter Dropdown */}
                    <FilterDropdown onApply={handleApplyFilter} onClear={handleClearFilter}>
                        <div className="flex flex-col gap-2 mb-4">
                            <label className="flex items-center">
                                <Checkbox checked={isPublished} onCheckedChange={() => setIsPublished(!isPublished)} />
                                <span className="ml-2">Published</span>
                            </label>

                            <label className="flex items-center">
                                <Checkbox checked={isDraft} onCheckedChange={() => setIsDraft(!isDraft)} />
                                <span className="ml-2">Draft</span>
                            </label>
                        </div>
                    </FilterDropdown>

                    {/* Download Button */}
                    <Button className="bg-emerald-600 hover:bg-emerald-300 flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download
                    </Button>
                </div>
            </div>

            <BaseTable
                columns={filteredColumns}
                data={posts?.data || []}
                isLoading={isFetching}
                renderHeader={() => (
                    <>
                        <h2 className="text-lg font-medium">Post List</h2>
                        <div className="flex items-center gap-2">
                            <div className="hidden md:flex items-center gap-2">
                                <SortByDropdown onSortChange={setIsAscending} isAscending={isAscending} />
                            </div>
                            {/* Tombol show/hide column diintegrasikan ke header */}
                            {renderColumnToggle()}
                        </div>
                    </>
                )}
                skeletonRows={10}
            />
            {isSuccess && (
                <>
                    {/* Pagination */}
                    {posts.pagination && (
                        <PaginationWithShow
                            totalItems={posts.pagination.total}
                            itemsPerPage={entriesPerPage}
                            currentPage={currentPage}
                            onPageChange={(page) => setCurrentPage(page)}
                            onItemsPerPageChange={(items) => setEntriesPerPage(items)}
                        />
                    )}
                </>
            )}

            {/* Gallery Modal */}
            {selectedPostId && (
                <PostGalleryModal
                    postId={selectedPostId}
                    open={showGalleryModal}
                    onOpenChange={setShowGalleryModal}
                />
            )}
        </main>
    )
}

export default PostPageContent