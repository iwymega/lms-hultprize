import AdminLayout from '@/layouts/AdminLayout'
import React from 'react'
import CreatePostContent from '../components/CreatePostContent'

const CreatePostPage: React.FC = () => {
    return (
        <AdminLayout>
            <CreatePostContent />
        </AdminLayout>
    )
}

export default CreatePostPage