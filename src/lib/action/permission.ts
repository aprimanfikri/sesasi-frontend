'use server';

import { errorHandler } from '../error-handler';
import {
  deletePermissionRequest,
  getAllPermissionsRequest,
} from '@/lib/api/permission';

export const getAllPermissionsAction = async (session: Session) => {
  try {
    const response = await getAllPermissionsRequest(session);

    return response;
  } catch (error) {
    return errorHandler(error);
  }
};

export const deletePermissionAction = async (
  session: Session,
  permissionId: string
) => {
  try {
    const response = await deletePermissionRequest(session, permissionId);

    return response;
  } catch (error) {
    return errorHandler(error);
  }
};
