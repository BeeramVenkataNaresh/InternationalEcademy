export interface User {
    userId: number;
    userName?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    roleId: number;
    roleName?: string;
    moduleId?: number;
    brId?: number;
    brName?: string;
    regionId: number;
    regionName?: string;
    active: boolean;
    created?: string;
    modified?: string;
}