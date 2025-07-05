'use server';

import { errorHandler } from '../error-handler';
import { getAllUsersReques } from '@/lib/api/user';

export const getAllUsersAction = async (session: Session) => {
  try {
    const response = await getAllUsersReques(session);

    return response;
  } catch (error) {
    return errorHandler(error);
  }
};
