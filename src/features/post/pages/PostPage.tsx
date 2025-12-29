import AdminLayout from '@/layouts/AdminLayout'
import React from 'react'
import PostPageContent from '../components/PostPageContent'

const PostPage: React.FC = () => {
    return (
        <AdminLayout>
            <PostPageContent />
        </AdminLayout>
    )
}

export default PostPage