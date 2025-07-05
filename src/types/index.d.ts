export type UserRole = 'ADMIN' | 'VERIFICATOR' | 'USER';

declare global {
  interface Session {
    id?: string;
    name?: string;
    email?: string;
    role?: UserRole;
    token?: string;
    isLoggedIn: boolean;
  }
}

export {};
