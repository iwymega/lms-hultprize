import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { BaseTable } from "@/shared/components/table/BaseTable";
import PaginationWithShow from "@/shared/components/pagination/PaginationWithShow";

const permissionsData = [
    { id: 1, group: "Activitylog", permissions: ["view"] },
    { id: 2, group: "Report", permissions: ["view", "grafik"] },
    { id: 3, group: "Bank Content", permissions: ["view", "create", "update", "delete"] },
    { id: 4, group: "Client", permissions: ["create", "update", "delete"] },
    { id: 5, group: "Stories", permissions: ["view", "create", "update", "delete"] },
    { id: 6, group: "Post Reels", permissions: ["view", "create", "update", "delete"] },
    { id: 7, group: "Notification", permissions: ["send"] },
    { id: 8, group: "Association", permissions: ["view", "add", "remove"] },
    { id: 9, group: "Input", permissions: ["client", "title", "subtype", "upload date", "references", "content", "brief", "caption", "attachment", "hashtags", "note", "due date", "offset date", "revision"] },
    { id: 10, group: "Status", permissions: ["draft", "processing idea", "idea done", "production in process", "production done", "idea revision done", "on hold", "dubbing in process", "dubbing done"] },
    { id: 11, group: "View", permissions: ["deadline", "timeline", "upload_date", "contract_value"] },
    { id: 12, group: "Timeline", permissions: ["create", "update", "delete"] },
    { id: 13, group: "Announcement", permissions: ["view", "create", "update", "delete"] },
    { id: 14, group: "Instagram Grid", permissions: ["view"] },
    { id: 15, group: "Pola", permissions: ["view", "create", "update", "delete"] },
    { id: 16, group: "Pola Task", permissions: ["view", "create", "update", "delete"] },
    { id: 17, group: "Role", permissions: ["view", "create", "update", "delete"] },
    { id: 18, group: "Permission", permissions: ["view", "create", "update", "delete"] },
    { id: 19, group: "Team", permissions: ["view", "create", "update", "delete"] },
    { id: 20, group: "Profile", permissions: ["view", "update", "change password"] },
    { id: 21, group: "Sso", permissions: ["portal button"] }
];

const RolePermissionManagement: React.FC = () => {
    const [selectedPermissions, setSelectedPermissions] = useState<Record<number, string[]>>({});

    const handlePermissionChange = (roleId: number, permission: string) => {
        setSelectedPermissions((prev) => {
            const currentPermissions = prev[roleId] || [];
            return {
                ...prev,
                [roleId]: currentPermissions.includes(permission)
                    ? currentPermissions.filter((p) => p !== permission)
                    : [...currentPermissions, permission]
            };
        });
    };

    return (
        <div className="p-6 space-y-4">
            <BaseTable
                data={permissionsData}
                columns={[
                    { title: "No", key: "index", render: (_, index) => index + 1, className: "w-12" },
                    { title: "Group", key: "group" },
                    {
                        title: "Permissions",
                        key: "permissions",
                        render: (item) => (
                            <div className="flex flex-wrap gap-2">
                                {item.permissions.map((permission) => (
                                    <>
                                        <Checkbox
                                            key={permission}
                                            checked={selectedPermissions[item.id]?.includes(permission) || false}
                                            onCheckedChange={() => handlePermissionChange(item.id, permission)}
                                            className="text-blue-600"
                                            aria-label={`Select ${permission}`}
                                        />
                                        <label
                                            key={permission}
                                            htmlFor={`checkbox-${item.id}-${permission}`}
                                            className="text-sm text-gray-700"
                                        >
                                            {permission}
                                        </label>
                                    </>
                                ))}
                            </div>
                        )
                    },
                    {
                        title: "Actions",
                        key: "actions",
                        render: () => (
                            <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                                Edit
                            </Button>
                        ),
                        className: "text-center w-24"
                    }
                ]}
                isLoading={false}
                renderHeader={() => (
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Role Permissions</h2>
                        </div>
                        <div className="flex justify-between items-center">
                            <Input placeholder="Role Name" className="w-full mr-2 bg-primary text-white" disabled value="DESIGN" />
                            <div className="flex justify-end gap-2">
                                <Button variant="outline">Cancel</Button>
                                <Button className="bg-blue-600 text-white hover:bg-blue-700">Save</Button>
                            </div>
                        </div>
                    </div>
                )}
            />
            <PaginationWithShow
                totalItems={100}
                itemsPerPage={10}
                currentPage={1}
                onPageChange={(page) => console.log("Page changed to:", page)}
                onItemsPerPageChange={(size) => console.log("Page size changed to:", size)}
            />
        </div>
    );
}

export default RolePermissionManagement