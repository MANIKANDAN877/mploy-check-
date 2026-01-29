export type Role = 'Admin' | 'General User';

export interface User {
    id: string;
    username: string;
    name: string;
    role: Role;
    email: string;
    avatar?: string; // For that premium feel
}

export interface LoginRequest {
    username: string; // Using username as ID for simplicity or separate
    password: string;
    role?: Role; // Optional for this flow if we want to force role selection or infer it
}

export interface Record {
    id: string;
    title: string;
    description: string;
    status: 'Active' | 'Pending' | 'Completed';
    date: Date;
    accessLevel: Role; // To display records based on user access
}
