import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SingleUserResponse } from '@/services/user/response/IndexUserResponse';
import { ArrowRight } from 'lucide-react';
import React from 'react'
import { useTranslation } from 'react-i18next';

type Props = {
    user: SingleUserResponse;
}

const UserItems: React.FC<Props> = ({ user }) => {
    const { t } = useTranslation();
    return (
        <tr className="border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.roles && user.roles.length > 0 ? (
                    user.roles.map((role) => (
                        <Badge key={role.id} variant="outline" className="mr-2">
                            {role.display_name}
                        </Badge>
                    ))
                ) : (
                    <span className="text-gray-500">{t("user-management.table.no-role")}</span>
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Button variant="ghost" size="sm" className="h-6 px-2">
                    <span className="text-sm text-gray-500">{t("dashboard.top-customers.table.action.see-detail")}</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
            </td>
        </tr>
    )
}

export default UserItems