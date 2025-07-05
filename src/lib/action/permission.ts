'use server';

import { errorHandler } from '../error-handler';
import { getAllPermissionsReques } from '@/lib/api/permission';

export const getAllPermissionsAction = async (session: Session) => {
  try {
    const response = await getAllPermissionsReques(session);

    return response;
  } catch (error) {
    return errorHandler(error);
  }
};
