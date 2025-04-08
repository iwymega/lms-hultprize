export interface Role {
    id: number; // dari API: number
    name: string;
    display_name: string;
}

export interface Permission {
    id: number; // dari API: number
    name: string;
    display_name: string;
    group: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    created_at: string;
    updated_at: string;
    roles: Role[];
    permissions: Permission[];
}
