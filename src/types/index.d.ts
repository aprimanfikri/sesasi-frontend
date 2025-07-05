export type UserRole = 'ADMIN' | 'VERIFICATOR' | 'USER';
export type PermissionStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'REVISED'
  | 'CANCELLED';

declare global {
  interface Session {
    id?: string;
    name?: string;
    email?: string;
    role?: UserRole;
    token?: string;
    isLoggedIn: boolean;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdPermissions?: Permission[];
    verifiedPermissions?: Permission[];
  }

  interface Permission {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: PermissionStatus;
    user: User;
    userId: string;
    verificator?: User;
    verificatorId?: string;
    verificatorComment?: string;
    createdAt: Date;
    updatedAt: Date;
  }
}

export {};
