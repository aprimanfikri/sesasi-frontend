import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllPermissionsReques(session: Session) {
  const res = await axios.get(`${API_URL}/permission`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  return res.data;
}
