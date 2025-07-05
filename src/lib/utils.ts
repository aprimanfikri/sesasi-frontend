import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sanitizeSession = (session: Session) => {
  return {
    id: session.id,
    name: session.name,
    email: session.email,
    role: session.role,
    token: session.token,
    isLoggedIn: session.isLoggedIn,
  };
};
