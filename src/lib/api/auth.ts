import axios from 'axios';
import { LoginFormValues, RegisterFormValues } from '@/lib/validation/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginRequest = async (credentials: LoginFormValues) => {
  const res = await axios.post(`${API_URL}/auth/login`, credentials);

  return res.data;
};

export const registerRequest = async (credentials: RegisterFormValues) => {
  const res = await axios.post(`${API_URL}/auth/register`, credentials);

  return res.data;
};

export const getProfileRequest = async (token: string) => {
  const res = await axios.get(`${API_URL}/auth`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
