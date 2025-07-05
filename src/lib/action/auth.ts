'use server';

import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { defaultSession, sessionOptions } from '@/lib/session';
import {
  getProfileRequest,
  loginRequest,
  registerRequest,
} from '@/lib/api/auth';
import { LoginFormValues, RegisterFormValues } from '@/lib/validation/auth';
import { errorHandler } from '@/lib/error-handler';
import { sanitizeSession } from '@/lib/utils';
import { UserRole } from '@/types';

export const getSession = async () => {
  const cookieStore = await cookies();

  const session = await getIronSession<Session>(cookieStore, sessionOptions);

  if (!session.isLoggedIn) {
    Object.assign(session, defaultSession);
  }

  if (!session.token) {
    Object.assign(session, defaultSession);
    return session;
  }

  let profile;

  try {
    profile = await getProfileRequest(session.token);
  } catch {
    Object.assign(session, defaultSession);
    return session;
  }

  if (!profile.success) {
    Object.assign(session, defaultSession);
    return session;
  }

  session.id = profile.data.user.id;
  session.name = profile.data.user.name;
  session.email = profile.data.user.email;
  session.role = profile.data.user.role;
  session.isLoggedIn = true;

  return session;
};

export const registerAction = async (values: RegisterFormValues) => {
  try {
    const response = await registerRequest(values);

    return response;
  } catch (error) {
    return errorHandler(error);
  }
};

type LoginActionResponse =
  | { success: false; message: string }
  | {
      success: true;
      message: string;
      session: {
        isLoggedIn: boolean;
        id?: string;
        name?: string;
        email?: string;
        role?: UserRole;
        token?: string;
      };
    };

export const loginAction = async (
  values: LoginFormValues
): Promise<LoginActionResponse> => {
  try {
    const session = await getSession();

    const response = await loginRequest(values);

    const profile = await getProfileRequest(response.data.token);

    session.id = profile.data.user.id;
    session.name = profile.data.user.name;
    session.email = profile.data.user.email;
    session.role = profile.data.user.role;
    session.token = response.data.token;
    session.isLoggedIn = true;

    await session.save();

    const safeSession = sanitizeSession(session);

    return {
      success: true,
      message: 'Login successful',
      session: safeSession,
    };
  } catch (error) {
    return {
      success: false,
      message: errorHandler(error).message,
    };
  }
};

export const logoutAction = async () => {
  try {
    const cookieStore = await cookies();

    const session = await getIronSession<Session>(cookieStore, sessionOptions);

    session.destroy();

    await session.save();

    return {
      success: true,
      message: 'Logout successful.',
    };
  } catch (error) {
    return errorHandler(error);
  }
};
