import axios from 'axios';
import { CreateUserFormValues, UpdateUserFormValues } from '../validation/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllUsersReques = async (session: Session) => {
  const res = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  return res.data;
};

export const createUserRequest = async (
  session: Session,
  values: CreateUserFormValues
) => {
  const res = await axios.post(`${API_URL}/user`, values, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  return res.data;
};

export const updateUserRequest = async (
  session: Session,
  userId: string,
  values: UpdateUserFormValues
) => {
  const res = await axios.patch(`${API_URL}/user/${userId}`, values, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  return res.data;
};

export const deleteUserRequest = async (session: Session, userId: string) => {
  const res = await axios.delete(`${API_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  return res.data;
};
