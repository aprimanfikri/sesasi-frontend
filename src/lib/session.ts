import { SessionOptions } from 'iron-session';

export const defaultSession: Session = {
  id: undefined,
  name: undefined,
  email: undefined,
  role: undefined,
  token: undefined,
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.AUTH_SECRET!,
  cookieName: 'session',
  ttl: 60 * 60 * 24 * 3,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
};
