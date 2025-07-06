'use server';

import { errorHandler } from '../error-handler';
import {
  createUserRequest,
  deleteUserRequest,
  getAllUsersReques,
  updateUserRequest,
} from '@/lib/api/user';
import { CreateUserFormValues, UpdateUserFormValues } from '../validation/user';
import { revalidatePath } from 'next/cache';

export const getAllUsersAction = async (session: Session) => {
  try {
    const response = await getAllUsersReques(session);

    return response;
  } catch (error) {
    return errorHandler(error);
  }
};

export const createUserAction = async (
  session: Session,
  values: CreateUserFormValues
) => {
  try {
    const response = await createUserRequest(session, values);

    revalidatePath('/admin/user');

    return response;
  } catch (error) {
    return errorHandler(error);
  }
};

export const updateUserAction = async (
  session: Session,
  userId: string,
  values: UpdateUserFormValues
) => {
  try {
    const response = await updateUserRequest(session, userId, values);

    revalidatePath('/admin/user');

    return response;
  } catch (error) {
    return errorHandler(error);
  }
};

export const deleteUserAction = async (session: Session, userId: string) => {
  try {
    const response = await deleteUserRequest(session, userId);

    revalidatePath('/admin/user');

    return response;
  } catch (error) {
    return errorHandler(error);
  }
};
