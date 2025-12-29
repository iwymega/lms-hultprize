import AdminLayout from '@/layouts/AdminLayout'
import React from 'react'
import EditPostContent from '../components/EditPostContent'

const EditPostPage: React.FC = () => {
    return (
        <AdminLayout>
            <EditPostContent />
        </AdminLayout>
    )
}

export default EditPostPage