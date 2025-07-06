'use server';

import { errorHandler } from '../error-handler';
import {
  cancelPermissionRequest,
  createPermissionRequest,
  deletePermissionRequest,
  getAllPermissionsRequest,
  getAllUserPermissionsRequest,
  updatePermissionRequest,
  updatePermissionStatusRequest,
} from '@/lib/api/permission';
import {
  PermissionFormValues,
  UpdatePermissionStatusFormValues,
} from '../validation/permission';
import { revalidatePath } from 'next/cache';

export const getAllPermissionsAction = async (session: Session) => {
  try {
    const response = await getAllPermissionsRequest(session);

    return response;
  } catch (error) {
    return errorHandler(error);
  }
};

export const getAllUserPermissionsAction = async (session: Session) => {
  try {
    const response = await getAllUserPermissionsRequest(session);

    return response;
  } catch (error) {
    return errorHandler(error);
  }
};

export const createPermissionAction = async (
  session: Session,
  values: PermissionFormValues
) => {
  try {
    const response = await createPermissionRequest(session, values);

    revalidatePath('/user/permission');

    return response;
  } catch (error) {
    return errorHandler(error);
  }
};

export const updatePermissionAction = async (
  session: Session,
  permissionId: string,
  values: PermissionFormValues
) => {
  try {
    const response = await updatePermissionRequest(
      session,
      permissionId,
      values
    );

    revalidatePath('/user/permission');

    return response;
  } catch (error) {
    return errorHandler(error);
  }
};

export const cancelPermissionAction = async (
  session: Session,
  permissionId: string
) => {
  try {
    const response = await cancelPermissionRequest(session, permissionId);

    revalidatePath('/user/permission');

    return response;
  } catch (error) {
    return errorHandler(error);
  }
};

export const updatePermissionStatusAction = async (
  session: Session,
  permissionId: string,
  values: UpdatePermissionStatusFormValues
) => {
  try {
    const response = await updatePermissionStatusRequest(
      session,
      permissionId,
      values
    );

    revalidatePath('/user/permission');

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

    revalidatePath('/user/permission');

    return response;
  } catch (error) {
    return errorHandler(error);
  }
};
