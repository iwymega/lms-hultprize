interface Roles {
    id: string;
    name: string;
    display_name: string;
}

interface Permissions {
    id: string;
    name: string;
    display_name: string;
    group: string;
}

export type User = {
    id: string;
    name: string;
    email: string;
    roles: Roles[];
    permissions: Permissions[];
    properties: Record<string, string>;
    active_property_id: string;
    active_property: string;
};