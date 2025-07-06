import axios from 'axios';
import {
  PermissionFormValues,
  UpdatePermissionStatusFormValues,
} from '../validation/permission';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllPermissionsRequest = async (session: Session) => {
  const res = await axios.get(`${API_URL}/permission`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  return res.data;
};

export const getAllUserPermissionsRequest = async (session: Session) => {
  const res = await axios.get(`${API_URL}/permission/user`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  return res.data;
};

export const createPermissionRequest = async (
  session: Session,
  values: PermissionFormValues
) => {
  const res = await axios.post(`${API_URL}/permission`, values, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  return res.data;
};

export const updatePermissionRequest = async (
  session: Session,
  permissionId: string,
  values: PermissionFormValues
) => {
  const res = await axios.patch(
    `${API_URL}/permission/${permissionId}`,
    values,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );

  return res.data;
};

export const cancelPermissionRequest = async (
  session: Session,
  permissionId: string
) => {
  const res = await axios.patch(
    `${API_URL}/permission/${permissionId}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );

  return res.data;
};

export const updatePermissionStatusRequest = async (
  session: Session,
  permissionId: string,
  values: UpdatePermissionStatusFormValues
) => {
  const res = await axios.patch(
    `${API_URL}/permission/${permissionId}/status`,
    values,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );

  return res.data;
};

export const deletePermissionRequest = async (
  session: Session,
  permissionId: string
) => {
  const res = await axios.delete(`${API_URL}/permission/${permissionId}`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  return res.data;
};
