import { Permission, Role } from "../response/loginResponseSchema";

// utils/getRedirectPathFromPermissions.ts
export const getRedirectPathFromPermissions = (permissions: Permission[], _roles: Role[]): string => { // Add _ for unused variable
    const redirectMap: { [key: string]: string } = {
        'dashboard_view': '/',
        'view_report': '/report',
        'view_finance': '/finance',
    };

    // You can also check roles here if needed
    for (const key in redirectMap) {
        if (permissions.some(permission => permission.name === key)) { // you can change this to check roles if needed
            return redirectMap[key];
        }
    }

    return '/';
};