export type User = {
    id: string;
    name: string;
    email: string;
    role: string[];
    permissions: string[];
    properties: Record<string, string>;
    active_property_id: string;
    active_property: string;
};