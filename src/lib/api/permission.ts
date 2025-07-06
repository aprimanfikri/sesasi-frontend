import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllPermissionsRequest = async (session: Session) => {
  const res = await axios.get(`${API_URL}/permission`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

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
