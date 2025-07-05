import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllUsersReques(session: Session) {
  const res = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  return res.data;
}
